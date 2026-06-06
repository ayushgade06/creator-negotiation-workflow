import ai from "../config/gemini.js";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateJsonResponse = async (
  systemPrompt,
  userPrompt,
  retries = 3
) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
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

      return JSON.parse(response.text.trim());
    } catch (error) {
      const message = error.message || "";

      const isRetryable =
        message.includes("503") ||
        message.includes("UNAVAILABLE") ||
        message.includes("high demand");

      if (!isRetryable || attempt === retries) {
        throw new Error(
          `Gemini JSON generation failed: ${message}`
        );
      }

      await sleep(1000 * attempt);
    }
  }
};

export default generateJsonResponse;