"use client";

import { motion, Variants } from "framer-motion";
import { Users, Briefcase, Settings, ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const vehicles = [
  {
    id: "8",
    name: "Mercedes-Benz S-Class",
    category: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop",
    passengers: 4,
    luggage: 2,
    transmission: "Auto",
    price: "₹15,000",
  },
  {
    id: "15",
    name: "Volvo B11R Premium",
    category: "Luxury Coach",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop",
    passengers: 54,
    luggage: 45,
    transmission: "Auto",
    price: "₹25,000",
  },
  {
    id: "3",
    name: "Toyota Innova Crysta",
    category: "Premium SUV",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop",
    passengers: 7,
    luggage: 4,
    transmission: "Manual",
    price: "₹3,500",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function VehicleShowcase() {
  return (
    <section id="fleet" className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-2">Our Fleet</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">Experience ultimate comfort</h3>
          </div>
          <Link href="/vehicles" className={buttonVariants({ variant: "link", className: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-lg group hidden md:flex mt-4 md:mt-0" })}>
            View all vehicles <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {vehicles.map((vehicle) => (
            <motion.div key={vehicle.id} variants={item} className="group rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900 dark:text-white">
                  {vehicle.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{vehicle.name}</h4>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Price on Request</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 border-y border-gray-100 dark:border-gray-800 py-4">
                  <div className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
                    <Users size={20} />
                    <span className="text-xs font-medium">{vehicle.passengers}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 border-x border-gray-100 dark:border-gray-800">
                    <Briefcase size={20} />
                    <span className="text-xs font-medium">{vehicle.luggage} Bags</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
                    <Settings size={20} />
                    <span className="text-xs font-medium">{vehicle.transmission}</span>
                  </div>
                </div>
                
                <Link href="/vehicles" className={buttonVariants({ variant: "default", className: "w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200" })}>
                  Reserve Now
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Link href="/vehicles" className={buttonVariants({ variant: "outline", className: "w-full mt-8 md:hidden" })}>
          View all vehicles
        </Link>
      </div>
    </section>
  );
}
