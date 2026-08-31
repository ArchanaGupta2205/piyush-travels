"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import "../Bookings.css";

interface BookingDetails {
  _id: string;
  bookingId: string;
  vehicle: {
    _id: string;
    brand: string;
    name: string;
  };
  pickupDetails: {
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    returnDate: string;
  };
  passengerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  driverPreference: string;
  bookingStatus: string;
  paymentStatus: string;
  totalAmount?: number;
  createdAt: string;
}

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [quoteAmount, setQuoteAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchBookingDetails();
    }
  }, [params.id]);

  const fetchBookingDetails = async () => {
    try {
      const res = await fetchAPI(`/bookings/${params.id}`);
      if (res.success) {
        setBooking(res.data);
      }
    } catch (err: any) {
      console.error("Failed to fetch booking details:", err);
      setError("Failed to load booking details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteAmount || isNaN(Number(quoteAmount))) {
      setError("Please enter a valid amount.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetchAPI(`/admin/bookings/${params.id}/quote`, {
        method: "PUT",
        body: JSON.stringify({ totalAmount: Number(quoteAmount) })
      });

      if (res.success) {
        // Update local state to reflect the new quote
        setBooking(res.data);
        setQuoteAmount("");
        alert("Quote sent successfully!");
      } else {
        setError(res.message || "Failed to send quote.");
      }
    } catch (err: any) {
      setError("An error occurred while sending the quote.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="booking-details-page">
        <div className="alert alert-danger">{error}</div>
        <Link href="/admin/bookings" className="back-link mt-4">
          <ArrowLeft size={18} /> Back to Bookings
        </Link>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="booking-details-page">
      <Link href="/admin/bookings" className="back-link">
        <ArrowLeft size={18} /> Back to Bookings
      </Link>

      <div className="page-header flex-between">
        <div>
          <h1 className="text-gradient mb-2">Booking #{booking.bookingId}</h1>
          <p className="text-secondary">Requested on {new Date(booking.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <span className={`badge badge-${booking.bookingStatus === 'Requested' ? 'warning' : booking.bookingStatus === 'Quoted' ? 'info' : 'success'}`}>
            {booking.bookingStatus}
          </span>
          <span className={`badge badge-${booking.paymentStatus === 'Pending' ? 'warning' : 'success'} ml-2`}>
            Payment {booking.paymentStatus}
          </span>
        </div>
      </div>

      <div className="details-grid">
        <div className="left-column flex flex-col gap-6">
          <div className="details-card glass-panel">
            <h2>Trip Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="detail-row">
                <span className="detail-label">Vehicle</span>
                <span className="detail-value">{booking.vehicle?.brand} {booking.vehicle?.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Driver Preference</span>
                <span className="detail-value capitalize">{booking.driverPreference.replace("-", " ")}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Pickup Location</span>
                <span className="detail-value">{booking.pickupDetails.pickupLocation}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Pickup Date & Time</span>
                <span className="detail-value">{new Date(booking.pickupDetails.pickupDate).toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Drop-off Location</span>
                <span className="detail-value">{booking.pickupDetails.dropoffLocation}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Return Date & Time</span>
                <span className="detail-value">{new Date(booking.pickupDetails.returnDate).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="details-card glass-panel">
            <h2>Passenger Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">{booking.passengerDetails.firstName} {booking.passengerDetails.lastName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{booking.passengerDetails.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{booking.passengerDetails.phone}</span>
              </div>
              {booking.passengerDetails.specialRequests && (
                <div className="detail-row col-span-2">
                  <span className="detail-label">Special Requests</span>
                  <span className="detail-value">{booking.passengerDetails.specialRequests}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="details-card glass-panel sticky top-24">
            <h2>Pricing & Quote</h2>
            
            {booking.bookingStatus === "Requested" ? (
              <form onSubmit={handleSendQuote} className="quote-form">
                <p className="text-secondary text-sm mb-4">
                  Review the trip details and provide a final price quote for this booking. The customer will receive an email to proceed with payment.
                </p>
                
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                
                <div className="amount-input-group">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    placeholder="Enter total amount"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    required
                    min="1"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-full mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Quote to Customer"}
                </button>
              </form>
            ) : (
              <div className="quote-summary">
                <div className="flex-center flex-col gap-2 py-4">
                  <CheckCircle size={48} className="text-green-500 mb-2" />
                  <h3 className="text-xl font-bold">Quote Sent</h3>
                  <p className="text-secondary text-center">
                    The customer has been quoted for this trip.
                  </p>
                </div>
                
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-secondary">Quoted Amount:</span>
                    <span className="text-xl font-bold">₹{booking.totalAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Payment Status:</span>
                    <span className={booking.paymentStatus === 'Completed' ? 'text-green-500 font-medium' : 'text-yellow-500 font-medium'}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
