import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Admin } from './models/Admin.js';
import { Project } from './models/Project.js';

dotenv.config();

const projects = [
  {
    title: 'QuickShop Ecom',
    slug: 'quickshop-ecom',
    category: 'Development',
    description: 'A multi-store e-commerce shop focused on clean product browsing, seller workflows, and a fast buying experience.',
    technologies: ['Vite', 'TypeScript', 'Tailwind', 'MongoDB', 'Mongoose'],
    githubUrl: 'https://github.com/DanielHalabi5/E-Commerce-QuickShop',
    liveUrl: 'https://qu1ckshop.netlify.app/',
    featured: true
  },
  {
    title: 'Family Task Website',
    slug: 'family-task-website',
    category: 'Development',
    description: 'A family task manager that helps everyone stay organized around shared home responsibilities.',
    technologies: ['React', 'Tailwind', 'Node.js', 'Prisma', 'Supabase'],
    githubUrl: 'https://github.com/DanielHalabi5/family-task-website',
    featured: true
  },
  {
    title: 'Family Shopping List',
    slug: 'family-shopping-list',
    category: 'Development',
    description: 'A shared grocery list app that helps families plan, update, and manage shopping needs together in real time.',
    technologies: ['React', 'Tailwind', 'Node.js', 'Prisma', 'Supabase'],
    githubUrl: 'https://github.com/DanielHalabi5/family-shopping-list'
  },
  {
    title: 'Municipality of Aley Design',
    slug: 'municipality-of-aley-design',
    category: 'UI/UX',
    description: 'A civic website interface concept shaped around clear access to services, announcements, and municipal information.',
    technologies: ['Figma', 'UX Research', 'Responsive Design'],
    featured: true
  },
  {
    title: 'Municipality of Mashghara Design',
    slug: 'municipality-of-mashghara-design',
    category: 'UI/UX',
    description: 'A municipality website design focused on readability, trust, local identity, and easy navigation for residents.',
    technologies: ['Figma', 'Information Architecture', 'UI Design'],
    figmaUrl: 'https://www.figma.com/design/gPD3Y0CRTxaFciwJe59gGo/Mashghara-Municipality?node-id=9-7&t=YrQPpR4w7zT2vi2s-1'
  },
  {
    title: 'Naveo Tourism App',
    slug: 'naveo-tourism-app',
    category: 'UI/UX',
    description: 'A cruise ship tours booking app concept with a polished booking flow, destination discovery, and mobile-first UX.',
    technologies: ['Figma', 'Mobile UX', 'Prototyping'],
    figmaUrl: 'https://www.figma.com/design/eJxK8Gej45NnIXARqQTpTQ/Naveo---Tourism-App?node-id=0-1&t=lSrQ4O9kGc8dov7h-1',
    featured: true
  }
];

async function seed() {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || 'Daniel Halabi';

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required to seed an admin');
  }

  const normalizedEmail = adminEmail.toLowerCase();
  const existingAdmin = await Admin.findOne({ email: normalizedEmail });

  if (existingAdmin) {
    existingAdmin.name = adminName;
    existingAdmin.password = adminPassword;
    await existingAdmin.save();
  } else {
    await Admin.create({
      name: adminName,
      email: normalizedEmail,
      password: adminPassword
    });
  }

  for (const project of projects) {
    await Project.findOneAndUpdate({ slug: project.slug }, project, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
  }

  console.log('Seed completed');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
