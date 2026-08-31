import express from "express";
import {
  getDashboardStats,
  getRecentBookings,
  getRevenueChartData,
  getAllBookings,
  updateBookingQuote,
  getAllCustomers
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard-stats", getDashboardStats);
router.get("/recent-bookings", getRecentBookings);
router.get("/revenue-chart", getRevenueChartData);

router.get("/bookings", getAllBookings);
router.put("/bookings/:id/quote", updateBookingQuote);

router.get("/customers", getAllCustomers);

export default router;
