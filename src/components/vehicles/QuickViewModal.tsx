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
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left side: Images */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto min-h-[400px]">
              <ImageSlider images={vehicle.images} alt={vehicle.name} />
            </div>

            {/* Right side: Details */}
            <div className="w-full md:w-1/2 p-8 overflow-y-auto">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Star size={16} fill="currentColor" />
                <span className="font-semibold">{vehicle.rating}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">{vehicle.name}</h2>
              <p className="text-zinc-400 text-lg mb-6">{vehicle.brand} • {vehicle.type}</p>
              
              <div className="text-4xl font-bold text-white mb-8">
                <span className="text-2xl font-normal text-zinc-500">Price on request</span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="p-2 bg-zinc-800 rounded-lg">
                    <Users size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Seats</p>
                    <p className="font-medium">{vehicle.seats} Persons</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="p-2 bg-zinc-800 rounded-lg">
                    <Cog size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Transmission</p>
                    <p className="font-medium">{vehicle.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="p-2 bg-zinc-800 rounded-lg">
                    <Fuel size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Fuel Type</p>
                    <p className="font-medium">{vehicle.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="p-2 bg-zinc-800 rounded-lg">
                    <Wind size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">AC/Heating</p>
                    <p className="font-medium">{vehicle.ac ? "Available" : "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zinc-300 col-span-2">
                  <div className="p-2 bg-zinc-800 rounded-lg">
                    <MapPin size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Location</p>
                    <p className="font-medium">{vehicle.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={handleBook} className="w-full py-6 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl">
                  Book This Vehicle
                </Button>
                {vehicle.driverIncluded && (
                  <p className="text-center text-sm text-zinc-400">
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
