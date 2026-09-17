import { fetchAPI } from "@/lib/api";
import BookingWizard from "@/components/booking/BookingWizard";
import { notFound } from "next/navigation";
import { Vehicle } from "@/types/vehicle";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

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
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-indigo-500/30 text-zinc-900 dark:text-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingWizard vehicle={vehicle} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
