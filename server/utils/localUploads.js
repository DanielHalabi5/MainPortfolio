import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const uploadRoot = path.join(process.cwd(), 'server', 'uploads');
const projectUploadDir = path.join(uploadRoot, 'projects');

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
  await fs.mkdir(projectUploadDir, { recursive: true });

  const fileName = `${Date.now()}-${randomUUID()}${extensionFor(file)}`;
  const relativePath = `projects/${fileName}`;
  const filePath = path.join(projectUploadDir, fileName);

  await fs.writeFile(filePath, file.buffer);

  return {
    url: `${requestOrigin(req)}/uploads/${relativePath}`,
    publicId: relativePath
  };
}

export async function deleteProjectImage(publicId) {
  if (!publicId || publicId.startsWith('http')) return;

  const filePath = path.normalize(path.join(uploadRoot, publicId));

  if (!filePath.startsWith(uploadRoot)) {
    return;
  }

  await fs.rm(filePath, { force: true });
}

export const uploadsDirectory = uploadRoot;
