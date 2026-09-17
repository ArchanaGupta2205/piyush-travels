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
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none">
          <div className="text-zinc-600 dark:text-zinc-400">
            Showing <span className="text-zinc-900 dark:text-white font-semibold">{paginatedVehicles.length}</span> of <span className="text-zinc-900 dark:text-white font-semibold">{sortedVehicles.length}</span> results
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-zinc-500 dark:text-zinc-400" />
              <select 
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer text-sm"
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
          <div className="text-center py-20 bg-white dark:bg-zinc-900/30 rounded-3xl border border-red-200 dark:border-zinc-800 border-dashed">
            <p className="text-red-500 dark:text-red-400 mb-2 font-medium">Oops! Something went wrong.</p>
            <p className="text-zinc-600 dark:text-zinc-500">{error}</p>
          </div>
        ) : sortedVehicles.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-zinc-900/30 rounded-3xl border border-zinc-200 dark:border-zinc-800 border-dashed flex flex-col items-center">
            <Search size={48} className="text-zinc-400 dark:text-zinc-600 mb-4" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">No Vehicles Found</h3>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md">We couldn&apos;t find any vehicles matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  onQuickView={setQuickViewVehicle}
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
                  aria-label="Previous page"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm dark:shadow-none"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors font-medium text-sm ${
                        currentPage === i + 1 
                          ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" 
                          : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white shadow-sm dark:shadow-none"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm dark:shadow-none"
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
