import { Resend } from 'resend';

const jsonHeaders = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: jsonHeaders,
    body: JSON.stringify(body)
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function envValue(key) {
  return process.env[key]?.trim();
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: jsonHeaders };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method not allowed' });
  }

  const RESEND_API_KEY = envValue('RESEND_API_KEY');
  const RESEND_FROM_EMAIL = envValue('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
  const CONTACT_RECEIVER_EMAIL = envValue('CONTACT_RECEIVER_EMAIL');

  if (!RESEND_API_KEY || !CONTACT_RECEIVER_EMAIL) {
    return jsonResponse(500, { message: 'Email is not configured' });
  }

  let payload;

  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, { message: 'Invalid request body' });
  }

  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();
  const message = String(payload.message || '').trim();

  if (!name || !email || !message) {
    return jsonResponse(400, { message: 'Name, email, and message are required' });
  }

  if (!isValidEmail(email)) {
    return jsonResponse(400, { message: 'A valid email is required' });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const result = await resend.emails.send({
      from: `"Portfolio Contact" <${RESEND_FROM_EMAIL}>`,
      to: CONTACT_RECEIVER_EMAIL,
      subject: `New portfolio message from ${name}`,
      replyTo: email,
      text: `${name} (${email}) sent:\n\n${message}`
    });

    if (result?.error) {
      console.error('RESEND ERROR:', JSON.stringify(result.error, null, 2));
      return jsonResponse(500, result.error);
    }

    console.log('RESEND SUCCESS:', result.data);

    return jsonResponse(201, {
      message: 'Message sent successfully',
      id: result.data?.id,
      data: {
        _id: crypto.randomUUID(),
        name,
        email,
        message,
        read: false,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('RESEND ERROR:', JSON.stringify(error, null, 2));
    return jsonResponse(502, {
      message: error.message || 'Message could not be sent',
      error
    });
  }
}
