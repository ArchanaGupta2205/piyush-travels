import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { User } from "@/lib/server/models/User";
import sendEmail from "@/lib/server/utils/sendEmail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "There is no user with that email" },
        { status: 404 }
      );
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.piyush-travels.com";
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) requested a password reset. Please click on the link below:\n\n${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Token - Piyush Travels",
        message,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2>Password Reset Request</h2>
            <p>You requested a password reset for your Piyush Travels account.</p>
            <p><a href="${resetUrl}" style="background: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a></p>
            <p>Or paste this link in your browser: ${resetUrl}</p>
            <p>This link expires in 10 minutes.</p>
          </div>
        `,
      });

      return NextResponse.json({
        success: true,
        data: "Email sent successfully",
      });
    } catch {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return NextResponse.json(
        { success: false, message: "Email could not be sent" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
