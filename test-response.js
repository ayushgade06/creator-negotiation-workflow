import dotenv from "dotenv";

dotenv.config();

import responseAgent from "./src/services/agents/responseAgent.js";

const result =
  await responseAgent({
    creator: {
      name: "Sarah"
    },

    campaign: {
      product: "Uno Card Game",
      commission: "30%",
      fixedFeeRange: "$0-$100"
    },

    intent: "NEGOTIATE_COMPENSATION",

    stage: "NEGOTIATING",

    decision: {
      action: "COUNTER_OFFER"
    }
  });

console.log(result);