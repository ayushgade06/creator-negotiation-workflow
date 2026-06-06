import extractBudget from "./src/utils/extractBudget.js";
import extractRequestedFee from "./src/utils/extractRequestedFee.js";

console.log(
  "Budget:",
  extractBudget("$0-$100")
);

console.log(
  "Requested Fee:",
  extractRequestedFee(
    "I usually charge $300 for a TikTok video."
  )
);