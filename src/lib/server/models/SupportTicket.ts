import mongoose, { Document, Schema, Model } from "mongoose";

export interface ISupportTicket extends Document {
  user?: mongoose.Schema.Types.ObjectId;
  name: string;
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
    },
    bookingId: {
      type: String,
    },
    message: {
      type: String,
      required: [true, "Please provide a message"],
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
