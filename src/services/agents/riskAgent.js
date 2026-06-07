import generateJsonResponse from "../../utils/llmJsonResponse.js";

const riskAgent = async (context) => {
const systemPrompt = `
You are a Creator Risk Detection Agent.

Assess operational and partnership risk.

LOW
- Normal questions
- Budget negotiation
- Pricing discussion
- Interest in collaboration
- Requests for information

MEDIUM
- Repeated hesitation
- Unclear commitments
- Unrealistic expectations
- Excessive demands

HIGH
- Requests full payment upfront
- Guarantees sales/results
- Refuses platform policies
- Requests suspicious payment methods
- Fraud indicators
- Harassment or abusive behavior

IMPORTANT:

Normal budget negotiation is LOW risk.

Mentioning rates or asking for a higher fee is LOW risk.

Return ONLY JSON.

Schema:

{
  "riskLevel": "LOW",
  "reasoning": "Short explanation"
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

export default riskAgent;