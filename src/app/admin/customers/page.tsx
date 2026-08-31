"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { Users, Mail, Phone, Calendar } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI("/admin/customers");
      setCustomers(res.data || []);
    } catch (err) {
      console.error("Failed to load customers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-grow flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <Users className="text-indigo-500" /> Customers
        </h1>
        <p className="text-zinc-400">View and manage all registered customers.</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/50 border-b border-zinc-800">
                <th className="p-4 text-sm font-semibold text-zinc-400">Name</th>
                <th className="p-4 text-sm font-semibold text-zinc-400">Contact Info</th>
                <th className="p-4 text-sm font-semibold text-zinc-400">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-zinc-500">
                    No customers found.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                          {customer.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <span className="text-white font-medium">{customer.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="text-zinc-300 flex items-center gap-2">
                          <Mail size={14} className="text-zinc-500" /> {customer.email}
                        </span>
                        {customer.phone && (
                          <span className="text-zinc-400 flex items-center gap-2">
                            <Phone size={14} className="text-zinc-500" /> {customer.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-zinc-400 flex items-center gap-2">
                        <Calendar size={14} className="text-zinc-500" />
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
