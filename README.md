# Creator Negotiation Workflow

Backend service that automates creator-brand negotiation for affiliate marketing campaigns. Receives a creator message, classifies intent and conversation stage, applies business rules, and returns a structured decision with a draft response.

## Architecture

Express REST API backed by MongoDB. The core workflow is a linear pipeline of LLM agents followed by a deterministic business rules engine. State is persisted across turns via a Conversation document.

HTTP -> Controller -> WorkflowService -> Agents -> BusinessRules -> ResponseAgent -> MongoDB

Two MongoDB collections:

- Conversation: mutable, tracks current negotiation state across turns
- WorkflowRun: immutable audit log, one record per workflow execution

## Workflow

1. Load or create Conversation: if conversationId is provided, append the new message to the existing conversation; otherwise create a new one.
2. Build context: trim history to last 10 messages; attach rolling conversation summary.
3. Run analysis agents in sequence: Intent, Stage, Risk, Enthusiasm.
4. Apply business rules: pure function consuming agent outputs; returns action and requiresHumanApproval.
5. Generate draft reply: LLM-generated for most actions; hardcoded for HUMAN_REVIEW and SHIPPING_QUERY.
6. Generate conversation summary: 2-sentence summary for next-turn context.
7. Persist state: update Conversation, create WorkflowRun.
8. Return structured output.

## Project Structure

```
src/
  config/       # MongoDB + Ollama client
  controllers/  # HTTP request handling
  routes/       # Route definitions
  models/       # Mongoose schemas (Conversation, WorkflowRun)
  rules/        # Deterministic business rules engine
  services/
    agents/     # LLM agents (intent, stage, risk, enthusiasm, response, summarizer)
    context/    # Context builder
  utils/        # Budget extraction, LLM JSON wrapper, logger
```

## LLM Usage

| Agent | Why LLM |
|---|---|
| Intent | Classifies free-text creator messages into business-meaningful categories |
| Stage | Classifies overall conversation trajectory |
| Risk | Detects fraud signals, abusive tone, and unrealistic demands |
| Enthusiasm | Scores creator engagement, requires sentiment understanding |
| Response | Generates contextual, professional draft replies |
| Summarizer | Produces rolling 2-sentence business summaries for future context |

All agents run at temperature 0 for determinism. All agents return structured JSON via Ollama's `format: "json"` mode.

## Deterministic Business Logic

All decisions happen in `src/rules/businessRules.js`, a pure function with no LLM calls:

- confidence < 0.7 -> HUMAN_REVIEW
- riskLevel === "HIGH" -> HUMAN_REVIEW
- negotiationRounds >= 4 -> HUMAN_REVIEW (negotiation fatigue)
- intent === "REQUEST_INFORMATION" -> PROVIDE_INFORMATION
- requestedFee > maxBudget * 2 -> HUMAN_REVIEW
- intent === "DECLINE_COLLABORATION" -> CLOSE_CONVERSATION
- requestedFee > maxBudget -> COUNTER_OFFER
- Default -> APPROVE

## State Management

Conversation state is stored in MongoDB. Key fields on Conversation:

- messages[]: full message history (CREATOR / BRAND roles)
- currentStage: latest classified stage
- negotiationRounds: counter incremented each NEGOTIATING turn
- enthusiasmScore: latest creator enthusiasm score
- riskLevel: latest risk classification
- conversationSummary: rolling LLM-generated summary
- requiresHumanApproval: flag for human intervention
- workflowStatus: ACTIVE | WAITING_HUMAN | COMPLETED

Conversation history is trimmed to the last 10 messages before being passed to agents to control context size.

## API

`POST /api/workflows/process`

Request body:

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "I'd be interested, but I usually charge $300.",
  "conversationId": "<optional, omit for new conversation>"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "conversationId": "...",
    "currentStage": "NEGOTIATING",
    "intent": "NEGOTIATE_COMPENSATION",
    "recommendedAction": "HUMAN_REVIEW",
    "requiresHumanApproval": true,
    "workflowStatus": "WAITING_HUMAN",
    "confidence": 0.98,
    "enthusiasmScore": 82,
    "riskLevel": "LOW",
    "negotiationFatigue": false,
    "conversationSummary": "...",
    "draftReply": "...",
    "reasoningSummary": "Requested fee exceeds twice the campaign budget."
  }
}
```

## Test Scenarios

Individual agent tests: `node test-intent.js`, `test-stage.js`, `test-risk.js`, etc.

Full workflow: `node test-workflow.js` (requires MongoDB and Ollama running locally).

## Setup

```bash
cp .env.example .env   # fill in MONGODB_URI and LLM_MODEL
npm install
npm run dev
```

Requires: Node 18+, MongoDB, Ollama with qwen2.5:3b (or set LLM_MODEL env var).

## Scaling Considerations

1,000 creators: Current architecture handles this without changes. Add indexes on workflowStatus and creator.name.

10,000 creators: Move agent execution to a job queue (BullMQ + Redis). HTTP endpoint enqueues the job and returns a job ID; client polls or receives a webhook. Run Ollama on a dedicated GPU instance. Parallelise the four analysis agents with Promise.all().

100,000 creators: Shard MongoDB or migrate to PostgreSQL. Replace Ollama with a hosted LLM API (Anthropic, OpenAI) for reliability and throughput. Introduce a proper orchestration layer (Temporal) for durable workflow execution with retry, timeout, and human task queues. Add a caching layer (Redis) for campaign data.