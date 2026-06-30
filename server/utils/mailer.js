import { Resend } from 'resend';

const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev';

function envValue(key) {
  return process.env[key]?.trim();
}

function createResendClient() {
  const RESEND_API_KEY = envValue('RESEND_API_KEY');

  if (!RESEND_API_KEY) {
    return null;
  }

  return new Resend(RESEND_API_KEY);
}

function contactReceiverEmail() {
  return envValue('CONTACT_RECEIVER_EMAIL');
}

function fromEmail() {
  return envValue('RESEND_FROM_EMAIL') || DEFAULT_FROM_EMAIL;
}

function configurationError(message) {
  const error = new Error(message);
  error.status = 500;
  error.details = { message };
  return error;
}

export async function sendResendEmail(email) {
  const resend = createResendClient();

  if (!resend) {
    throw configurationError('Missing RESEND_API_KEY');
  }

  const { data, error } = await resend.emails.send(email);

  if (error) {
    console.error('RESEND ERROR:', JSON.stringify(error, null, 2));
    const resendError = new Error(error.message || 'Resend email failed');
    resendError.status = 500;
    resendError.details = error;
    throw resendError;
  }

  console.log('RESEND SUCCESS:', data);
  return data;
}

export async function sendTestEmail() {
  const to = contactReceiverEmail();

  if (!to) {
    throw configurationError('Missing CONTACT_RECEIVER_EMAIL');
  }

  return sendResendEmail({
    from: `Portfolio <${DEFAULT_FROM_EMAIL}>`,
    to,
    subject: 'Portfolio Test',
    html: '<h2>It works!</h2>'
  });
}

export async function sendContactNotification(message) {
  const to = contactReceiverEmail();

  if (!to) {
    throw configurationError('Missing CONTACT_RECEIVER_EMAIL');
  }

  const data = await sendResendEmail({
    from: `Portfolio Contact <${fromEmail()}>`,
    to,
    subject: `New portfolio message from ${message.name}`,
    replyTo: message.email,
    text: `${message.name} (${message.email}) sent:\n\n${message.message}`
  });

  return { skipped: false, id: data?.id, data };
}

export async function sendContactReply({ to, subject, body }) {
  await sendResendEmail({
    from: `Daniel Halabi <${fromEmail()}>`,
    to,
    subject,
    replyTo: contactReceiverEmail() || fromEmail(),
    text: body
  });

  return { sent: true };
}
