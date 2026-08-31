import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Booking } from "@/lib/server/models/Booking";
import { Vehicle } from "@/lib/server/models/Vehicle";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    // Ensure Vehicle model is registered
    if (!Vehicle) {
      console.log("Vehicle model init");
    }

    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const bookings = await Booking.find({ "passengerDetails.email": email })
      .populate("vehicle")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: bookings,
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
