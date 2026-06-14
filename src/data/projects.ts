export type ProjectVariant = 'task' | 'shop' | 'blog' | 'finance' | 'mobile' | 'travel';

export type DeveloperProject = {
  title: string;
  description: string;
  stack: string[];
  demoUrl?: string;
  githubUrl: string;
  variant: ProjectVariant;
};

export type UiProject = {
  title: string;
  description: string;
  figmaUrl?: string;
  variant: ProjectVariant;
};

export type ProjectFilter = 'all' | 'dev' | 'ui';

export const developerProjects: DeveloperProject[] = [
  {
    title: 'QuickShop Ecom',
    description: 'A multi-store e-commerce shop focused on clean product browsing, seller workflows, and a fast buying experience.',
    stack: ['Vite', 'TypeScript', 'Tailwind', 'MongoDB', 'Mongoose'],
    demoUrl: 'https://qu1ckshop.netlify.app/',
    githubUrl: 'https://github.com/DanielHalabi5/E-Commerce-QuickShop',
    variant: 'shop'
  },
  {
    title: 'Family Task Website',
    description: 'A simple and smart family task manager that helps everyone stay organized around shared home responsibilities.',
    stack: ['React', 'Tailwind', 'Node.js', 'Prisma', 'Supabase'],
    githubUrl: 'https://github.com/DanielHalabi5/family-task-website',
    variant: 'task'
  },
  {
    title: 'Family Shopping List',
    description: 'A shared grocery list app that helps families plan, update, and manage shopping needs together in real time.',
    stack: ['React', 'Tailwind', 'Node.js', 'Prisma', 'Supabase'],
    githubUrl: 'https://github.com/DanielHalabi5/family-shopping-list',
    variant: 'blog'
  }
];

export const uiProjects: UiProject[] = [
  {
    title: 'Municipality of Aley Design',
    description: 'A civic website interface concept shaped around clear access to services, announcements, and municipal information.',
    variant: 'travel'
  },
  {
    title: 'Municipality of Mashghara Design',
    description: 'A municipality website design focused on readability, trust, local identity, and easy navigation for residents.',
    figmaUrl: 'https://www.figma.com/design/gPD3Y0CRTxaFciwJe59gGo/Mashghara-Municipality?node-id=9-7&t=YrQPpR4w7zT2vi2s-1',
    variant: 'finance'
  },
  {
    title: 'Naveo Tourism App',
    description: 'A cruise ship tours booking app concept with a polished booking flow, destination discovery, and mobile-first UX.',
    figmaUrl: 'https://www.figma.com/design/eJxK8Gej45NnIXARqQTpTQ/Naveo---Tourism-App?node-id=0-1&t=lSrQ4O9kGc8dov7h-1',
    variant: 'mobile'
  }
];
