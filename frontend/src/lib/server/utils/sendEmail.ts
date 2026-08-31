import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message?: string;
  html?: string;
  pdfBuffer?: Buffer;
  pdfFilename?: string;
}

const sendEmail = async (options: EmailOptions) => {
  const smtpUser = process.env.SMTP_USER || process.env.SMTP_EMAIL;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  if (!process.env.SMTP_HOST || !smtpUser || !smtpPass) {
    console.log(`[Email Mock] To: ${options.email}, Subject: ${options.subject}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions: Record<string, unknown> = {
    from: `${process.env.FROM_NAME || "Piyush Travels"} <${process.env.FROM_EMAIL || "bookings@piyush-travels.com"}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  if (options.pdfBuffer) {
    mailOptions.attachments = [
      {
        filename: options.pdfFilename || "invoice.pdf",
        content: options.pdfBuffer,
      },
    ];
  }

  await transporter.sendMail(mailOptions as nodemailer.SendMailOptions);
};

export default sendEmail;
