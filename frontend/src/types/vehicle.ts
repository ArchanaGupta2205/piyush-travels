export interface Vehicle {
  _id: string;
  name: string;
  brand: string;
  type: "Car" | "Sedan" | "SUV" | "Minibus" | "Luxury" | "Luxury Bus" | "Bus" | "Van";
  ratePerHour?: number;
  ratePerKm?: number;
  minHours?: number;
  pricePerDay?: number;
  priceOnRequest?: boolean;
  seats: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  ac: boolean;
  driverIncluded: boolean;
  rating: number;
  location: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}
