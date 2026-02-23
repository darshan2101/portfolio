import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code2, Cloud, Database, Cpu, Terminal, ExternalLink, ChevronRight } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = {
    backend: ['Node.js', 'Python', 'Ruby on Rails', 'Express.js', 'REST APIs', 'GraphQL', 'Microservices'],
    devops: ['Docker', 'Jenkins', 'CI/CD', 'AWS', 'Azure', 'GCP', 'Digital Ocean'],
    aiml: ['AWS Rekognition', 'Azure Video Indexer', 'GCP Computer Vision', 'AI/ML Pipelines', 'Metadata Processing'],
    databases: ['MongoDB', 'MySQL', 'Redis', 'SQLite'],
  };

  const projects = [
    {
      title: 'StorageDNA',
      role: 'Backend & AI/ML Engineer (Remote - USA)',
      period: 'May 2024 - Present',
      description: 'AI-powered storage management platform serving enterprise clients',
      highlights: [
        'Developed AI/ML pipelines for metadata extraction using AWS Rekognition, Azure Video Indexer, GCP Computer Vision',
        'Built scalable backend services with Node.js and Python',
        'Optimized database performance for enterprise-scale workloads',
        'Direct collaboration with US team via Slack/calls'
      ],
      tech: ['Node.js', 'Python', 'AWS', 'Azure', 'GCP', 'Docker', 'MongoDB', 'AI/ML'],
      icon: <Cloud className="w-6 h-6" />
    },
    {
      title: 'Healthray',
      role: 'Backend Engineer',
      period: '2023 - Present',
      description: 'Healthcare SaaS platform serving thousands of providers',
      highlights: [
        'Built backend architecture with Node.js and Ruby on Rails',
        'Implemented WhatsApp API integration for automated campaigns',
        'Developed access management system with granular permissions',
        'Database optimization for healthcare data'
      ],
      tech: ['Node.js', 'Ruby on Rails', 'MySQL', 'Docker', 'Jenkins', 'AWS'],
      icon: <Database className="w-6 h-6" />
    }
  ];

  const experience = [
    {
      company: 'BIGSCAL Technologies',
      role: 'Backend Engineer',
      period: 'Jan 2023 - Present',
      description: 'Managing multiple enterprise projects with DevOps and AI/ML focus',
      achievements: [
        'Working remotely with US-based StorageDNA team',
        'AI/ML pipeline development for media processing',
        'DevOps implementation with Docker, Jenkins, CI/CD',
        'Multi-project management across different domains'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Darshan Babariya
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/darshan2101" target="_blank" rel="noopener noreferrer"
               className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/darshan-babariya-dev" target="_blank" rel="noopener noreferrer"
               className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:dgbabariya305@gmail.com"
               className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              Available for Remote Opportunities
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Backend Engineer
            </span>
            <br />
            <span className="text-slate-200">Building Scalable Systems</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed">
            3+ years crafting high-performance backend systems with{' '}
            <span className="text-cyan-400 font-medium">DevOps</span>,{' '}
            <span className="text-blue-400 font-medium">AI/ML</span>, and{' '}
            <span className="text-purple-400 font-medium">Cloud Solutions</span>.
            Currently remote with US-based StorageDNA.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" 
               className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2">
              View Projects <ChevronRight className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/darshan-babariya-dev" target="_blank" rel="noopener noreferrer"
               className="px-6 py-3 border border-cyan-500/30 rounded-lg font-medium hover:bg-cyan-500/10 transition-all flex items-center gap-2">
              LinkedIn <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Floating code snippet decoration */}
        <div className="absolute top-40 right-10 hidden lg:block opacity-20">
          <pre className="text-cyan-400 text-xs font-mono">
{`const engineer = {
  name: "Darshan",
  role: "Backend Engineer",
  stack: ["Node.js", "Python", "Ruby"],
  remote: true,
  available: true
}`}
          </pre>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <Code2 className="w-8 h-8 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technical Expertise
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Backend */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Code2 className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold">Backend Development</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-800 border border-cyan-500/30 rounded-md text-sm text-cyan-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* DevOps */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Cpu className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">DevOps & Cloud</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.devops.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-800 border border-blue-500/30 rounded-md text-sm text-blue-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* AI/ML */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Cloud className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">AI/ML & Cloud Services</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.aiml.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-800 border border-purple-500/30 rounded-md text-sm text-purple-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Database className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">Databases</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.databases.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-800 border border-emerald-500/30 rounded-md text-sm text-emerald-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <div className="space-y-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/40 transition-all group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-cyan-400 font-medium mb-1">{project.role}</p>
                    <p className="text-slate-500 text-sm">{project.period}</p>
                  </div>
                </div>

                <p className="text-slate-300 mb-4">{project.description}</p>

                <div className="space-y-2 mb-6">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-400">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-md text-xs text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>

          {experience.map((exp, idx) => (
            <div key={idx} className="relative pl-8 border-l-2 border-cyan-500/30 pb-12 last:pb-0">
              <div className="absolute left-0 top-0 w-4 h-4 bg-cyan-500 rounded-full -translate-x-[9px]"></div>
              
              <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-2">{exp.company}</h3>
                <p className="text-cyan-400 font-medium mb-1">{exp.role}</p>
                <p className="text-slate-500 text-sm mb-4">{exp.period}</p>
                <p className="text-slate-300 mb-4">{exp.description}</p>
                
                <div className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-400">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-cyan-950/30 to-blue-950/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Let's Build Something Together
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Open to remote opportunities • Full-time & Contract work
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:dgbabariya305@gmail.com"
               className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a href="https://linkedin.com/in/darshan-babariya-dev" target="_blank" rel="noopener noreferrer"
               className="px-8 py-4 border border-cyan-500/30 rounded-lg font-medium hover:bg-cyan-500/10 transition-all flex items-center gap-2">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a href="https://github.com/darshan2101" target="_blank" rel="noopener noreferrer"
               className="px-8 py-4 border border-cyan-500/30 rounded-lg font-medium hover:bg-cyan-500/10 transition-all flex items-center gap-2">
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2025 Darshan Babariya. Built with React & Tailwind CSS.</p>
          <p>Backend Engineer • DevOps • AI/ML • Remote Work</p>
        </div>
      </footer>
    </div>
  );
}