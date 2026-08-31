import mongoose, { Document, Schema, Model } from "mongoose";

export interface IBooking extends Document {
  bookingId: string;
  user?: mongoose.Types.ObjectId;
  vehicle: mongoose.Types.ObjectId;
  pickupDetails: {
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: Date;
    returnDate: Date;
  };
  passengerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  driverPreference: "self-drive" | "chauffeur";
  totalAmount?: number;
  paymentStatus: "Pending" | "Completed" | "Failed" | "Refunded";
  bookingStatus: "Requested" | "Quoted" | "Pending" | "Confirmed" | "Cancelled" | "Completed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    pickupDetails: {
      pickupLocation: { type: String, required: true },
      dropoffLocation: { type: String, required: true },
      pickupDate: { type: Date, required: true },
      returnDate: { type: Date, required: true },
    },
    passengerDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      specialRequests: { type: String },
    },
    driverPreference: {
      type: String,
      enum: ["self-drive", "chauffeur"],
      required: true,
    },
    totalAmount: { type: Number },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    bookingStatus: {
      type: String,
      enum: ["Requested", "Quoted", "Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Requested",
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) ||
  mongoose.model<IBooking>("Booking", BookingSchema);
