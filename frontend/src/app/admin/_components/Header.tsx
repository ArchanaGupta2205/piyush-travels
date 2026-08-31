'use client';

import { Bell, Menu } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import './Header.css';

const Header = ({ setMobileOpen }: { setMobileOpen: (val: boolean) => void }) => {
  const { user } = useAuth();
  return (
    <header className="header glass-panel">
      <div className="header-left">
        <button className="menu-btn" onClick={() => setMobileOpen(true)}>
          <Menu size={24} color="var(--text-primary)" />
        </button>
       
      </div>
      
      <div className="header-right">
        <Link href="/admin/notifications" className="notification-btn">
          <Bell size={20} color="var(--text-primary)" />
          <span className="notification-badge"></span>
        </Link>
        
        <div className="profile-menu">
          <div className="profile-info">
            <span className="name">{user?.name || "Admin"}</span>
            <span className="role capitalize">{user?.role || "Superadmin"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
