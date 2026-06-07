import evaluateBusinessRules from "../src/rules/businessRules.js";

const result =
  evaluateBusinessRules({
    requestedFee: 300,
    maxBudget: 100,
    confidence: 0.98,
    negotiationRounds: 1,
    riskLevel: "LOW"
  });

console.log(result);