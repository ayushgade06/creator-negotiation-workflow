import dotenv from "dotenv";

dotenv.config();

import enthusiasmAgent from "../src/services/agents/enthusiasmAgent.js";

const context = {
  latestMessage:
    "This campaign sounds amazing! I'd love to participate."
};

const result =
  await enthusiasmAgent(context);

console.log(result);