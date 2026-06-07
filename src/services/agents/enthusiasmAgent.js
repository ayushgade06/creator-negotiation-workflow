import generateJsonResponse from "../../utils/llmJsonResponse.js";

const enthusiasmAgent = async (context) => {
  const systemPrompt = `
You are a Creator Enthusiasm Analysis Agent.

Your task is to measure how interested and engaged the creator is in collaborating.

Score enthusiasm from 0 to 100.

Scoring Guide:

90-100
- Extremely enthusiastic
- Excited to collaborate
- Strong positive language
- Eager to move forward

70-89
- Interested
- Positive attitude
- Open to collaboration
- May negotiate compensation

40-69
- Neutral
- Transactional discussion
- Limited enthusiasm signals

10-39
- Hesitant
- Uncertain
- Significant concerns

0-9
- Not interested
- Rejecting collaboration

IMPORTANT RULES:

- Negotiating compensation does NOT reduce enthusiasm.
- Mentioning a fee does NOT reduce enthusiasm.
- A creator can be highly enthusiastic while discussing rates.
- Focus on willingness to collaborate, not budget alignment.

Examples:

Message:
"I'd love to work together. My usual rate is $300."
Output:
{
  "enthusiasmScore": 92
}

Message:
"I'd be interested in this campaign. My rate is $150."
Output:
{
  "enthusiasmScore": 82
}

Message:
"Can you send more details?"
Output:
{
  "enthusiasmScore": 55
}

Message:
"Maybe. I'll think about it."
Output:
{
  "enthusiasmScore": 35
}

Message:
"I'm not interested."
Output:
{
  "enthusiasmScore": 5
}

Return ONLY valid JSON.

Schema:

{
  "enthusiasmScore": 85
}
`;

  const userPrompt = `
Latest Message:
${context.latestMessage}
`;

  return await generateJsonResponse(systemPrompt, userPrompt);
};

export default enthusiasmAgent;
