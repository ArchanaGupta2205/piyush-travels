"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Car, ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddVehiclePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "Sedan",
    seats: 4,
    fuelType: "Petrol",
    transmission: "Manual",
    ac: true,
    driverIncluded: true,
    pricePerDay: "",
    ratePerHour: "",
    ratePerKm: "",
    minHours: "",
    priceOnRequest: false,
    location: "New Delhi",
    images: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError("");

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const fileData = new FormData();
        fileData.append("file", files[i]);
        fileData.append("folder", "piyush-travels/vehicles");

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: fileData,
        });

        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        } else {
          throw new Error(data.message || "Failed to upload image");
        }
      }

      const existingImages = formData.images
        ? formData.images.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const combined = [...existingImages, ...uploadedUrls].join(", ");
      setFormData((prev) => ({ ...prev, images: combined }));
    } catch (err: any) {
      setError(err.message || "Image upload failed");
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Process payload
      const payload: any = { ...formData };
      payload.seats = Number(payload.seats);
      payload.pricePerDay = payload.pricePerDay ? Number(payload.pricePerDay) : undefined;
      payload.ratePerHour = payload.ratePerHour ? Number(payload.ratePerHour) : undefined;
      payload.ratePerKm = payload.ratePerKm ? Number(payload.ratePerKm) : undefined;
      payload.minHours = payload.minHours ? Number(payload.minHours) : undefined;
      payload.images = payload.images.split(",").map((i: string) => i.trim()).filter(Boolean);

      const res = await fetchAPI("/vehicles", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (res.success) {
        router.push("/admin/vehicles");
      } else {
        setError(res.message || "Failed to create vehicle");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/vehicles" className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-white">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            Add New Vehicle
          </h1>
          <p className="text-zinc-400">Fill in the details to add a vehicle to the fleet.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8">
        
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Vehicle Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500" placeholder="e.g. Innova Crysta" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Brand</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500" placeholder="e.g. Toyota" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500">
                <option value="Car">Car</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Minibus">Minibus</option>
                <option value="Luxury">Luxury</option>
                <option value="Luxury Bus">Luxury Bus</option>
                <option value="Bus">Bus</option>
                <option value="Van">Van</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Base Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500" />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Seats</label>
              <input type="number" name="seats" value={formData.seats} onChange={handleChange} required min="1" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500">
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Transmission</label>
              <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500">
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-6 mt-6">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input type="checkbox" name="ac" checked={formData.ac} onChange={handleChange} className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-indigo-600 focus:ring-indigo-500" />
              Air Conditioning (AC)
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input type="checkbox" name="driverIncluded" checked={formData.driverIncluded} onChange={handleChange} className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-indigo-600 focus:ring-indigo-500" />
              Driver Included Default
            </label>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Price Per Day (₹)</label>
              <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Rate Per Hour (₹)</label>
              <input type="number" name="ratePerHour" value={formData.ratePerHour} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Rate Per Km (₹)</label>
              <input type="number" name="ratePerKm" value={formData.ratePerKm} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Min Hours</label>
              <input type="number" name="minHours" value={formData.minHours} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500" />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
            <input type="checkbox" name="priceOnRequest" checked={formData.priceOnRequest} onChange={handleChange} className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-indigo-600 focus:ring-indigo-500" />
            Price on Request (Hide pricing)
          </label>
        </div>

        {/* Media */}
        <div>
          <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-bold text-white">Media & Photos</h2>
            <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 rounded-xl cursor-pointer text-sm font-medium transition-colors">
              {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              <span>{isUploading ? "Uploading to Cloudinary..." : "Upload Photo"}</span>
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={isUploading}
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              Image URLs (comma separated or upload via Cloudinary button above)
            </label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500"
              placeholder="https://res.cloudinary.com/..., https://..."
            />
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800 flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 h-auto text-base rounded-xl font-medium shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center gap-2">
            <Save size={18} />
            {isSubmitting ? "Saving..." : "Save Vehicle"}
          </Button>
        </div>
      </form>
    </div>
  );
}
