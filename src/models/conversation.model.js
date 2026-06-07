import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["CREATOR", "BRAND"],
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
    timestamps: true,
  },
);

const conversationSchema = new mongoose.Schema(
  {
    creator: {
      name: {
        type: String,
        required: true,
      },

      platform: {
        type: String,
        required: true,
      },

      followers: {
        type: Number,
        required: true,
      },
    },

    campaign: {
      product: {
        type: String,
        required: true,
      },

      commission: {
        type: String,
        required: true,
      },

      fixedFeeRange: {
        type: String,
        required: true,
      },

      brief: {
        type: String,
        required: true,
      },
    },

    messages: [messageSchema],

    currentStage: {
      type: String,
      enum: [
        "INTERESTED",
        "NEGOTIATING",
        "NEEDS_MORE_INFORMATION",
        "NOT_INTERESTED",
      ],
      default: "INTERESTED",
    },

    negotiationRounds: {
      type: Number,
      default: 0,
    },

    lastIntent: {
      type: String,
      default: null,
    },

    enthusiasmScore: {
      type: Number,
      default: 0,
    },

    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },

    conversationSummary: {
      type: String,
      default: "",
    },

    requiresHumanApproval: {
      type: Boolean,
      default: false,
    },

    workflowStatus: {
      type: String,
      enum: ["ACTIVE", "WAITING_HUMAN", "COMPLETED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Conversation", conversationSchema);
