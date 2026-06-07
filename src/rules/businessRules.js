// deterministic business rules to evaluate requests

const evaluateBusinessRules = ({
  intent,
  requestedFee,
  maxBudget,
  confidence,
  negotiationRounds,
  riskLevel,
}) => {
  const result = {
    action: null,
    requiresHumanApproval: false,
    reasoning: "",
  };

  // Low confidence
  if (confidence < 0.7) {
    result.action = "HUMAN_REVIEW";
    result.requiresHumanApproval = true;
    result.reasoning = "Intent confidence below threshold.";

    return result;
  }

  // High risk
  if (riskLevel === "HIGH") {
    result.action = "HUMAN_REVIEW";
    result.requiresHumanApproval = true;
    result.reasoning = "High risk creator response detected.";

    return result;
  }

  // Negotiation fatigue
  if (negotiationRounds >= 4) {
    result.action = "HUMAN_REVIEW";
    result.requiresHumanApproval = true;
    result.reasoning = "Negotiation fatigue detected.";

    return result;
  }

  // Information request handling
  if (intent === "REQUEST_INFORMATION") {
    result.action = "PROVIDE_INFORMATION";
    result.reasoning = "Creator requested additional campaign information.";

    return result;
  }

  // Fee exceeds 2x budget
  if (requestedFee && requestedFee > maxBudget * 2) {
    result.action = "HUMAN_REVIEW";
    result.requiresHumanApproval = true;
    result.reasoning = "Requested fee exceeds twice the campaign budget.";

    return result;
  }

  // Creator declined collaboration
  if (intent === "DECLINE_COLLABORATION") {
    result.action = "CLOSE_CONVERSATION";

    result.reasoning = "Creator declined collaboration opportunity.";

    return result;
  }

  // Fee exceeds budget
  if (requestedFee && requestedFee > maxBudget) {
    result.action = "COUNTER_OFFER";
    result.reasoning = "Requested fee exceeds campaign budget.";

    return result;
  }

  result.action = "APPROVE";
  result.reasoning = "Creator request falls within campaign budget.";

  return result;
};

export default evaluateBusinessRules;
