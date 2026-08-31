import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Booking } from "@/lib/server/models/Booking";
import Razorpay from "razorpay";

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await connectDB();
    const booking = await Booking.findById(params.id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.bookingStatus !== "Quoted" && booking.bookingStatus !== "Requested") {
      return NextResponse.json(
        { success: false, message: "Booking is not in a payable state" },
        { status: 400 }
      );
    }

    if (!booking.totalAmount) {
      return NextResponse.json(
        { success: false, message: "Booking total amount is missing" },
        { status: 400 }
      );
    }

    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder",
    });

    const options = {
      amount: Math.round(booking.totalAmount * 100),
      currency: "INR",
      receipt: booking.bookingId,
    };

    const order = await rzp.orders.create(options);

    booking.razorpayOrderId = order.id;
    await booking.save();

    return NextResponse.json({
      success: true,
      razorpayOrder: order,
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
