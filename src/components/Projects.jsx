import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, Workflow, Github } from 'lucide-react';
import { containerVariants, itemVariants, viewportOnce } from '../lib/motion';
import { featuredProjects } from '../data/profile';

const icons = {
  cloud: <Cloud className="w-7 h-7" />,
  database: <Database className="w-7 h-7" />,
  workflow: <Workflow className="w-7 h-7" />,
};

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
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
          viewport={viewportOnce}
          className="space-y-8 sm:space-y-12"
        >
          {featuredProjects.map((project) => (
            <motion.div
              variants={itemVariants}
              key={project.title}
              className="group grid md:grid-cols-5 gap-5 sm:gap-8 bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] p-5 sm:p-8 md:p-12 hover:bg-white/[0.06] transition-all duration-700 relative overflow-hidden shimmer-effect"
            >
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 blur-[120px] transition-all duration-1000 pointer-events-none`} />

              <div className="md:col-span-2 flex flex-col justify-between z-10">
                <div>
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${project.color} text-white flex items-center justify-center mb-4 sm:mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                    {icons[project.icon]}
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                  <p className="text-cyan-400 font-medium text-sm sm:text-base mb-4 sm:mb-6">{project.role}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-sm font-medium text-white transition-all mb-4"
                    >
                      <Github className="w-4 h-4" /> View on GitHub
                    </a>
                  )}
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
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/5 rounded-full text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
