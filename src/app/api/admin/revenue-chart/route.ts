import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Booking } from "@/lib/server/models/Booking";
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

    const now = new Date();
    // Build past 6 calendar months in chronological order
    const months: {
      name: string;
      start: Date;
      end: Date;
    }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const name = d.toLocaleString("en-US", { month: "short" });
      const year = d.getFullYear();
      const month = d.getMonth();
      const start = new Date(year, month, 1, 0, 0, 0, 0);
      const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
      months.push({ name, start, end });
    }

    const sixMonthsAgo = months[0].start;

    // Only count genuine bookings that have completed payment
    const completedBookings = await Booking.find({
      paymentStatus: "Completed",
      createdAt: { $gte: sixMonthsAgo },
    }).select("totalAmount createdAt");

    const realChartData = months.map((m) => {
      const monthBookings = completedBookings.filter((b) => {
        const bDate = new Date(b.createdAt);
        return bDate >= m.start && bDate <= m.end;
      });

      const monthRevenue = monthBookings.reduce(
        (sum, b) => sum + (Number(b.totalAmount) || 0),
        0
      );

      return {
        name: m.name,
        revenue: monthRevenue,
        bookings: monthBookings.length,
      };
    });

    return NextResponse.json({
      success: true,
      data: realChartData,
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
