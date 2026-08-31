"use client";

import { Bell, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-zinc-950/50 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
      
      {/* Mobile Menu Button (mock) */}
      <div className="md:hidden flex items-center">
        <button className="text-zinc-400 hover:text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Empty space for layout balance if needed, or just let flex handle it */}
      <div></div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="relative text-zinc-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-zinc-950"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">{user?.name || "Guest User"}</p>
            <p className="text-xs text-zinc-500 capitalize">{user?.role || "Member"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
