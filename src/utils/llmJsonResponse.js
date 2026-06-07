import ai, { MODEL } from "../config/llm.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateJsonResponse = async (systemPrompt, userPrompt, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`\n========== LLM ATTEMPT ${attempt} ==========`);

      console.log("Model:", MODEL);

      const start = Date.now();

      const response = await ai.chat({
        model: MODEL,

        format: "json",

        options: {
          temperature: 0,
          num_predict: 300,
        },

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
      });

      console.log("LLM Response Time:", Date.now() - start, "ms");

      const raw = response.message.content;

      console.log("\n===== RAW MODEL OUTPUT =====");

      console.log(raw);

      console.log("============================\n");

      const parsed = JSON.parse(raw);

      console.log("JSON Parsed Successfully");

      return parsed;
    } catch (error) {
      console.error("LLM Error:", error.message);

      const message = error.message || "";

      const isRetryable =
        message.includes("timeout") ||
        message.includes("ECONNREFUSED") ||
        message.includes("connection") ||
        message.includes("network");

      if (!isRetryable || attempt === retries) {
        throw new Error(`LLM JSON generation failed: ${message}`);
      }

      console.log(`Retrying in ${attempt * 1000}ms...`);

      await sleep(1000 * attempt);
    }
  }
};

export default generateJsonResponse;
