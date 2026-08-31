"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  CalendarDays, 
  MapPin, 
  Star, 
  HelpCircle, 
  LogOut,
  Car
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: CalendarDays, label: "My Bookings", href: "/dashboard/bookings" },
  { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col fixed left-0 top-0 z-40 hidden md:flex">
      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-2">
          <Car className="text-purple-500" size={28} />
          <span className="text-xl font-bold text-white tracking-tight">Piyush Travels</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-purple-500/10 text-purple-400 font-semibold" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <item.icon size={20} className={isActive ? "text-purple-400" : ""} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-zinc-800">
        <button 
          onClick={() => {
            // Optional: clear auth tokens here if using them
            window.location.href = "/";
          }}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
