import nodemailer from 'nodemailer';

export async function sendContactNotification(message) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    subject: `New portfolio message from ${message.name}`,
    replyTo: message.email,
    text: `${message.name} (${message.email}) sent:\n\n${message.message}`
  });

  return { skipped: false };
}
