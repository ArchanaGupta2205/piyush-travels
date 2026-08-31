import express from "express";
import { getAdminNotifications, markNotificationRead } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/admin", getAdminNotifications);
router.put("/:id/read", markNotificationRead);

export default router;
