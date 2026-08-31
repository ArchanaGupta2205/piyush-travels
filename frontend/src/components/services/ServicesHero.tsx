"use client";

import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-[50vh] flex flex-col justify-center bg-zinc-900">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      <div className="absolute inset-0 bg-black/70 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-zinc-50 dark:to-zinc-950"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Premium Services</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-light"
        >
          Comprehensive travel solutions tailored to your unique requirements. Whether it&apos;s a quick airport drop or a month-long corporate contract, we deliver excellence.
        </motion.p>
      </div>
    </section>
  );
}
