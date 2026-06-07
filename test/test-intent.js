import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.GOOGLE_GENAI_API_KEY);

import intentAgent from "../src/services/agents/intentAgent.js";

const context = {
  creator: {
    name: "Sarah",
    platform: "TikTok",
    followers: 25000
  },

  campaign: {
    product: "Uno Card Game",
    commission: "30%",
    fixedFeeRange: "$0-$100",
    brief:
      "Creator should create a TikTok."
  },

  latestMessage:
    "I'd love to participate but I usually charge $300 for a TikTok video."
};

const result =
  await intentAgent(context);

console.log(result);