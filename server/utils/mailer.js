import nodemailer from 'nodemailer';

function createSmtpTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

export async function sendContactNotification(message) {
  const { SMTP_USER, CONTACT_EMAIL } = process.env;
  const transporter = createSmtpTransporter();

  if (!transporter || !CONTACT_EMAIL) {
    return { skipped: true };
  }

  await transporter.sendMail({
    from: `"Portfolio Contact" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    subject: `New portfolio message from ${message.name}`,
    replyTo: message.email,
    text: `${message.name} (${message.email}) sent:\n\n${message.message}`
  });

  return { skipped: false };
}

export async function sendContactReply({ to, subject, body }) {
  const { SMTP_USER, CONTACT_EMAIL } = process.env;
  const transporter = createSmtpTransporter();

  if (!transporter) {
    throw new Error('SMTP is not configured');
  }

  await transporter.sendMail({
    from: `"Daniel Halabi" <${SMTP_USER}>`,
    to,
    subject,
    replyTo: CONTACT_EMAIL || SMTP_USER,
    text: body
  });

  return { sent: true };
}
