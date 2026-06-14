import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

export const projectRoutes = Router();

projectRoutes.get('/', getProjects);
projectRoutes.get('/:slug', getProject);
projectRoutes.post('/', protect, upload.single('image'), createProject);
projectRoutes.put('/:id', protect, upload.single('image'), updateProject);
projectRoutes.delete('/:id', protect, deleteProject);
