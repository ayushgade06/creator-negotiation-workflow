import express from "express";

import { runWorkflow } from "../controllers/workflowController.js";

const router = express.Router();

router.post("/process", runWorkflow);

export default router;
