import { ArrowLeft, ArrowUpRight, Braces, CheckCircle2, Code2, Copy, Database, Download, ExternalLink, Gauge, Layers3, Loader2, Lock, Mail, Menu, MonitorSmartphone, Palette, PenTool, Pencil, Plus, Reply, Rocket, Send, Server, Trash2, X } from 'lucide-react';
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

const skillGroups = [
  {
    title: 'Frontend',
    icon: Code2,
    items: [
      { label: 'React + Vite', icon: SiReact },
      { label: 'TypeScript', icon: SiTypescript },
      { label: 'Tailwind CSS', icon: SiTailwindcss }
    ]
  },
  {
    title: 'Backend',
    icon: Server,
    items: [
      { label: 'Node.js + Express', icon: SiNodedotjs },
      { label: 'MongoDB + Mongoose', icon: SiMongodb },
      { label: 'REST APIs', icon: Braces }
    ]
  },
  {
    title: 'Design & Tools',
    icon: PenTool,
    items: [
      { label: 'Figma UI/UX', icon: FaFigma },
      { label: 'Design systems', icon: Layers3 },
      { label: 'Responsive polish', icon: MonitorSmartphone }
    ]
  }
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
    { label: 'Projects', to: '/projects' },
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
            <a className="btn-primary" href="/DanielHalabiCV.pdf" download>
              <Download size={16} /> Download CV
            </a>
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
        <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-6xl">
          Building developer-focused products with <span className="text-primary">polished UI/UX.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
          I am Daniel Halabi, a full-stack developer and UI/UX designer creating fast React interfaces,
          practical Node and MongoDB backends, and clean product experiences that feel easy to use.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="btn-primary" to="/projects">
            View Projects <ArrowUpRight size={16} />
          </Link>
          <Link className="btn-secondary" to="/#contact">
            Contact Me <Mail size={16} />
          </Link>
        </div>
      </motion.div>
      <HeroMockup />
    </section>
  );
}

