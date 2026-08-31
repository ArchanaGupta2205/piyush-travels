import { fetchAPI } from "@/lib/api";
import BookingWizard from "@/components/booking/BookingWizard";
import { notFound } from "next/navigation";
import { Vehicle } from "@/types/vehicle";

export const metadata = {
  title: "Book Vehicle | Piyush Travels",
};

interface PageProps {
  params: Promise<{ vehicleId: string }>;
}

export default async function BookVehiclePage({ params }: PageProps) {
  const { vehicleId } = await params;
  let vehicle: Vehicle;
  try {
    const res = await fetchAPI(`/vehicles/${vehicleId}`);
    vehicle = res.data;
  } catch (error) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingWizard vehicle={vehicle} />
      </div>
    </main>
  );
}
