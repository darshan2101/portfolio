import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Cloud, Database, Cpu, Terminal, ExternalLink, ChevronRight, Server, Layout } from 'lucide-react';
import { SiNodedotjs, SiRubyonrails, SiMysql, SiMongodb, SiAmazonwebservices, SiGooglecloud, SiPython, SiDocker } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    backend: ['Node.js', 'Python', 'Ruby on Rails', 'Express.js', 'REST APIs', 'GraphQL', 'Microservices'],
    devops: ['Docker', 'Jenkins', 'CI/CD', 'AWS (EC2, Lambda, S3, SNS, SQS)', 'Azure', 'GCP', 'Digital Ocean'],
    aiml: ['AWS Rekognition', 'Azure Video Indexer', 'GCP Computer Vision', 'AI/ML Pipelines', 'Metadata Processing'],
    databases: ['MongoDB', 'MySQL', 'SQLite', 'Redis'],
  };

  const projects = [
    {
      title: 'StorageDNA',
      role: 'Backend & AI/ML Engineer (Remote - USA)',
      period: 'April 2023 - Present',
      description: 'AI-powered storage management platform serving enterprise clients. Revolutionized their approach to media processing.',
      highlights: [
        'Developed AI/ML pipelines for metadata extraction using AWS, Azure, and GCP computer vision APIs',
        'Engineered highly scalable backend services with Node.js and Python',
        'Optimized database performance for enterprise-scale workloads seamlessly handling terabytes of data',
        'Direct collaboration with US team via synchronous/asynchronous communication'
      ],
      tech: ['Node.js', 'Python', 'AWS', 'Azure', 'GCP', 'Docker', 'MongoDB'],
      icon: <Cloud className="w-7 h-7" />,
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: 'Healthray',
      role: 'Backend Engineer',
      period: 'January 2023 - Present',
      description: 'Healthcare SaaS platform serving thousands of providers with mission-critical availability.',
      highlights: [
        'Architected robust backend infrastructure with Node.js and Ruby on Rails',
        'Implemented WhatsApp API integration for automated patient campaigns',
        'Developed sophisticated access management system with granular role-based permissions',
        'Orchestrated database optimization specifically tuned for complex healthcare data structures'
      ],
      tech: ['Node.js', 'Ruby on Rails', 'MySQL', 'Docker', 'Jenkins', 'AWS'],
      icon: <Database className="w-7 h-7" />,
      color: "from-blue-500 to-indigo-600"
    }
  ];

  const experience = [
    {
      company: 'BIGSCAL Technologies',
      role: 'Backend Engineer',
      period: 'Jan 2023 - Present',
      description: 'Managing enterprise backend projects with DevOps and AI/ML focus. Remote collaboration with US-based clients.',
      achievements: [
        'StorageDNA (USA Remote): AI/ML-powered storage management platform utilizing Python pipelines and metadata extraction',
        'StorageDNA: Integrated AWS Rekognition, Azure Video Indexer, and GCP Computer Vision APIs',
        'Healthray (SaaS): Architected healthcare backend with Node.js, Ruby on Rails, and MySQL',
        'DevOps/Cloud: Dockerized applications, configured Jenkins CI/CD, and managed infrastructure across AWS, Azure, and DO'
      ]
    },
    {
      company: 'Bluesoft Infotech',
      role: 'Internship Trainee',
      period: 'Jul 2022 - Dec 2022',
      description: 'Learned React.js and Node.js basics and utilized them to build core functionalities for an HRMS project.',
      achievements: [
        'Built full-stack HRMS functionalities including sandwich leave calculation and ticket resolution reminders.',
        'Developed an automated assignment module for the HR department.',
        'Created attendance management alerts for PMs and TLs to effectively track their teams.'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-display font-bold text-lg shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              DB
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Darshan.
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-5"
          >
            <a href="https://github.com/darshan2101" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/darshan-babariya-dev" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0A66C2]/20 transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:dgbabariya305@gmail.com"
              className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-all duration-300 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Let's Talk</span>
            </a>
          </motion.div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Dynamic Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 pb-10 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8"
            >
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
                className="text-4xl sm:text-6xl font-display font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-sm"
              >
                Building Systems that <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                  Scale gracefully.
                </span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="text-lg text-slate-300 max-w-xl leading-relaxed font-light space-y-4"
              >
                <p>
                  <strong className="text-white font-medium text-xl">Backend Engineer | Remote Work Proven</strong><br />
                  <span className="text-cyan-400 text-sm font-medium tracking-wide">DevOps • Cloud (AWS/Azure/GCP) • AI/ML Pipelines • Node.js • Python • MongoDB</span>
                </p>
                <p>
                  3+ years building scalable systems. Currently working remote with StorageDNA (US client) while managing an active healthcare SaaS backend.
                </p>
                <ul className="space-y-2 text-[15px] pt-2">
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">✓</span> <strong>Tech:</strong> Node.js, Python, Ruby on Rails, Docker, Jenkins</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">✓</span> <strong>Cloud:</strong> AWS (EC2/Lambda), Azure, GCP, Digital Ocean</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">✓</span> <strong>AI/ML:</strong> AWS Rekognition, Azure Video Indexer, GCP Vision</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">✓</span> <strong>Databases:</strong> MongoDB, MySQL, SQLite, Redis</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
                <a href="#projects"
                  className="group relative px-8 py-4 bg-white text-slate-950 font-medium rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)]">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Work <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a href="/Darshan_Babariya_Resume.pdf" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium backdrop-blur-md transition-all">
                  View Resume
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-10 flex items-center gap-8 text-slate-500 text-sm font-medium">
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-bold text-white">3+</span>
                  <span>Years Exp.</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-bold text-white">10+</span>
                  <span>Projects</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-bold text-white">100%</span>
                  <span>Dedication</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Abstract visual/Tech Stack rendering */}
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

                {/* Center Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-[0_0_80px_-10px_rgba(6,182,212,0.5)]">
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                    <Terminal className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-32 px-6 relative bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-sm font-bold tracking-widest text-cyan-400 uppercase mb-4">Core Competencies</h2>
              <p className="text-4xl md:text-5xl font-display font-bold text-white">Technical Arsenal</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Backend', icon: <Server className="w-6 h-6" />, skills: skills.backend, color: 'from-cyan-400 to-cyan-600', shadow: 'hover:shadow-cyan-500/20' },
                { title: 'Cloud & DevOps', icon: <Cloud className="w-6 h-6" />, skills: skills.devops, color: 'from-blue-400 to-blue-600', shadow: 'hover:shadow-blue-500/20' },
                { title: 'AI & Data Processing', icon: <Cpu className="w-6 h-6" />, skills: skills.aiml, color: 'from-indigo-400 to-indigo-600', shadow: 'hover:shadow-indigo-500/20' },
                { title: 'Databases', icon: <Database className="w-6 h-6" />, skills: skills.databases, color: 'from-emerald-400 to-emerald-600', shadow: 'hover:shadow-emerald-500/20' }
              ].map((category, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  className={`group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${category.shadow}`}
                >
                  <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-6">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-sm text-slate-300 group-hover:border-white/20 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section >

        {/* Featured Work */}
        < section id="projects" className="py-32 px-6 relative" >
          <div className="max-w-6xl mx-auto">
            <div className="mb-20">
              <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-4">Selected Work</h2>
              <p className="text-4xl md:text-5xl font-display font-bold text-white">Impactful Projects</p>
            </div>

            <div className="space-y-12">
              {projects.map((project, idx) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  key={idx}
                  className="group grid md:grid-cols-5 gap-8 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover:bg-white/[0.08] transition-all duration-500 relative overflow-hidden"
                >
                  {/* Glowing hover effect */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 blur-[100px] transition-opacity duration-700 pointer-events-none`} />

                  <div className="md:col-span-2 flex flex-col justify-between z-10">
                    <div>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} text-white flex items-center justify-center mb-8 shadow-2xl`}>
                        {project.icon}
                      </div>
                      <h3 className="text-3xl font-display font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-cyan-400 font-medium mb-6">{project.role}</p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{project.period}</p>
                    </div>
                  </div>

                  <div className="md:col-span-3 z-10">
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">{project.description}</p>

                    <ul className="space-y-4 mb-10">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-4 text-slate-400 group-hover:text-slate-300 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2.5 flex-shrink-0" />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/5 rounded-full text-xs font-medium text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div >
        </section >

        {/* Experience Timeline */}
        < section className="py-32 px-6 bg-white/[0.02] border-y border-white/5" >
          <div className="max-w-4xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">Journey</h2>
              <p className="text-4xl md:text-5xl font-display font-bold text-white">Professional Experience</p>
            </div>

            <div className="relative">
              {/* Vertical line connecting experiences */}
              <div className="absolute left-0 md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 md:-ml-px"></div>

              {experience.map((exp, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={idx}
                  className="relative w-full md:w-1/2 md:pr-12 md:text-right md:ml-0 md:first:mt-0 mt-16 group pl-8 md:pl-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-full top-6 w-4 h-4 bg-slate-950 border-2 border-cyan-400 rounded-full md:-ml-[8px] -translate-x-[15px] md:translate-x-0 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all z-10"></div>

                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/[0.08] transition-all">
                    <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-wider rounded-md mb-4 uppercase">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{exp.role}</h3>
                    <p className="text-lg text-slate-400 font-medium mb-4">{exp.company}</p>
                    <p className="text-slate-300 mb-6 leading-relaxed text-left md:text-right">{exp.description}</p>

                    <ul className="space-y-3 text-left">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start md:items-center md:flex-row-reverse gap-3 text-slate-400 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 md:mt-0 flex-shrink-0" />
                          <span className="leading-relaxed md:text-right">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section >

        {/* CTA Contact */}
        < section id="contact" className="py-32 px-6 relative overflow-hidden" >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-950/20" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-12 md:p-20 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl"
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6"> Let's build something <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">extraordinary.</span></h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Currently looking for remote opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="mailto:dgbabariya305@gmail.com"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 text-base font-bold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" /> Say Hello
                </a>
                <a href="https://linkedin.com/in/darshan-babariya-dev" target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 text-white backdrop-blur-md rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium">
                  <Linkedin className="w-5 h-5" /> Connect via LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </section >
      </main >

      {/* Footer */}
      < footer className="py-8 px-6 border-t border-white/10 bg-black/50 backdrop-blur-md relative z-10" >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-medium">
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