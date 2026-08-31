import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  userEmail: string; // The user who should receive the notification (or "admin" for admin notifications)
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "alert";
  isRead: boolean;
  link?: string; // Optional link to redirect when clicked
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userEmail: { type: String, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["info", "success", "warning", "alert"],
      default: "info",
    },
    isRead: { type: Boolean, default: false },
    link: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model<INotification>("Notification", notificationSchema);
