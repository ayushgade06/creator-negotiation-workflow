const extractRequestedFee = (message = "") => {
  const match = message.match(/\$?\s?(\d+)/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
};

export default extractRequestedFee;
