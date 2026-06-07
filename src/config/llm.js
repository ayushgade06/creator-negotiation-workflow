import dotenv from "dotenv";
import ollama from "ollama";

dotenv.config();

export const MODEL = process.env.LLM_MODEL || "qwen2.5:3b";

export default ollama;
