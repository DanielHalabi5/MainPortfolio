import { Router } from 'express';
import { getCv, updateCv } from '../controllers/cvController.js';
import { getOverview } from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';
import { cvUpload } from '../middleware/upload.js';

export const adminRoutes = Router();

adminRoutes.get('/overview', protect, getOverview);
adminRoutes.get('/cv', protect, getCv);
adminRoutes.put('/cv', protect, cvUpload.single('cv'), updateCv);
