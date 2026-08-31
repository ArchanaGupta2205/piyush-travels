import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Booking } from "@/lib/server/models/Booking";
import sendEmail from "@/lib/server/utils/sendEmail";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } =
      await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      return NextResponse.json(
        { success: false, message: "Missing required payment fields" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder";

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    booking.bookingStatus = "Confirmed";
    booking.paymentStatus = "Completed";
    booking.razorpayPaymentId = razorpay_payment_id;
    booking.razorpaySignature = razorpay_signature;
    await booking.save();

    try {
      await sendEmail({
        email: booking.passengerDetails.email,
        subject: `Booking Confirmed - ${booking.bookingId}`,
        message: `Your payment was successful and your booking (${booking.bookingId}) is confirmed!`,
      });
    } catch {
      // Ignore mail errors
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
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
