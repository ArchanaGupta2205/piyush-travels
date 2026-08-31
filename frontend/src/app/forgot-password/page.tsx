"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const validateEmail = (emailStr: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setPreviewUrl("");
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const resData = await fetchAPI("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMessage("If an account exists with that email, a password reset link has been sent.");
      if (resData.previewUrl) {
        setPreviewUrl(resData.previewUrl);
      }
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
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
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Enter your email to receive a reset link.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm p-3 rounded-lg text-center flex flex-col gap-2">
              <span>{message}</span>
              {previewUrl && (
                <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-semibold text-purple-400 underline hover:text-purple-300 transition-colors"
                >
                  Click here to view Test Email
                </a>
              )}
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
          </div>

          <div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors border-0" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        </form>
        <div className="text-center text-sm text-zinc-400">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
