import { Router } from 'express';
import {
  createMessage,
  deleteMessage,
  getMessages,
  replyToMessage,
  updateMessageStatus
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

export const messageRoutes = Router();

messageRoutes.post('/', createMessage);
messageRoutes.get('/', protect, getMessages);
messageRoutes.post('/:id/reply', protect, replyToMessage);
messageRoutes.patch('/:id', protect, updateMessageStatus);
messageRoutes.delete('/:id', protect, deleteMessage);
