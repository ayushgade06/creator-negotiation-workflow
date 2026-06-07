import { buildContext } from "./context/contextBuilder.js";

import intentAgent from "./agents/intentAgent.js";
import stageAgent from "./agents/stageAgent.js";
import riskAgent from "./agents/riskAgent.js";
import enthusiasmAgent from "./agents/enthusiasmAgent.js";
import responseAgent from "./agents/responseAgent.js";
import summarizerAgent from "./agents/summarizerAgent.js";

import extractBudget from "../utils/extractBudget.js";
import logger from "../utils/logger.js";

import evaluateBusinessRules from "../rules/businessRules.js";

import Conversation from "../models/conversation.model.js";
import WorkflowRun from "../models/workflow-run.model.js";

const processWorkflow = async (payload) => {
  try {
    logger.info("Workflow execution started", {
      creator: payload.creator?.name,
    });

    let conversation = null;

    logger.info("Loading conversation");

    if (payload.conversationId) {
      conversation = await Conversation.findById(payload.conversationId);

      if (!conversation) {
        throw new Error("Conversation not found");
      }

      conversation.messages.push({
        role: "CREATOR",
        content: payload.latestMessage,
      });

      logger.info("Existing conversation loaded");
    }

    if (!conversation) {
      logger.info("Creating new conversation");

      conversation = await Conversation.create({
        creator: payload.creator,

        campaign: payload.campaign,

        messages: [
          {
            role: "CREATOR",
            content: payload.latestMessage,
          },
        ],
      });

      logger.info("Conversation created", {
        id: conversation._id,
      });
    }

    logger.info("Building context");

    const context = buildContext({
      creator: conversation.creator,

      campaign: conversation.campaign,

      conversationHistory: conversation.messages,

      conversationSummary: conversation.conversationSummary,

      latestMessage: payload.latestMessage,
    });

    logger.info("Context built");

    // ==========================
    // AGENTS
    // ==========================

    logger.info("Starting Intent Agent");

    const intentResult = await intentAgent(context);

    logger.info("Intent Agent completed", intentResult);

    logger.info("Starting Stage Agent");

    const stageResult = await stageAgent(context);

    logger.info("Stage Agent completed", stageResult);

    logger.info("Starting Risk Agent");

    const riskResult = await riskAgent(context);

    logger.info("Risk Agent completed", riskResult);

    logger.info("Starting Enthusiasm Agent");

    const enthusiasmResult = await enthusiasmAgent(context);

    logger.info("Enthusiasm Agent completed", enthusiasmResult);

    // ==========================
    // RULES
    // ==========================

    logger.info("Applying business rules");

    const maxBudget = extractBudget(conversation.campaign.fixedFeeRange);

    const decision = evaluateBusinessRules({
      intent: intentResult.intent,

      requestedFee: intentResult.requestedFee,

      maxBudget,

      confidence: intentResult.confidence,

      negotiationRounds: conversation.negotiationRounds,

      riskLevel: riskResult.riskLevel,
    });

    logger.info("Business rules completed", decision);

    // response agent is only needed if we're not waiting for human approval
    logger.info("Generating response");

    let responseResult;

    if (decision.action === "HUMAN_REVIEW") {
      logger.info("Using deterministic human review response");

      responseResult = {
        draftReply: `
Thanks for sharing your rates and your interest in this campaign.

Your compensation request has been forwarded to our partnerships team for internal review.

We'll review the details and follow up with next steps as soon as possible.

Thank you for your patience.
`.trim(),
      };
    } else {
      responseResult = await responseAgent({
        creator: conversation.creator,

        campaign: conversation.campaign,

        latestMessage: payload.latestMessage,

        intent: intentResult.intent,

        stage: stageResult.stage,

        decision,
      });
    }

    logger.info("Response generated");

    
    // summarizer agent is always run to keep the conversation summary up to date
    logger.info("Generating summary");

    const summaryResult = await summarizerAgent({
      latestMessage: payload.latestMessage,

      intent: intentResult.intent,

      stage: stageResult.stage,

      decision,
    });

    logger.info("Summary generated");

    // negotiation fatigue is determined by the number of rounds in negotiation stage
    if (stageResult.stage === "NEGOTIATING") {
      conversation.negotiationRounds += 1;
    }

    conversation.currentStage = stageResult.stage;

    conversation.lastIntent = intentResult.intent;

    conversation.enthusiasmScore = enthusiasmResult.enthusiasmScore;

    conversation.riskLevel = riskResult.riskLevel;

    conversation.conversationSummary = summaryResult.conversationSummary;

    conversation.requiresHumanApproval = decision.requiresHumanApproval;

    conversation.workflowStatus = decision.requiresHumanApproval
      ? "WAITING_HUMAN"
      : "ACTIVE";

    logger.info("Saving conversation");

    await conversation.save();

    logger.info("Conversation saved");

    // audit log for workflow run
    logger.info("Creating workflow audit");

    await WorkflowRun.create({
      conversationId: conversation._id,

      intent: intentResult.intent,

      stage: stageResult.stage,

      riskLevel: riskResult.riskLevel,

      enthusiasmScore: enthusiasmResult.enthusiasmScore,

      action: decision.action,

      confidence: intentResult.confidence,

      requiresHumanApproval: decision.requiresHumanApproval,

      reasoningSummary: decision.reasoning,
    });

    logger.info("Workflow audit created");

    logger.info("Workflow execution completed", {
      conversationId: conversation._id,

      action: decision.action,
    });

    return {
      conversationId: conversation._id,

      currentStage: stageResult.stage,

      intent: intentResult.intent,

      recommendedAction: decision.action,

      requiresHumanApproval: decision.requiresHumanApproval,

      workflowStatus: conversation.workflowStatus,

      confidence: intentResult.confidence,

      enthusiasmScore: enthusiasmResult.enthusiasmScore,

      riskLevel: riskResult.riskLevel,

      negotiationFatigue: conversation.negotiationRounds >= 4,

      conversationSummary: summaryResult.conversationSummary,

      draftReply: responseResult.draftReply,

      reasoningSummary: decision.reasoning,
    };
  } catch (error) {
    logger.error("Workflow execution failed", error);

    throw error;
  }
};

export default processWorkflow;
