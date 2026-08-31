"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/api";

const faqs = [
  {
    question: "What is your cancellation policy?",
    answer: "You can cancel your booking for free up to 24 hours before the scheduled pickup time. Cancellations made within 24 hours of pickup may be subject to a one-day rental charge."
  },
  {
    question: "Do I need to pay for toll taxes and parking?",
    answer: "Yes, toll taxes, parking fees, and state border taxes are not included in the base rental price and must be paid directly by the customer as applicable during the trip."
  },
  {
    question: "What happens if I exceed the minimum hours or kilometers?",
    answer: "If your trip exceeds the minimum hours or kilometers booked, you will be billed for the extra hours or kilometers at the vehicle's standard hourly/mileage rate at the end of the trip."
  },
  {
    question: "Are the chauffeurs verified?",
    answer: "Absolutely. All our professional chauffeurs undergo rigorous background checks, driving tests, and regular training to ensure your safety and comfort."
  },
  {
    question: "Can I change my drop-off location during the trip?",
    answer: "Yes, you can modify your trip details. However, changes to the drop-off location may affect the final billing amount based on the extra distance covered."
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: "", bookingId: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", type: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ text: "", type: "" });

    try {
      const res = await fetchAPI("/support", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.success) {
        setFeedback({ text: "Message sent successfully! Our team will get back to you soon.", type: "success" });
        setFormData({ name: "", bookingId: "", message: "" });
      } else {
        setFeedback({ text: res.message || "Failed to send message.", type: "error" });
      }
    } catch (err) {
      setFeedback({ text: "An error occurred. Please try again later.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
        <p className="text-zinc-400">We're here to help. Get in touch with our team or browse the FAQs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/20 border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
            
            <h3 className="text-xl font-bold text-white mb-6 relative z-10">24/7 Helpline</h3>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Call us directly</p>
                  <p className="text-white font-medium">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Email support</p>
                  <p className="text-white font-medium">support@piyush-travels.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">WhatsApp Chat</p>
                  <p className="text-white font-medium">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm h-full">
            <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
            
            {feedback.text && (
              <div className={`p-4 rounded-xl mb-6 ${feedback.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                {feedback.text}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Booking ID (Optional)</label>
                  <input 
                    type="text" 
                    name="bookingId"
                    value={formData.bookingId}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                    placeholder="e.g. PT-2026-XXXX"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700 text-white gap-2 px-8">
                  <Send size={16} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* FAQs */}
      <div className="pt-8">
        <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border border-zinc-800 rounded-2xl overflow-hidden transition-colors ${
                openFaq === idx ? "bg-zinc-800/50" : "bg-zinc-900/30 hover:bg-zinc-800/30"
              }`}
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span className={`font-medium ${openFaq === idx ? "text-white" : "text-zinc-300"}`}>
                  {faq.question}
                </span>
                {openFaq === idx ? (
                  <ChevronUp className="text-purple-400 shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-zinc-500 shrink-0" size={20} />
                )}
              </button>
              
              {openFaq === idx && (
                <div className="px-6 pb-5 text-zinc-400 leading-relaxed text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