function HeroMockup() {
  return (
    <motion.div className="hero-device" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }}>
      <div className="device-window">
        <div className="device-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="dashboard-grid">
          <div className="dashboard-sidebar">
            <span className="sidebar-dot active" />
            <span className="sidebar-dot" />
            <span className="sidebar-dot" />
            <span className="sidebar-dot" />
          </div>
          <div className="dashboard-main">
            <div className="dashboard-topline">
              <div>
                <small>Portfolio OS</small>
                <strong>Project pipeline</strong>
              </div>
              <span>Live</span>
            </div>
            <div className="dashboard-cards">
              <div><Gauge size={18} /><strong>98%</strong><span>UX polish</span></div>
              <div><Database size={18} /><strong>Mongo</strong><span>Dynamic CMS</span></div>
              <div><FaFigma size={18} /><strong>Figma</strong><span>Design flow</span></div>
            </div>
            <div className="dashboard-chart">
              <span style={{ height: '42%' }} />
              <span style={{ height: '68%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '88%' }} />
              <span style={{ height: '72%' }} />
              <span style={{ height: '96%' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="device-base" />
    </motion.div>
  );
}

function About() {
  const metrics = [
    { value: '6+', label: 'Featured projects', icon: Rocket },
    { value: '2', label: 'Core disciplines', icon: Layers3 },
    { value: 'MERN', label: 'Preferred stack', icon: Database }
  ];
  const points = [
    'Interfaces planned around real user flows, not just good-looking screens.',
    'React frontends connected to practical Express and MongoDB APIs.',
    'Design decisions translated into responsive, maintainable components.'
  ];

  return (
    <section className="section" id="about">
      <div className="about-grid">
        <div className="about-copy">
          <span className="eyebrow"><Layers3 size={14} /> About</span>
          <h2>Practical engineering with a designer's eye.</h2>
          <p>
            I work across the full product path: shaping user flows, designing interfaces, building frontends,
            connecting APIs, and making sure the final result is clear, responsive, and easy to maintain.
          </p>
          <div className="about-points">
            {points.map((point) => (
              <span key={point}>
                <CheckCircle2 size={18} />
                {point}
              </span>
            ))}
          </div>
        </div>
        <div className="metric-grid">
          {metrics.map(({ value, label, icon: Icon }) => (
            <span key={label}>
              <Icon size={20} />
              <strong>{value}</strong>
              {label}
            </span>
          ))}
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
        {skillGroups.map(({ title, icon: GroupIcon, items }) => (
          <div className="skill-card" key={title}>
            <div className="skill-card-head">
              <span><GroupIcon size={20} /></span>
              <h3>{title}</h3>
            </div>
            <div className="skill-list">
              {items.map(({ label, icon: Icon }) => (
                <span key={label}>
                  <Icon size={18} />
                  {label}
                </span>
              ))}
            </div>
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
  const [expanded, setExpanded] = useState(false);
  const isLongDescription = project.description.length > 135;

  return (
    <motion.article className="project-card" whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 250, damping: 22 }}>
      <ProjectVisual project={project} />
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="category-pill">{project.category}</span>
        {project.featured && <span className="featured-pill">Featured</span>}
      </div>
      <h3>{project.title}</h3>
      <div className={`project-description ${expanded ? 'expanded' : ''}`}>
        <p className={expanded ? 'expanded' : ''}>{project.description}</p>
        {isLongDescription && (
          <button className="more-info-button" type="button" onClick={() => setExpanded((current) => !current)}>
            {expanded ? 'Show less' : 'More info'}
          </button>
        )}
      </div>
      <div className="tag-row">
        {project.technologies.slice(0, 4).map((tech) => <span className="tag" key={tech}>{tech}</span>)}
      </div>
      <div className="card-actions">
        {project.liveUrl && <a className="btn-primary" href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={15} /></a>}
        {project.githubUrl && <a className="btn-card" href={project.githubUrl} target="_blank" rel="noreferrer"><FaGithub size={16} /> GitHub</a>}
        {project.figmaUrl && <a className="btn-card" href={project.figmaUrl} target="_blank" rel="noreferrer"><FaFigma size={16} /> Figma</a>}
        <Link className="icon-link" to={`/projects/${project.slug}`} aria-label={`${project.title} details`}>
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </motion.article>
  );
}

function Projects({ preview = false }: { preview?: boolean }) {
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

  const visibleProjects = preview ? projects.filter((project) => project.featured).slice(0, 3) : projects;

  return (
    <section className="section" id="projects">
      <div className="section-heading centered">
        <span className="eyebrow"><MonitorSmartphone size={14} /> Projects</span>
        <h2>{preview ? 'Selected work from the portfolio.' : 'All projects and case studies.'}</h2>
        <p>{preview ? 'A focused preview of featured builds and UI/UX work. The full project archive lives on its own page.' : 'Filter development builds and UI/UX case studies from the backend project collection.'}</p>
      </div>
      {!preview && (
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
      )}
      {loading && <StateMessage icon={Loader2} title="Loading projects" message="Fetching the latest portfolio projects..." spinning />}
      {error && <StateMessage title="Project API unavailable" message={error} />}
      {!loading && !error && (
        <>
          <div className="projects-grid">
            {visibleProjects.map((project) => <ProjectCard key={project._id} project={project} />)}
            {visibleProjects.length === 0 && <StateMessage title="No projects found" message="Try another filter or add projects from the admin dashboard." />}
          </div>
          {preview && projects.length > visibleProjects.length && (
            <div className="section-action">
              <Link className="btn-primary" to="/projects">
                View all projects <ArrowUpRight size={16} />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <Projects />
      </main>
      <Footer />
    </>
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
        <Projects preview />
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
        <Link className="btn-secondary w-fit" to="/projects"><ArrowLeft size={16} /> Back to projects</Link>
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
  const [formOpen, setFormOpen] = useState(false);
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

  function openNewProject() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEditProject(project: Project) {
    setEditing(project);
    setFormOpen(true);
  }

  function closeProjectForm() {
    setEditing(null);
    setFormOpen(false);
  }

  return (
    <AdminLayout>
      <div className="admin-heading admin-heading-row">
        <div>
          <span className="eyebrow">Projects</span>
          <h1>Manage Projects</h1>
          <p>Add, edit, delete, and update portfolio project images.</p>
        </div>
        <button className="btn-primary" type="button" onClick={openNewProject}>
          <Plus size={16} /> Add Project
        </button>
      </div>
      {formOpen && (
        <ProjectEditorModal editing={editing} onClose={closeProjectForm}>
          <ProjectForm
            key={editing?._id || 'new'}
            editing={editing}
            onCancel={closeProjectForm}
            onSaved={async () => {
              closeProjectForm();
              await refreshProjects();
            }}
          />
        </ProjectEditorModal>
      )}
      {loading && <StateMessage icon={Loader2} title="Loading projects" message="Fetching dashboard projects..." spinning />}
      {error && <StateMessage title="Projects unavailable" message={error} />}
      <div className="admin-project-grid">
        {projects.map((project) => (
          <article className="admin-project-card" key={project._id}>
            <ProjectVisual project={project} />
            <div className="admin-project-body">
              <div className="admin-project-topline">
                <span className="category-pill">{project.category}</span>
                {project.featured && <span className="featured-pill">Featured</span>}
              </div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.technologies.slice(0, 5).map((tech) => <span className="tag" key={tech}>{tech}</span>)}
                {project.technologies.length > 5 && <span className="tag">+{project.technologies.length - 5}</span>}
              </div>
            </div>
            <div className="admin-actions">
              <button className="btn-card" type="button" onClick={() => openEditProject(project)}>
                <Pencil size={15} /> Edit
              </button>
              <button className="btn-danger" type="button" onClick={() => void handleDelete(project._id)}>
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </article>
        ))}
        {!loading && !error && projects.length === 0 && <StateMessage title="No projects yet" message="Add your first portfolio project from the button above." />}
      </div>
    </AdminLayout>
  );
}

function ProjectEditorModal({ editing, onClose, children }: { editing: Project | null; onClose: () => void; children: ReactNode }) {
  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="project-editor-title">
      <div className="admin-modal">
        <div className="admin-modal-head">
          <div>
            <span className="eyebrow">{editing ? 'Edit' : 'New'}</span>
            <h2 id="project-editor-title">{editing ? 'Edit Project Details' : 'Add Project Details'}</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close project form" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
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
        <h2>Project details</h2>
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
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
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

  function startReply(message: Message) {
    setReplyingTo((current) => current === message._id ? null : message._id);
    setReplyText('');
    setCopiedId(null);
  }

  async function copyReply(message: Message) {
    const draft = buildReplyDraft(message, replyText);
    await navigator.clipboard.writeText(`To: ${message.email}\nSubject: ${draft.subject}\n\n${draft.body}`);
    setCopiedId(message._id);
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
              <button className="btn-card" type="button" onClick={() => startReply(message)}>
                <Reply size={15} /> Reply
              </button>
              <button className="btn-card" type="button" onClick={() => void toggleRead(message)}>
                Mark {message.read ? 'Unread' : 'Read'}
              </button>
              <button className="btn-danger" type="button" onClick={() => void removeMessage(message._id)}>
                <Trash2 size={15} /> Delete
              </button>
            </div>
            {replyingTo === message._id && (
              <MessageReplyComposer
                copied={copiedId === message._id}
                message={message}
                replyText={replyText}
                onCopy={() => void copyReply(message)}
                onReplyTextChange={setReplyText}
              />
            )}
          </article>
        ))}
        {!loading && !error && messages.length === 0 && <StateMessage title="No messages yet" message="New contact form messages will appear here." />}
      </div>
    </AdminLayout>
  );
}

function buildReplyDraft(message: Message, replyText: string) {
  const firstName = message.name.trim().split(/\s+/)[0] || message.name;
  const response = replyText.trim() || 'Thanks for reaching out. I reviewed your message and would be happy to continue the conversation.';
  const sentAt = new Date(message.createdAt).toLocaleString();

  return {
    subject: `Re: Portfolio message from ${message.name}`,
    body: [
      `Hi ${firstName},`,
      '',
      response,
      '',
      'Best regards,',
      'Daniel Halabi',
      '',
      '---',
      `Original message from ${message.name} <${message.email}>`,
      `Received: ${sentAt}`,
      '',
      message.message
    ].join('\n')
  };
}

function MessageReplyComposer({
  copied,
  message,
  replyText,
  onCopy,
  onReplyTextChange
}: {
  copied: boolean;
  message: Message;
  replyText: string;
  onCopy: () => void;
  onReplyTextChange: (value: string) => void;
}) {
  const draft = buildReplyDraft(message, replyText);
  const mailtoHref = `mailto:${message.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(message.email)}&su=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;

  return (
    <div className="message-reply">
      <label>
        <span>Your reply</span>
        <textarea
          rows={4}
          value={replyText}
          onChange={(event) => onReplyTextChange(event.target.value)}
          placeholder="Write the short reply. The dashboard will format the email around it."
        />
      </label>
      <div className="email-preview">
        <div className="email-field">
          <span>To</span>
          <strong>{message.email}</strong>
        </div>
        <div className="email-field">
          <span>Subject</span>
          <strong>{draft.subject}</strong>
        </div>
        <div className="email-body-preview">
          <span>Body</span>
          <pre>{draft.body}</pre>
        </div>
      </div>
      <div className="reply-actions">
        <a className="btn-primary reply-action-primary" href={gmailHref} target="_blank" rel="noreferrer">
          <span className="reply-action-label">
            <ExternalLink size={15} />
            <span>Gmail</span>
          </span>
        </a>
        <a className="btn-card reply-action" href={mailtoHref}>
          <span className="reply-action-label">
            <Mail size={15} />
            <span>Mail app</span>
          </span>
        </a>
        <button className="btn-card reply-action" type="button" onClick={onCopy}>
          <span className="reply-action-label">
            <Copy size={15} />
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminOverview /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
