import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Booking } from "@/lib/server/models/Booking";
import { Vehicle } from "@/lib/server/models/Vehicle";

export async function GET() {
  try {
    await connectDB();
    const totalVehicles = await Vehicle.countDocuments();
    const activeBookings = await Booking.countDocuments({ bookingStatus: "Confirmed" });
    const pendingRequests = await Booking.countDocuments({ paymentStatus: "Pending" });

    const bookings = await Booking.find({ paymentStatus: "Completed" });
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    return NextResponse.json({
      success: true,
      data: {
        revenue: totalRevenue,
        totalVehicles,
        activeBookings,
        pendingRequests,
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
