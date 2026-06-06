import generateJsonResponse from "../../utils/geminiJsonResponse.js";

const responseAgent = async ({
  creator,
  campaign,
  intent,
  stage,
  decision
}) => {
  const systemPrompt = `
You are a creator partnership manager.

Generate a professional, friendly and concise response.

Consider:

- Creator intent
- Conversation stage
- Recommended action
- Campaign details

Return JSON only.

Schema:

{
  "draftReply": "string"
}
`;

  const userPrompt = `
Creator:
${JSON.stringify(creator)}

Campaign:
${JSON.stringify(campaign)}

Intent:
${intent}

Stage:
${stage}

Recommended Action:
${decision.action}
`;

  return await generateJsonResponse(
    systemPrompt,
    userPrompt
  );
};

export default responseAgent;