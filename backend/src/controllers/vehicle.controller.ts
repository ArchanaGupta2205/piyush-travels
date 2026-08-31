import { Request, Response } from "express";
import { Vehicle } from "../models/Vehicle.js";

// @desc    Get all vehicles with filtering and pagination
// @route   GET /api/vehicles
// @access  Public
export const getVehicles = async (req: Request, res: Response) => {
  try {
    const {
      location,
      type,
      brand,
      fuelType,
      transmission,
      ac,
      driverIncluded,
      minPrice,
      maxPrice,
      minSeats,
      minRating,
      page = "1",
      limit = "10",
      sort = "newest",
    } = req.query;

    const query: any = {};

    // Filters
    if (location) query.location = { $regex: location, $options: "i" };
    if (type) query.type = { $in: (type as string).split(",") };
    if (brand) query.brand = { $in: (brand as string).split(",") };
    if (fuelType) query.fuelType = { $in: (fuelType as string).split(",") };
    if (transmission) query.transmission = { $in: (transmission as string).split(",") };
    if (ac !== undefined) query.ac = ac === "true";
    if (driverIncluded !== undefined) query.driverIncluded = driverIncluded === "true";
    
    // Numeric filters
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }
    if (minSeats) query.seats = { $gte: Number(minSeats) };
    if (minRating) query.rating = { $gte: Number(minRating) };

    // Sorting
    let sortObj: any = { createdAt: -1 };
    if (sort === "priceAsc") sortObj = { pricePerDay: 1 };
    if (sort === "priceDesc") sortObj = { pricePerDay: -1 };
    if (sort === "rating") sortObj = { rating: -1 };

    // Pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const vehicles = await Vehicle.find(query).sort(sortObj).skip(skip).limit(limitNum);
    const total = await Vehicle.countDocuments(query);

    res.status(200).json({
      success: true,
      count: vehicles.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: vehicles,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import mongoose from "mongoose";

// @desc    Get single vehicle by ID
// @route   GET /api/vehicles/:id
// @access  Public
export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }
    res.status(200).json({ success: true, data: vehicle });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a vehicle
// @route   POST /api/vehicles
// @access  Admin
export const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ success: true, data: vehicle });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Admin
export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    const vehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    res.status(200).json({ success: true, data: vehicle });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Admin
export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
