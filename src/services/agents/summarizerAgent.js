import generateJsonResponse from "../../utils/geminiJsonResponse.js";

const summarizerAgent = async ({
  latestMessage,
  intent,
  stage,
  decision
}) => {
  const systemPrompt = `
You are a conversation summarization agent.

Generate a short business-focused summary.

Maximum 2 sentences.

Return JSON only.

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

  return await generateJsonResponse(
    systemPrompt,
    userPrompt
  );
};

export default summarizerAgent;