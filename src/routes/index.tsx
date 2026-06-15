import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Code2, Server, Database, Wrench, Sparkles, Cpu, Bot, ExternalLink, Award, Search, Workflow, MessageSquare, X, ZoomIn, Calendar, Target, Lightbulb, CheckCircle2, AlertTriangle, TrendingUp, FolderGit2, Rocket, Download, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ContactForm } from "@/components/ContactForm";
import { Reveal, Stagger, itemVariants } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { SkillBar } from "@/components/SkillBar";
import { FloatingBg } from "@/components/FloatingBg";
import { useTheme } from "@/components/ThemeProvider";
import oussamaAsset from "@/assets/oussama.png.asset.json";
import oilKamoImg from "@/assets/oil-kamo.png";
import desertPaletteImg from "@/assets/desert-palette.png";
import cafe38Img from "@/assets/cafe-38.png";
import aiLeadGenAsset from "@/assets/ai-lead-gen.png.asset.json";
import aiEcomAsset from "@/assets/ai-ecom-tracking.png.asset.json";
import aiRagAsset from "@/assets/ai-rag-chatbot.png.asset.json";
import certAgileBootcamp from "@/assets/cert-agile-bootcamp.png.asset.json";
import certRanadab from "@/assets/cert-ranadab.png.asset.json";
import certRamadan from "@/assets/cert-ramadan.png.asset.json";
import certAgileAi from "@/assets/cert-agile-ai.png.asset.json";
import certSynra from "@/assets/cert-synra-n8n.png.asset.json";

type AiProject = {
  title: string;
  description: string;
  impact: string;
  image: string;
  icon: typeof Search;
  tags: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string[];
  results: string[];
  timeline: string;
  liveUrl?: string;
  repoUrl?: string;
};

