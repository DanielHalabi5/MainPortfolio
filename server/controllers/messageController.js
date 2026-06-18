import { Message } from '../models/Message.js';
import { Project } from '../models/Project.js';
import { sendContactNotification, sendContactReply } from '../utils/mailer.js';

function buildReplyDraft(message, replyText) {
  const firstName = message.name.trim().split(/\s+/)[0] || message.name;
  const response = replyText.trim();
  const sentAt = new Date(message.createdAt).toLocaleString();

  return {
    subject: `Re: Portfolio message from ${message.name}`,
    body: [
      `Hi ${firstName},`,
      '',
      response,
      '',
      'Best regards,',
      'Daniel Halabi',
      '',
      '---',
      `Original message from ${message.name} <${message.email}>`,
      `Received: ${sentAt}`,
      '',
      message.message
    ].join('\n')
  };
}

export async function createMessage(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  const savedMessage = await Message.create({ name, email, message });
  await sendContactNotification(savedMessage);

  res.status(201).json({
    message: 'Message sent successfully',
    data: savedMessage
  });
}

export async function getMessages(_req, res) {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json({ messages });
}

export async function updateMessageStatus(req, res) {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { read: req.body.read },
    { new: true, runValidators: true }
  );

  if (!message) {
    return res.status(404).json({ message: 'Message not found' });
  }

  res.json({ message });
}

export async function replyToMessage(req, res) {
  const { replyText } = req.body;

  if (!replyText || !replyText.trim()) {
    return res.status(400).json({ message: 'Reply text is required' });
  }

  const message = await Message.findById(req.params.id);

  if (!message) {
    return res.status(404).json({ message: 'Message not found' });
  }

  const draft = buildReplyDraft(message, replyText);
  await sendContactReply({
    to: message.email,
    subject: draft.subject,
    body: draft.body
  });

  message.read = true;
  await message.save();

  res.json({
    message: 'Reply sent successfully',
    email: {
      to: message.email,
      subject: draft.subject,
      body: draft.body
    },
    data: message
  });
}

export async function deleteMessage(req, res) {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    return res.status(404).json({ message: 'Message not found' });
  }

  res.json({ message: 'Message deleted' });
}

export async function getOverview(_req, res) {
  const [totalProjects, totalMessages, unreadMessages] = await Promise.all([
    Project.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ read: false })
  ]);

  res.json({
    totalProjects,
    totalMessages,
    unreadMessages
  });
}
