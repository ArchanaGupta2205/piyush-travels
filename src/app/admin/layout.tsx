'use client';

import { useState } from 'react';
import Sidebar from './_components/Sidebar';
import Header from './_components/Header';
import './admin-globals.css';
import './Layout.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="admin-root">
      <div className="admin-layout">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="main-content">
          <Header setMobileOpen={setMobileOpen} />
          <main className="page-content">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