const aiProjects: AiProject[] = [
  {
    title: "AI Lead Generation & Business Scraper",
    description:
      "Built an AI-powered lead generation system using n8n and Google Gemini. The workflow discovers businesses online, extracts website content, cleans HTML data, identifies relevant business information, and removes duplicates automatically.",
    impact: "Reduces manual prospecting time and generates qualified leads automatically.",
    image: aiLeadGenAsset.url,
    icon: Search,
    tags: ["n8n", "Google Gemini", "Web Scraping", "JavaScript", "Lead Generation", "AI"],
    overview:
      "A fully automated B2B lead generation pipeline that finds, scrapes, and qualifies business leads from the open web using LLM-assisted parsing.",
    problem:
      "Sales teams spend hours every week manually searching for prospects, copying contact data, and filtering duplicates — a slow, error-prone process that doesn't scale.",
    solution:
      "An n8n workflow triggered by a chat message takes a niche and location, queries the web, fetches each candidate page, cleans the HTML, asks Google Gemini to extract structured business data, and deduplicates results before delivering a final list.",
    architecture:
      "Chat trigger → URL fixer → HTTP fetch → HTML cleaner → batched URL collection → Gemini extraction with a structured output parser → de-dupe agent → final aggregated output. A second branch handles batched re-crawls with a wait/loop pattern for rate-limit safety.",
    features: [
      "Conversational input — describe the niche in natural language",
      "Smart URL filtering and HTML cleanup before LLM calls",
      "Structured JSON extraction with Gemini + output parser",
      "Automatic de-duplication across runs",
      "Batched scraping with built-in wait nodes",
    ],
    challenges: [
      "Handling inconsistent HTML structures across thousands of sites",
      "Keeping LLM token usage low via pre-cleaning and batching",
      "Preventing duplicate leads across multi-page sources",
    ],
    results: [
      "Cut manual prospecting time by ~90%",
      "Produces qualified, structured lead lists on demand",
      "Runs unattended on schedule or chat trigger",
    ],
    timeline: "2 weeks",
  },
  {
    title: "E-commerce Order Tracking & Customer Automation",
    description:
      "Designed an automated customer communication workflow that tracks order status, sends WhatsApp notifications, dispatches email confirmations, logs activities in Google Sheets, and requests customer reviews after delivery.",
    impact: "Improves customer experience and automates post-purchase communication.",
    image: aiEcomAsset.url,
    icon: Workflow,
    tags: ["n8n", "WhatsApp API", "Google Sheets", "Email Automation", "Webhooks"],
    overview:
      "An end-to-end post-purchase automation that keeps customers informed at every order stage and brings reviews back to the store with zero manual effort.",
    problem:
      "Small e-commerce stores rely on manual messages to confirm, ship, and follow up on orders, leading to delays, missed reviews, and inconsistent customer experience.",
    solution:
      "A webhook-driven n8n workflow ingests order events, branches by status (Confirmed / Shipped / Delivered), and triggers the right WhatsApp, email, and Sheets actions for each stage — including a delayed review request 24h after delivery.",
    architecture:
      "Order webhook → data normalizer → three parallel IF branches (Confirmed, Shipped, Delivered). Confirmed sends WhatsApp + confirmation email. Shipped sends shipping email. Delivered logs to Google Sheets, waits 24h, sends review request, then a loyalty follow-up.",
    features: [
      "Single webhook entry point for any storefront",
      "Per-status messaging (confirm / ship / deliver)",
      "WhatsApp + email channel coverage",
      "Google Sheets audit log of every order touch",
      "Delayed automated review request",
    ],
    challenges: [
      "Coordinating multi-channel timing without spamming the customer",
      "Designing idempotent branches so webhook retries don't double-send",
      "Mapping varied order payloads into a consistent internal schema",
    ],
    results: [
      "100% of orders receive timely status updates",
      "Higher review response rate from the 24h follow-up",
      "Zero manual messages from the shop owner",
    ],
    timeline: "10 days",
  },
  {
    title: "AI Knowledge Base Chatbot with RAG",
    description:
      "Developed an AI-powered Telegram chatbot using Retrieval-Augmented Generation (RAG). The system processes documents, generates embeddings with Google Gemini, stores vectors in Pinecone, and retrieves relevant information to answer questions accurately.",
    impact: "Enables intelligent document search and accurate question answering.",
    image: aiRagAsset.url,
    icon: MessageSquare,
    tags: ["RAG", "Pinecone", "Google Gemini", "Telegram Bot", "Vector Database"],
    overview:
      "A Telegram-native assistant that turns any document collection into a searchable, conversational knowledge base using Retrieval-Augmented Generation.",
    problem:
      "Teams and creators sit on PDFs, docs, and notes they can't easily query. Reading through everything to answer one question is wasteful and inconsistent.",
    solution:
      "Two cooperating n8n workflows: an ingestion pipeline that splits and embeds documents into Pinecone with Gemini embeddings, and a Telegram chat pipeline that retrieves relevant chunks and grounds Gemini's answer in the user's own data.",
    architecture:
      "Ingestion: Manual trigger → Google Drive download → Recursive Character Text Splitter → Default Data Loader → Embeddings (Gemini) → Pinecone Vector Store. Retrieval: Telegram trigger → JS pre-processor → Question & Answer Chain (Gemini Chat Model + Vector Store Retriever backed by Pinecone + Gemini embeddings) → JS formatter → sendMessage back to Telegram.",
    features: [
      "Drop a file in Drive — it's indexed automatically",
      "Conversational Q&A inside Telegram",
      "Grounded answers using vector retrieval (no hallucinated facts)",
      "Pluggable vector store (Pinecone) and LLM (Gemini)",
      "Stateless chat surface — works on any device",
    ],
    challenges: [
      "Choosing chunk size and overlap that preserve context",
      "Keeping retrieval latency low for chat-style UX",
      "Handling multi-turn questions without a heavy session store",
    ],
    results: [
      "Accurate, source-grounded answers in seconds",
      "Self-serve knowledge access for non-technical users",
      "Scales to large document sets without code changes",
    ],
    timeline: "3 weeks",
  },
];



type Certificate = {
  title: string;
  issuer: string;
  date: string;
  image: string;
};

