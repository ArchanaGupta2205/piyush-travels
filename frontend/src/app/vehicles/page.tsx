import VehicleListing from "@/components/vehicles/VehicleListing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Fleet & Rates | Sedans, SUVs, Tempo Travellers & Buses",
  description:
    "Browse Piyush Travels' luxury rental fleet. Compare rates for Mercedes-Benz, BMW, Audi, Innova Hycross, 12-26 Seater Luxury Tempo Travellers, and 45-Seater Volvo Coaches. Instant online booking.",
  keywords: [
    "luxury cars for rent delhi",
    "tempo traveller booking online",
    "volvo bus hire rates",
    "innova hycross per km rate",
    "mercedes wedding rental delhi",
  ],
  alternates: {
    canonical: "/vehicles",
  },
  openGraph: {
    title: "Luxury Fleet & Rates | Piyush Travels",
    description:
      "Browse our premium selection of luxury cars, SUVs, tempo travellers, and buses for your next journey.",
    url: "/vehicles",
  },
};

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Premium Fleet</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Choose from our meticulously maintained selection of vehicles. Whether you need a luxury car for a business meeting or a spacious SUV for a family trip, we have you covered.
          </p>
        </div>

        {/* Listing Component */}
        <VehicleListing />
        
      </div>
    </main>
  );
}
