"use client";

import { useState } from "react";
import { Vehicle } from "@/types/vehicle";
import { CreateBookingData, Booking } from "@/types/booking";
import { fetchAPI } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Download, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

interface BookingWizardProps {
  vehicle: Vehicle;
}

const steps = [
  "Pickup Details",
  "Passenger Info",
  "Driver",
  "Summary",
  "Confirmation",
];

export default function BookingWizard({ vehicle }: BookingWizardProps) {
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<any | null>(null);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState<Partial<CreateBookingData>>({
    vehicle: vehicle._id,
    driverPreference: "self-drive",
    pickupDetails: {
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: "",
      returnDate: "",
    },
    passengerDetails: {
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ").slice(1).join(" ") || "",
      email: user?.email || "",
      phone: "",
      specialRequests: "",
    },
  });

  const handleNext = () => {
    // Validate Step 0: Pickup Details
    if (currentStep === 0) {
      const { pickupLocation, dropoffLocation, pickupDate, returnDate } = formData.pickupDetails || {};
      if (!pickupLocation || !dropoffLocation || !pickupDate || !returnDate) {
        alert("Please fill in all pickup and drop-off details, including dates.");
        return;
      }
    }
    
    // Validate Step 1: Passenger Info
    if (currentStep === 1) {
      const { firstName, lastName, email, phone } = formData.passengerDetails || {};
      if (!firstName || !lastName || !email || !phone) {
        alert("Please fill in all required passenger information.");
        return;
      }
    }

    setCurrentStep((p) => Math.min(steps.length - 1, p + 1));
  };

  const prevStep = () => setCurrentStep((p) => Math.max(0, p - 1));

  const updatePickup = (data: Partial<CreateBookingData["pickupDetails"]>) => {
    setFormData((prev) => ({
      ...prev,
      pickupDetails: { ...prev.pickupDetails!, ...data },
    }));
  };

  const updatePassenger = (data: Partial<CreateBookingData["passengerDetails"]>) => {
    setFormData((prev) => ({
      ...prev,
      passengerDetails: { ...prev.passengerDetails!, ...data },
    }));
  };

  const calculateTotal = () => {
    if (!formData.pickupDetails?.pickupDate || !formData.pickupDetails?.returnDate) return 0;
    const start = new Date(formData.pickupDetails.pickupDate);
    const end = new Date(formData.pickupDetails.returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) diffDays = 1; // Min 1 day

    let base = diffDays * (vehicle.pricePerDay || 0);
    if (formData.driverPreference === "chauffeur" && !vehicle.driverIncluded) {
      base += diffDays * 1500; // Rs 1500 per day for driver if not included
    }
    return base;
  };

  const submitRequest = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAPI("/bookings", {
        method: "POST",
        body: JSON.stringify({
          vehicleId: vehicle._id, // Updated to match backend
          pickupDetails: formData.pickupDetails,
          passengerDetails: formData.passengerDetails,
          driverPreference: formData.driverPreference,
        }),
      });

      const { data: booking } = res;

      setCompletedBooking(booking);
      setCurrentStep((p) => Math.min(steps.length - 1, p + 1));
    } catch (error: any) {
      alert(error.message || "Request failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadInvoice = () => {
    if (!completedBooking) return;
    router.push(`/book/${vehicle._id}/invoice?bookingId=${completedBooking.bookingId}`);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 bg-zinc-900/50 border border-zinc-800 rounded-3xl backdrop-blur-sm px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Sign In Required</h2>
        <p className="text-zinc-400 mb-8 max-w-md text-lg">
          Please log in or create an account to book the {vehicle.name}.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            onClick={() => router.push(`/login?redirect=${encodeURIComponent('/book/' + vehicle._id)}`)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg font-semibold w-full sm:w-auto"
          >
            Log In
          </Button>
          <Button
            onClick={() => router.push(`/register?redirect=${encodeURIComponent('/book/' + vehicle._id)}`)}
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-800 text-white px-8 py-6 text-lg font-semibold w-full sm:w-auto"
          >
            Register
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Stepper Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Complete Your Booking</h1>
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-zinc-800 -z-10" />
          {steps.map((label, idx) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${idx < currentStep
                    ? "bg-green-500 text-white"
                    : idx === currentStep
                      ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                      : "bg-zinc-900 text-zinc-500 border border-zinc-700"
                  }`}
              >
                {idx < currentStep ? <Check size={18} /> : idx + 1}
              </div>
              <span className="text-xs font-medium text-zinc-400 hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-10 backdrop-blur-sm min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow"
          >
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Pickup & Drop-off</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Pickup Location</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                      value={formData.pickupDetails?.pickupLocation}
                      onChange={(e) => updatePickup({ pickupLocation: e.target.value })}
                      placeholder="Enter pickup address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Drop-off Location</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                      value={formData.pickupDetails?.dropoffLocation}
                      onChange={(e) => updatePickup({ dropoffLocation: e.target.value })}
                      placeholder="Enter drop-off address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Pickup Date & Time</label>
                    <input
                      type="datetime-local"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                      value={formData.pickupDetails?.pickupDate}
                      onChange={(e) => updatePickup({ pickupDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Return Date & Time</label>
                    <input
                      type="datetime-local"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                      value={formData.pickupDetails?.returnDate}
                      onChange={(e) => updatePickup({ returnDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Passenger Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                      value={formData.passengerDetails?.firstName}
                      onChange={(e) => updatePassenger({ firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                      value={formData.passengerDetails?.lastName}
                      onChange={(e) => updatePassenger({ lastName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                      value={formData.passengerDetails?.email}
                      onChange={(e) => updatePassenger({ email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                      value={formData.passengerDetails?.phone}
                      onChange={(e) => updatePassenger({ phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Driver Preference</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    onClick={() => setFormData({ ...formData, driverPreference: "self-drive" })}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-colors ${formData.driverPreference === "self-drive"
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-zinc-800 bg-zinc-800/30 hover:border-zinc-700"
                      }`}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">Self Drive</h3>
                    <p className="text-zinc-400 text-sm">Experience the thrill of driving yourself. Valid driver's license required.</p>
                  </div>
                  <div
                    onClick={() => setFormData({ ...formData, driverPreference: "chauffeur" })}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-colors ${formData.driverPreference === "chauffeur"
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-zinc-800 bg-zinc-800/30 hover:border-zinc-700"
                      }`}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">Chauffeur Included</h3>
                    <p className="text-zinc-400 text-sm">
                      Relax and enjoy the ride with our professional drivers.
                      {!vehicle.driverIncluded && " (Additional ₹1,500/day)"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Booking Summary</h2>
                <div className="bg-zinc-800/30 rounded-2xl p-6 border border-zinc-800">
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-zinc-800">
                    <div>
                      <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
                      <p className="text-zinc-400">{vehicle.brand} • {vehicle.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-400">Price on Request</p>
                      <p className="text-zinc-500 text-sm">To be quoted by admin</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-zinc-500 mb-1">Pickup</p>
                      <p className="text-white font-medium">{formData.pickupDetails?.pickupLocation}</p>
                      <p className="text-zinc-400">{new Date(formData.pickupDetails?.pickupDate || "").toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 mb-1">Drop-off</p>
                      <p className="text-white font-medium">{formData.pickupDetails?.dropoffLocation}</p>
                      <p className="text-zinc-400">{new Date(formData.pickupDetails?.returnDate || "").toLocaleString()}</p>
                    </div>
                    <div className="col-span-2 pt-4 mt-4 border-t border-zinc-800">
                      <p className="text-zinc-500 mb-1">Passenger</p>
                      <p className="text-white font-medium">{formData.passengerDetails?.firstName} {formData.passengerDetails?.lastName}</p>
                      <p className="text-zinc-400">{formData.passengerDetails?.email} • {formData.passengerDetails?.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && completedBooking && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-10">
                <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white">
                    <Check size={40} />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white">Request Submitted!</h2>
                <p className="text-zinc-400 text-lg max-w-md">
                  Your booking request has been successfully sent. Our team will review your trip details and provide a custom price quote shortly.
                </p>

                <div className="bg-zinc-800/50 px-8 py-4 rounded-2xl border border-zinc-700 my-8">
                  <p className="text-sm text-zinc-500 mb-1">Request ID</p>
                  <p className="text-2xl font-mono text-purple-400 font-bold">{completedBooking.bookingId}</p>
                </div>

                <Button
                  onClick={() => router.push('/dashboard')}
                  variant="outline"
                  className="gap-2 border-zinc-700 hover:bg-zinc-800 text-white"
                >
                  View My Requests
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        {currentStep >= 0 && currentStep < steps.length - 1 && (
          <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
            {currentStep > 0 ? (
              <Button variant="ghost" onClick={prevStep} className="text-zinc-400 hover:text-white">
                Back
              </Button>
            ) : (
              <div></div> // Empty div for flex spacing
            )}
            {currentStep < steps.length - 1 && ( 
              <Button 
                onClick={currentStep === 3 ? submitRequest : handleNext} 
                disabled={isLoading}
                className="bg-white text-black hover:bg-zinc-200 px-8 font-semibold"
              >
                {isLoading ? "Processing..." : currentStep === 3 ? "Submit Request" : "Continue"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
