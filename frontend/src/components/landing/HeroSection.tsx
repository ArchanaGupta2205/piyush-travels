"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import VehicleSearchBox from "./VehicleSearchBox";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Background Image & Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2940&auto=format&fit=crop')" }}
      ></div>
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-zinc-50 dark:to-zinc-950"></div>
      
      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full mb-16 md:mb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide">Premium Fleet Available Now</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-tight"
        >
          Journeys Crafted <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
            With Elegance
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-light"
        >
          From luxury sedans for executive travel to premium coaches for group tours. 
          Experience unparalleled comfort across the country.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center gap-4 md:hidden"
        >
          <Button size="lg" className="h-14 px-8 bg-white text-black hover:bg-gray-100 rounded-xl text-lg font-semibold">
            Book a Ride
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 border-white/30 text-white hover:bg-white/10 rounded-xl text-lg backdrop-blur-sm group">
            Explore Fleet <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </motion.div>
      </div>

      <VehicleSearchBox />
    </section>
  );
}
