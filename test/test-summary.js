import dotenv from "dotenv";

dotenv.config();

import summarizerAgent from "../src/services/agents/summarizerAgent.js";

const result =
  await summarizerAgent({
    latestMessage:
      "I'd love to work together but I normally charge $300.",

    intent:
      "NEGOTIATE_COMPENSATION",

    stage:
      "NEGOTIATING",

    decision: {
      action: "COUNTER_OFFER"
    }
  });

console.log(result);