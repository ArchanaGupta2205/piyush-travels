"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // Default dark for luxury feel

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Check initial theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme("light");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // In a real app with next-themes, this would trigger document class change
    // For now, since we control the main container, we rely on standard tailwind dark mode if configured,
    // or just toggle a class on body.
    if (newTheme === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Fleet", href: "/vehicles" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                PiyushTravels
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                    scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 border-l pl-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  scrolled 
                    ? "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {user ? (
                <div className="flex items-center space-x-4">
                  <span className={`text-sm ${scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"}`}>
                    Hi, {user.name.split(" ")[0]}
                  </span>
                  <Link href={user.role === "admin" ? "/admin" : "/dashboard"}>
                    <Button variant="outline" className={scrolled ? "" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}>
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className={scrolled ? "" : "text-white hover:bg-white/20"}>
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${scrolled ? "text-gray-900 dark:text-white" : "text-white"}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mt-4 flex flex-col space-y-3">
                <button
                  onClick={toggleTheme}
                  className="flex items-center px-3 py-2 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md"
                >
                  {theme === "dark" ? <><Sun size={18} className="mr-2"/> Light Mode</> : <><Moon size={18} className="mr-2"/> Dark Mode</>}
                </button>

                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">Signed in as {user.email}</div>
                    <Link href={user.role === "admin" ? "/admin" : "/dashboard"} onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full justify-start" variant="outline">Dashboard</Button>
                    </Link>
                    <Button variant="destructive" className="w-full" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign in</Button>
                    </Link>
                    <Link href="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Sign up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
