"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ravi Sharma",
    role: "Corporate Executive",
    content: "The S-Class was immaculate. The driver was 15 minutes early and extremely professional. Best corporate travel experience I've had in Delhi.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    name: "Anita Desai",
    role: "Event Organizer",
    content: "We booked three Volvo buses for a destination wedding. The coordination was flawless and the buses were incredibly comfortable for the 8-hour journey.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704b"
  },
  {
    name: "Vikram Singh",
    role: "Frequent Traveler",
    content: "Piyush Travels is my go-to for airport transfers. The app is easy to use, pricing is transparent, and I've never missed a flight.",
    rating: 4,
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-2">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">What our clients say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 relative"
            >
              <Quote className="absolute top-6 right-6 text-gray-100 dark:text-zinc-800 w-12 h-12 rotate-180" />
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8 relative z-10 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
