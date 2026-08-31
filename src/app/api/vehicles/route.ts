import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { Vehicle } from "@/lib/server/models/Vehicle";
import { getAuthUser } from "@/lib/server/utils/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;

    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const brand = searchParams.get("brand");
    const fuelType = searchParams.get("fuelType");
    const transmission = searchParams.get("transmission");
    const ac = searchParams.get("ac");
    const driverIncluded = searchParams.get("driverIncluded");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minSeats = searchParams.get("minSeats");
    const minRating = searchParams.get("minRating");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "50";
    const sort = searchParams.get("sort") || "newest";

    const query: Record<string, unknown> = {};

    if (location) query.location = { $regex: location, $options: "i" };
    if (type) query.type = { $in: type.split(",") };
    if (brand) query.brand = { $in: brand.split(",") };
    if (fuelType) query.fuelType = { $in: fuelType.split(",") };
    if (transmission) query.transmission = { $in: transmission.split(",") };
    if (ac !== null && ac !== undefined) query.ac = ac === "true";
    if (driverIncluded !== null && driverIncluded !== undefined)
      query.driverIncluded = driverIncluded === "true";

    if (minPrice || maxPrice) {
      const priceFilter: Record<string, number> = {};
      if (minPrice) priceFilter.$gte = Number(minPrice);
      if (maxPrice) priceFilter.$lte = Number(maxPrice);
      query.pricePerDay = priceFilter;
    }

    if (minSeats) query.seats = { $gte: Number(minSeats) };
    if (minRating) query.rating = { $gte: Number(minRating) };

    let sortObj: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === "priceAsc") sortObj = { pricePerDay: 1 };
    if (sort === "priceDesc") sortObj = { pricePerDay: -1 };
    if (sort === "rating") sortObj = { rating: -1 };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const vehicles = await Vehicle.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);
    const total = await Vehicle.countDocuments(query);

    return NextResponse.json({
      success: true,
      count: vehicles.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: vehicles,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const authUser = getAuthUser(req);
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin authorization required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const vehicle = await Vehicle.create(body);

    return NextResponse.json(
      {
        success: true,
        data: vehicle,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
