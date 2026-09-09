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
  const smtpUser = process.env.SMTP_USER || process.env.SMTP_EMAIL || "piyushtravels79@gmail.com";
  const rawPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "";
  const smtpPass = rawPass.trim();
  const fromEmail = process.env.FROM_EMAIL || smtpUser;
  const fromName = process.env.FROM_NAME || "Piyush Travels";

  if (!smtpPass) {
    console.log(`[Email Mock - Set SMTP_PASS in .env.local to send live emails] To: ${options.email}, Subject: ${options.subject}`);
    return;
  }

  const transporter = process.env.SMTP_HOST && process.env.SMTP_HOST !== "smtp.gmail.com"
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

  const mailOptions: Record<string, unknown> = {
    from: `"${fromName}" <${fromEmail}>`,
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
