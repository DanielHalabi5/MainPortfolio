import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import mongoose from 'mongoose';
import { ProjectImage } from '../models/ProjectImage.js';

const uploadRoot = path.join(process.cwd(), 'server', 'uploads');

function requestOrigin(req) {
  return `${req.protocol}://${req.get('host')}`;
}

function extensionFor(file) {
  const originalExtension = path.extname(file.originalname || '').toLowerCase();

  if (originalExtension) {
    return originalExtension;
  }

  const mimeExtensions = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/svg+xml': '.svg'
  };

  return mimeExtensions[file.mimetype] || '.jpg';
}

export async function saveProjectImage(file, req) {
  const fileName = `${Date.now()}-${randomUUID()}${extensionFor(file)}`;
  const image = await ProjectImage.create({
    fileName,
    contentType: file.mimetype,
    data: file.buffer
  });

  return {
    url: `${requestOrigin(req)}/api/uploads/projects/${image._id}`,
    publicId: `mongo:${image._id}`
  };
}

export async function deleteProjectImage(publicId) {
  if (!publicId || publicId.startsWith('http')) return;

  if (publicId.startsWith('mongo:')) {
    await ProjectImage.findByIdAndDelete(publicId.replace('mongo:', ''));
    return;
  }

  const filePath = path.normalize(path.join(uploadRoot, publicId));

  if (!filePath.startsWith(uploadRoot)) {
    return;
  }

  await fs.rm(filePath, { force: true });
}

export async function serveProjectImage(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: 'Image not found' });
    return;
  }

  const image = await ProjectImage.findById(req.params.id);

  if (!image) {
    res.status(404).json({ message: 'Image not found' });
    return;
  }

  res.set({
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Type': image.contentType,
    'Content-Length': image.data.length
  });
  res.send(image.data);
}

export const uploadsDirectory = uploadRoot;
