"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VehicleSearchBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="absolute -bottom-16 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 z-20 hidden md:block"
    >
      <div className="bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl shadow-black/20">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="flex-1 w-full relative">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Location</label>
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
              <MapPin className="text-indigo-500" size={20} />
              <input 
                type="text" 
                placeholder="City or Airport" 
                className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white font-medium placeholder-gray-400"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-800"></div>

          <div className="flex-1 w-full relative">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Pick-up Date</label>
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
              <Calendar className="text-indigo-500" size={20} />
              <input 
                type="date" 
                className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white font-medium"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-800"></div>

          <div className="flex-1 w-full relative">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Passengers</label>
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
              <Users className="text-indigo-500" size={20} />
              <select className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white font-medium appearance-none">
                <option>1-4 (Car)</option>
                <option>5-7 (SUV)</option>
                <option>8-15 (Minibus)</option>
                <option>16-50 (Bus)</option>
              </select>
            </div>
          </div>

          <div className="w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0">
            <Button size="lg" className="w-full h-14 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-indigo-500/25 group">
              <Search className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Search
            </Button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
