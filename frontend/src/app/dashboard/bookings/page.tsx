"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Download, Car, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      loadBookings();
    } else if (!authLoading && !user) {
      router.push("/login?redirect=/dashboard/bookings");
    }
  }, [user, authLoading, router]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await fetchAPI(`/bookings/my-bookings?email=${user?.email}`);
      if (res.success) {
        // Sort so newest are first
        const sorted = (res.data || []).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(sorted);
      }
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async (booking: any) => {
    try {
      // 1. Generate Order
      const res = await fetchAPI(`/bookings/${booking._id}/generate-payment`, {
        method: "POST",
      });

      const { razorpayOrder } = res;

      if (!razorpayOrder) {
        throw new Error("Could not generate payment order.");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Piyush Travels",
        description: `Payment for Booking ${booking.bookingId}`,
        order_id: razorpayOrder.id,
        handler: async function (response: any) {
          try {
            // 3. Verify Payment
            await fetchAPI("/bookings/verify-payment", {
              method: "POST",
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking.bookingId,
              }),
            });
            
            alert("Payment Successful!");
            loadBookings(); // Reload to show Confirmed status
          } catch (err) {
            alert("Payment verification failed! Please contact support.");
          }
        },
        prefill: {
          name: `${booking.passengerDetails?.firstName} ${booking.passengerDetails?.lastName}`,
          email: booking.passengerDetails?.email,
          contact: booking.passengerDetails?.phone,
        },
        theme: {
          color: "#9333ea",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        alert("Payment failed! Error: " + response.error.description);
      });
      rzp1.open();

    } catch (error: any) {
      alert(error.message || "Failed to initiate payment.");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex-grow flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const now = new Date();

  // Filter based on return date
  const upcomingTrips = bookings.filter(b => new Date(b.pickupDetails.returnDate) >= now);
  const pastTrips = bookings.filter(b => new Date(b.pickupDetails.returnDate) < now);

  const displayedTrips = activeTab === "upcoming" ? upcomingTrips : pastTrips;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Bookings</h1>
          <p className="text-zinc-400">View and manage all your trips.</p>
        </div>
        <Button onClick={() => router.push('/vehicles')} className="bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          Book New Trip
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-6 py-4 text-sm font-medium transition-colors relative ${
            activeTab === "upcoming" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Upcoming Trips
          <span className="ml-2 px-2 py-0.5 rounded-full bg-zinc-800 text-xs">{upcomingTrips.length}</span>
          {activeTab === "upcoming" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-4 text-sm font-medium transition-colors relative ${
            activeTab === "history" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Booking History
          <span className="ml-2 px-2 py-0.5 rounded-full bg-zinc-800 text-xs">{pastTrips.length}</span>
          {activeTab === "history" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-t-full" />
          )}
        </button>
      </div>

      {/* List */}
      <div className="space-y-6">
        {displayedTrips.length === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 mb-4">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No {activeTab} trips</h3>
            <p className="text-zinc-400 max-w-md">You don't have any {activeTab === "upcoming" ? "upcoming" : "past"} bookings with us right now.</p>
          </div>
        ) : (
          displayedTrips.map((booking, idx) => (
            <div key={idx} className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-zinc-700 transition-colors group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                {/* Left: Info */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      activeTab === "upcoming" ? "bg-purple-500/20 text-purple-400" : "bg-zinc-800 text-zinc-400"
                    }`}>
                      {booking.bookingId}
                    </span>
                    <span className="text-zinc-500 text-sm">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                    
                    {booking.bookingStatus === "Requested" && (
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold rounded-full flex items-center gap-1">
                        <Clock size={12} /> Pending Quote
                      </span>
                    )}
                    {booking.bookingStatus === "Quoted" && (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold rounded-full flex items-center gap-1">
                        Action Required
                      </span>
                    )}
                    {booking.bookingStatus === "Confirmed" && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold rounded-full flex items-center gap-1">
                        <CheckCircle2 size={12} /> Confirmed
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                      {booking.vehicle?.images?.[0] ? (
                        <img src={booking.vehicle.images[0]} alt={booking.vehicle?.name} className="w-full h-full object-cover" />
                      ) : (
                        <Car className="text-zinc-400" size={32} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{booking.vehicle?.name || "Vehicle"}</h3>
                      <p className="text-zinc-400 capitalize">{booking.driverPreference.replace("-", " ")}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-zinc-500 shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="text-sm font-medium text-white">{booking.pickupDetails.pickupLocation}</p>
                        <p className="text-xs text-zinc-400">{new Date(booking.pickupDetails.pickupDate).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-zinc-500 shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="text-sm font-medium text-white">{booking.pickupDetails.dropoffLocation}</p>
                        <p className="text-xs text-zinc-400">{new Date(booking.pickupDetails.returnDate).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Price & Actions */}
                <div className="flex flex-col items-start md:items-end justify-between border-t border-zinc-800 md:border-t-0 md:border-l md:pl-8 pt-6 md:pt-0">
                  <div className="mb-6 md:mb-0">
                    <p className="text-sm text-zinc-500">Total Amount</p>
                    {booking.totalAmount ? (
                      <p className="text-3xl font-bold text-white">₹{booking.totalAmount.toLocaleString()}</p>
                    ) : (
                      <p className="text-xl font-bold text-white">To be quoted</p>
                    )}
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                    {booking.bookingStatus === "Quoted" && activeTab === "upcoming" && (
                      <Button className="flex-1 bg-white text-black hover:bg-zinc-200" onClick={() => handlePayNow(booking)}>
                        Pay Now
                      </Button>
                    )}
                    {booking.bookingStatus === "Confirmed" && (
                      <Link href={`/book/${booking.vehicle?._id}/invoice?bookingId=${booking.bookingId}`} className="flex-1 w-full">
                        <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white gap-2">
                          <Download size={16} />
                          Invoice
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
