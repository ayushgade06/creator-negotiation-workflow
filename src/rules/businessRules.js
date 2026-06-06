const evaluateBusinessRules = ({
  requestedFee,
  maxBudget,
  confidence,
  negotiationRounds,
  riskLevel
}) => {
  const result = {
    action: null,
    requiresHumanApproval: false,
    reasoning: ""
  };

  // intent classification confidence check
  if (confidence < 0.7) {
    result.action = "HUMAN_REVIEW";
    result.requiresHumanApproval = true;
    result.reasoning =
      "Intent confidence below threshold.";

    return result;
  }

  // risk level check
  if (riskLevel === "HIGH") {
    result.action = "HUMAN_REVIEW";
    result.requiresHumanApproval = true;
    result.reasoning =
      "High risk creator response detected.";

    return result;
  }

  // negotiation fatigue check
  if (negotiationRounds >= 4) {
    result.action = "HUMAN_REVIEW";
    result.requiresHumanApproval = true;
    result.reasoning =
      "Negotiation fatigue detected.";

    return result;
  }

  // fee exceeds twice the budget check
  if (
    requestedFee &&
    requestedFee > maxBudget * 2
  ) {
    result.action = "HUMAN_REVIEW";
    result.requiresHumanApproval = true;
    result.reasoning =
      "Requested fee exceeds twice the campaign budget.";

    return result;
  }

  // fee within budget check
  if (
    requestedFee &&
    requestedFee > maxBudget
  ) {
    result.action = "COUNTER_OFFER";
    result.reasoning =
      "Requested fee exceeds campaign budget.";

    return result;
  }

  result.action = "APPROVE";

  result.reasoning =
    "Creator request falls within campaign budget.";

  return result;
};

export default evaluateBusinessRules;