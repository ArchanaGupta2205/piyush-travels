'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from './_components/Sidebar';
import Header from './_components/Header';
import { Loader2 } from 'lucide-react';
import './admin-globals.css';
import './Layout.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const isLoginPage = pathname === '/admin/login';

  // 1. Call all hooks unconditionally at the top level (Rules of Hooks)
  useEffect(() => {
    if (isLoginPage) return;

    if (!loading) {
      if (!user) {
        router.replace('/admin/login?redirect=' + encodeURIComponent(pathname));
      } else if (user.role !== 'admin') {
        router.replace('/dashboard');
      }
    }
  }, [user, loading, router, pathname, isLoginPage]);

  // 2. If on /admin/login, render only the login page without the admin dashboard shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 3. Loading / verifying state
  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0a0c12] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
          Verifying Administrator Privileges...
        </p>
      </div>
    );
  }

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
