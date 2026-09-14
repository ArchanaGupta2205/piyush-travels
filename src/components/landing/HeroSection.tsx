"use client";

import { motion } from "framer-motion";
import VehicleSearchBox from "./VehicleSearchBox";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 min-h-[90vh] flex flex-col justify-center items-center">
      {/* Background Image & Overlays (clipped inside this container only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1920&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-zinc-50 dark:to-zinc-950"></div>
        
        {/* Decorative gradient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide">Premium Fleet Available Now</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-tight"
        >
          Journeys Crafted <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
            With Elegance
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 font-light"
        >
          From luxury sedans for executive travel to premium coaches for group tours. 
          Experience unparalleled comfort across the country.
        </motion.p>

        {/* Fully visible and responsive center search box */}
        <VehicleSearchBox />
      </div>
    </section>
  );
}
