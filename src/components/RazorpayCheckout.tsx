"use client";

import React, { useState } from "react";
import Script from "next/script";

interface RazorpayCheckoutProps {
  amount: number; // Amount in rupees
}

export default function RazorpayCheckout({ amount }: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

  const handlePayment = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // 1. Create order on backend (amount in paise)
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(amount * 100),
          currency: "INR",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error (${res.status})`);
      }

      const data = await res.json();

      if (!data.success || !data.order_id) {
        throw new Error(data.message || "Failed to generate order ID");
      }

      // Check if Razorpay script is loaded
      if (typeof window === "undefined" || !(window as any).Razorpay) {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Piyush Travels",
        description: "Payment for Booking",
        order_id: data.order_id,
        handler: async function (response: any) {
          // 3. Verify Signature on backend
          try {
            const verifyRes = await fetch(`${API_BASE}/payment/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json().catch(() => ({}));
            if (verifyRes.ok && verifyData.success) {
              setMessage({ text: "Payment verified successfully!", type: "success" });
            } else {
              setMessage({
                text: verifyData.message || "Payment verification failed",
                type: "error",
              });
            }
          } catch (err: any) {
            setMessage({
              text: "Error verifying payment signature with server: " + (err.message || err),
              type: "error",
            });
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);

      rzp1.on("payment.failed", function (response: any) {
        setMessage({
          text: `Payment Failed: ${response.error?.description || "Transaction failed"}`,
          type: "error",
        });
      });

      rzp1.open();
    } catch (error: any) {
      console.error("Checkout Error:", error);
      setMessage({
        text:
          error.name === "TypeError" && error.message.includes("Failed to fetch")
            ? "Could not connect to backend server at " + API_BASE + ". Please ensure your backend server is running on port 5000."
            : error.message || "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-xl shadow-sm bg-white max-w-md mx-auto">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Payment</h2>
      <p className="text-gray-500 mb-6">Total Amount: <span className="font-semibold text-gray-900">₹{amount}</span></p>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>

      {message && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm font-medium w-full text-center ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
