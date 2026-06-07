import generateJsonResponse from "../../utils/llmJsonResponse.js";

const summarizerAgent = async ({ latestMessage, intent, stage, decision }) => {
  const systemPrompt = `
You are a conversation summarization agent.

Generate a concise business-focused summary for future workflow context.

Requirements:

- Maximum 2 sentences.
- Mention important creator requests.
- Mention pricing if discussed.
- Mention current workflow stage.
- Mention business decision when relevant.
- Be factual and concise.
- Avoid generic phrases like "the user indicated interest."

Examples:

Input:
Creator interested and requested $150.
Stage: NEGOTIATING
Decision: COUNTER_OFFER

Output:
"Creator expressed interest in the campaign and requested $150 for a TikTok video. The conversation is currently in compensation negotiation and a counter-offer is recommended."

Input:
Creator requested $300.
Stage: NEGOTIATING
Decision: HUMAN_REVIEW

Output:
"Creator requested $300 for campaign participation, exceeding the current budget range. The conversation is in negotiation and has been escalated for human review."

Return ONLY valid JSON.

Schema:

{
  "conversationSummary": "string"
}
`;

  const userPrompt = `
Latest Message:
${latestMessage}

Intent:
${intent}

Stage:
${stage}

Decision:
${decision.action}
`;

  return await generateJsonResponse(systemPrompt, userPrompt);
};

export default summarizerAgent;
