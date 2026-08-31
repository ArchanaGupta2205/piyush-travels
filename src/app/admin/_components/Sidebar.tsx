'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Car, Calendar, Users, LogOut, Menu, X, Bell } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (val: boolean) => void }) => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Vehicles', icon: Car, path: '/admin/vehicles' },
    { name: 'Bookings', icon: Calendar, path: '/admin/bookings' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Notifications', icon: Bell, path: '/admin/notifications' },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)}></div>
      <aside className={`sidebar glass-panel ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header flex-between">
          <div className="logo text-gradient">Piyush Admin</div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>
            <X size={24} color="var(--text-primary)" />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.path} 
                  className={`nav-link ${
                    item.path === '/admin' 
                      ? pathname === '/admin' 
                      : pathname.startsWith(item.path) 
                        ? 'active' 
                        : ''
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-link logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
