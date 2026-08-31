import { Request, Response } from "express";
import { Booking } from "../models/Booking.js";
import { Vehicle } from "../models/Vehicle.js";
import { User } from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const activeBookings = await Booking.countDocuments({ bookingStatus: "Confirmed" });
    const pendingRequests = await Booking.countDocuments({ paymentStatus: "Pending" });
    
    // Calculate total revenue
    const bookings = await Booking.find({ paymentStatus: "Completed" });
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

    res.status(200).json({
      success: true,
      data: {
        revenue: totalRevenue,
        totalVehicles,
        activeBookings,
        pendingRequests
      }
    });
  } catch (error: any) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getRecentBookings = async (req: Request, res: Response) => {
  try {
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("vehicle", "name brand");

    const formattedBookings = recentBookings.map((b: any) => ({
      id: b.bookingId,
      customer: `${b.passengerDetails.firstName} ${b.passengerDetails.lastName}`,
      vehicle: b.vehicle ? `${b.vehicle.brand} ${b.vehicle.name}` : "Unknown Vehicle",
      status: b.bookingStatus,
      date: new Date(b.createdAt).toISOString().split("T")[0]
    }));

    res.status(200).json({
      success: true,
      data: formattedBookings
    });
  } catch (error: any) {
    console.error("Error fetching recent bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getRevenueChartData = async (req: Request, res: Response) => {
  try {
    // For now, returning mocked chronological data since DB might not have enough history
    // In a real scenario, we would use MongoDB aggregate to group by month
    const mockData = [
      { name: 'Jan', revenue: 4000, bookings: 24 },
      { name: 'Feb', revenue: 3000, bookings: 13 },
      { name: 'Mar', revenue: 5000, bookings: 38 },
      { name: 'Apr', revenue: 4500, bookings: 29 },
      { name: 'May', revenue: 6000, bookings: 48 },
      { name: 'Jun', revenue: 5500, bookings: 38 },
      { name: 'Jul', revenue: 7000, bookings: 55 },
    ];
    
    res.status(200).json({
      success: true,
      data: mockData
    });
  } catch (error: any) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
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
      date: new Date(b.createdAt).toISOString().split("T")[0]
    }));

    res.status(200).json({
      success: true,
      data: formattedBookings
    });
  } catch (error: any) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBookingQuote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { totalAmount } = req.body;

    if (!totalAmount) {
      return res.status(400).json({ success: false, message: "Total amount is required" });
    }

    const booking = await Booking.findById(id).populate("vehicle");
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.totalAmount = totalAmount;
    booking.bookingStatus = "Quoted";
    
    await booking.save();

    // Send email to customer
    try {
      await sendEmail({
        email: booking.passengerDetails.email,
        subject: `Your Quote is Ready - ${booking.bookingId}`,
        message: `Great news! The quote for your booking request (${booking.bookingId}) is ready. The total amount is INR ${totalAmount.toLocaleString()}. Please log in to your dashboard to complete the payment and confirm your booking.`,
      });
    } catch (err) {
      console.error("Failed to send quote email to customer", err);
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error: any) {
    console.error("Error updating booking quote:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await User.find({ role: "customer" }).sort("-createdAt").select("-password");
    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error: any) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
