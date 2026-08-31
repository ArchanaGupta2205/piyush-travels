import mongoose from "mongoose";
import dotenv from "dotenv";
import { Vehicle } from "../models/Vehicle.js";

dotenv.config();

const vehicles = [
  {
    name: "Swift Dzire",
    brand: "Maruti Suzuki",
    type: "Sedan",
    ratePerHour: 180,
    ratePerKm: 18,
    minHours: 10,
    priceOnRequest: false,
    seats: 4,
    fuelType: "Petrol",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    rating: 4.5,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?q=80&w=2070&auto=format&fit=crop"]
  },
  {
    name: "Toyota Innova",
    brand: "Toyota",
    type: "SUV",
    ratePerHour: 250,
    ratePerKm: 25,
    minHours: 10,
    priceOnRequest: false,
    seats: 7,
    fuelType: "Diesel",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    rating: 4.6,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop"]
  },
  {
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    type: "SUV",
    ratePerHour: 300,
    ratePerKm: 30,
    minHours: 10,
    priceOnRequest: false,
    seats: 7,
    fuelType: "Diesel",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    rating: 4.8,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop"]
  },
  {
    name: "Toyota Innova Hycross",
    brand: "Toyota",
    type: "SUV",
    ratePerHour: 600,
    ratePerKm: 60,
    minHours: 10,
    priceOnRequest: false,
    seats: 7,
    fuelType: "Hybrid",
    transmission: "Automatic",
    ac: true,
    driverIncluded: true,
    rating: 4.9,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop"]
  },
  {
    name: "Honda City",
    brand: "Honda",
    type: "Sedan",
    ratePerHour: 600,
    ratePerKm: 60,
    minHours: 10,
    priceOnRequest: false,
    seats: 4,
    fuelType: "Petrol",
    transmission: "Automatic",
    ac: true,
    driverIncluded: true,
    rating: 4.7,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?q=80&w=2070&auto=format&fit=crop"]
  },
  {
    name: "Toyota Fortuner",
    brand: "Toyota",
    type: "SUV",
    priceOnRequest: true,
    seats: 7,
    fuelType: "Diesel",
    transmission: "Automatic",
    ac: true,
    driverIncluded: true,
    rating: 4.8,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop"]
  },
  {
    name: "BMW 7 Series",
    brand: "BMW",
    type: "Luxury",
    ratePerHour: 1500,
    ratePerKm: 150,
    minHours: 10,
    priceOnRequest: false,
    seats: 4,
    fuelType: "Petrol",
    transmission: "Automatic",
    ac: true,
    driverIncluded: true,
    rating: 5.0,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop"]
  },
  {
    name: "Mercedes-Benz S-Class",
    brand: "Mercedes",
    type: "Luxury",
    ratePerHour: 1500,
    ratePerKm: 150,
    minHours: 10,
    priceOnRequest: false,
    seats: 4,
    fuelType: "Petrol",
    transmission: "Automatic",
    ac: true,
    driverIncluded: true,
    rating: 5.0,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop"]
  },
  {
    name: "Audi Convertible",
    brand: "Audi",
    type: "Luxury",
    priceOnRequest: true,
    seats: 2,
    fuelType: "Petrol",
    transmission: "Automatic",
    ac: true,
    driverIncluded: true,
    rating: 4.9,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop"]
  },
  // Buses and Vans
  {
    name: "10 Seater Urbania",
    brand: "Force",
    type: "Van",
    priceOnRequest: true,
    seats: 10,
    fuelType: "Diesel",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    rating: 4.5,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"]
  },
  {
    name: "15 Seater Urbania",
    brand: "Force",
    type: "Van",
    priceOnRequest: true,
    seats: 15,
    fuelType: "Diesel",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    rating: 4.6,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"]
  },
  {
    name: "15 Seater Minibus",
    brand: "Force",
    type: "Minibus",
    priceOnRequest: true,
    seats: 15,
    fuelType: "Diesel",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    rating: 4.3,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"]
  },
  {
    name: "17 Seater Minibus",
    brand: "Force",
    type: "Minibus",
    priceOnRequest: true,
    seats: 17,
    fuelType: "Diesel",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    rating: 4.4,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"]
  },
  {
    name: "28 Seater Bus",
    brand: "Tata",
    type: "Bus",
    priceOnRequest: true,
    seats: 28,
    fuelType: "Diesel",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    rating: 4.2,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop"]
  },
  {
    name: "30 Seater Bus",
    brand: "Ashok Leyland",
    type: "Bus",
    priceOnRequest: true,
    seats: 30,
    fuelType: "Diesel",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    rating: 4.3,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop"]
  },
  {
    name: "40 Seater Bus",
    brand: "Ashok Leyland",
    type: "Bus",
    priceOnRequest: true,
    seats: 40,
    fuelType: "Diesel",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    rating: 4.5,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop"]
  },
  {
    name: "50 Seater Bus",
    brand: "Volvo",
    type: "Luxury Bus",
    priceOnRequest: true,
    seats: 50,
    fuelType: "Diesel",
    transmission: "Automatic",
    ac: true,
    driverIncluded: true,
    rating: 4.8,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop"]
  },
  {
    name: "54 Seater Bus",
    brand: "Volvo",
    type: "Luxury Bus",
    priceOnRequest: true,
    seats: 54,
    fuelType: "Diesel",
    transmission: "Automatic",
    ac: true,
    driverIncluded: true,
    rating: 4.8,
    location: "Delhi NCR",
    images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop"]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB Connected...");

    await Vehicle.deleteMany();
    console.log("Old vehicles cleared.");

    await Vehicle.insertMany(vehicles);
    console.log("New vehicles added!");

    process.exit(0);
  } catch (error) {
    console.error("Error with data import:", error);
    process.exit(1);
  }
};

seedDB();
