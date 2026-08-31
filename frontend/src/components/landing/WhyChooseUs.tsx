"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  "Verified & Professional Chauffeurs",
  "Transparent Pricing, No Hidden Fees",
  "Well-Maintained Luxury Fleet",
  "Instant Booking Confirmations",
  "Flexible Cancellation Policies",
  "24/7 Dedicated Customer Support"
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="w-full lg:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-2"
          >
            Why Piyush Travels
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Redefining Your Travel Experience
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 mb-8"
          >
            We don't just provide vehicles; we provide peace of mind. With thousands of successful journeys, our reputation is built on trust, punctuality, and uncompromising luxury.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="text-indigo-400 shrink-0 mt-0.5" size={20} />
                <span className="text-gray-200 font-medium">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury Interior" 
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white mb-1">10k+</p>
                  <p className="text-sm text-gray-300">Happy Customers</p>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">4.9/5</p>
                  <p className="text-sm text-gray-300">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
