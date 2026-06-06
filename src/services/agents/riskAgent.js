import generateJsonResponse from "../../utils/geminiJsonResponse.js";

const riskAgent = async (context) => {
  const systemPrompt = `
You are a Creator Risk Detection Agent.

Analyze the creator's message.

Determine risk level:

LOW
MEDIUM
HIGH

Examples:

LOW:
- Normal discussion
- Budget negotiation
- Questions

MEDIUM:
- Unclear commitments
- Hesitation
- Unusual requirements

HIGH:
- Demands payment upfront
- Guarantees sales
- Refuses drafts or approvals
- Requests suspicious arrangements

Return JSON only.

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