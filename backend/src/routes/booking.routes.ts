import express from "express";
import {
  createBooking,
  getBooking,
  getMyBookings,
  downloadInvoice,
  generatePaymentOrder,
  verifyPayment
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/my-bookings", getMyBookings);
router.post("/:id/generate-payment", generatePaymentOrder);
router.post("/verify-payment", verifyPayment);
router.get("/:id", getBooking);
router.get("/:id/invoice", downloadInvoice);

export default router;
