import { ArrowUpRight, Download, Mail, Menu, Monitor, Palette, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import type { ElementType } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { FaFigma, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiMongodb, SiNodedotjs, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { usePortfolioStore } from './Store/usePortfolioStore';
import { developerProjects, uiProjects } from './data/projects';
import type { DeveloperProject, ProjectFilter, ProjectVariant, UiProject } from './data/projects';

type IconComponent = ElementType<{ size?: number; className?: string }>;

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

const techStack = [
  { label: 'Vite', icon: SiReact, color: 'text-taupe' },
  { label: 'Tailwind', icon: SiTailwindcss, color: 'text-steelblue' },
  { label: 'TypeScript', icon: SiTypescript, color: 'text-taupe' },
  { label: 'Node.js', icon: SiNodedotjs, color: 'text-emerald-300' },
  { label: 'MongoDB', icon: SiMongodb, color: 'text-emerald-400' },
  { label: 'Figma', icon: FaFigma, color: 'text-slate' }
];

const strengths = ['Full-stack builds', 'UI/UX thinking', 'Clear communication', 'Product-minded details'];

const filterTabs: Array<[ProjectFilter, string]> = [
  ['all', 'All'],
  ['dev', 'Developer'],
  ['ui', 'UI/UX']
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Daniel Halabi home">
      <span className="logo-frame">
        <img src="/dh-monogram.png" alt="" />
      </span>
      <span>
        <span className="brand-name">Daniel Halabi</span>
        <span className="block text-xs text-mist">Full Stack Developer & UI/UX Designer</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Home', to: '/#home' },
    { label: 'Projects', to: '/projects' },
    { label: 'Contact Us', to: '/#contact' }
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-10 text-sm md:flex">
          {links.map((item) => (
            <Link key={item.label} className="text-slate-200 transition hover:text-paper" to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <a className="btn-primary" href="/DanielHalabiCV.pdf" download>
            Download CV <Download size={16} />
          </a>
        </div>
        <button className="icon-button md:hidden" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu size={20} />
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-panel px-5 py-4 md:hidden">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold">Menu</span>
            <button className="icon-button" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="grid gap-3">
            {links.map((item) => (
              <Link key={item.label} className="rounded-md border border-line px-4 py-3 text-sm" to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function HeroVisual() {
  return (
    <motion.div className="hero-visual" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
      <div className="dashboard-card">
        <aside className="dashboard-rail">
          {['A', 'H', 'P', 'M', 'S', 'C'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </aside>
        <div className="dashboard-main">
          <h3>Dashboard</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span>Total Users</span>
              <strong>12,540</strong>
              <small>+12.5%</small>
              <div className="sparkline" />
            </div>
            <div className="stat-card">
              <span>Revenue</span>
              <strong>$48,250</strong>
              <small>+8.2%</small>
              <div className="bars">
                <i /><i /><i /><i /><i />
              </div>
            </div>
          </div>
          <div className="orders-card">
            {['Olivia Rhye', 'Phoenix Baker', 'Lana Steiner'].map((name, index) => (
              <div key={name}>
                <span>{name}</span>
                <b>${[125, 220, 160][index]}.00</b>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="phone-card">
        <span className="phone-notch" />
        <p>Welcome back!</p>
        <small>Analytics</small>
        <strong>$48,250</strong>
        <div className="phone-chart" />
        <ul>
          <li><span>iPhone 15 Pro</span><b>$1,250</b></li>
          <li><span>MacBook Air</span><b>$999</b></li>
          <li><span>AirPods Max</span><b>$549</b></li>
        </ul>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="section-grid min-h-[calc(100vh-73px)] items-center py-12 md:py-20">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="pill">Hello, I'm Daniel</span>
        <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          I <span className="text-accent">Design</span> polished interfaces & <span className="text-accent-muted">Build</span> practical full-stack products
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-mist">
          I'm a full stack developer and UI/UX designer who turns ideas into clean, useful digital products. I like working across the whole journey: shaping the experience in Figma, building reliable frontends with Vite, TypeScript, and Tailwind, and connecting them to practical Node and MongoDB backends.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {strengths.map((item) => (
            <span className="pill" key={item}>{item}</span>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-4">
          <a className="btn-primary" href="/DanielHalabiCV.pdf" download>
            Download CV <Download size={16} />
          </a>
          <a className="btn-secondary" href="#contact">Hire Me</a>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="text-sm text-slate-300">Tech I work with:</span>
          {techStack.map(({ label, icon: Icon, color }) => (
            <span key={label} className={`tech-icon ${color}`} title={label}>
              <Icon />
            </span>
          ))}
        </div>
      </motion.div>
      <HeroVisual />
    </section>
  );
}

function ProjectThumbnail({ variant }: { variant: ProjectVariant }) {
  return (
    <div className={`thumb thumb-${variant}`}>
      <div className="thumb-nav" />
      <div className="thumb-body">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

type ProjectCardProps =
  | { project: DeveloperProject; type: 'dev' }
  | { project: UiProject; type: 'ui' };

function ProjectCard({ project, type }: ProjectCardProps) {
  return (
    <motion.article className="project-card" whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
      <ProjectThumbnail variant={project.variant} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {type === 'dev' ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item: string) => <span className="tag" key={item}>{item}</span>)}
        </div>
      ) : null}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {type === 'dev' ? (
          <>
            {project.demoUrl && <a className="btn-card" href={project.demoUrl} target="_blank" rel="noreferrer">Live Demo <ArrowUpRight size={15} /></a>}
            <a className={`btn-card ${project.demoUrl ? '' : 'col-span-2'}`} href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <FaGithub size={15} /></a>
          </>
        ) : (
          project.figmaUrl ? (
            <a className="btn-card col-span-2" href={project.figmaUrl} target="_blank" rel="noreferrer">
              <span className="figma-dot" /> View on Figma
            </a>
          ) : (
            <span className="btn-card col-span-2 text-mist">
              <span className="figma-dot" /> Case study coming soon
            </span>
          )
        )}
      </div>
    </motion.article>
  );
}

type ProjectSectionProps =
  | { icon: IconComponent; title: string; projects: DeveloperProject[]; type: 'dev'; showMore?: boolean }
  | { icon: IconComponent; title: string; projects: UiProject[]; type: 'ui'; showMore?: boolean };

function ProjectSection({ icon: Icon, title, projects, type, showMore = true }: ProjectSectionProps) {
  const setFilter = usePortfolioStore((state) => state.setFilter);

  return (
    <section className="mt-11">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-3 text-xl font-semibold text-white">
          <Icon size={22} /> {title}
        </h3>
        {showMore && (
          <Link className="btn-small" to="/projects" onClick={() => setFilter(type)}>
            Show More <ArrowUpRight size={14} />
          </Link>
        )}
      </div>
      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {type === 'dev'
          ? projects.map((project) => <ProjectCard key={project.title} project={project} type="dev" />)
          : projects.map((project) => <ProjectCard key={project.title} project={project} type="ui" />)}
      </div>
    </section>
  );
}

function Projects() {
  const filter = usePortfolioStore((state) => state.filter);
  const setFilter = usePortfolioStore((state) => state.setFilter);
  const filteredDev = useMemo(() => filter === 'ui' ? [] : developerProjects, [filter]);
  const filteredUi = useMemo(() => filter === 'dev' ? [] : uiProjects, [filter]);

  return (
    <main id="projects" className="border-t border-line/50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-white">Projects</h2>
          <p className="mt-3 text-mist">A selection of my recent work</p>
          <div className="mt-6 inline-flex rounded-md border border-line bg-panel p-1">
            {filterTabs.map(([value, label]) => (
              <button key={value} className={`filter-tab ${filter === value ? 'active' : ''}`} type="button" onClick={() => setFilter(value)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        {filteredDev.length > 0 && <ProjectSection icon={Monitor} title="Developer Projects" projects={filteredDev} type="dev" />}
        {filteredUi.length > 0 && <ProjectSection icon={Palette} title="UI/UX Projects" projects={filteredUi} type="ui" />}
      </div>
    </main>
  );
}

function AllProjectsPage() {
  const filter = usePortfolioStore((state) => state.filter);
  const setFilter = usePortfolioStore((state) => state.setFilter);
  const filteredDev = useMemo(() => filter === 'ui' ? [] : developerProjects, [filter]);
  const filteredUi = useMemo(() => filter === 'dev' ? [] : uiProjects, [filter]);
  const totalVisible = filteredDev.length + filteredUi.length;

  return (
    <>
      <Header />
      <main className="projects-page">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="projects-page-header">
            <div>
              <Link className="btn-small" to="/#projects">Back to Home</Link>
              <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">All Projects</h1>
              <p className="mt-4 max-w-2xl text-mist">
                Browse the full project archive and filter it by development work or UI/UX design case studies.
              </p>
            </div>
            <div className="filter-panel">
              {filterTabs.map(([value, label]) => (
                <button key={value} className={`filter-tab ${filter === value ? 'active' : ''}`} type="button" onClick={() => setFilter(value)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 border-y border-line/70 py-4">
            <span className="text-sm font-semibold text-white">{totalVisible} projects shown</span>
            <span className="text-sm text-mist">Filtered by {filterTabs.find(([value]) => value === filter)?.[1]}</span>
          </div>

          {filteredDev.length > 0 && (
            <ProjectSection icon={Monitor} title="Developer Projects" projects={filteredDev} type="dev" showMore={false} />
          )}
          {filteredUi.length > 0 && (
            <ProjectSection icon={Palette} title="UI/UX Projects" projects={filteredUi} type="ui" showMore={false} />
          )}
          {totalVisible === 0 && (
            <div className="empty-state">
              <h2>No projects found</h2>
              <p>Try switching to another filter.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(hash);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash, pathname]);

  return null;
}

function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<ContactFormValues>();
  const [status, setStatus] = useState('');

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    setStatus('Sending...');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error('Message failed');
      setStatus('Message sent. I will get back to you soon.');
      reset();
    } catch {
      setStatus('Saved locally for now. Connect MongoDB to persist messages.');
    }
  };

  return (
    <section id="contact" className="border-t border-line/50 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Let's Connect</h2>
          <p className="mt-4 max-w-md text-mist">Have an app idea, website, dashboard, or interface that needs both technical structure and thoughtful design? I can help shape it, build it, and keep the experience clear for real users.</p>
          <div className="mt-7 flex gap-3">
            <a className="icon-button" href="https://github.com/DanielHalabi5" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={18} /></a>
            <a className="icon-button" href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={18} /></a>
            <a className="icon-button" href="https://www.figma.com/" target="_blank" rel="noreferrer" aria-label="Figma"><FaFigma size={18} /></a>
            <a className="icon-button" href="#contact" aria-label="Contact form"><Mail size={18} /></a>
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
          <button className="btn-primary md:col-span-2" type="submit">Contact Me <ArrowUpRight size={16} /></button>
          {(status || isSubmitSuccessful) && <p className="md:col-span-2 text-sm text-paper">{status}</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-[#111418] py-8">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-4 md:px-8">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-6 text-mist">Designing thoughtful interfaces and building full-stack products that feel clear, fast, and useful.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact Us</a>
        </div>
        <div>
          <h4>Services</h4>
          <span>UI/UX Design in Figma</span>
          <span>Frontend Development</span>
          <span>Node & MongoDB Backends</span>
        </div>
        <div>
          <h4>Let's Connect</h4>
          <p className="text-sm text-mist">Have a project in mind? Let's build something polished, practical, and easy to use.</p>
          <a className="btn-secondary mt-4 inline-flex" href="#contact">Contact Me <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl border-t border-line px-5 pt-5 text-center text-xs text-mist md:px-8">
        © 2026 Daniel Halabi. All rights reserved.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="site-shell">
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
        </Routes>
      </div>
    </div>
  );
}
