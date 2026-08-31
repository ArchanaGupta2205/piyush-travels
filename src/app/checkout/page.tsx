"use client";

import React from "react";
import RazorpayCheckout from "@/components/RazorpayCheckout";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Checkout Test Page
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RazorpayCheckout amount={500} />
        </div>
      </div>
    </div>
  );
}
