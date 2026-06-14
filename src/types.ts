export type ProjectCategory = 'Development' | 'UI/UX';

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  image?: {
    url?: string;
    publicId?: string;
  };
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  figmaUrl?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type MessageFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ProjectFilter = 'All' | ProjectCategory;
