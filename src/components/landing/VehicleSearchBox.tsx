"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VehicleSearchBox() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1-4 (Car)");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (date) params.set("date", date);
    if (passengers) params.set("passengers", passengers);
    router.push(`/vehicles?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full max-w-5xl mx-auto z-20 text-left mt-6 sm:mt-8"
    >
      <form 
        onSubmit={handleSearch}
        className="bg-white/15 dark:bg-black/50 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-2 sm:p-3 rounded-2xl shadow-2xl shadow-black/30"
      >
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-5 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-center justify-between">
          
          {/* Location */}
          <div className="flex-1 w-full relative">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">
              Location
            </label>
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 focus-within:border-indigo-500 transition-colors">
              <MapPin className="text-indigo-500 shrink-0" size={20} />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or Airport (e.g. Delhi, Jaipur)" 
                className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white font-medium placeholder-gray-400 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-800"></div>

          {/* Pick-up Date */}
          <div className="flex-1 w-full relative">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">
              Pick-up Date
            </label>
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 focus-within:border-indigo-500 transition-colors">
              <Calendar className="text-indigo-500 shrink-0" size={20} />
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white font-medium text-sm sm:text-base [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-800"></div>

          {/* Passengers */}
          <div className="flex-1 w-full relative">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">
              Passengers
            </label>
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 focus-within:border-indigo-500 transition-colors">
              <Users className="text-indigo-500 shrink-0" size={20} />
              <select 
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white font-medium text-sm sm:text-base cursor-pointer"
              >
                <option value="1-4 (Car)" className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">1-4 (Sedan / Hatchback)</option>
                <option value="5-7 (SUV)" className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">5-7 (SUV / Innova)</option>
                <option value="8-15 (Minibus)" className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">8-15 (Tempo Traveller)</option>
                <option value="16-50 (Bus)" className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">16-50 (Luxury Bus)</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0">
            <Button 
              type="submit"
              size="lg" 
              className="w-full md:w-auto h-12 sm:h-14 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-indigo-500/25 font-semibold text-base transition-all duration-200 group"
            >
              <Search className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Search
            </Button>
          </div>

        </div>
      </form>
    </motion.div>
  );
}
