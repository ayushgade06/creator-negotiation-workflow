import dotenv from "dotenv";
dotenv.config();

import connectDB from "../src/config/db.js";
import processWorkflow from "../src/services/workflowService.js";

await connectDB();

const result = await processWorkflow({
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
      "Creator should make a short TikTok showing friends playing the card game."
  },

  latestMessage:
    "I'd be interested, but I usually charge $300 for a TikTok video."
});

console.log(
  JSON.stringify(result, null, 2)
);

process.exit();