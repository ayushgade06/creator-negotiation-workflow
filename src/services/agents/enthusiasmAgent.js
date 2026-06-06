import generateJsonResponse from "../../utils/geminiJsonResponse.js";

const enthusiasmAgent = async (context) => {
  const systemPrompt = `
You are a Creator Enthusiasm Analysis Agent.

Score enthusiasm from 0 to 100.

Guidelines:

0-20
Not interested

21-50
Neutral

51-80
Interested

81-100
Highly enthusiastic

Return JSON only.

Schema:

{
  "enthusiasmScore": 88
}
`;
  
  const userPrompt = `
Latest Message:
${context.latestMessage}
`;

  return await generateJsonResponse(
    systemPrompt,
    userPrompt
  );
};

export default enthusiasmAgent;