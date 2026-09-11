import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cloud, Database, Cpu } from 'lucide-react';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';
import { containerVariants, itemVariants, viewportOnce } from '../lib/motion';
import { skillGroups } from '../data/profile';

const icons = { server: Server, cloud: Cloud, database: Database, cpu: Cpu };

export default function Skills() {
  return (
    <section id="skills" data-scene="skills" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Core competencies" title="A *technical* arsenal built in production" align="center" className="mb-12 sm:mb-16" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <TiltCard key={g.key} variants={itemVariants} className="p-6 sm:p-7">
                <div className="flex items-center justify-between mb-6">
                  <span className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="font-mono text-[11px] text-fg-dim tracking-[0.2em]">0{i + 1}</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-fg mb-5 tracking-tight">{g.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span key={s} className="chip group-hover:border-white/20 group-hover:text-fg transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
