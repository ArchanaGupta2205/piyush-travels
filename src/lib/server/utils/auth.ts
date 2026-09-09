import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface DecodedToken {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const generateToken = (id: string, role: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET environment variable is missing in production!");
    }
  }
  return jwt.sign({ id, role }, secret || "dev_secret_piyush_travels_fallback_key", {
    expiresIn: "30d",
  });
};

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    const secret = process.env.JWT_SECRET || "dev_secret_piyush_travels_fallback_key";
    return jwt.verify(token, secret) as DecodedToken;
  } catch {
    return null;
  }
};

export const getAuthUser = (req: NextRequest): DecodedToken | null => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  return verifyToken(token);
};
