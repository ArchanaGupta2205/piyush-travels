"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Star, Sparkles } from "lucide-react";

export default function TeamAndSafety() {
  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
                alt="Chauffeur" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-start gap-4">
                  <UserCheck className="text-indigo-400 shrink-0 w-10 h-10" />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Vetted Professionals</h4>
                    <p className="text-gray-300 text-sm">Every chauffeur undergoes rigorous background checks and advanced driving tests.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-2"
            >
              The Piyush Difference
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Safety meets luxury
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-10"
            >
              We believe that luxury is meaningless without safety. That's why our entire fleet is equipped with state-of-the-art safety features, and our team is trained to handle any situation.
            </motion.p>

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Comprehensive Insurance</h4>
                  <p className="text-gray-600 dark:text-gray-400">All rides are fully insured, providing peace of mind from the moment you step into our vehicles.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
                  <Sparkles className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Immaculate Maintenance</h4>
                  <p className="text-gray-600 dark:text-gray-400">Vehicles are serviced bi-weekly and sanitized thoroughly before and after every single trip.</p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
