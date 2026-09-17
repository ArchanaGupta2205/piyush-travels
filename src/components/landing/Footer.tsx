import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Pre-footer CTA */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between mb-20">
          <div className="mb-6 md:mb-0 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to upgrade your travel?</h2>
            <p className="text-indigo-200 text-lg">Join thousands of satisfied travelers. Book your premium ride today and experience the difference.</p>
          </div>
          <Link href="/register">
            <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100 h-14 px-8 text-lg font-bold rounded-xl whitespace-nowrap">
              Create an Account
            </Button>
          </Link>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6 block">
              PiyushTravels
            </span>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Premium car and bus rental services offering unparalleled luxury, safety, and comfort for all your journey needs across India.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/vehicles" className="hover:text-white transition-colors">Our Fleet</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services & Fleet</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/vehicles" className="hover:text-white transition-colors">Luxury Sedans & SUVs</Link></li>
              <li><Link href="/vehicles" className="hover:text-white transition-colors">Tempo Travellers</Link></li>
              <li><Link href="/vehicles" className="hover:text-white transition-colors">Volvo Coaches</Link></li>
              <li><Link href="/about#faqs" className="hover:text-white transition-colors">FAQs & Policies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-indigo-400 shrink-0 mt-1" size={18} />
                <span>61/1,Panchanan tala road,Howrah,Howrah-711101</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-indigo-400 shrink-0" size={18} />
                <a href="tel:9163450745" className="hover:text-white transition-colors">9163450745</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-indigo-400 shrink-0" size={18} />
                <a href="mailto:piyushtravels79@gmail.com" className="hover:text-white transition-colors">piyushtravels79@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Piyush Travels. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Luxury.</p>
        </div>
      </div>
    </footer>
  );
}
