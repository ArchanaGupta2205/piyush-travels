"use client";

import { X, MapPin, Users, Fuel, Cog, Wind, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Vehicle } from "@/types/vehicle";
import { Button } from "@/components/ui/button";
import ImageSlider from "./ImageSlider";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface QuickViewModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ vehicle, isOpen, onClose }: QuickViewModalProps) {
  const { user } = useAuth();
  const router = useRouter();

  if (!vehicle) return null;

  const handleBook = () => {
    if (user) {
      router.push(`/book/${vehicle._id}`);
      onClose(); // Optional: close the modal
    } else {
      router.push(`/login?redirect=${encodeURIComponent('/book/' + vehicle._id)}`);
      onClose(); // Optional: close the modal
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] flex flex-col md:flex-row text-zinc-900 dark:text-white"
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/80 dark:bg-black/50 p-2 text-zinc-700 dark:text-white hover:bg-white dark:hover:bg-black/80 shadow-md transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left side: Images */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto min-h-[400px] bg-zinc-100 dark:bg-zinc-800">
              <ImageSlider images={vehicle.images} alt={vehicle.name} />
            </div>

            {/* Right side: Details */}
            <div className="w-full md:w-1/2 p-8 overflow-y-auto">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
                <Star size={16} fill="currentColor" />
                <span className="font-semibold">{vehicle.rating}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{vehicle.name}</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-6">{vehicle.brand} • {vehicle.type}</p>
              
              <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">
                <span className="text-2xl font-normal text-zinc-500 dark:text-zinc-400">Price on request</span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <Users size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Seats</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-200">{vehicle.seats} Persons</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <Cog size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Transmission</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-200">{vehicle.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <Fuel size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Fuel Type</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-200">{vehicle.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <Wind size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">AC/Heating</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-200">{vehicle.ac ? "Available" : "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 col-span-2">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <MapPin size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Location</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-200">{vehicle.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={handleBook} className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25">
                  Book This Vehicle
                </Button>
                {vehicle.driverIncluded && (
                  <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                    * Professional driver included in the price
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
