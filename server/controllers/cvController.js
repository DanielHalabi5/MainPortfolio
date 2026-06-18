import fs from 'fs/promises';
import path from 'path';

const cvFileName = 'DanielHalabiCV.pdf';
const publicCvPath = path.join(process.cwd(), 'public', cvFileName);
const distCvPath = path.join(process.cwd(), 'dist', cvFileName);

async function fileInfo(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return {
      fileName: cvFileName,
      url: `/${cvFileName}`,
      size: stats.size,
      updatedAt: stats.mtime.toISOString()
    };
  } catch {
    return {
      fileName: cvFileName,
      url: `/${cvFileName}`,
      size: 0,
      updatedAt: null
    };
  }
}

async function writeIfDirectoryExists(filePath, buffer) {
  try {
    await fs.access(path.dirname(filePath));
    await fs.writeFile(filePath, buffer);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

export async function getCv(_req, res) {
  res.json({ cv: await fileInfo(publicCvPath) });
}

export async function updateCv(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'CV PDF is required' });
  }

  await fs.writeFile(publicCvPath, req.file.buffer);
  await writeIfDirectoryExists(distCvPath, req.file.buffer);

  res.json({
    message: 'CV updated successfully',
    cv: await fileInfo(publicCvPath)
  });
}
