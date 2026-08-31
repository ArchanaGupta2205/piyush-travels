import mongoose, { Document, Schema, Model } from "mongoose";

export interface IVehicle extends Document {
  name: string;
  brand: string;
  type: string;
  ratePerHour?: number;
  ratePerKm?: number;
  minHours?: number;
  pricePerDay?: number;
  priceOnRequest: boolean;
  seats: number;
  fuelType: string;
  transmission: string;
  ac: boolean;
  driverIncluded: boolean;
  rating: number;
  location: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    type: {
      type: String,
      enum: ["Car", "Sedan", "SUV", "Minibus", "Luxury", "Luxury Bus", "Bus", "Van"],
      required: true,
    },
    ratePerHour: { type: Number },
    ratePerKm: { type: Number },
    minHours: { type: Number },
    pricePerDay: { type: Number },
    priceOnRequest: { type: Boolean, default: false },
    seats: { type: Number, required: true },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },
    ac: { type: Boolean, required: true, default: true },
    driverIncluded: { type: Boolean, required: true, default: true },
    rating: { type: Number, default: 4.5 },
    location: { type: String, required: true },
    images: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Vehicle: Model<IVehicle> =
  (mongoose.models.Vehicle as Model<IVehicle>) ||
  mongoose.model<IVehicle>("Vehicle", vehicleSchema);
