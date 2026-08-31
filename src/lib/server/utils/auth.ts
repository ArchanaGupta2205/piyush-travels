import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface DecodedToken {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const generateToken = (id: string, role: string) => {
  const secret = process.env.JWT_SECRET || "default_jwt_secret_piyush_travels_production";
  return jwt.sign({ id, role }, secret, {
    expiresIn: "30d",
  });
};

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    const secret = process.env.JWT_SECRET || "default_jwt_secret_piyush_travels_production";
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
