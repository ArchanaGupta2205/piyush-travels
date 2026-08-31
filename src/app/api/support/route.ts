import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { SupportTicket } from "@/lib/server/models/SupportTicket";
import { Notification } from "@/lib/server/models/Notification";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, bookingId, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { success: false, message: "Please provide your name and message" },
        { status: 400 }
      );
    }

    const ticket = await SupportTicket.create({
      name,
      bookingId,
      message,
    });

    await Notification.create({
      userEmail: "admin@piyush-travels.com",
      title: "New Support Ticket",
      message: `Support message from ${name}: "${message.substring(0, 50)}..."`,
      type: "info",
    });

    return NextResponse.json(
      {
        success: true,
        data: ticket,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
