import { Router } from 'express';
import {
  createMessage,
  deleteMessage,
  getMessages,
  updateMessageStatus
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

export const messageRoutes = Router();

messageRoutes.post('/', createMessage);
messageRoutes.get('/', protect, getMessages);
messageRoutes.patch('/:id', protect, updateMessageStatus);
messageRoutes.delete('/:id', protect, deleteMessage);
