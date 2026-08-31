"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Calendar, Car, Clock, CheckCircle2, ChevronRight, Activity, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/bookings/my-bookings?email=${user?.email}`);
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex-grow flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  // Calculate statistics
  const totalBookings = bookings.length;
  const pendingActions = bookings.filter(b => b.bookingStatus === "Quoted").length;
  const activeRequests = bookings.filter(b => b.bookingStatus === "Requested").length;
  const completedTrips = bookings.filter(b => b.bookingStatus === "Completed").length;
  const confirmedTrips = bookings.filter(b => b.bookingStatus === "Confirmed").length;

  const recentBookings = bookings.slice(0, 3); // Get only top 3

  return (
    <div className="flex-grow bg-black min-h-screen pt-4 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-zinc-400">Here's an overview of your account and recent activity.</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => router.push("/vehicles")} className="bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center gap-2">
              <Car size={18} /> Book a Vehicle
            </Button>
            <Button onClick={() => router.push("/dashboard/support")} variant="outline" className="border-zinc-700 hover:bg-zinc-800 text-zinc-300 flex items-center gap-2">
              <HelpCircle size={18} /> Support
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-zinc-800/80 rounded-2xl text-purple-400">
                <Calendar size={24} />
              </div>
              <span className="text-4xl font-bold text-white">{totalBookings}</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-300 relative z-10">Total Bookings</h3>
            <p className="text-sm text-zinc-500 relative z-10">All your booking history</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-zinc-800/80 rounded-2xl text-yellow-400">
                <Clock size={24} />
              </div>
              <span className="text-4xl font-bold text-white">{pendingActions + activeRequests}</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-300 relative z-10">Pending Actions</h3>
            <p className="text-sm text-zinc-500 relative z-10">{pendingActions > 0 ? `${pendingActions} quotes need payment` : 'Awaiting admin review'}</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-zinc-800/80 rounded-2xl text-green-400">
                <CheckCircle2 size={24} />
              </div>
              <span className="text-4xl font-bold text-white">{completedTrips + confirmedTrips}</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-300 relative z-10">Confirmed & Completed</h3>
            <p className="text-sm text-zinc-500 relative z-10">Successful reservations</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="text-purple-500" /> Recent Activity
          </h2>
          <Link href="/dashboard/bookings" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 transition-colors">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {recentBookings.length === 0 ? (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 text-center">
              <Car className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Recent Activity</h3>
              <p className="text-zinc-400 mb-6">You haven't made any booking requests yet.</p>
              <Button onClick={() => router.push("/vehicles")} className="bg-purple-600 hover:bg-purple-700">
                Browse Vehicles
              </Button>
            </div>
          ) : (
            recentBookings.map((booking) => (
              <div key={booking._id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                    {booking.vehicle?.images?.[0] ? (
                      <img src={booking.vehicle.images[0]} alt={booking.vehicle?.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No Img</div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{booking.vehicle?.name || "Vehicle"}</h3>
                    <p className="text-zinc-500 text-sm flex items-center gap-2">
                      <Calendar size={12} /> {new Date(booking.pickupDetails.pickupDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  {booking.bookingStatus === "Requested" && (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold rounded-full">
                      Requested
                    </span>
                  )}
                  {booking.bookingStatus === "Quoted" && (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold rounded-full">
                      Needs Payment
                    </span>
                  )}
                  {booking.bookingStatus === "Confirmed" && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold rounded-full">
                      Confirmed
                    </span>
                  )}
                  {booking.bookingStatus === "Completed" && (
                    <span className="px-3 py-1 bg-zinc-700/50 text-zinc-300 border border-zinc-600/50 text-xs font-bold rounded-full">
                      Completed
                    </span>
                  )}
                  
                  <Link href="/dashboard/bookings" className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