const certificates: Certificate[] = [
  { title: "Agile in AI Development", issuer: "Agile B Darija — Agile Bootcamp", date: "6 March 2026", image: certAgileAi.url },
  { title: 'L\'Agile, ce n\'est pas "aller vite"', issuer: "Agile B Darija — Agile Bootcamp", date: "13 March 2026", image: certAgileBootcamp.url },
  { title: "L'Agilité : la compétence clé du futur", issuer: "Agile B Darija — Ramadan Soft Skills Bootcamp", date: "11 March 2026", image: certRamadan.url },
  { title: "L'Agilité : la compétence clé du futur", issuer: "Agile B Darija — Ranadab Soft Skills Bootcamp", date: "11 March 2026", image: certRanadab.url },
  { title: "n8n Basics: Triggers, APIs, and Logic Nodes", issuer: "SYNRA", date: "2 January 2026", image: certSynra.url },
];

type Project = {
  title: string;
  tagline: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "Oil Kamo",
    tagline: "Luxury natural hair oil — 50 herbs blend",
    description:
      "An elegant product landing page for a 100% natural hair oil made from a blend of 50 precious herbs. Built with a refined dark, gold-accented design system to convey luxury and craftsmanship, with smooth scrolling sections for product story, benefits, and ordering.",
    image: oilKamoImg,
    url: "https://oil-kamo.vercel.app/",
    tags: ["React", "Tailwind CSS", "Landing Page", "Branding"],
  },
  {
    title: "La Datte d'Or",
    tagline: "Authentic Moroccan fine dining — Ouarzazate",
    description:
      "A cinematic restaurant website for an upscale Moroccan dining experience at the gateway to the Sahara. Features immersive hero visuals, a curated menu showcase, ambiance gallery, and reservation flow — all wrapped in a warm desert palette.",
    image: desertPaletteImg,
    url: "https://desert-palette-project.vercel.app/",
    tags: ["React", "Tailwind CSS", "Hospitality", "Storytelling"],
  },
  {
    title: "Café 38 Concept",
    tagline: "Café des Arts — Ourika",
    description:
      "A warm, inviting website for a women-led café in Ourika. Includes menu, gallery, customer reviews, and contact — designed with cozy amber tones and bilingual-ready content to reflect the café's artistic, welcoming atmosphere.",
    image: cafe38Img,
    url: "https://cafe-38-concept.vercel.app/",
    tags: ["React", "Tailwind CSS", "Local Business", "Gallery"],
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oussama Abdel Jebbar — Software Engineer & Full-Stack Developer" },
      { name: "description", content: "Portfolio of Oussama Abdel Jebbar — Software Engineer building modern, scalable, AI-powered web applications." },
      { property: "og:title", content: "Oussama Abdel Jebbar — Software Engineer" },
      { property: "og:description", content: "I design and build modern, scalable, user-focused web applications." },
      { property: "og:image", content: oussamaAsset.url },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  component: Portfolio,
});

const skills: Record<string, { name: string; level: number }[]> = {
  Frontend: [
    { name: "HTML / CSS", level: 98 },
    { name: "JavaScript", level: 92 },
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 88 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 95 },
  ],
  Backend: [
    { name: "Node.js", level: 90 },
    { name: "Express.js", level: 88 },
    { name: "Python", level: 82 },
    { name: "REST APIs", level: 92 },
  ],
  Database: [
    { name: "PostgreSQL", level: 88 },
    { name: "MySQL", level: 85 },
    { name: "MongoDB", level: 80 },
  ],
  Tools: [
    { name: "Git / GitHub", level: 95 },
    { name: "Docker", level: 80 },
    { name: "Vercel", level: 90 },
    { name: "n8n", level: 92 },
  ],
};

const skillIcons = { Frontend: Code2, Backend: Server, Database: Database, Tools: Wrench };

const services = [
  { icon: Sparkles, title: "Web Development", desc: "Building modern, responsive, and high-performance websites and web applications." },
  { icon: Cpu, title: "Software Engineering", desc: "Designing scalable software solutions with clean architecture and best practices." },
  { icon: Bot, title: "Automation & AI", desc: "Creating intelligent workflows and AI-powered systems to improve productivity." },
];


