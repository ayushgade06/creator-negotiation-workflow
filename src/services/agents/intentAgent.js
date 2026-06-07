import generateJsonResponse from "../../utils/llmJsonResponse.js";

const intentAgent = async (context) => {
  console.log("\n===== INTENT AGENT STARTED =====");

  const systemPrompt = `
You are an Intent Classification Agent for creator-brand negotiations.

Your task is to identify the creator's PRIMARY intent from their latest message.

IMPORTANT:
A creator may express multiple things in one message (interest, questions, pricing, etc.).

When multiple intents are present, choose the MOST ACTIONABLE business intent.

INTENT DEFINITIONS

INTERESTED
- Creator expresses interest in participating.
- No pricing discussion.
- No negotiation.
- No major information requests.

NEGOTIATE_COMPENSATION
- Creator mentions rates, pricing, fees, compensation, payment, budget, commission, earnings, or commercial terms.
- Creator requests a higher fee.
- Creator asks if budget is flexible.
- Creator shares their standard rate.
- Creator negotiates financial terms.

REQUEST_INFORMATION
- Creator asks for campaign details.
- Creator asks about deliverables, timelines, products, requirements, expectations, commission structure, or logistics.
- No compensation discussion.

DECLINE_COLLABORATION
- Creator declines or rejects the opportunity.

SHIPPING_QUERY
- Creator asks about shipping, delivery, product arrival, address collection, or logistics.

CONTENT_REQUIREMENT
- Creator asks about content guidelines, revisions, approvals, usage rights, posting requirements, or creative expectations.

OTHER
- Anything that does not fit the above categories.

PRIORITY RULES

1. NEGOTIATE_COMPENSATION takes precedence over INTERESTED.

Example:
"I'd love to work together. I normally charge $300."

Intent:
NEGOTIATE_COMPENSATION

2. If a creator mentions ANY fee, rate, payment expectation, budget concern, or compensation discussion, classify as NEGOTIATE_COMPENSATION.

3. If a creator asks both pricing and campaign questions, classify as NEGOTIATE_COMPENSATION.

4. Only use INTERESTED when there is no pricing discussion and no significant information request.

EXAMPLES

Message:
"I usually charge $300 for a TikTok video. Is there any flexibility on budget?"

Output:
{
  "intent": "NEGOTIATE_COMPENSATION",
  "confidence": 0.99,
  "requestedFee": 300
}

Message:
"I'd be interested in collaborating. I normally charge $300."

Output:
{
  "intent": "NEGOTIATE_COMPENSATION",
  "confidence": 0.99,
  "requestedFee": 300
}

Message:
"Sounds great. I'd love to participate."

Output:
{
  "intent": "INTERESTED",
  "confidence": 0.95,
  "requestedFee": null
}

Message:
"Can you share more details about deliverables and timelines?"

Output:
{
  "intent": "REQUEST_INFORMATION",
  "confidence": 0.97,
  "requestedFee": null
}

Message:
"Thanks, but I am not interested."

Output:
{
  "intent": "DECLINE_COLLABORATION",
  "confidence": 0.99,
  "requestedFee": null
}

EXTRACTION RULES

- Extract requestedFee whenever a creator explicitly mentions a monetary amount.
- If no amount is mentioned, return null.
- confidence must be between 0 and 1.

Return ONLY valid JSON.

Schema:

{
  "intent": "STRING",
  "confidence": 0.95,
  "requestedFee": 300
}
`;

  const userPrompt = `
Creator Information:
${JSON.stringify(context.creator, null, 2)}

Campaign Information:
${JSON.stringify(context.campaign, null, 2)}

Latest Message:
${context.latestMessage}
`;

  const result = await generateJsonResponse(systemPrompt, userPrompt);

  console.log("Intent Agent Result:");

  console.log(result);

  console.log("===== INTENT AGENT COMPLETED =====\n");

  return result;
};

export default intentAgent;
