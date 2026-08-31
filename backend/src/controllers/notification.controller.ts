import { Request, Response } from "express";
import { Notification } from "../models/Notification.js";

export const getAdminNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({ userEmail: "admin@piyushtravels.com" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const markNotificationRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error: any) {
    console.error("Error marking notification read:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
