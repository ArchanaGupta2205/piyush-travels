"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Search, Filter, Eye } from "lucide-react";
import "./Bookings.css";

interface Booking {
  id: string;
  dbId: string;
  customer: string;
  vehicle: string;
  status: string;
  paymentStatus: string;
  date: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetchAPI("/admin/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "requested": return "badge-warning";
      case "quoted": return "badge-info";
      case "confirmed": return "badge-success";
      case "cancelled": return "badge-danger";
      default: return "badge-secondary";
    }
  };

  const getPaymentBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "badge-warning";
      case "completed": return "badge-success";
      case "failed": return "badge-danger";
      default: return "badge-secondary";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="admin-bookings-page">
      <div className="page-header flex-between">
        <h1 className="text-gradient">Bookings Management</h1>
        <div className="header-actions">
          <div className="search-box glass-panel">
            <Search size={18} />
            <input type="text" placeholder="Search bookings..." />
          </div>
          <button className="btn btn-outline glass-panel flex-center gap-2">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      <div className="table-container glass-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-secondary">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.dbId}>
                  <td className="font-medium">{booking.id}</td>
                  <td>{booking.date}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.vehicle}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getPaymentBadgeClass(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-icon"
                      onClick={() => router.push(`/admin/bookings/${booking.dbId}`)}
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
