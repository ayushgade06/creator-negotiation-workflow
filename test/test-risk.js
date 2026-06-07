import dotenv from "dotenv";

dotenv.config();

import riskAgent from "../src/services/agents/riskAgent.js";

const context = {
  latestMessage:
    "I require full payment upfront before I create any content."
};

const result =
  await riskAgent(context);

console.log(result);