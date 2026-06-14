import { Router } from 'express';
import { getOverview } from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

export const adminRoutes = Router();

adminRoutes.get('/overview', protect, getOverview);
