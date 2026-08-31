"use client";

import { useState, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

function LoginForm() {
  const { login, googleLogin, loading } = useAuth();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || undefined;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password }, redirect);
    } catch (err: any) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-800"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Welcome back to Piyush Travels
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                className="block w-full rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3 transition-colors outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3 pr-10 transition-colors outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors border-0" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center w-full">
           <GoogleLogin
              onSuccess={async (credentialResponse) => {
                if (credentialResponse.credential) {
                  try {
                    await googleLogin(credentialResponse.credential, redirect);
                  } catch (err: any) {
                    setError(err.message || "Google login failed");
                  }
                }
              }}
              onError={() => {
                setError("Google Login Failed");
              }}
              theme="filled_black"
              size="large"
              shape="rectangular"
              text="signin_with"
           />
        </div>
        <div className="text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link href={redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : "/register"} className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Register here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
