import { Project } from '../models/Project.js';
import { deleteProjectImage, saveProjectImage } from '../utils/localUploads.js';
import { slugify } from '../utils/slugify.js';

function parseTechnologies(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

function projectPayload(body) {
  const title = body.title?.trim();
  const slug = body.slug ? slugify(body.slug) : slugify(title || '');

  return {
    title,
    slug,
    category: body.category,
    description: body.description?.trim(),
    technologies: parseTechnologies(body.technologies),
    githubUrl: body.githubUrl?.trim() || '',
    liveUrl: body.liveUrl?.trim() || '',
    figmaUrl: body.figmaUrl?.trim() || '',
    featured: body.featured === true || body.featured === 'true'
  };
}

function shouldRemoveImage(body) {
  return body.removeImage === true || body.removeImage === 'true';
}

export async function getProjects(req, res) {
  const { category } = req.query;
  const query = category && category !== 'All' ? { category } : {};
  const projects = await Project.find(query).sort({ featured: -1, createdAt: -1 });
  res.json({ projects });
}

export async function getProject(req, res) {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.json({ project });
}

export async function createProject(req, res) {
  const payload = projectPayload(req.body);

  if (!payload.title || !payload.slug || !payload.category || !payload.description) {
    return res.status(400).json({ message: 'Title, category, and description are required' });
  }

  if (req.file) {
    payload.image = await saveProjectImage(req.file, req);
  } else if (req.body.imageUrl?.trim()) {
    payload.image = { url: req.body.imageUrl.trim(), publicId: '' };
  }

  const project = await Project.create(payload);
  res.status(201).json({ project });
}

export async function updateProject(req, res) {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const payload = projectPayload({ ...project.toObject(), ...req.body });

  if (req.file) {
    if (project.image?.publicId) {
      await deleteProjectImage(project.image.publicId);
    }

    payload.image = await saveProjectImage(req.file, req);
  } else if (shouldRemoveImage(req.body)) {
    if (project.image?.publicId) {
      await deleteProjectImage(project.image.publicId);
    }

    payload.image = { url: '', publicId: '' };
  } else if (req.body.imageUrl?.trim()) {
    if (project.image?.publicId) {
      await deleteProjectImage(project.image.publicId);
    }

    payload.image = { url: req.body.imageUrl.trim(), publicId: '' };
  }

  const updatedProject = await Project.findByIdAndUpdate(project._id, payload, {
    new: true,
    runValidators: true
  });

  res.json({ project: updatedProject });
}

export async function deleteProject(req, res) {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (project.image?.publicId) {
    await deleteProjectImage(project.image.publicId);
  }

  await project.deleteOne();
  res.json({ message: 'Project deleted' });
}
