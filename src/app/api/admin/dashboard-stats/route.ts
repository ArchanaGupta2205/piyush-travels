import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Booking } from "@/lib/server/models/Booking";
import { Vehicle } from "@/lib/server/models/Vehicle";
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
    const totalVehicles = await Vehicle.countDocuments();
    const activeBookings = await Booking.countDocuments({ bookingStatus: "Confirmed" });
    const pendingRequests = await Booking.countDocuments({ paymentStatus: "Pending" });

    const bookings = await Booking.find({ paymentStatus: "Completed" });
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    // Calculate real month-over-month revenue trend
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const thisMonthCompleted = await Booking.find({
      paymentStatus: "Completed",
      createdAt: { $gte: currentMonthStart },
    });
    const thisMonthRevenue = thisMonthCompleted.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const lastMonthCompleted = await Booking.find({
      paymentStatus: "Completed",
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd },
    });
    const lastMonthRevenue = lastMonthCompleted.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    let revenueTrend: number | null = null;
    if (lastMonthRevenue > 0) {
      revenueTrend = Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 * 10) / 10;
    } else if (thisMonthRevenue > 0) {
      revenueTrend = 100;
    }

    return NextResponse.json({
      success: true,
      data: {
        revenue: totalRevenue,
        totalVehicles,
        activeBookings,
        pendingRequests,
        revenueTrend,
      },
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
