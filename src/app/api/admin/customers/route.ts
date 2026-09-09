import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { User } from "@/lib/server/models/User";
import { getAuthUser } from "@/lib/server/utils/auth";

export async function GET(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }
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
