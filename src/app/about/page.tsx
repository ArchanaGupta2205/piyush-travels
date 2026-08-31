import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import TeamAndSafety from "@/components/about/TeamAndSafety";
import FAQAccordion from "@/components/about/FAQAccordion";
import ContactSection from "@/components/about/ContactSection";
import VehicleShowcase from "@/components/landing/VehicleShowcase";
import Testimonials from "@/components/landing/Testimonials";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Safety Standards | Piyush Travels",
  description:
    "Learn about Piyush Travels, our 10+ years of heritage, certified commercial chauffeurs, GPS-monitored fleet, and E-E-A-T commitment to passenger safety and luxury travel across India.",
  keywords: [
    "about piyush travels",
    "safe car rental delhi",
    "verified chauffeurs delhi",
    "luxury travel agency new delhi",
    "piyush travels safety standards",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us & Safety Standards | Piyush Travels",
    description:
      "India's premier luxury vehicle rental service. Learn about our fleet safety, background-verified chauffeurs, and corporate transit solutions.",
    url: "/about",
  },
};

const defaultFaqs = [
  {
    question: "How do I book a vehicle with Piyush Travels?",
    answer:
      "You can easily book online via our Vehicles page by choosing your dates and car, or contact our 24/7 reservation desk at +91 98765 43210 or bookings@piyush-travels.com.",
  },
  {
    question: "Are your chauffeurs background-checked and trained?",
    answer:
      "Yes, all Piyush Travels chauffeurs undergo rigorous 3-point background checks, defensive driving assessments, route navigation tests, and hospitality training.",
  },
  {
    question: "What safety measures are implemented in your fleet?",
    answer:
      "Every vehicle features 24/7 real-time GPS tracking, speed governors, SOS emergency assistance, daily sanitization, and comprehensive commercial passenger insurance.",
  },
  {
    question: "What is the cancellation and refund policy?",
    answer:
      "We offer 100% full refund for cancellations requested at least 24 hours before scheduled pickup time.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black selection:bg-indigo-500/30">
      <FAQJsonLd faqs={defaultFaqs} />
      <Navbar />
      
      <main>
        <AboutHero />
        <MissionVision />
        <VehicleShowcase />
        <TeamAndSafety />
        <Testimonials />
        <FAQAccordion />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
