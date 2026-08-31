import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceGrid from "@/components/services/ServiceGrid";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Chauffeur & Rental Services | Piyush Travels",
  description:
    "Explore our complete range of transport solutions: Airport Transfers, Corporate Fleet Rentals, Luxury Wedding Convoys, Intercity Outstation Travel, and Hourly Chauffeur Service across India.",
  keywords: [
    "airport pickup delhi igi",
    "corporate car rental delhi",
    "luxury wedding bus rental",
    "outstation taxi delhi to jaipur",
    "delhi to agra luxury cab",
    "hourly car rental delhi ncr",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Premium Chauffeur & Rental Services | Piyush Travels",
    description:
      "Airport Transfers, Corporate Fleet Rentals, Luxury Wedding Convoys, and Intercity Outstation packages.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black selection:bg-indigo-500/30">
      <Navbar />
      
      <main>
        <ServicesHero />
        <ServiceGrid />
        <WhyChooseUs />
      </main>

      <Footer />
    </div>
  );
}
