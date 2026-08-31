"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Download, ArrowLeft, Printer, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InvoicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const bookingId = searchParams.get("bookingId");
    if (bookingId) {
      const stored = JSON.parse(localStorage.getItem("piyush_bookings") || "[]");
      const found = stored.find((b: any) => b.bookingId === bookingId);
      if (found) setBooking(found);
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  if (!isClient) return null;

  if (!booking) {
    return (
      <div className="min-h-screen bg-black pt-32 flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-4">Invoice Not Found</h1>
        <p className="text-zinc-400 mb-8">We couldn't find a booking with that ID.</p>
        <Button onClick={() => router.push("/")} variant="outline" className="border-zinc-700">Go Home</Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-20 print:bg-white print:pt-0 print:pb-0">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Screen-only controls */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <button 
            onClick={() => router.push('/dashboard/bookings')}
            className="flex items-center text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Bookings
          </button>
          
          <Button onClick={handlePrint} className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
            <Printer size={18} />
            Print / Save PDF
          </Button>
        </div>

        {/* Invoice Paper */}
        <div className="bg-white rounded-xl overflow-hidden text-black print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="bg-zinc-900 text-white p-8 md:p-12 print:bg-black">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Car className="text-purple-500" size={32} />
                  <span className="text-3xl font-bold tracking-tight">Piyush Travels</span>
                </div>
                <p className="text-zinc-400 text-sm">Premium Car & Bus Rentals</p>
              </div>
              <div className="text-right">
                <h1 className="text-3xl font-bold tracking-wider text-zinc-300">INVOICE</h1>
                <p className="text-zinc-400 mt-2 font-mono">{booking.bookingId}</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="text-zinc-500 font-bold uppercase tracking-wider mb-2">Billed To</p>
                <p className="font-bold text-lg">{booking.passengerDetails.firstName} {booking.passengerDetails.lastName}</p>
                <p className="text-zinc-600">{booking.passengerDetails.email}</p>
                <p className="text-zinc-600">{booking.passengerDetails.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-zinc-500 font-bold uppercase tracking-wider mb-2">Invoice Date</p>
                <p className="font-bold">{new Date(booking.createdAt).toLocaleDateString()}</p>
                <p className="text-zinc-500 font-bold uppercase tracking-wider mt-4 mb-2">Status</p>
                <div className="inline-flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full font-semibold">
                  <CheckCircle2 size={16} /> Paid in Full
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div>
              <p className="text-zinc-500 font-bold uppercase tracking-wider mb-4 border-b pb-2">Trip Summary</p>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <span className="text-zinc-500 block mb-1">Vehicle</span>
                  <span className="font-bold">{booking.vehicleName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Driver Preference</span>
                  <span className="font-bold capitalize">{booking.driverPreference.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Pickup</span>
                  <span className="font-medium block">{booking.pickupDetails.pickupLocation}</span>
                  <span className="text-zinc-500">{new Date(booking.pickupDetails.pickupDate).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Drop-off</span>
                  <span className="font-medium block">{booking.pickupDetails.dropoffLocation}</span>
                  <span className="text-zinc-500">{new Date(booking.pickupDetails.returnDate).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Charges */}
            <div>
              <p className="text-zinc-500 font-bold uppercase tracking-wider mb-4 border-b pb-2">Charges</p>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-zinc-500">
                    <th className="py-2 font-semibold">Description</th>
                    <th className="py-2 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr>
                    <td className="py-4">Vehicle Rental ({booking.vehicleName})</td>
                    <td className="py-4 text-right">₹{booking.totalAmount.toLocaleString()}</td>
                  </tr>
                  {booking.driverPreference === "chauffeur" && (
                    <tr>
                      <td className="py-4">Chauffeur Service</td>
                      <td className="py-4 text-right">Included in Total</td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-4 text-zinc-500 italic">Taxes & Fees</td>
                    <td className="py-4 text-right text-zinc-500 italic">Included</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td className="py-4 font-bold text-lg pt-6">Total Paid</td>
                    <td className="py-4 font-bold text-2xl text-right pt-6">₹{booking.totalAmount.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer terms */}
            <div className="pt-8 border-t text-xs text-zinc-500 text-center space-y-2">
              <p>Thank you for choosing Piyush Travels!</p>
              <p>Toll taxes, parking, and state border taxes are extra as applicable and to be paid directly to the driver.</p>
              <p>Support: +91 98765 43210 | support@piyush-travels.com</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
