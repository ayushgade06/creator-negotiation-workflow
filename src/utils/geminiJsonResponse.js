import ai from "../config/gemini.js";

const generateJsonResponse = async (
  systemPrompt,
  userPrompt
) => {
  try {
    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
${systemPrompt}

${userPrompt}

IMPORTANT:
Return ONLY valid JSON.
Do not use markdown.
Do not wrap inside code blocks.
`
      });

    const text = response.text.trim();

    return JSON.parse(text);
  } catch (error) {
    throw new Error(
      `Gemini JSON generation failed: ${error.message}`
    );
  }
};

export default generateJsonResponse;