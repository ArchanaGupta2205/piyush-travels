import { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
  });
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount, currency, receipt } = req.body;

    if (!amount || amount < 100) {
      res.status(400).json({ success: false, message: "Minimum amount is 100 paise" });
      return;
    }

    const razorpay = getRazorpayInstance();

    const options = {
      amount,
      currency: currency || "INR",
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Razorpay Error (Create Order):", error);
    res.status(500).json({ success: false, message: error?.message || "Internal Server Error" });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({ success: false, message: "Missing required fields" });
      return;
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Signature mismatch" });
    }
  } catch (error: any) {
    console.error("Razorpay Error (Verify Payment):", error);
    res.status(500).json({ success: false, message: error?.message || "Internal Server Error" });
  }
};
