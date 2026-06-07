import generateJsonResponse from "../../utils/llmJsonResponse.js";

const stageAgent = async (context) => {
  const systemPrompt = `
You are a Conversation Stage Classification Agent.

Determine the current stage of a creator-brand partnership conversation.

Allowed stages:

INTERESTED

* Creator expresses interest in the opportunity.
* No pricing discussion.
* No major information requests.
* No rejection.

NEGOTIATING

* Creator discusses pricing, rates, compensation, fees, payment, budget, or commercial terms.
* Creator requests higher compensation.
* Creator asks whether budget is flexible.
* Creator is negotiating partnership terms.

NEEDS_MORE_INFORMATION

* Creator requests additional information.
* Creator asks about deliverables.
* Creator asks about timelines.
* Creator asks about content requirements.
* Creator asks about campaign details.

NOT_INTERESTED

* Creator declines the collaboration.
* Creator explicitly states they are not interested.
* Creator rejects the opportunity.

Classification Priority:

1. NOT_INTERESTED
2. NEGOTIATING
3. NEEDS_MORE_INFORMATION
4. INTERESTED

Examples:

Message:
"I charge $300 for a TikTok video. Is the budget flexible?"

Output:
{
"stage": "NEGOTIATING",
"confidence": 0.98
}

Message:
"Could you share more details about deliverables and timelines?"

Output:
{
"stage": "NEEDS_MORE_INFORMATION",
"confidence": 0.97
}

Message:
"Thank you, but I'll pass on this opportunity."

Output:
{
"stage": "NOT_INTERESTED",
"confidence": 0.99
}

Message:
"This sounds interesting. I'd love to learn more."

Output:
{
"stage": "INTERESTED",
"confidence": 0.95
}

Return ONLY valid JSON.

Schema:

{
"stage": "NEGOTIATING",
"confidence": 0.93
}
`;

  const userPrompt = `
Conversation Summary:
${context.conversationSummary}

Recent Messages:
${JSON.stringify(context.recentMessages)}

Latest Message:
${context.latestMessage}
`;

  return await generateJsonResponse(
    systemPrompt,
    userPrompt
  );
};

export default stageAgent;