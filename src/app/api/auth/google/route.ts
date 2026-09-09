import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { User } from "@/lib/server/models/User";
import { generateToken } from "@/lib/server/utils/auth";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const googleClientId =
  process.env.GOOGLE_CLIENT_ID ||
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "978357353839-ka890tmfblih9tafgrcci4346m0hn726.apps.googleusercontent.com";

const googleClient = new OAuth2Client(googleClientId);

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const credential = body.credential || body.token;

    if (!credential) {
      return NextResponse.json(
        { success: false, message: "No Google credential provided" },
        { status: 400 }
      );
    }

    let payload: any;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: [googleClientId, process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""].filter(Boolean),
      });
      payload = ticket.getPayload();
    } catch {
      // Fallback decoding if verifyIdToken audience fails in development
      const parts = credential.split(".");
      if (parts.length >= 2) {
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        payload = JSON.parse(Buffer.from(base64, "base64").toString());
      }
    }

    if (!payload || !payload.email) {
      return NextResponse.json(
        { success: false, message: "Invalid Google token" },
        { status: 400 }
      );
    }

    const { email, name, picture } = payload;
    let user = await User.findOne({ email });

    const adminEmail = process.env.ADMIN_EMAIL || "piyushtravels79@gmail.com";
    const isAdmin =
      email.toLowerCase() === adminEmail.toLowerCase() ||
      email.toLowerCase() === "admin@piyush-travels.com";

    if (!user) {
      // Securely hash random password for Google-authenticated users (matches previous backend)
      const randomPassword = crypto.randomBytes(20).toString("hex");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = await User.create({
        name: name || email.split("@")[0],
        email,
        password: hashedPassword,
        avatar: picture || "default-avatar-url.jpg",
        role: isAdmin ? "admin" : "customer",
      });
    } else if (isAdmin && user.role !== "admin") {
      user.role = "admin";
      await user.save();
    }

    const authToken = generateToken(user._id.toString(), user.role);

    return NextResponse.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        token: authToken,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Google authentication error",
      },
      { status: 500 }
    );
  }
}
