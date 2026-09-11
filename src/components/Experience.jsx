import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { containerVariants, itemVariants, viewportOnce } from '../lib/motion';
import { experience } from '../data/profile';

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <section id="experience" data-scene="experience" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 bg-bg-2/60">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Journey" title="Professional *experience*" align="center" className="mb-14 sm:mb-20" />
        <div ref={ref} className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.08]" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent shadow-[0_0_12px_rgb(var(--accent)/0.6)]"
            aria-hidden="true"
          />
          <motion.ol variants={containerVariants} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-12 sm:space-y-16">
            {experience.map((exp) => (
              <motion.li key={exp.company} variants={itemVariants} className="relative pl-8 sm:pl-12 group">
                <span
                  className="absolute left-0 top-7 w-3.5 h-3.5 -translate-x-[6.5px] rounded-full bg-bg border-2 border-accent group-hover:bg-accent group-hover:shadow-[0_0_20px_rgb(var(--accent)/0.8)] transition-all"
                  aria-hidden="true"
                />
                <article className="glass-soft rounded-3xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                    <span className="chip !text-accent !border-accent/30 !bg-accent/10">{exp.period}</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-dim">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1">{exp.role}</h3>
                  <p className="text-fg-muted font-medium mb-4">{exp.company}</p>
                  <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-light mb-5">{exp.description}</p>
                  <ul className="space-y-2.5">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="flex gap-3 text-sm text-fg-muted">
                        <span className="font-mono text-accent text-xs mt-0.5">/</span>
                        <span className="leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
