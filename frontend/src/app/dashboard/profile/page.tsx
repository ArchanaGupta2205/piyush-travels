"use client";

import { useEffect, useState } from "react";
import { User, Mail } from "lucide-react";
import { fetchAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await fetchAPI("/auth/me");
      if (res.success) {
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
        });
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex justify-center items-center h-[40vh]">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-zinc-400">View your personal information and account settings.</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm">
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <User size={16} /> Full Name
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                readOnly
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 outline-none cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <Mail size={16} /> Email Address
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                readOnly
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 outline-none cursor-not-allowed"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
