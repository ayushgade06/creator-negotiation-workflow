import generateJsonResponse from "../../utils/geminiJsonResponse.js";

const intentAgent = async (context) => {
  const systemPrompt = `
You are an Intent Classification Agent.

Your task is to analyze a creator's latest message.

Classify into one of:

INTERESTED
NEGOTIATE_COMPENSATION
REQUEST_INFORMATION
DECLINE_COLLABORATION
SHIPPING_QUERY
CONTENT_REQUIREMENT
OTHER

Return JSON only.

Schema:

{
  "intent": "STRING",
  "confidence": 0.95,
  "requestedFee": 300
}

requestedFee should be null if not mentioned.
confidence should be between 0 and 1.
`;

  const userPrompt = `
Creator Information:
${JSON.stringify(context.creator)}

Campaign Information:
${JSON.stringify(context.campaign)}

Latest Message:
${context.latestMessage}
`;

  return await generateJsonResponse(
    systemPrompt,
    userPrompt
  );
};

export default intentAgent;