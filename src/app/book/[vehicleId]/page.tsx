"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import BookingWizard from "@/components/booking/BookingWizard";
import { Vehicle } from "@/types/vehicle";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, AlertCircle } from "lucide-react";

export default function BookVehiclePage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params?.vehicleId as string;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) return;

    let isMounted = true;

    const loadVehicle = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetchAPI(`/vehicles/${vehicleId}`);
        const data = res.data || res;
        if (isMounted) {
          if (data && (data._id || data.name)) {
            setVehicle(data);
          } else {
            setError("Vehicle not found in fleet");
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Failed to load vehicle for booking:", err);
          setError(err.message || "Failed to load vehicle details.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadVehicle();

    return () => {
      isMounted = false;
    };
  }, [vehicleId]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-indigo-500/30 text-zinc-900 dark:text-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
              <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
                Loading vehicle booking details...
              </p>
            </div>
          ) : error || !vehicle ? (
            <div className="py-20 text-center bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto shadow-sm">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                Vehicle Unavailable
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
                {error || "The selected vehicle could not be loaded. It may have been updated or removed."}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => router.push("/vehicles")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Browse Fleet
                </Button>
              </div>
            </div>
          ) : (
            <BookingWizard vehicle={vehicle} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
