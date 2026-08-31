import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mockData = [
      { name: "Jan", revenue: 40000, bookings: 24 },
      { name: "Feb", revenue: 35000, bookings: 19 },
      { name: "Mar", revenue: 58000, bookings: 38 },
      { name: "Apr", revenue: 49000, bookings: 29 },
      { name: "May", revenue: 72000, bookings: 48 },
      { name: "Jun", revenue: 65000, bookings: 42 },
      { name: "Jul", revenue: 89000, bookings: 55 },
    ];

    return NextResponse.json({
      success: true,
      data: mockData,
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
