import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: EmailOptions) => {
  // Use real SMTP config if available, otherwise generate a test Ethereal account
  let transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } else {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }

  const message = {
    from: `${process.env.FROM_NAME || "Piyush Travels"} <${process.env.FROM_EMAIL || "noreply@piyushtravels.com"}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `<p>${options.message.replace(/\n/g, '<br>')}</p>`, // Convert basic newlines to br tags
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
  
  let previewUrl = null;
  // If we are using Ethereal, print the preview URL to the console so the user can easily test it
  if (!process.env.SMTP_HOST) {
    previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("Preview URL: %s", previewUrl);
  }

  return previewUrl;
};

export default sendEmail;
