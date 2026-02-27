import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Cloud, Database, Cpu, Terminal, ExternalLink, ChevronRight, Server, Layout, GraduationCap, Layers, FlaskConical } from 'lucide-react';
import { SiNodedotjs, SiRubyonrails, SiMysql, SiMongodb, SiAmazonwebservices, SiGooglecloud, SiPython, SiDocker } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [count, setCount] = useState(0);

  // Use native IntersectionObserver — far more reliable on mobile than
  // framer-motion useInView with a negative rootMargin.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      {
        // 10 % of the element visible is enough to fire — works on all
        // viewport sizes including small mobile screens.
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;
    const target = parseInt(value);
    if (isNaN(target)) { setCount(value); return; }
    const steps = 50;
    const stepDuration = (duration * 1000) / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      // Ease-out: progress faster at start, slower at end
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const displayed = Math.round(eased * target);
      setCount(displayed);
      if (current >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [hasTriggered, value, duration]);

  return (
    <span ref={ref}>
      {hasTriggered ? `${count}${suffix}` : `0${suffix}`}
    </span>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    backend: ['Node.js', 'JavaScript', 'Ruby on Rails', 'Python', 'Express.js', 'Hapi.js', 'REST APIs', 'ETL Pipelines', 'Webhook Processing'],
    devops: ['Docker', 'Jenkins', 'CI/CD', 'AWS (EC2, Lambda, SQS, SNS)', 'Azure', 'GCP', 'Nginx', 'Capistrano', 'DigitalOcean'],
    databases: ['MongoDB', 'MySQL', 'Redis', 'Indexing', 'Aggregation Pipelines', 'Query Optimization', 'Caching'],
    testing: ['RSpec', 'Mocha', 'Jest', 'Swagger', 'Git', 'GitHub', 'Bitbucket'],
  };

  const projects = [
    {
      title: 'DNAFabric — StorageDNA',
      role: 'Backend & AI/ML Integrations Engineer (Remote — USA)',
      period: 'Apr 2024 – Present',
      description: 'AI-powered media asset management platform serving enterprise clients including Netflix, Warner Bros., and Pinewood Studios.',
      highlights: [
        'Implemented batch and event-driven ETL pipelines (Node.js + Python) for metadata extraction using AWS Rekognition, Azure Cognitive Services, GCP Vision, and specialist providers',
        'Architected MongoDB data models, compound indexes, and aggregation pipelines enabling fast full-text and structured querying across large enriched media catalogs',
        'Developed multi-vendor AI aggregation feature normalizing outputs from disparate providers into a unified MongoDB schema, eliminating data silos',
        'Delivered flexible export system and contributed ~50 REST API endpoints',
        'Developed cross-project insight linking — aggregating AI insights from the same media file across different platforms into a single access point'
      ],
      tech: ['Node.js', 'Python', 'MongoDB', 'AWS', 'Azure', 'GCP', 'Docker'],
      icon: <Cloud className="w-7 h-7" />,
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: 'Healthray',
      role: 'Software Developer — Backend',
      period: 'Jan 2023 – Present',
      description: 'Multi-tenant healthcare SaaS platform serving 1,500+ organizations, 10,000+ doctors, and thousands of pharmacy and lab staff.',
      highlights: [
        'Shipped 100+ REST API endpoints across three Node.js modules (EMR, Laboratory, Admin Panel)',
        'Designed subscription-tiered, resource-level, multi-tenant RBAC system with strict cross-tenant data isolation',
        'Integrated Razorpay payment processing — subscription plan management, async webhook handling, automated invoice/receipt generation',
        'Reduced query execution time from 16–17s → 1–2s using composite indexes and precomputed MySQL views',
        'Rebuilt Docker infrastructure with Alpine + multi-stage builds; isolated modules into dedicated Docker bridge networks',
        'Set up Jenkins CI/CD pipelines per module with distinct staging and production environments'
      ],
      tech: ['Node.js', 'Ruby on Rails', 'MySQL', 'Redis', 'MongoDB', 'Docker', 'Jenkins'],
      icon: <Database className="w-7 h-7" />,
      color: "from-blue-500 to-indigo-600"
    }
  ];

  const experience = [
    {
      company: 'StorageDNA — via Bigscal Technologies (Contract)',
      role: 'Backend & AI/ML Integrations Engineer',
      period: 'Apr 2024 – Present',
      description: 'Part of a small 5–10 person engineering team building DNAFabric, an AI-powered media asset management platform serving Netflix, Warner Bros., and Pinewood Studios.',
      achievements: [
        'Implemented batch & event-driven ETL pipelines (Node.js + Python) using AWS Rekognition, Azure Cognitive Services, GCP Vision — covering transcription, label detection, celebrity recognition, and content moderation',
        'Architected MongoDB data models, compound indexes, and aggregation pipelines for fast full-text querying across enriched media catalogs',
        'Developed multi-vendor AI aggregation normalizing outputs into a unified MongoDB schema, and cross-project insight linking',
        'Delivered flexible export system and contributed ~50 REST API endpoints'
      ]
    },
    {
      company: 'Bigscal Technologies Pvt. Ltd.',
      role: 'Software Developer',
      period: 'Jan 2023 – Present',
      description: 'Primary project: Healthray — Multi-Tenant Healthcare SaaS serving 1,500+ organizations and 10,000+ doctors. Joined at ~50 engineers, now 150+.',
      achievements: [
        'Shipped 100+ REST API endpoints across three Node.js modules (EMR, Laboratory, Admin Panel)',
        'Designed subscription-tiered, resource-level, multi-tenant RBAC with strict cross-tenant data isolation',
        'Reduced query execution time from 16–17s → 1–2s via composite indexes and precomputed MySQL views',
        'Automated WhatsApp campaign delivery via Vartalaap — cutting setup effort by 70%+',
        'Rebuilt Docker infrastructure with Alpine + multi-stage builds; set up Jenkins CI/CD per module',
        'Maintained ERB-based Rails admin panel covering org onboarding, feature flags, and billing'
      ]
    }
  ];

  const notableProjects = [
    {
      title: 'Dynamic RBAC with Real-Time Permission Updates',
      context: 'Healthray',
      tech: 'Node.js · MySQL · Redis',
      period: '2023 – Present',
      description: 'Implemented real-time permission resolution evaluating access on every request against live role state; used Redis to absorb performance overhead. Resolves three layers per request: subscription plan gates, role-level resource permissions, and strict multi-tenant data isolation — no restarts or cache invalidation needed.'
    },
    {
      title: 'Metadata Enrichment & Cross-Platform Insight Linking',
      context: 'DNAFabric',
      tech: 'Node.js · Python · MongoDB · AWS · Azure · GCP',
      period: '2024 – Present',
      description: 'Normalized AI outputs from AWS Rekognition, Azure, GCP, and specialist providers into a unified MongoDB schema supporting full-text search and structured filtering. Developed cross-project insight linking aggregating AI insights from the same media file across platforms into a single access point.'
    },
    {
      title: 'Multi-Module CI/CD on Shared Infrastructure',
      context: 'Healthray',
      tech: 'Docker · Jenkins · docker-compose · Linux',
      period: '2023 – Present',
      description: 'Solved Redis cache pollution and job queue interference by switching to Alpine base images with multi-stage builds and dedicated Docker bridge networks per module. Eliminated cross-module data integrity issues, reduced image sizes significantly, and made per-module Jenkins deployments independent and predictable.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.98, filter: 'blur(8px)' },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] // Cinematic ease-out
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 origin-left z-[100]"
      />
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-indigo-900/20 blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Modern Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-2 sm:py-3' : 'bg-transparent py-3 sm:py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-display font-bold text-base sm:text-lg shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 flex-shrink-0">
              DB
            </div>
            <span className="hidden xs:inline text-lg sm:text-xl font-display font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Darshan Babariya
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-5"
          >
            <a href="https://github.com/darshan2101" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/darshan-babariya-dev" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0A66C2]/20 transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:dgbabariya305@gmail.com"
              className="px-3 sm:px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-all duration-300 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Let's Talk</span>
            </a>
          </motion.div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Dynamic Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-5 sm:space-y-8"
            >
              {/* Mobile Profile Image */}
              <motion.div variants={itemVariants} className="flex lg:hidden justify-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_60px_-10px_rgba(6,182,212,0.5)]">
                  <img
                    src="/darshan_profile_image.png"
                    alt="Darshan Babariya"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium tracking-wide">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Available for Remote Work
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-sm"
              >
                Hi, I'm{' '}
                <span className="animate-gradient-text text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                  Darshan Babariya
                </span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-light space-y-3 sm:space-y-4"
              >
                <p>
                  <strong className="text-white font-medium text-lg sm:text-xl">Backend Engineer | Remote Work Proven</strong><br />
                  <span className="text-cyan-400 text-xs sm:text-sm font-medium tracking-wide">Node.js • Ruby on Rails • Python • DevOps • Cloud (AWS/Azure/GCP) • AI/ML Pipelines</span>
                </p>
                <p>
                  3+ years shipping production systems at real scale — a healthcare SaaS serving <strong className="text-white">1,500+ organizations</strong> and <strong className="text-white">10,000+ doctors</strong>, and an AI media platform trusted by <strong className="text-white">Netflix, Warner Bros., and Pinewood Studios</strong>.
                </p>
                <ul className="space-y-1.5 sm:space-y-2 text-[13px] sm:text-[15px] pt-2">
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">✓</span> <strong>Backend:</strong> Node.js, Ruby on Rails, Python, Express.js, Hapi.js, REST APIs</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">✓</span> <strong>Cloud & DevOps:</strong> Docker, Jenkins, CI/CD, AWS, Azure, GCP, Nginx</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">✓</span> <strong>AI/ML:</strong> AWS Rekognition, Azure Cognitive Services, GCP Vision</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">✓</span> <strong>Databases:</strong> MongoDB, MySQL, Redis — Indexing, Aggregation, Caching</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                <a href="#projects"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-950 font-medium rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)] text-sm sm:text-base">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Work <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a href="/Darshan_Babariya_Resume.pdf" target="_blank" rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium backdrop-blur-md transition-all text-sm sm:text-base">
                  View Resume
                </a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="pt-6 sm:pt-10 inline-flex items-stretch gap-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden text-xs sm:text-sm font-medium w-full max-w-xs sm:max-w-sm"
              >
                {[
                  { val: '3', suf: '+', label: 'Years Exp.' },
                  { val: '10', suf: '+', label: 'Projects' },
                  { val: '100', suf: '%', label: 'Dedication' },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    className={`flex-1 flex flex-col items-center justify-center py-3 sm:py-4 gap-0.5 ${i < arr.length - 1 ? 'border-r border-white/10' : ''}`}
                  >
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-none tracking-tight">
                      <AnimatedCounter value={item.val} suffix={item.suf} />
                    </span>
                    <span className="text-slate-400 text-[10px] sm:text-xs font-semibold tracking-wide mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Profile Image + Tech Stack Orbit */}
            <motion.div
              style={{ y: y1 }}
              className="hidden lg:flex relative h-[600px] items-center justify-center lg:justify-end"
            >
              <div className="relative w-[450px] h-[450px]">
                <div className="absolute inset-0 rounded-full border border-white/5 border-dashed animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-8 rounded-full border border-cyan-500/20 border-dotted animate-[spin_40s_linear_infinite_reverse]" />
                <div className="absolute inset-16 rounded-full border border-white/5 border-dashed animate-[spin_30s_linear_infinite]" />

                {/* Floating Tech Icons */}
                {[
                  { Icon: SiNodedotjs, color: 'text-[#339933]', delay: 0, pos: 'top-[15%] right-[15%]' },
                  { Icon: SiRubyonrails, color: 'text-[#CC0000]', delay: 1, pos: 'bottom-[20%] right-[10%]' },
                  { Icon: SiMysql, color: 'text-[#4479A1]', delay: 2, pos: 'bottom-[5%] left-[30%]' },
                  { Icon: SiMongodb, color: 'text-[#47A248]', delay: 3, pos: 'top-[5%] right-[40%]' },
                  { Icon: SiAmazonwebservices, color: 'text-[#FF9900]', delay: 4, pos: 'top-[30%] left-[5%]' },
                  { Icon: SiGooglecloud, color: 'text-[#4285F4]', delay: 5, pos: 'bottom-[30%] left-[10%]' },
                  { Icon: VscAzure, color: 'text-[#0089D6]', delay: 1.5, pos: 'top-[15%] left-[25%]' },
                  { Icon: SiPython, color: 'text-[#3776AB]', delay: 2.5, pos: 'bottom-[15%] right-[30%]' },
                  { Icon: SiDocker, color: 'text-[#2496ED]', delay: 3.5, pos: 'top-[45%] right-[-5%]' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: item.delay }}
                    className={`absolute ${item.pos} w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl flex items-center justify-center ${item.color} backdrop-blur-xl hover:scale-110 transition-transform`}
                  >
                    <item.Icon className="w-7 h-7" />
                  </motion.div>
                ))}

                {/* Center — Profile Image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_80px_-10px_rgba(6,182,212,0.5)]">
                  <img
                    src="/darshan_profile_image.png"
                    alt="Darshan Babariya"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative bg-white/[0.01] border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-10 sm:mb-16 lg:mb-20 text-center"
            >
              <h2 className="text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase mb-3 sm:mb-4">Core Competencies</h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Technical Arsenal</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {[
                { title: 'Backend', icon: <Server className="w-6 h-6" />, skills: skills.backend, color: 'from-cyan-400 to-cyan-600', shadow: 'hover:shadow-cyan-500/20' },
                { title: 'Cloud & DevOps', icon: <Cloud className="w-6 h-6" />, skills: skills.devops, color: 'from-blue-400 to-blue-600', shadow: 'hover:shadow-blue-500/20' },
                { title: 'Databases', icon: <Database className="w-6 h-6" />, skills: skills.databases, color: 'from-emerald-400 to-emerald-600', shadow: 'hover:shadow-emerald-500/20' },
                { title: 'Testing & Tools', icon: <FlaskConical className="w-6 h-6" />, skills: skills.testing, color: 'from-indigo-400 to-indigo-600', shadow: 'hover:shadow-indigo-500/20' }
              ].map((category, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={idx}
                  className={`group shimmer-effect relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${category.shadow}`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 flex items-center justify-center bg-gradient-to-br ${category.color} text-white shadow-lg relative z-10`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight relative z-10">{category.title}</h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-lg text-[13px] text-slate-300 group-hover:border-white/20 group-hover:text-white transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section >

        <section id="projects" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-10 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-sm font-bold tracking-[0.2em] text-blue-400 uppercase mb-3 sm:mb-4">Selected Work</h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Impactful Projects</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8 sm:space-y-12"
            >
              {projects.map((project, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={idx}
                  className="group grid md:grid-cols-5 gap-5 sm:gap-8 bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] p-5 sm:p-8 md:p-12 hover:bg-white/[0.06] transition-all duration-700 relative overflow-hidden shimmer-effect"
                >
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 blur-[120px] transition-all duration-1000 pointer-events-none`} />

                  <div className="md:col-span-2 flex flex-col justify-between z-10">
                    <div>
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${project.color} text-white flex items-center justify-center mb-4 sm:mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                        {project.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                      <p className="text-cyan-400 font-medium text-sm sm:text-base mb-4 sm:mb-6">{project.role}</p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm text-slate-500 font-medium uppercase tracking-[0.1em]">{project.period}</p>
                    </div>
                  </div>

                  <div className="md:col-span-3 z-10">
                    <p className="text-base sm:text-lg text-slate-300 mb-5 sm:mb-8 leading-relaxed max-w-2xl font-light">{project.description}</p>

                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 sm:gap-4 text-slate-400 group-hover:text-slate-200 transition-colors text-sm sm:text-base">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 sm:mt-2.5 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/5 rounded-full text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div >
        </section >

        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white/[0.01] border-y border-white/5 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-10 sm:mb-16 lg:mb-20 text-center"
            >
              <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-400 uppercase mb-3 sm:mb-4">Journey</h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Professional Experience</p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-0 md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 md:-ml-px"></div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {experience.map((exp, idx) => (
                  <motion.div
                    variants={itemVariants}
                    key={idx}
                    className="relative w-full md:w-1/2 md:pr-12 md:text-right md:ml-0 md:first:mt-0 mt-16 group pl-8 md:pl-0"
                  >
                    <div className="absolute left-0 md:left-full top-6 w-4 h-4 bg-slate-950 border-2 border-cyan-400 rounded-full md:-ml-[8px] -translate-x-[15px] md:translate-x-0 group-hover:bg-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all z-10"></div>

                    <div className="shimmer-effect bg-white/[0.03] border border-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500">
                      <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold tracking-widest rounded-md mb-3 sm:mb-4 uppercase">
                        {exp.period}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors uppercase tracking-tight">{exp.role}</h3>
                      <p className="text-base sm:text-lg text-slate-400 font-medium mb-3 sm:mb-4">{exp.company}</p>
                      <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6 leading-relaxed text-left md:text-right font-light">{exp.description}</p>

                      <ul className="space-y-3 text-left">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start md:items-center md:flex-row-reverse gap-2 sm:gap-3 text-slate-400 text-xs sm:text-sm group-hover:text-slate-200 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 md:mt-0 flex-shrink-0" />
                            <span className="leading-relaxed md:text-right">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section >

        {/* Notable Projects Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 sm:mb-16 lg:mb-20">
              <h2 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-3 sm:mb-4">Deep Dives</h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">Notable Projects</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {notableProjects.map((project, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  className="group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider rounded-md uppercase">{project.context}</span>
                    <span className="text-xs text-slate-500 font-medium">{project.period}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors leading-tight">{project.title}</h3>

                  <p className="text-sm text-cyan-400/80 font-medium mb-4">{project.tech}</p>

                  <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 sm:mb-16 text-center">
              <h2 className="text-sm font-bold tracking-widest text-amber-400 uppercase mb-3 sm:mb-4">Education</h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">Academic Background</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl hover:bg-white/[0.07] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-2xl flex-shrink-0">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">B.Tech, Computer Engineering</h3>
                  <p className="text-base sm:text-lg text-slate-400 font-medium mb-2">Gujarat Technological University (GTU)</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                    <span className="px-2 sm:px-3 py-1 bg-amber-500/10 text-amber-400 font-bold tracking-wider rounded-md uppercase">2019 – 2023</span>
                    <span className="px-2 sm:px-3 py-1 bg-emerald-500/10 text-emerald-400 font-bold tracking-wider rounded-md uppercase">GPA: 9.0 / 10</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Contact */}
        <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-950/20" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 sm:p-12 md:p-20 bg-white/5 border border-white/10 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] backdrop-blur-xl"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6">Let's build something <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">extraordinary.</span></h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-10 max-w-2xl mx-auto">
                Currently looking for remote opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="mailto:dgbabariya305@gmail.com"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-950 text-sm sm:text-base font-bold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" /> Say Hello
                </a>
                <a href="https://linkedin.com/in/darshan-babariya-dev" target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/10 bg-white/5 text-white backdrop-blur-md rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium text-sm sm:text-base">
                  <Linkedin className="w-5 h-5" /> Connect via LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </section >
      </main >

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-white/10 bg-black/50 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-slate-500 text-xs sm:text-sm font-medium">
          <p>© {new Date().getFullYear()} Darshan Babariya. Designed & Built meticulously.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open to Work
            </span>
          </div>
        </div>
      </footer >
    </div >
  );
}