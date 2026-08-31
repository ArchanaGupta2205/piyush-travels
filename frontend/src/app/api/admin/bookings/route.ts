import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Booking } from "@/lib/server/models/Booking";
import { Vehicle } from "@/lib/server/models/Vehicle";

export async function GET() {
  try {
    await connectDB();
    if (!Vehicle) {
      console.log("Vehicle init");
    }

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate("vehicle", "name brand");

    const formattedBookings = bookings.map((b: any) => ({
      id: b.bookingId,
      dbId: b._id,
      customer: `${b.passengerDetails.firstName} ${b.passengerDetails.lastName}`,
      vehicle: b.vehicle ? `${b.vehicle.brand} ${b.vehicle.name}` : "Unknown Vehicle",
      status: b.bookingStatus,
      paymentStatus: b.paymentStatus,
      date: new Date(b.createdAt).toISOString().split("T")[0],
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
