import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Booking } from "@/lib/server/models/Booking";
import { Vehicle } from "@/lib/server/models/Vehicle";
import { Notification } from "@/lib/server/models/Notification";
import sendEmail from "@/lib/server/utils/sendEmail";

const generateBookingId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PT-2026-${result}`;
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { vehicleId, pickupDetails, passengerDetails, driverPreference, totalAmount } = body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found" },
        { status: 404 }
      );
    }

    const bookingId = generateBookingId();

    const booking = await Booking.create({
      bookingId,
      vehicle: vehicleId,
      pickupDetails,
      passengerDetails,
      driverPreference: driverPreference || "chauffeur",
      totalAmount: totalAmount || vehicle.pricePerDay || 0,
      bookingStatus: "Requested",
      paymentStatus: "Pending",
    });

    // Notify Admin via Notification
    await Notification.create({
      userEmail: "admin@piyush-travels.com",
      title: "New Booking Request",
      message: `A new booking request (${bookingId}) has been received for ${vehicle.name}. Please review and provide a quote.`,
      type: "info",
      link: `/admin/bookings/${booking._id}`,
    });

    // Send email notification to Admin & Passenger
    try {
      await sendEmail({
        email: process.env.SMTP_EMAIL || "admin@piyush-travels.com",
        subject: `New Booking Request - ${bookingId}`,
        message: `You have received a new booking request for ${vehicle.name}. Passenger: ${passengerDetails.firstName} ${passengerDetails.lastName}.`,
      });
    } catch {
      // Ignore email errors in development
    }

    return NextResponse.json(
      {
        success: true,
        data: booking,
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
