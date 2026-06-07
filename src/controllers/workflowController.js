import processWorkflow from "../services/workflowService.js";

export const runWorkflow = async (req, res) => {
  try {
    const result = await processWorkflow(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
