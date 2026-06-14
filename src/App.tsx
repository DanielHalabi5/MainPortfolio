import { ArrowLeft, ArrowUpRight, Code2, Download, ExternalLink, Layers3, Loader2, Lock, Mail, Menu, MonitorSmartphone, Palette, Send, Sparkles, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { FaFigma, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiMongodb, SiNodedotjs, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { clearAdminToken, createProject, deleteMessage, deleteProject, fetchMessages, fetchOverview, fetchProject, fetchProjects, getAdminToken, loginAdmin, sendMessage, updateMessageRead, updateProject } from './lib/api';
import type { DashboardOverview, Message, MessageFormValues, Project, ProjectFilter, ProjectFormValues } from './types';

const filters: ProjectFilter[] = ['All', 'Development', 'UI/UX'];

const skills = [
  { label: 'React + Vite', icon: SiReact },
  { label: 'TypeScript', icon: SiTypescript },
  { label: 'Tailwind CSS', icon: SiTailwindcss },
  { label: 'Node.js + Express', icon: SiNodedotjs },
  { label: 'MongoDB + Mongoose', icon: SiMongodb },
  { label: 'Figma UI/UX', icon: FaFigma }
];

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [hash, pathname]);

  return null;
}

function Logo() {
  return (
    <Link className="logo-lockup" to="/" aria-label="Daniel Halabi home">
      <span className="logo-frame">
        <img src="/dh-monogram.png" alt="" />
      </span>
      <span>
        <span className="brand-name">Daniel Halabi</span>
        <span className="block text-xs text-muted">Full Stack Developer & UI/UX Designer</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: 'About', to: '/#about' },
    { label: 'Skills', to: '/#skills' },
    { label: 'Projects', to: '/#projects' },
    { label: 'Contact', to: '/#contact' }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {nav.map((item) => (
            <Link className="nav-link" key={item.label} to={item.to}>
              {item.label}
            </Link>
          ))}
          <Link className="nav-link" to="/admin/login">
            <Lock size={14} /> Admin
          </Link>
        </nav>
        <a className="btn-primary hidden md:inline-flex" href="/DanielHalabiCV.pdf" download>
          <Download size={16} /> Download CV
        </a>
        <button className="icon-button md:hidden" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu size={20} />
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-surface px-5 py-4 md:hidden">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-text">Menu</span>
            <button className="icon-button" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="grid gap-3">
            {nav.map((item) => (
              <Link className="mobile-link" key={item.label} to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link className="mobile-link" to="/admin/login" onClick={() => setOpen(false)}>
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <span className="eyebrow"><Sparkles size={14} /> Available for select projects</span>
        <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-6xl">
          Building developer-focused products with polished UI/UX.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
          I am Daniel Halabi, a full-stack developer and UI/UX designer creating fast React interfaces,
          practical Node and MongoDB backends, and clean product experiences that feel easy to use.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="btn-primary" to="/#projects">
            View Projects <ArrowUpRight size={16} />
          </Link>
          <Link className="btn-secondary" to="/#contact">
            Contact Me <Mail size={16} />
          </Link>
        </div>
      </motion.div>
      <motion.div className="hero-panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }}>
        <div className="panel-header">
          <span />
          <span />
          <span />
        </div>
        <div className="panel-grid">
          <div>
            <small>Role</small>
            <strong>Full Stack</strong>
          </div>
          <div>
            <small>Design</small>
            <strong>UI/UX</strong>
          </div>
          <div>
            <small>Stack</small>
            <strong>MERN</strong>
          </div>
          <div>
            <small>Focus</small>
            <strong>Products</strong>
          </div>
        </div>
        <div className="code-card">
          <span>const portfolio = &#123;</span>
          <span>  frontend: 'React + TypeScript',</span>
          <span>  backend: 'Express + MongoDB',</span>
          <span>  design: 'Figma + usability'</span>
          <span>&#125;</span>
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="section-heading">
        <span className="eyebrow"><Layers3 size={14} /> About</span>
        <h2>Practical engineering with a designer's eye.</h2>
      </div>
      <div className="about-grid">
        <p>
          I work across the full product path: shaping user flows, designing interfaces, building frontends,
          connecting APIs, and making sure the final result is clear, responsive, and easy to maintain.
        </p>
        <div className="metric-grid">
          <span><strong>6+</strong> Featured projects</span>
          <span><strong>2</strong> Core disciplines</span>
          <span><strong>MERN</strong> Preferred stack</span>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-heading">
        <span className="eyebrow"><Code2 size={14} /> Skills</span>
        <h2>Tools I use to ship reliable digital products.</h2>
      </div>
      <div className="skill-grid">
        {skills.map(({ label, icon: Icon }) => (
          <div className="skill-card" key={label}>
            <Icon size={24} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.image?.url) {
    return <img className="project-image" src={project.image.url} alt={project.title} />;
  }

  return (
    <div className="project-placeholder">
      {project.category === 'Development' ? <MonitorSmartphone size={34} /> : <Palette size={34} />}
      <span>{project.category}</span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article className="project-card" whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 250, damping: 22 }}>
      <ProjectVisual project={project} />
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="category-pill">{project.category}</span>
        {project.featured && <span className="featured-pill">Featured</span>}
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-row">
        {project.technologies.slice(0, 4).map((tech) => <span className="tag" key={tech}>{tech}</span>)}
      </div>
      <div className="card-actions">
        <Link className="btn-card" to={`/projects/${project.slug}`}>
          Details <ArrowUpRight size={15} />
        </Link>
        {project.githubUrl && <a className="icon-link" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={17} /></a>}
        {project.liveUrl && <a className="icon-link" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Live demo"><ExternalLink size={17} /></a>}
        {project.figmaUrl && <a className="icon-link" href={project.figmaUrl} target="_blank" rel="noreferrer" aria-label="Figma"><FaFigma size={17} /></a>}
      </div>
    </motion.article>
  );
}

function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchProjects(filter)
      .then((items) => {
        if (active) setProjects(items);
      })
      .catch(() => {
        if (active) setError('Projects could not be loaded. Make sure the API and MongoDB are running.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [filter]);

  return (
    <section className="section" id="projects">
      <div className="section-heading centered">
        <span className="eyebrow"><MonitorSmartphone size={14} /> Projects</span>
        <h2>Dynamic work pulled from MongoDB.</h2>
        <p>Filter development builds and UI/UX case studies from the backend project collection.</p>
      </div>
      <div className="filter-tabs">
        {filters.map((item) => (
          <button
            className={filter === item ? 'active' : ''}
            key={item}
            type="button"
            onClick={() => {
              setFilter(item);
              setLoading(true);
              setError('');
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {loading && <StateMessage icon={Loader2} title="Loading projects" message="Fetching the latest portfolio projects..." spinning />}
      {error && <StateMessage title="Project API unavailable" message={error} />}
      {!loading && !error && (
        <div className="projects-grid">
          {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
          {projects.length === 0 && <StateMessage title="No projects found" message="Try another filter or add projects from the admin dashboard." />}
        </div>
      )}
    </section>
  );
}

function StateMessage({ title, message, icon: Icon, spinning = false }: { title: string; message: string; icon?: ComponentType<{ size?: number; className?: string }>; spinning?: boolean }) {
  return (
    <div className="state-message">
      {Icon && <Icon className={spinning ? 'animate-spin' : ''} size={22} />}
      <strong>{title}</strong>
      <span>{message}</span>
    </div>
  );
}

function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<MessageFormValues>();
  const [status, setStatus] = useState('');
  const [failed, setFailed] = useState(false);

  const onSubmit: SubmitHandler<MessageFormValues> = async (values) => {
    setStatus('');
    setFailed(false);

    try {
      await sendMessage(values);
      setStatus('Message sent successfully. I will get back to you soon.');
      reset();
    } catch {
      setFailed(true);
      setStatus('Message could not be sent right now. Please try again later.');
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div>
        <span className="eyebrow"><Mail size={14} /> Contact</span>
        <h2>Have a product, dashboard, or interface in mind?</h2>
        <p>Send a message and it will be stored in MongoDB for dashboard review, with email notification support on the backend.</p>
        <div className="social-row">
          <a href="https://github.com/DanielHalabi5" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="https://www.figma.com/" target="_blank" rel="noreferrer" aria-label="Figma"><FaFigma size={18} /></a>
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Name</span>
          <input {...register('name', { required: 'Name is required' })} placeholder="Your name" />
          {errors.name && <small>{errors.name.message}</small>}
        </label>
        <label>
          <span>Email</span>
          <input type="email" {...register('email', { required: 'Email is required' })} placeholder="you@example.com" />
          {errors.email && <small>{errors.email.message}</small>}
        </label>
        <label className="md:col-span-2">
          <span>Message</span>
          <textarea rows={5} {...register('message', { required: 'Message is required' })} placeholder="Tell me about the project" />
          {errors.message && <small>{errors.message.message}</small>}
        </label>
        <button className="btn-primary md:col-span-2" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        {status && <p className={`form-status md:col-span-2 ${failed ? 'error' : 'success'}`}>{status}</p>}
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <Logo />
        <p className="text-sm text-muted">© 2026 Daniel Halabi. Built with React, Express, and MongoDB.</p>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function ProjectDetailsPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    let active = true;

    fetchProject(slug)
      .then((item) => {
        if (active) setProject(item);
      })
      .catch(() => {
        if (active) setError('Project details could not be loaded.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const links = useMemo(() => {
    if (!project) return [];
    return [
      { label: 'GitHub', href: project.githubUrl, icon: FaGithub },
      { label: 'Live Demo', href: project.liveUrl, icon: ExternalLink },
      { label: 'Figma', href: project.figmaUrl, icon: FaFigma }
    ].filter((item) => item.href);
  }, [project]);

  return (
    <>
      <Header />
      <main className="detail-page">
        <Link className="btn-secondary w-fit" to="/#projects"><ArrowLeft size={16} /> Back to projects</Link>
        {loading && <StateMessage icon={Loader2} title="Loading project" message="Fetching project details..." spinning />}
        {error && <StateMessage title="Project unavailable" message={error} />}
        {project && (
          <article className="detail-layout">
            <ProjectVisual project={project} />
            <div>
              <span className="category-pill">{project.category}</span>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.technologies.map((tech) => <span className="tag" key={tech}>{tech}</span>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {links.map(({ label, href, icon: Icon }) => (
                  <a className="btn-card" key={label} href={href} target="_blank" rel="noreferrer">
                    <Icon size={16} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        )}
      </main>
      <Footer />
    </>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!getAdminToken()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function AdminLoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string; password: string }>();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (values) => {
    setError('');

    try {
      await loginAdmin(values);
      navigate('/admin', { replace: true });
    } catch {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <main className="admin-auth">
      <form className="admin-login-card" onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <div>
          <h1>Admin Login</h1>
          <p>Sign in to manage projects and portfolio messages.</p>
        </div>
        <label>
          <span>Email</span>
          <input type="email" {...register('email', { required: 'Email is required' })} placeholder="admin@example.com" />
          {errors.email && <small>{errors.email.message}</small>}
        </label>
        <label>
          <span>Password</span>
          <input type="password" {...register('password', { required: 'Password is required' })} placeholder="Your password" />
          {errors.password && <small>{errors.password.message}</small>}
        </label>
        {error && <p className="form-status error">{error}</p>}
        <button className="btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Lock size={16} />}
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
        <Link className="text-sm text-muted transition hover:text-primary" to="/">Back to portfolio</Link>
      </form>
    </main>
  );
}

function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const links = [
    { label: 'Overview', to: '/admin' },
    { label: 'Projects', to: '/admin/projects' },
    { label: 'Messages', to: '/admin/messages' }
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Logo />
        <nav>
          {links.map((item) => (
            <Link className={location.pathname === item.to ? 'active' : ''} key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="btn-secondary"
          type="button"
          onClick={() => {
            clearAdminToken();
            navigate('/admin/login', { replace: true });
          }}
        >
          Logout
        </button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

function AdminOverview() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchOverview()
      .then((data) => {
        if (active) setOverview(data);
      })
      .catch(() => {
        if (active) setError('Dashboard overview could not be loaded.');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AdminLayout>
      <div className="admin-heading">
        <span className="eyebrow">Dashboard</span>
        <h1>Portfolio Overview</h1>
        <p>Track project inventory and incoming contact messages.</p>
      </div>
      {error && <StateMessage title="Overview unavailable" message={error} />}
      <div className="admin-stats">
        <span><strong>{overview?.totalProjects ?? '-'}</strong>Total projects</span>
        <span><strong>{overview?.totalMessages ?? '-'}</strong>Total messages</span>
        <span><strong>{overview?.unreadMessages ?? '-'}</strong>Unread messages</span>
      </div>
    </AdminLayout>
  );
}

function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchProjects('All')
      .then((items) => {
        if (active) setProjects(items);
      })
      .catch(() => {
        if (active) setError('Projects could not be loaded.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function refreshProjects() {
    const items = await fetchProjects('All');
    setProjects(items);
  }

  async function handleDelete(id: string) {
    await deleteProject(id);
    await refreshProjects();
  }

  return (
    <AdminLayout>
      <div className="admin-heading">
        <span className="eyebrow">Projects</span>
        <h1>Manage Projects</h1>
        <p>Add, edit, delete, and update portfolio project images.</p>
      </div>
      <ProjectForm
        key={editing?._id || 'new'}
        editing={editing}
        onCancel={() => setEditing(null)}
        onSaved={async () => {
          setEditing(null);
          await refreshProjects();
        }}
      />
      {loading && <StateMessage icon={Loader2} title="Loading projects" message="Fetching dashboard projects..." spinning />}
      {error && <StateMessage title="Projects unavailable" message={error} />}
      <div className="admin-table">
        {projects.map((project) => (
          <div className="admin-row" key={project._id}>
            <div>
              <strong>{project.title}</strong>
              <span>{project.category} • {project.technologies.join(', ') || 'No technologies'}</span>
            </div>
            <div className="admin-actions">
              <button className="btn-card" type="button" onClick={() => setEditing(project)}>Edit</button>
              <button className="btn-danger" type="button" onClick={() => void handleDelete(project._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

function ProjectForm({ editing, onSaved, onCancel }: { editing: Project | null; onSaved: () => Promise<void>; onCancel: () => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProjectFormValues>({
    defaultValues: {
      title: editing?.title || '',
      slug: editing?.slug || '',
      category: editing?.category || 'Development',
      description: editing?.description || '',
      imageUrl: editing?.image?.url || '',
      technologies: editing?.technologies.join(', ') || '',
      githubUrl: editing?.githubUrl || '',
      liveUrl: editing?.liveUrl || '',
      figmaUrl: editing?.figmaUrl || '',
      featured: Boolean(editing?.featured)
    }
  });
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<ProjectFormValues> = async (values) => {
    setError('');

    try {
      if (editing) {
        await updateProject(editing._id, values);
      } else {
        await createProject(values);
      }

      await onSaved();
    } catch {
      setError('Project could not be saved. Check required fields and API credentials.');
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-title">
        <h2>{editing ? 'Edit Project' : 'Add Project'}</h2>
        {editing && <button className="btn-secondary" type="button" onClick={onCancel}>Cancel Edit</button>}
      </div>
      <label>
        <span>Title</span>
        <input {...register('title', { required: 'Title is required' })} />
        {errors.title && <small>{errors.title.message}</small>}
      </label>
      <label>
        <span>Slug</span>
        <input {...register('slug')} placeholder="auto-generated if empty" />
      </label>
      <label>
        <span>Category</span>
        <select {...register('category', { required: true })}>
          <option value="Development">Development</option>
          <option value="UI/UX">UI/UX</option>
        </select>
      </label>
      <label>
        <span>Technologies</span>
        <input {...register('technologies')} placeholder="React, Node.js, MongoDB" />
      </label>
      <label className="md:col-span-2">
        <span>Description</span>
        <textarea rows={4} {...register('description', { required: 'Description is required' })} />
        {errors.description && <small>{errors.description.message}</small>}
      </label>
      <label>
        <span>GitHub URL</span>
        <input {...register('githubUrl')} />
      </label>
      <label>
        <span>Live Demo URL</span>
        <input {...register('liveUrl')} />
      </label>
      <label>
        <span>Figma URL</span>
        <input {...register('figmaUrl')} />
      </label>
      <label>
        <span>Image URL</span>
        <input {...register('imageUrl')} />
      </label>
      <label>
        <span>Upload Image</span>
        <input type="file" accept="image/*" {...register('image')} />
      </label>
      <label className="checkbox-field">
        <input type="checkbox" {...register('featured')} />
        <span>Featured project</span>
      </label>
      {error && <p className="form-status error md:col-span-2">{error}</p>}
      <button className="btn-primary md:col-span-2" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : null}
        {editing ? 'Save Project' : 'Add Project'}
      </button>
    </form>
  );
}

function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchMessages()
      .then((items) => {
        if (active) setMessages(items);
      })
      .catch(() => {
        if (active) setError('Messages could not be loaded.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function toggleRead(message: Message) {
    const updated = await updateMessageRead(message._id, !message.read);
    setMessages((current) => current.map((item) => item._id === updated._id ? updated : item));
  }

  async function removeMessage(id: string) {
    await deleteMessage(id);
    setMessages((current) => current.filter((item) => item._id !== id));
  }

  return (
    <AdminLayout>
      <div className="admin-heading">
        <span className="eyebrow">Messages</span>
        <h1>Contact Inbox</h1>
        <p>Review, mark, and delete messages submitted through the portfolio contact form.</p>
      </div>
      {loading && <StateMessage icon={Loader2} title="Loading messages" message="Fetching contact submissions..." spinning />}
      {error && <StateMessage title="Messages unavailable" message={error} />}
      <div className="message-list">
        {messages.map((message) => (
          <article className={`message-card ${message.read ? 'read' : ''}`} key={message._id}>
            <div>
              <strong>{message.name}</strong>
              <a href={`mailto:${message.email}`}>{message.email}</a>
              <time>{new Date(message.createdAt).toLocaleString()}</time>
            </div>
            <p>{message.message}</p>
            <div className="admin-actions">
              <button className="btn-card" type="button" onClick={() => void toggleRead(message)}>
                Mark {message.read ? 'Unread' : 'Read'}
              </button>
              <button className="btn-danger" type="button" onClick={() => void removeMessage(message._id)}>Delete</button>
            </div>
          </article>
        ))}
        {!loading && !error && messages.length === 0 && <StateMessage title="No messages yet" message="New contact form messages will appear here." />}
      </div>
    </AdminLayout>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminOverview /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
