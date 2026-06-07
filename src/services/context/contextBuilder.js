export const buildContext = ({
  creator,
  campaign,
  conversationHistory = [],
  conversationSummary = "",
  latestMessage,
}) => {
  return {
    creator,

    campaign,

    conversationSummary,

    recentMessages: conversationHistory.slice(-10),

    latestMessage,
  };
};
