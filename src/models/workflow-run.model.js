import mongoose from "mongoose";

const workflowRunSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    intent: {
      type: String,
      required: true,
    },

    stage: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },

    reasoningSummary: {
      type: String,
      required: true,
    },

    riskLevel: {
      type: String,
    },

    enthusiasmScore: {
      type: Number,
    },

    requiresHumanApproval: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

workflowRunSchema.index({
  conversationId: 1,
  createdAt: -1,
});

export default mongoose.model("WorkflowRun", workflowRunSchema);
