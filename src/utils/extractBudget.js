const extractBudget = (fixedFeeRange) => {
  if (!fixedFeeRange) return 0;

  const matches = fixedFeeRange.match(/\d+/g);

  if (!matches || !matches.length) {
    return 0;
  }

  return Number(matches[matches.length - 1]);
};

export default extractBudget;
