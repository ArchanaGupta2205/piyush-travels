import mongoose, { Document, Schema } from "mongoose";
import crypto from "crypto";

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: "customer" | "admin";
  avatar?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  getResetPasswordToken: () => string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    avatar: {
      type: String,
      default: "default-avatar-url.jpg",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  return resetToken;
};

export const User = mongoose.model<IUser>("User", UserSchema);
