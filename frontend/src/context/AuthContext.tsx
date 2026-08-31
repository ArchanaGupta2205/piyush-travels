"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "../lib/api";

import { GoogleOAuthProvider } from "@react-oauth/google";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any, redirectUrl?: string) => Promise<void>;
  register: (data: any, redirectUrl?: string) => Promise<void>;
  googleLogin: (credential: string, redirectUrl?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleAuthResponse = (res: any, redirectUrl?: string) => {
    const userData = res.data;
    setUser({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    });
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    router.push(redirectUrl || "/");
  };

  const login = async (data: any, redirectUrl?: string) => {
    setLoading(true);
    try {
      const res = await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      handleAuthResponse(res, redirectUrl);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any, redirectUrl?: string) => {
    setLoading(true);
    try {
      const res = await fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      handleAuthResponse(res, redirectUrl);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (credential: string, redirectUrl?: string) => {
    setLoading(true);
    try {
      const res = await fetchAPI("/auth/google", {
        method: "POST",
        body: JSON.stringify({ credential }),
      });
      handleAuthResponse(res, redirectUrl);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "dummy-client-id"}>
      <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
