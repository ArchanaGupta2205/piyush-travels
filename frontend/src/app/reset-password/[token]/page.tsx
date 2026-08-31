"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (pass: string) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pass);
    
    if (pass.length < minLength) return "Password must be at least 8 characters long.";
    if (!hasUpper) return "Password must contain at least one uppercase letter.";
    if (!hasLower) return "Password must contain at least one lowercase letter.";
    if (!hasNumber) return "Password must contain at least one number.";
    if (!hasSpecial) return "Password must contain at least one special character.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    try {
      await fetchAPI(`/auth/reset-password/${token}`, {
        method: "PUT",
        body: JSON.stringify({ password }),
      });
      setMessage("Password successfully reset! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. The token may be invalid or expired.");
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
            Set New Password
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Please enter your new secure password below.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm p-3 rounded-lg text-center">
              {message}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">New Password</label>
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
              <p className="mt-2 text-xs text-zinc-500">
                Must be at least 8 characters with uppercase, lowercase, number, and special character.
              </p>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors border-0" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
