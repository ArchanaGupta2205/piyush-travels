import mongoose, { Document, Schema, Model } from "mongoose";

export interface ISupportTicket extends Document {
  user?: mongoose.Schema.Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
  bookingId?: string;
  message: string;
  status: "Open" | "In Progress" | "Closed";
  createdAt: Date;
  updatedAt: Date;
}

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    bookingId: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Please provide a message"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

export const SupportTicket: Model<ISupportTicket> =
  (mongoose.models.SupportTicket as Model<ISupportTicket>) ||
  mongoose.model<ISupportTicket>("SupportTicket", SupportTicketSchema);
