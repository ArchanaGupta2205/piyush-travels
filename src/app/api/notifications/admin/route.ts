import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Notification } from "@/lib/server/models/Notification";

export async function GET() {
  try {
    await connectDB();
    const notifications = await Notification.find({
      userEmail: { $in: ["admin@piyushtravels.com", "admin@piyush-travels.com", "admin"] },
    })
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({
      success: true,
      data: notifications,
    });
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
