"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { Car, Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI("/vehicles?limit=100");
      setVehicles(res.data || []);
    } catch (err) {
      console.error("Failed to load vehicles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) {
      try {
        const res = await fetchAPI(`/vehicles/${id}`, {
          method: "DELETE",
        });
        if (res.success) {
          setVehicles(vehicles.filter((v) => v._id !== id));
        } else {
          alert("Failed to delete vehicle: " + res.message);
        }
      } catch (err) {
        console.error("Error deleting vehicle:", err);
        alert("An error occurred while deleting the vehicle.");
      }
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Car className="text-indigo-500" /> Vehicles
          </h1>
          <p className="text-zinc-400">Manage your fleet of vehicles.</p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-[0_0_15px_rgba(99,102,241,0.3)]"
        >
          <Plus size={18} /> Add New Vehicle
        </Link>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/50 border-b border-zinc-800">
                <th className="p-4 text-sm font-semibold text-zinc-400">Vehicle</th>
                <th className="p-4 text-sm font-semibold text-zinc-400">Type / Brand</th>
                <th className="p-4 text-sm font-semibold text-zinc-400">Pricing</th>
                <th className="p-4 text-sm font-semibold text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-500">
                    No vehicles found. Click "Add New Vehicle" to get started.
                  </td>
                </tr>
              ) : (
                vehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                          {vehicle.images && vehicle.images[0] ? (
                            <img src={vehicle.images[0]} alt={vehicle.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No Img</div>
                          )}
                        </div>
                        <span className="text-white font-medium">{vehicle.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="text-zinc-300">{vehicle.type}</span>
                        <span className="text-zinc-500">{vehicle.brand}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="text-zinc-300">₹{vehicle.pricePerDay}/day</span>
                        <span className="text-zinc-500">₹{vehicle.pricePerHour}/hr</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/vehicles/${vehicle._id}/edit`}
                          className="p-2 text-indigo-400 hover:bg-indigo-500/20 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(vehicle._id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
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
