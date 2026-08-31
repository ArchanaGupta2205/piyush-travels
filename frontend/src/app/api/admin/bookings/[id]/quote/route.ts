import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Booking } from "@/lib/server/models/Booking";
import sendEmail from "@/lib/server/utils/sendEmail";

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await connectDB();
    const { totalAmount } = await req.json();

    if (!totalAmount) {
      return NextResponse.json(
        { success: false, message: "Total amount is required" },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(params.id).populate("vehicle");
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    booking.totalAmount = totalAmount;
    booking.bookingStatus = "Quoted";
    await booking.save();

    try {
      await sendEmail({
        email: booking.passengerDetails.email,
        subject: `Your Quote is Ready - ${booking.bookingId}`,
        message: `Great news! The quote for your booking request (${booking.bookingId}) is ready. Total amount: INR ${totalAmount.toLocaleString()}. Log in to your dashboard to complete the payment.`,
      });
    } catch {
      // Ignore mail errors
    }

    return NextResponse.json({
      success: true,
      data: booking,
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
