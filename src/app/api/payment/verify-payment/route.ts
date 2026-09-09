import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
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

    let updatedBooking = null;
    try {
      const { connectDB } = await import("@/lib/server/db");
      const { Booking } = await import("@/lib/server/models/Booking");
      const sendEmail = (await import("@/lib/server/utils/sendEmail")).default;

      await connectDB();
      const body = await req.clone().json();
      const query = body.bookingId
        ? { bookingId: body.bookingId }
        : { razorpayOrderId: razorpay_order_id };

      const booking = await Booking.findOne(query);
      if (booking) {
        booking.bookingStatus = "Confirmed";
        booking.paymentStatus = "Completed";
        booking.razorpayPaymentId = razorpay_payment_id;
        booking.razorpaySignature = razorpay_signature;
        await booking.save();
        updatedBooking = booking;

        try {
          await sendEmail({
            email: booking.passengerDetails.email,
            subject: `Booking Confirmed - ${booking.bookingId}`,
            message: `Your payment was successful and your booking (${booking.bookingId}) is confirmed!`,
          });
        } catch {
          // ignore email error
        }
      }
    } catch {
      // Continue if db update is optional
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      booking: updatedBooking,
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
