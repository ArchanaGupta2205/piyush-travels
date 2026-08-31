import { Request, Response } from "express";
import { SupportTicket } from "../models/SupportTicket.js";

export const createSupportTicket = async (req: Request, res: Response) => {
  try {
    const { name, bookingId, message } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ success: false, message: "Name and message are required" });
    }

    const ticket = await SupportTicket.create({
      user: (req as any).user.id,
      name,
      bookingId,
      message
    });

    res.status(201).json({
      success: true,
      data: ticket,
      message: "Support ticket created successfully"
    });
  } catch (error) {
    console.error("Error creating support ticket:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
