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
    if (!Vehicle) {
      console.log("Vehicle init");
    }

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate("vehicle", "name brand");

    const formattedBookings = bookings.map((b: any) => ({
      id: b.bookingId || b._id?.toString(),
      dbId: b._id,
      customer: b.passengerDetails
        ? `${b.passengerDetails.firstName || ""} ${b.passengerDetails.lastName || ""}`.trim() || "Guest"
        : "Guest",
      vehicle: b.vehicle ? `${b.vehicle.brand || ""} ${b.vehicle.name || ""}`.trim() : "Unknown Vehicle",
      status: b.bookingStatus || "Requested",
      paymentStatus: b.paymentStatus || "Pending",
      date: b.createdAt ? new Date(b.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    }));

    return NextResponse.json({
      success: true,
      data: formattedBookings,
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
