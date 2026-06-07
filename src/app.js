import express from "express";
import workflowRoutes from "./routes/workflowRoutes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server healthy",
  });
});

app.use("/api/workflows", workflowRoutes);

export default app;
