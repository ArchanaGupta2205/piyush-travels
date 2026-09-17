"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    const trimmed = value.trim();

    switch (name) {
      case "firstName":
        if (!trimmed) return "First name is required";
        if (trimmed.length < 2) return "First name must be at least 2 characters";
        return undefined;

      case "lastName":
        // Optional, but if typed, at least 1 character
        return undefined;

      case "email":
        if (!trimmed) return "Email address is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) return "Please enter a valid email address";
        return undefined;

      case "phone":
        if (trimmed) {
          const cleanPhone = trimmed.replace(/[\s\-()]/g, "");
          // Accepts 10-digit Indian mobile numbers (starting with 6, 7, 8, 9) with optional +91 or 0 prefix
          const phoneRegex = /^(\+91)?[0]?[6-9]\d{9}$/;
          if (!phoneRegex.test(cleanPhone)) {
            return "Please enter a valid 10-digit mobile number";
          }
        }
        return undefined;

      case "message":
        if (!trimmed) return "Message is required";
        if (trimmed.length < 10) return "Message must be at least 10 characters long";
        return undefined;

      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
      const payload = {
        name: fullName,
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
      };

      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send message. Please try again.");
      }

      setSubmitSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setTouched({});
      setErrors({});
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-black relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-2">Get In Touch</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Contact our team</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
              Have a special request or need to organize transport for a large group? Reach out to us and our luxury travel experts will assist you immediately.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                  <Phone className="text-indigo-500" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <a href="tel:+919876543210" className="text-lg font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                  <Mail className="text-indigo-500" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <a href="mailto:bookings@piyush-travels.com" className="text-lg font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
                    bookings@piyush-travels.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                  <MapPin className="text-indigo-500" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Office</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">123 Luxury Ave, New Delhi 110001</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl shadow-black/5"
          >
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 px-4 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8 text-base">
                    Thank you for contacting Piyush Travels. Our reservation team has received your message and will respond within 2-4 business hours.
                  </p>
                  <Button 
                    onClick={() => setSubmitSuccess(false)}
                    variant="outline"
                    className="px-6 py-2.5 rounded-xl border-gray-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} noValidate className="space-y-5">
                  {submitError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 flex items-start gap-3 text-sm"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </motion.div>
                  )}

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        id="firstName"
                        name="firstName"
                        type="text" 
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John" 
                        className={`w-full bg-white dark:bg-zinc-950 border rounded-xl px-4 py-3 text-gray-900 dark:text-white transition-colors focus:outline-none focus:ring-2 ${
                          touched.firstName && errors.firstName 
                            ? "border-red-500 focus:ring-red-500/20" 
                            : "border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                        }`}
                      />
                      {touched.firstName && errors.firstName && (
                        <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Last Name <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                      </label>
                      <input 
                        id="lastName"
                        name="lastName"
                        type="text" 
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Doe" 
                        className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors"
                      />
                    </div>
                  </div>
                  
                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="john@example.com" 
                        className={`w-full bg-white dark:bg-zinc-950 border rounded-xl px-4 py-3 text-gray-900 dark:text-white transition-colors focus:outline-none focus:ring-2 ${
                          touched.email && errors.email 
                            ? "border-red-500 focus:ring-red-500/20" 
                            : "border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Phone Number <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                      </label>
                      <input 
                        id="phone"
                        name="phone"
                        type="tel" 
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="+91 98765 43210" 
                        className={`w-full bg-white dark:bg-zinc-950 border rounded-xl px-4 py-3 text-gray-900 dark:text-white transition-colors focus:outline-none focus:ring-2 ${
                          touched.phone && errors.phone 
                            ? "border-red-500 focus:ring-red-500/20" 
                            : "border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                        }`}
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={4} 
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about your travel dates, passenger count, or any special requirements..."
                      className={`w-full bg-white dark:bg-zinc-950 border rounded-xl px-4 py-3 text-gray-900 dark:text-white transition-colors focus:outline-none focus:ring-2 resize-none ${
                        touched.message && errors.message 
                          ? "border-red-500 focus:ring-red-500/20" 
                          : "border-gray-200 dark:border-gray-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                      }`}
                    ></textarea>
                    {touched.message && errors.message && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    size="lg" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-14 text-base sm:text-lg font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={18} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
