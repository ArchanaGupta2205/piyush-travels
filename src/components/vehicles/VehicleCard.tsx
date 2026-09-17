"use client";

import { useState } from "react";
import { MapPin, Users, Fuel, Cog } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Vehicle } from "@/types/vehicle";
import { Button } from "@/components/ui/button";
import ImageSlider from "./ImageSlider";

interface VehicleCardProps {
  vehicle: Vehicle;
  onQuickView: (vehicle: Vehicle) => void;
}

export default function VehicleCard({
  vehicle,
  onQuickView,
}: VehicleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group flex flex-col bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm transition-all hover:border-purple-300 dark:hover:border-zinc-700 shadow-md shadow-zinc-200/50 dark:shadow-none hover:shadow-xl dark:hover:shadow-purple-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <ImageSlider images={vehicle.images} alt={vehicle.name} />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {vehicle.rating >= 4.5 && (
            <span className="px-3 py-1 bg-purple-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-sm">
              Top Rated
            </span>
          )}
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full shadow-sm">
            {vehicle.type}
          </span>
        </div>

        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/30 dark:bg-black/40 z-0 flex items-center justify-center pointer-events-none"
        >
          <Button
            onClick={() => onQuickView(vehicle)}
            variant="secondary"
            className="pointer-events-auto bg-white/95 text-zinc-900 hover:bg-white rounded-full px-6 shadow-xl transform transition-transform hover:scale-105 font-medium"
          >
            Quick View
          </Button>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 line-clamp-1">{vehicle.name}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">{vehicle.brand}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="inline-block px-3 py-1 bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30 text-xs font-bold rounded-full">
              Price on Request
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 text-sm">
            <Users size={16} className="text-purple-600 dark:text-purple-400" />
            <span>{vehicle.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 text-sm">
            <Cog size={16} className="text-purple-600 dark:text-purple-400" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 text-sm">
            <Fuel size={16} className="text-purple-600 dark:text-purple-400" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 text-sm">
            <MapPin size={16} className="text-purple-600 dark:text-purple-400" />
            <span className="truncate">{vehicle.location}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Link href={`/vehicles/${vehicle._id}`} className="block w-full">
            <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-xl font-semibold shadow-sm transition-colors">
              View Details & Book
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
