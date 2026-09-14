"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Mail, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";
  const { user, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in as admin, redirect immediately
  useEffect(() => {
    if (user && user.role === "admin") {
      router.replace(redirect);
    }
  }, [user, router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid administrator credentials.");
      }

      const loggedUser = data.data;

      // Role check: Only allow users with role === 'admin'
      if (loggedUser.role !== "admin") {
        throw new Error("Access Denied: This account is registered as a customer and lacks administrator privileges.");
      }

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", loggedUser.token);

      // Cleanly load the admin dashboard
      window.location.href = redirect;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed. Please check your credentials.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c12] flex flex-col justify-center items-center px-4 py-12 selection:bg-indigo-500/30">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Top return link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Public Website
        </Link>

        <div className="bg-[#121520] border border-zinc-800/80 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          {/* Badge & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 text-white mb-4">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5">
              Piyush Travels Management & Fleet Control
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs sm:text-sm flex items-start gap-2.5 leading-relaxed"
            >
              <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Administrator Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 text-zinc-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@piyush-travels.com"
                  className="w-full bg-[#0d0f17] border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 text-zinc-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0d0f17] border border-zinc-800 rounded-xl pl-10 pr-11 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 h-12 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-indigo-600/20 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                "Authenticate & Sign In"
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
            <p className="text-[11px] text-zinc-500 leading-normal">
              🔒 Restricted access system. Unauthorized access attempts are monitored and recorded.
            </p>
          </div>
        </div>

        {/* Customer login link */}
        <div className="mt-6 text-center text-xs text-zinc-500">
          Not an administrator?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Go to Customer Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0c12] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
          Loading Admin Portal...
        </p>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
