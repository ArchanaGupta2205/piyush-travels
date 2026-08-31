import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import Razorpay from "razorpay";
import { Booking } from "../models/Booking.js";
import { Vehicle } from "../models/Vehicle.js";
import { Notification } from "../models/Notification.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// Generate a random booking ID like PT-2026-XXXX
const generateBookingId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PT-2026-${result}`;
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      vehicleId,
      pickupDetails,
      passengerDetails,
      driverPreference,
    } = req.body;

    // Validate vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    const bookingId = generateBookingId();

    const booking = await Booking.create({
      bookingId,
      vehicle: vehicleId,
      pickupDetails,
      passengerDetails,
      driverPreference,
      bookingStatus: "Requested",
      paymentStatus: "Pending", 
    });

    // Notify Admin via In-App Notification
    await Notification.create({
      userEmail: "admin@piyushtravels.com", // Assuming this is the admin email
      title: "New Booking Request",
      message: `A new booking request (${bookingId}) has been received for ${vehicle.name}. Please review and provide a quote.`,
      type: "info",
      link: `/admin/bookings/${booking._id}`,
    });

    // Notify Admin via Email
    try {
      await sendEmail({
        email: process.env.SMTP_EMAIL || "admin@piyushtravels.com", // Admin receives this
        subject: `New Booking Request - ${bookingId}`,
        message: `You have received a new booking request for ${vehicle.name}. Passenger: ${passengerDetails.firstName} ${passengerDetails.lastName}. Log in to the admin dashboard to quote a price.`,
      });
    } catch (err) {
      console.log("Failed to send admin email notification", err);
    }

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("vehicle");
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    // Assuming the user's email is passed in the query or body for now.
    // In a real app, you would use req.user.email from JWT authentication middleware.
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const bookings = await Booking.find({ "passengerDetails.email": email })
      .populate("vehicle")
      .sort("-createdAt");
      
    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    console.error("Error fetching my bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const generatePaymentOrder = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.bookingStatus !== "Quoted") {
      return res.status(400).json({ success: false, message: "Booking has not been quoted yet" });
    }

    if (!booking.totalAmount) {
      return res.status(400).json({ success: false, message: "Booking total amount is missing" });
    }

    // Initialize Razorpay
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder",
    });

    // Create Order in Razorpay
    const options = {
      amount: Math.round(booking.totalAmount * 100), // Amount in paise, must be integer
      currency: "INR",
      receipt: booking.bookingId,
    };

    const order = await rzp.orders.create(options);

    booking.razorpayOrderId = order.id;
    await booking.save();

    res.status(200).json({
      success: true,
      razorpayOrder: order,
    });
  } catch (error: any) {
    console.error("Error generating payment order:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      return res.status(400).json({ success: false, message: "Missing required payment fields" });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder";

    // Verify signature
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // Payment is verified, update booking
    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.bookingStatus = "Confirmed";
    booking.paymentStatus = "Completed";
    booking.razorpayPaymentId = razorpay_payment_id;
    await booking.save();

    // Send confirmation email
    try {
      await sendEmail({
        email: booking.passengerDetails.email,
        subject: `Booking Confirmed - ${booking.bookingId}`,
        message: `Your payment was successful and your booking (${booking.bookingId}) is confirmed!`,
      });
    } catch (err) {
      console.log("Failed to send confirmation email", err);
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const downloadInvoice = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("vehicle");
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const vehicle: any = booking.vehicle; // populated

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Invoice-${booking.bookingId}.pdf`
    );

    doc.pipe(res);

    // Header
    doc
      .fontSize(20)
      .text("PIYUSH TRAVELS", { align: "center" })
      .moveDown(0.5);
    doc.fontSize(10).text("Premium Vehicle Rentals", { align: "center" });
    doc.moveDown(2);

    // Invoice Title
    doc.fontSize(16).text("BOOKING INVOICE", { underline: true });
    doc.moveDown();

    // Booking Details
    doc.fontSize(12).text(`Booking ID: ${booking.bookingId}`);
    doc.text(`Date: ${new Date(booking.createdAt).toLocaleDateString()}`);
    doc.text(`Status: ${booking.paymentStatus}`);
    doc.moveDown();

    // Customer Details
    doc.text(`Customer Name: ${booking.passengerDetails.firstName} ${booking.passengerDetails.lastName}`);
    doc.text(`Email: ${booking.passengerDetails.email}`);
    doc.text(`Phone: ${booking.passengerDetails.phone}`);
    doc.moveDown();

    // Trip Details
    doc.text("Trip Details", { underline: true });
    doc.text(`Vehicle: ${vehicle.brand} ${vehicle.name}`);
    doc.text(`Pickup: ${booking.pickupDetails.pickupLocation} on ${new Date(booking.pickupDetails.pickupDate).toLocaleString()}`);
    doc.text(`Dropoff: ${booking.pickupDetails.dropoffLocation} on ${new Date(booking.pickupDetails.returnDate).toLocaleString()}`);
    doc.text(`Driver Preference: ${booking.driverPreference === "chauffeur" ? "Chauffeur Included" : "Self-Drive"}`);
    doc.moveDown();

    // Total
    doc.fontSize(16).text(`Total Amount Paid: INR ${booking.totalAmount.toLocaleString()}`, { align: "right" });

    // Footer
    doc.moveDown(4);
    doc.fontSize(10).text("Thank you for choosing Piyush Travels!", { align: "center", textcolor: "grey" });

    doc.end();
  } catch (error: any) {
    console.error("Error generating invoice:", error);
    res.status(500).json({ success: false, message: "Error generating invoice" });
  }
};
