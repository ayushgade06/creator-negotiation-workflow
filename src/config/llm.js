import ollama from "ollama";

export const MODEL =
  process.env.LLM_MODEL ||
  "qwen2.5:7b";

export default ollama;