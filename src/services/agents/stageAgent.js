import generateJsonResponse from "../../utils/geminiJsonResponse.js";

const stageAgent = async (context) => {
  const systemPrompt = `
You are a Conversation Stage Classification Agent.

Determine the current stage.

Allowed values:

INTERESTED
NEGOTIATING
NEEDS_MORE_INFORMATION
NOT_INTERESTED

Return JSON only.

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