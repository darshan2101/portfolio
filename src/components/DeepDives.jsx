import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';
import { containerVariants, itemVariants, viewportOnce } from '../lib/motion';
import { deepDives, sideProjects } from '../data/profile';

export default function DeepDives() {
  return (
    <section id="deepdives" data-scene="deepdives" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Deep dives" title="Engineering *stories* from the trenches" className="mb-12 sm:mb-16" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {deepDives.map((d) => (
            <TiltCard key={d.title} variants={itemVariants} className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="chip !text-accent !border-accent/30 !bg-accent/10">{d.context}</span>
                <span className="font-mono text-[11px] text-fg-dim tracking-[0.14em]">{d.period}</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-fg mb-2 leading-tight tracking-tight">{d.title}</h3>
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-dim mb-4">{d.tech}</p>
              <p className="text-fg-muted text-sm leading-relaxed">{d.description}</p>
            </TiltCard>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.2 }}
          className="mt-6 sm:mt-8 glass-soft rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted flex-shrink-0">
            <Wrench className="w-4 h-4 text-accent" /> Also built
          </span>
          <ul className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-x-6 sm:gap-y-2 text-sm text-fg-muted">
            {sideProjects.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="font-mono text-accent text-xs mt-0.5">/</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
