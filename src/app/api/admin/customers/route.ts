import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { User } from "@/lib/server/models/User";

export async function GET() {
  try {
    await connectDB();
    const customers = await User.find({ role: "customer" })
      .sort({ createdAt: -1 })
      .select("-password");

    return NextResponse.json({
      success: true,
      data: customers,
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
