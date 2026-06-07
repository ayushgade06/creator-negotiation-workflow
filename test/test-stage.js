import dotenv from "dotenv";

dotenv.config();

import stageAgent from "../src/services/agents/stageAgent.js";

const context = {
  conversationSummary: "",

  recentMessages: [],

  latestMessage:
    "I'd love to work together but my normal rate is $300."
};

const result =
  await stageAgent(context);

console.log(result);