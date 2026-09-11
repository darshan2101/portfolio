import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Cloud, Database, Workflow, ArrowUpRight } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { featuredProjects } from '../data/profile';

const icons = { cloud: Cloud, database: Database, workflow: Workflow };

// Each card sticks below the nav; as the next card scrolls over, the one beneath
// scales down and dims, so projects stack like sheets of glass.
function ProjectCard({ project, index, total }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.5]);
  const Icon = icons[project.icon];
  const isLast = index === total - 1;

  return (
    <div ref={ref} className="sticky" style={{ top: `calc(96px + ${index * 16}px)` }}>
      <motion.article
        style={isLast ? undefined : { scale, opacity }}
        className="glass-soft rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-12 grid md:grid-cols-5 gap-6 lg:gap-10 origin-top will-change-transform"
      >
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </span>
              <span className="font-mono text-[11px] text-fg-dim tracking-[0.2em]">
                0{index + 1} / 0{total}
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-fg mb-2">{project.title}</h3>
            <p className="text-accent text-sm font-medium mb-5">{project.role}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-sm text-fg transition-colors"
              >
                <FiGithub className="w-4 h-4" /> View on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim mt-6">{project.period}</p>
        </div>

        <div className="md:col-span-3">
          <p className="text-base sm:text-lg text-fg-muted leading-relaxed mb-6 font-light">{project.description}</p>
          <ul className="space-y-3 mb-8">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm sm:text-[15px] text-fg-muted">
                <span className="font-mono text-accent text-xs mt-1 flex-shrink-0">/</span>
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 pt-5 border-t border-white/[0.06]">
            {project.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" data-scene="projects" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Selected work" title="Projects with *real* weight" className="mb-12 sm:mb-16" />
        <div className="space-y-6 sm:space-y-8">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} total={featuredProjects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
