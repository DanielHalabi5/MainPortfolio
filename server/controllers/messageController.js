import { Message } from '../models/Message.js';
import { Project } from '../models/Project.js';
import { sendContactNotification } from '../utils/mailer.js';

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
