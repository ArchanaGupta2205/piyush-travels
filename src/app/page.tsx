import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import VehicleShowcase from "@/components/landing/VehicleShowcase";
import ServicesSection from "@/components/landing/ServicesSection";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black selection:bg-indigo-500/30">
      <Navbar />
      
      <main>
        <HeroSection />
        <VehicleShowcase />
        <ServicesSection />
        <WhyChooseUs />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
