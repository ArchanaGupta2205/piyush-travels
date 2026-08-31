"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100 dark:border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Target size={120} className="text-indigo-500" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-8">
                <Target size={32} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                To deliver a seamless, secure, and luxurious travel experience tailored to the individual needs of every client. We strive to set the gold standard in the transportation industry through meticulous vehicle maintenance and exceptional customer service.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100 dark:border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Eye size={120} className="text-purple-500" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-8">
                <Eye size={32} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                To become India's most trusted premium travel partner, connecting destinations through an expansive, modern fleet. We envision a future where travel is not just about moving from point A to B, but an experience to be cherished.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
