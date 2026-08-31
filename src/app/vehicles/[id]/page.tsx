"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Vehicle } from "@/types/vehicle";
import { fetchAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { 
  ChevronLeft, Users, Cog, Fuel, CheckCircle2, 
  MapPin, Shield, Star, Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setIsLoading(true);
        const res = await fetchAPI(`/vehicles/${id}`);
        const data = res.data || res;
        if (data && data.name) {
          setVehicle(data);
        } else {
          throw new Error("Not found in API");
        }
      } catch (err) {
        console.error("Vehicle not found or API error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      loadVehicle();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-white mb-4">Vehicle Not Found</h1>
        <Button onClick={() => router.push('/vehicles')} variant="outline" className="text-white border-zinc-700 bg-zinc-900">
          Back to Fleet
        </Button>
      </div>
    );
  }

  const handleBook = () => {
    if (user) {
      router.push(`/book/${vehicle._id}`);
    } else {
      router.push(`/login?redirect=${encodeURIComponent('/book/' + vehicle._id)}`);
    }
  };

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => router.push('/vehicles')}
          className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Vehicles
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Images and Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  {vehicle.type}
                </span>
                <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-medium rounded-full flex items-center">
                  <MapPin size={14} className="mr-1" /> {vehicle.location}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{vehicle.name}</h1>
              <p className="text-xl text-zinc-400">{vehicle.brand}</p>
            </div>

            {/* Main Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800"
            >
              <img 
                src={vehicle.images[0]} 
                alt={vehicle.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Specifications */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Users size={24} className="text-purple-400 mb-2" />
                  <span className="text-zinc-400 text-xs uppercase mb-1">Seats</span>
                  <span className="text-white font-semibold">{vehicle.seats}</span>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Cog size={24} className="text-purple-400 mb-2" />
                  <span className="text-zinc-400 text-xs uppercase mb-1">Transmission</span>
                  <span className="text-white font-semibold">{vehicle.transmission}</span>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Fuel size={24} className="text-purple-400 mb-2" />
                  <span className="text-zinc-400 text-xs uppercase mb-1">Fuel Type</span>
                  <span className="text-white font-semibold">{vehicle.fuelType}</span>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Star size={24} className="text-purple-400 mb-2" />
                  <span className="text-zinc-400 text-xs uppercase mb-1">Rating</span>
                  <span className="text-white font-semibold">{vehicle.rating} / 5</span>
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Features included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center text-zinc-300">
                  <CheckCircle2 size={20} className="text-green-500 mr-3" />
                  {vehicle.ac ? "Air Conditioning" : "Non-AC"}
                </div>
                <div className="flex items-center text-zinc-300">
                  <CheckCircle2 size={20} className="text-green-500 mr-3" />
                  {vehicle.driverIncluded ? "Professional Driver Included" : "Self Drive (if applicable)"}
                </div>
                <div className="flex items-center text-zinc-300">
                  <CheckCircle2 size={20} className="text-green-500 mr-3" />
                  Premium Sound System
                </div>
                <div className="flex items-center text-zinc-300">
                  <CheckCircle2 size={20} className="text-green-500 mr-3" />
                  Sanitized Before Trip
                </div>
              </div>
            </section>

            {/* Terms */}
            <section className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-4">Terms & Conditions</h2>
              <ul className="list-disc list-inside text-zinc-400 space-y-2 text-sm leading-relaxed">
                <li>Minimum billing of {vehicle.minHours || 10} hours is applicable on all bookings.</li>
                <li>Toll taxes, parking, and state border taxes are extra as applicable.</li>
                <li>Night halt charges will be added for trips between 10 PM to 6 AM.</li>
                <li>Starting and closing KM and Time will be calculated from garage to garage.</li>
                <li>Any damages to the vehicle interior will be charged to the customer.</li>
              </ul>
            </section>
            
          </div>

          {/* Right Column: Pricing & Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
              
              <div className="pb-6 border-b border-zinc-800">
                <h3 className="text-2xl font-bold text-white mb-4">Rental Details</h3>
                
                {vehicle.priceOnRequest ? (
                  <div className="text-center py-6 bg-zinc-950 rounded-2xl border border-zinc-800">
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                      Price on Request
                    </p>
                    <p className="text-zinc-500 text-sm mt-2">Contact us for best rates</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vehicle.ratePerHour && (
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Hourly Rate</span>
                        <span className="text-2xl font-bold text-white">₹{vehicle.ratePerHour}<span className="text-sm text-zinc-500 font-normal">/hr</span></span>
                      </div>
                    )}
                    {vehicle.ratePerKm && (
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Mileage Rate</span>
                        <span className="text-lg font-semibold text-white">₹{vehicle.ratePerKm}<span className="text-sm text-zinc-500 font-normal">/km</span></span>
                      </div>
                    )}
                    {(vehicle.ratePerHour || vehicle.ratePerKm) && vehicle.minHours && (
                      <div className="flex items-center text-sm text-zinc-500 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                        <Clock size={16} className="mr-2 text-purple-400" />
                        Minimum {vehicle.minHours} hours booking required
                      </div>
                    )}
                    {!vehicle.ratePerHour && !vehicle.ratePerKm && vehicle.pricePerDay && (
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Daily Rate</span>
                        <span className="text-2xl font-bold text-white">₹{vehicle.pricePerDay}<span className="text-sm text-zinc-500 font-normal">/day</span></span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-6 space-y-4">
                <div className="flex items-start text-xs text-zinc-500 gap-2 mb-4">
                  <Shield size={16} className="text-green-500 flex-shrink-0" />
                  <p>100% secure payment. No hidden charges. Free cancellation up to 24 hours before pickup.</p>
                </div>
                
                <Button onClick={handleBook} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-6 rounded-xl text-lg shadow-xl shadow-purple-900/20">
                  Booking Request
                </Button>
                
                <Button variant="outline" className="w-full bg-transparent border-zinc-700 text-white hover:bg-zinc-800 rounded-xl py-6">
                  Contact Support
                </Button>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
