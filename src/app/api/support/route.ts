import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { SupportTicket } from "@/lib/server/models/SupportTicket";
import { Notification } from "@/lib/server/models/Notification";
import sendEmail from "@/lib/server/utils/sendEmail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, bookingId, message } = body;

    // Validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid name (at least 2 characters)" },
        { status: 400 }
      );
    }

    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        return NextResponse.json(
          { success: false, message: "Please provide a valid email address" },
          { status: 400 }
        );
      }
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      return NextResponse.json(
        { success: false, message: "Please provide a message of at least 5 characters" },
        { status: 400 }
      );
    }

    const ticket = await SupportTicket.create({
      name: trimmedName,
      email: trimmedEmail || undefined,
      phone: trimmedPhone || undefined,
      bookingId: bookingId?.trim() || undefined,
      message: trimmedMessage,
    });

    try {
      await Notification.create({
        userEmail: "admin@piyush-travels.com",
        title: "New Contact / Support Message",
        message: `Message from ${trimmedName}${trimmedEmail ? ` (${trimmedEmail})` : ""}: "${trimmedMessage.substring(0, 80)}..."`,
        type: "info",
      });
    } catch (notifErr) {
      console.warn("Could not create admin notification:", notifErr);
    }

    // Send live email alert to piyushtravels79@gmail.com
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "piyushtravels79@gmail.com";
      const submittedTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 24px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 0.5px;">Piyush Travels</h2>
            <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">New Customer Inquiry Received</p>
          </div>
          
          <div style="padding: 24px;">
            <p style="font-size: 15px; color: #374151; margin-top: 0; line-height: 1.5;">
              You have received a new contact inquiry from your website:
            </p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563; width: 35%;">Customer Name:</td>
                <td style="padding: 10px 0; color: #111827; font-weight: 600;">${trimmedName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Email Address:</td>
                <td style="padding: 10px 0; color: #111827;">
                  ${trimmedEmail ? `<a href="mailto:${trimmedEmail}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">${trimmedEmail}</a>` : "<em>Not provided</em>"}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Phone Number:</td>
                <td style="padding: 10px 0; color: #111827;">
                  ${trimmedPhone ? `<a href="tel:${trimmedPhone}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">${trimmedPhone}</a>` : "<em>Not provided</em>"}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Date & Time:</td>
                <td style="padding: 10px 0; color: #111827;">${submittedTime} IST</td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <h4 style="margin: 0 0 8px; color: #111827; font-size: 15px;">Customer Message:</h4>
              <div style="background-color: #f9fafb; border-left: 4px solid #4f46e5; padding: 14px 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${trimmedMessage}</div>
            </div>

            ${trimmedPhone || trimmedEmail ? `
              <div style="margin-top: 28px; text-align: center;">
                ${trimmedPhone ? `<a href="tel:${trimmedPhone}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-right: 8px; font-size: 14px;">Call Customer</a>` : ""}
                ${trimmedEmail ? `<a href="mailto:${trimmedEmail}?subject=Re: Inquiry with Piyush Travels" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply by Email</a>` : ""}
              </div>
            ` : ""}
          </div>
          
          <div style="background-color: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6;">
            Piyush Travels • Luxury Car & Bus Rental Delhi NCR
          </div>
        </div>
      `;

      await sendEmail({
        email: adminEmail,
        subject: `🚨 New Contact Inquiry from ${trimmedName} - Piyush Travels`,
        message: `New Inquiry from ${trimmedName}\nEmail: ${trimmedEmail || "N/A"}\nPhone: ${trimmedPhone || "N/A"}\nMessage:\n${trimmedMessage}`,
        html: adminEmailHtml,
      });

      // Also send an automated confirmation copy to the user if they provided an email address
      if (trimmedEmail) {
        const userEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 24px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Piyush Travels</h2>
              <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">We Have Received Your Message</p>
            </div>
            <div style="padding: 24px; color: #374151; font-size: 15px; line-height: 1.6;">
              <p>Dear <strong>${trimmedName}</strong>,</p>
              <p>Thank you for reaching out to <strong>Piyush Travels</strong>. We have received your inquiry and our reservations team will contact you within 2 to 4 business hours.</p>
              <div style="background-color: #f9fafb; border-left: 4px solid #4f46e5; padding: 12px 16px; border-radius: 6px; font-size: 14px; margin: 16px 0; color: #1f2937;">
                <em>"${trimmedMessage}"</em>
              </div>
              <p>For urgent bookings or immediate assistance, our 24/7 reservation desk is always reachable at <strong>+91 98765 43210</strong>.</p>
              <p style="margin-bottom: 0;">Warm regards,<br><strong>Piyush Travels Team</strong></p>
            </div>
          </div>
        `;

        await sendEmail({
          email: trimmedEmail,
          subject: "We received your message - Piyush Travels",
          message: `Dear ${trimmedName},\n\nThank you for contacting Piyush Travels. We have received your message and will get back to you shortly.\n\nWarm regards,\nPiyush Travels Team`,
          html: userEmailHtml,
        }).catch((userErr) => console.warn("Could not send confirmation copy to user:", userErr));
      }
    } catch (emailErr) {
      console.warn("Could not send contact email notification:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully. We will get back to you shortly.",
        data: ticket,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Support API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error while sending message",
      },
      { status: 500 }
    );
  }
}
