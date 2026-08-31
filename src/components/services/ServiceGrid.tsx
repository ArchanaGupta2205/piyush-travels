"use client";

import { motion, type Variants } from "framer-motion";
import { Car, Bus, Plane, Map, Briefcase, Heart, GraduationCap, MapPin, Sparkles, PlusCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const allServices = [
  {
    icon: <Car className="w-8 h-8" />,
    title: "Car Rental",
    description: "Self-drive and chauffeur-driven luxury sedans and SUVs for your daily requirements.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Bus className="w-8 h-8" />,
    title: "Bus Rental",
    description: "Premium coaches and minibuses for large groups, ensuring everyone travels together comfortably.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Airport Transfer",
    description: "Punctual, stress-free pickups and drops to and from major airports.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "City Ride",
    description: "Navigate the busy city streets in the comfort of a luxury vehicle with an expert driver.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: <Map className="w-8 h-8" />,
    title: "Outstation",
    description: "Intercity travel made easy with our specialized outstation fleet and experienced highway drivers.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Corporate Travel",
    description: "End-to-end transportation solutions for executives, employee commutes, and corporate events.",
    gradient: "from-slate-600 to-slate-800"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Wedding Transport",
    description: "Make your special day perfect with our elegant fleet for the bride, groom, and guests.",
    gradient: "from-fuchsia-500 to-pink-600"
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "School Trips",
    description: "Safe, reliable, and comfortable bus transportation for educational excursions.",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Tour Packages",
    description: "Curated itineraries to popular tourist destinations across India.",
    gradient: "from-green-400 to-emerald-600"
  },
  {
    icon: <PlusCircle className="w-8 h-8" />,
    title: "Custom Plans",
    description: "Have a unique requirement? We can tailor a travel plan specifically for you.",
    gradient: "from-violet-500 to-purple-600"
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ServiceGrid() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {allServices.map((service, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className={`group relative overflow-hidden rounded-3xl p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-2 transition-all duration-300`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${service.gradient}`}></div>
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg bg-gradient-to-br ${service.gradient} transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {service.description}
              </p>
              
              <Button variant="ghost" className="p-0 hover:bg-transparent text-gray-900 dark:text-white font-semibold group/btn">
                Book this service <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
