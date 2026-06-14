import { Router } from 'express';
import { login, logout, me } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

export const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/logout', protect, logout);
authRoutes.get('/me', protect, me);