const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

const stats = [
  { value: 12, suffix: "+", label: "Projects Shipped", icon: FolderGit2 },
  { value: 5, suffix: "+", label: "Certifications", icon: Award },
  { value: 20, suffix: "+", label: "Technologies", icon: Cpu },
  { value: 3, suffix: "+", label: "Years Building", icon: Rocket },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        scrolled
          ? "bg-background/70 border-border/60 shadow-elegant"
          : "bg-background/30 border-transparent"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <a href="#home" className="font-display font-bold text-lg tracking-tight">
          Oussama<span className="text-gradient">.Abj</span>
        </a>
        <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative py-1 hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-primary after:to-primary-glow after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button asChild size="sm" variant="default" className="shadow-glow hover:scale-105 transition-transform">
            <a href="#contact">Hire me</a>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [activeAi, setActiveAi] = useState<AiProject | null>(null);
  const [zoomImg, setZoomImg] = useState<string | null>(null);
  return (
    <div
      className="min-h-screen text-foreground relative overflow-hidden"
      style={{
        backgroundColor: "#050816",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 30%, rgba(168,85,247,0.10), transparent 60%), radial-gradient(ellipse 60% 50% at 30% 70%, rgba(99,102,241,0.10), transparent 60%), radial-gradient(ellipse 70% 50% at 90% 95%, rgba(217,166,72,0.08), transparent 60%), linear-gradient(180deg, #050816 0%, #07091a 50%, #050816 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <Nav />

      {/* Hero */}
      <section id="home" className="relative bg-hero pt-32 pb-20 px-6 overflow-hidden">
        <FloatingBg />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          >
            <motion.div variants={itemVariants}>
              <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm font-medium border border-border/60">
                👋 Welcome to my portfolio
              </Badge>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold leading-[1.05]">
              Hi, I'm <span className="text-gradient">Oussama<br/>Abdel Jebbar</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground font-medium">
              Software Engineer & Full-Stack Developer
            </motion.p>
            <motion.p variants={itemVariants} className="text-base text-muted-foreground/90 leading-relaxed max-w-xl">
              I design and build modern, scalable, and user-focused web applications. Passionate about software engineering, automation, and AI-powered solutions, I transform ideas into high-performance digital products.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="shadow-glow hover:scale-[1.03] transition-transform">
                <a href="#projects">View My Work <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="hover:scale-[1.03] transition-transform">
                <a href="mailto:abdeljebbaroussama51@gmail.com">Contact Me</a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="hover:scale-[1.03] transition-transform">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> Resume
                </a>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/oussama-abdel-jebbar-8784b037b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-full border border-border/60 bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/60 hover:-translate-y-0.5 hover:shadow-glow transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/oussamarca"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-full border border-border/60 bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/60 hover:-translate-y-0.5 hover:shadow-glow transition-all"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:abdeljebbaroussama51@gmail.com"
                aria-label="Email"
                className="p-2.5 rounded-full border border-border/60 bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/60 hover:-translate-y-0.5 hover:shadow-glow transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <motion.div
              className="absolute -inset-6 bg-gradient-to-tr from-primary/30 via-transparent to-primary-glow/20 blur-3xl rounded-full"
              animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/60 shadow-elegant bg-surface"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={oussamaAsset.url} alt="Oussama Abdel Jebbar" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <Reveal className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">About</p>
          <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm Oussama Abdel Jebbar, a Software Engineer and Developer focused on creating innovative digital experiences. I specialize in web development, software architecture, automation, and modern technologies. My goal is to deliver efficient, scalable, and user-friendly solutions that solve real-world problems.
          </p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="py-12 px-6">
        <Stagger className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} variants={itemVariants}>
                <Card className="p-6 bg-card/60 backdrop-blur border-border/60 hover:border-primary/50 hover:shadow-glow transition-all text-center">
                  <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-gradient">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </Stagger>
      </section>


      {/* Skills */}
      <section id="skills" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14 space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Stack</p>
            <h2 className="text-4xl md:text-5xl font-bold">Skills & Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A focused toolkit for building modern, production-grade web and automation systems.</p>
          </Reveal>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.entries(skills).map(([category, items]) => {
              const Icon = skillIcons[category as keyof typeof skillIcons];
              return (
                <motion.div key={category} variants={itemVariants}>
                  <Card className="p-6 bg-card border-border/60 hover:border-primary/50 hover:shadow-glow transition-all hover:-translate-y-1 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                      <h3 className="font-display font-semibold text-lg">{category}</h3>
                    </div>
                    <div className="space-y-3.5">
                      {items.map((s) => (
                        <SkillBar key={s.name} name={s.name} level={s.level} />
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </section>


      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14 space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Services</p>
            <h2 className="text-4xl md:text-5xl font-bold">What I Do</h2>
          </Reveal>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <motion.div key={s.title} variants={itemVariants} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Card className="p-8 bg-card border-border/60 hover:border-primary/50 hover:shadow-glow transition-all group h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <s.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </Card>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>


      {/* Projects */}
      <section id="projects" className="py-24 px-6 bg-surface/40">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14 space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects that showcase my expertise in software development, web technologies, and problem-solving.
            </p>
          </Reveal>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <motion.button
                key={p.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => setActiveProject(p)}
                className="text-left group"
              >
                <Card className="overflow-hidden bg-card border-border/60 hover:border-primary/50 hover:shadow-glow transition-shadow duration-500 h-full flex flex-col">
                  <div className="aspect-video relative overflow-hidden bg-surface">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md bg-primary text-primary-foreground">
                        View details <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.tagline}</p>
                    <div className="flex gap-2 flex-wrap mt-auto">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded bg-secondary border border-border/60">{t}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.button>
            ))}
          </Stagger>


          <Dialog open={!!activeProject} onOpenChange={(o) => !o && setActiveProject(null)}>
            <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border/60">
              {activeProject && (
                <>
                  <div className="aspect-video relative overflow-hidden bg-surface">
                    <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  </div>
                  <div className="p-8 -mt-2">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl md:text-3xl">{activeProject.title}</DialogTitle>
                      <DialogDescription className="text-base text-primary/90">{activeProject.tagline}</DialogDescription>
                    </DialogHeader>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{activeProject.description}</p>
                    <div className="flex gap-2 flex-wrap mt-5">
                      {activeProject.tags.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border/60">{t}</span>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button asChild className="shadow-glow">
                        <a href={activeProject.url} target="_blank" rel="noopener noreferrer">
                          Visit Live Site <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" onClick={() => setActiveProject(null)}>Close</Button>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* AI Automation Projects */}
      <section id="ai-automation" className="relative py-24 px-6 overflow-hidden" style={{ backgroundColor: "#050816" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-500/20 blur-[120px]" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Automation & AI</p>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-[fade-in_0.6s_ease-out]">
              AI Automation Projects
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Production-grade workflows combining n8n, LLMs, and modern APIs to automate real business processes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiProjects.map((p) => {
              const Icon = p.icon;
              return (
                <button key={p.title} onClick={() => setActiveAi(p)} className="text-left group relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/40 via-indigo-500/20 to-purple-500/40 hover:from-blue-400/80 hover:to-purple-400/80 transition-all duration-500">
                  <div className="relative h-full rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/5 overflow-hidden flex flex-col group-hover:-translate-y-1.5 transition-transform duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.5)]">
                    <div className="aspect-video relative overflow-hidden bg-slate-900">
                      <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <div className="absolute top-3 left-3 p-2 rounded-lg bg-slate-950/70 backdrop-blur border border-white/10 text-blue-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          View details <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col gap-4">
                      <h3 className="font-display font-semibold text-lg text-white leading-snug">{p.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{p.description}</p>
                      <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-3">
                        <p className="text-[11px] uppercase tracking-wider text-blue-300 font-semibold mb-1">Impact</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{p.impact}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {p.tags.map((t) => (
                          <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* AI Project Detail Dialog */}
          <Dialog open={!!activeAi} onOpenChange={(o) => !o && setActiveAi(null)}>
            <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto p-0 border-0 bg-[#050816] text-slate-100 animate-[scale-in_0.25s_ease-out]">
              {activeAi && (
                <div className="relative">
                  {/* Banner */}
                  <div className="relative aspect-[21/9] overflow-hidden bg-slate-900">
                    <img src={activeAi.image} alt={activeAi.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {activeAi.tags.slice(0, 4).map((t) => (
                          <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/10 text-slate-200">{t}</span>
                        ))}
                      </div>
                      <DialogHeader className="text-left space-y-2">
                        <DialogTitle className="font-display text-2xl md:text-4xl bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">{activeAi.title}</DialogTitle>
                        <DialogDescription className="text-slate-300 text-base md:text-lg max-w-3xl">{activeAi.overview}</DialogDescription>
                      </DialogHeader>
                    </div>
                  </div>

                  <div className="p-6 md:p-10 space-y-8 animate-[fade-in_0.4s_ease-out]">
                    {/* Problem / Solution */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-orange-500/5 p-5">
                        <div className="flex items-center gap-2 text-red-300 mb-2"><AlertTriangle className="h-4 w-4" /><p className="text-xs uppercase tracking-wider font-semibold">Problem</p></div>
                        <p className="text-sm text-slate-300 leading-relaxed">{activeAi.problem}</p>
                      </div>
                      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-5">
                        <div className="flex items-center gap-2 text-emerald-300 mb-2"><Lightbulb className="h-4 w-4" /><p className="text-xs uppercase tracking-wider font-semibold">Solution</p></div>
                        <p className="text-sm text-slate-300 leading-relaxed">{activeAi.solution}</p>
                      </div>
                    </div>

                    {/* Workflow Architecture */}
                    <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 p-6 md:p-8">
                      <div className="flex items-center gap-2 text-blue-300 mb-4"><Workflow className="h-5 w-5" /><h3 className="font-display font-semibold text-xl text-white">Workflow Architecture</h3></div>
                      <p className="text-sm text-slate-300 leading-relaxed mb-5">{activeAi.architecture}</p>
                      <button onClick={() => setZoomImg(activeAi.image)} className="group relative w-full rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                        <img src={activeAi.image} alt={`${activeAi.title} workflow`} className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-slate-950/80 backdrop-blur border border-white/10 text-slate-200"><ZoomIn className="h-3.5 w-3.5" /> Click to zoom</span>
                        </div>
                      </button>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white mb-3 flex items-center gap-2"><Cpu className="h-4 w-4 text-blue-400" /> Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeAi.tags.map((t) => (
                          <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-blue-400/20 text-slate-200">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Features & Challenges */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                        <h3 className="font-display font-semibold text-base text-white mb-3 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Key Features</h3>
                        <ul className="space-y-2">
                          {activeAi.features.map((f) => (
                            <li key={f} className="flex gap-2 text-sm text-slate-300"><span className="text-emerald-400 mt-1">▸</span><span>{f}</span></li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                        <h3 className="font-display font-semibold text-base text-white mb-3 flex items-center gap-2"><Target className="h-4 w-4 text-amber-400" /> Challenges Faced</h3>
                        <ul className="space-y-2">
                          {activeAi.challenges.map((c) => (
                            <li key={c} className="flex gap-2 text-sm text-slate-300"><span className="text-amber-400 mt-1">▸</span><span>{c}</span></li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Results & Timeline */}
                    <div className="grid md:grid-cols-3 gap-5">
                      <div className="md:col-span-2 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/5 p-5">
                        <h3 className="font-display font-semibold text-base text-white mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-purple-300" /> Results & Impact</h3>
                        <ul className="space-y-2">
                          {activeAi.results.map((r) => (
                            <li key={r} className="flex gap-2 text-sm text-slate-200"><span className="text-purple-300 mt-1">★</span><span>{r}</span></li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-blue-300 mb-1"><Calendar className="h-4 w-4" /><p className="text-xs uppercase tracking-wider font-semibold">Timeline</p></div>
                        <p className="text-2xl font-display font-bold text-white">{activeAi.timeline}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-2 border-t border-white/5">
                      {activeAi.liveUrl && (
                        <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white border-0">
                          <a href={activeAi.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo <ExternalLink className="ml-2 h-4 w-4" /></a>
                        </Button>
                      )}
                      {activeAi.repoUrl && (
                        <Button asChild variant="outline" className="border-white/20 bg-white/5 text-slate-100 hover:bg-white/10">
                          <a href={activeAi.repoUrl} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub Repository</a>
                        </Button>
                      )}
                      <Button variant="ghost" onClick={() => setActiveAi(null)} className="text-slate-300 hover:bg-white/5 hover:text-white ml-auto">
                        ← Back to Projects
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Zoom Lightbox */}
          <Dialog open={!!zoomImg} onOpenChange={(o) => !o && setZoomImg(null)}>
            <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-[#050816]/95 border-white/10 overflow-hidden">
              <DialogHeader className="sr-only">
                <DialogTitle>Workflow zoom</DialogTitle>
              </DialogHeader>
              {zoomImg && (
                <div className="relative w-full h-full overflow-auto">
                  <button onClick={() => setZoomImg(null)} aria-label="Close zoom" className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-950/80 border border-white/10 text-white hover:bg-slate-900">
                    <X className="h-4 w-4" />
                  </button>
                  <img src={zoomImg} alt="Workflow zoomed" className="w-full h-auto object-contain" />
                </div>
              )}
            </DialogContent>
          </Dialog>

        </div>
      </section>

      {/* Certificates */}

      <section id="certificates" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14 space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Achievements</p>
            <h2 className="text-4xl md:text-5xl font-bold">Certificates</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of workshops and trainings I've completed — focused on agile practices, AI, and automation.
            </p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((c) => (
              <motion.button
                key={c.title + c.date}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => setActiveCert(c)}
                className="text-left group"
              >
                <Card className="overflow-hidden bg-card border-border/60 hover:border-primary/50 hover:shadow-glow transition-shadow duration-500 h-full flex flex-col">
                  <div className="aspect-[4/3] relative overflow-hidden bg-surface">
                    <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col gap-1.5 border-t border-border/60">
                    <div className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <h3 className="font-display font-semibold text-base leading-snug group-hover:text-primary transition-colors">{c.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">{c.issuer}</p>
                    <p className="text-xs text-muted-foreground/70 pl-6">{c.date}</p>
                  </div>
                </Card>
              </motion.button>
            ))}
          </Stagger>

          <Dialog open={!!activeCert} onOpenChange={(o) => !o && setActiveCert(null)}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border/60">
              {activeCert && (
                <>
                  <div className="bg-surface p-4">
                    <img src={activeCert.image} alt={activeCert.title} className="w-full h-auto rounded" />
                  </div>
                  <div className="p-6">
                    <DialogHeader>
                      <DialogTitle className="font-display text-xl md:text-2xl">{activeCert.title}</DialogTitle>
                      <DialogDescription className="text-primary/90">{activeCert.issuer} · {activeCert.date}</DialogDescription>
                    </DialogHeader>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>


      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-10 space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Contact</p>
            <h2 className="text-4xl md:text-5xl font-bold">Let's Work Together</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Have a project in mind or want to collaborate? Send me a message and I'll get back to you.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="p-8 md:p-10 bg-gradient-to-br from-card to-surface border-border/60 shadow-elegant">
              <ContactForm />
            </Card>
          </Reveal>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-border/50 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Oussama Abdel Jebbar. All rights reserved.</p>
          <p>Software Engineer & Developer.</p>
          <div className="flex gap-2">
            <a
              href="https://github.com/oussamarca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/oussama-abdel-jebbar-8784b037b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:abdeljebbaroussama51@gmail.com"
              aria-label="Email"
              className="p-2 rounded-full hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
