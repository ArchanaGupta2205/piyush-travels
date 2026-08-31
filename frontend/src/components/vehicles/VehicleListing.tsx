"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchAPI } from "@/lib/api";
import { Vehicle } from "@/types/vehicle";
import VehicleCard from "./VehicleCard";
import VehicleSkeleton from "./VehicleSkeleton";
import QuickViewModal from "./QuickViewModal";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

export default function VehicleListing() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // States for features
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [compareList, setCompareList] = useState<Set<string>>(new Set());
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);

  // Sorting and Pagination
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Or 8 since it's full width now

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setIsLoading(true);
        const res = await fetchAPI("/vehicles");
        const data = res.data || res; 
        setVehicles(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Failed to load vehicles.");
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleCompare = (id: string) => {
    setCompareList((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        if (next.size >= 3) {
          alert("You can only compare up to 3 vehicles at a time.");
          return prev;
        }
        next.add(id);
      }
      return next;
    });
  };

  // Derived state: Sorted Vehicles
  const sortedVehicles = useMemo(() => {
    const result = [...vehicles];
    
    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return result;
  }, [vehicles, sortBy]);

  // Derived state: Paginated Vehicles
  const totalPages = Math.ceil(sortedVehicles.length / itemsPerPage);
  const paginatedVehicles = sortedVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      
      {/* Main Listing Area */}
      <div className="w-full">
        {/* Toolbar (Sorting, Results count) */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
          <div className="text-zinc-400">
            Showing <span className="text-white font-medium">{paginatedVehicles.length}</span> of <span className="text-white font-medium">{sortedVehicles.length}</span> results
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-zinc-400" />
              <select 
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-zinc-800 border-none text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <VehicleSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed">
            <p className="text-red-400 mb-2">Oops! Something went wrong.</p>
            <p className="text-zinc-500">{error}</p>
          </div>
        ) : sortedVehicles.length === 0 ? (
          <div className="text-center py-32 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed flex flex-col items-center">
            <Search size={48} className="text-zinc-600 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Vehicles Found</h3>
            <p className="text-zinc-400 max-w-md">We couldn&apos;t find any vehicles.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  onQuickView={setQuickViewVehicle}
                  onCompare={handleToggleCompare}
                  isCompared={compareList.has(vehicle._id)}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlist.has(vehicle._id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900 border border-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        currentPage === i + 1 
                          ? "bg-purple-600 text-white font-medium" 
                          : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900 border border-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}

        {/* Modals */}
        <QuickViewModal
          vehicle={quickViewVehicle}
          isOpen={!!quickViewVehicle}
          onClose={() => setQuickViewVehicle(null)}
        />
      </div>
    </div>
  );
}
