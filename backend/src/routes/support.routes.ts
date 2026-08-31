import express from "express";
import { createSupportTicket } from "../controllers/support.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createSupportTicket);

export default router;
