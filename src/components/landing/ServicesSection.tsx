"use client";

import { motion, type Variants } from "framer-motion";
import { Shield, Clock, Map, Star, Compass, ThumbsUp } from "lucide-react";

const services = [
  {
    icon: <Shield className="w-8 h-8 text-indigo-500" />,
    title: "Secure & Safe Rides",
    description: "All our vehicles undergo strict safety checks and our drivers are thoroughly vetted professionals."
  },
  {
    icon: <Clock className="w-8 h-8 text-indigo-500" />,
    title: "24/7 Availability",
    description: "Need a ride at 3 AM? We operate around the clock to ensure you reach your destination on time."
  },
  {
    icon: <Map className="w-8 h-8 text-indigo-500" />,
    title: "Anywhere in India",
    description: "From city transfers to interstate tours, our network covers major cities and remote destinations."
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white dark:bg-black overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-2"
          >
            Premium Services
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            We go the extra mile
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Piyush Travels is committed to providing seamless, luxurious, and highly reliable transportation solutions for every type of traveler.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={item} 
              className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-gray-100 dark:border-white/5 p-8 rounded-2xl hover:shadow-xl dark:hover:shadow-none hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
