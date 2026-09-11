import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Presentation, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { containerVariants, itemVariants, viewportOnce } from '../lib/motion';
import { recognition } from '../data/profile';

// Asymmetric grid: the award is the feature card, showcases support it.
export default function Recognition() {
  const featured = recognition.find((r) => r.featured);
  const rest = recognition.filter((r) => !r.featured);

  return (
    <section id="recognition" data-scene="recognition" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Recognition" tone="award" title="Work that made it to the *world* stage" className="mb-12 sm:mb-14" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          <motion.article
            variants={itemVariants}
            className="lg:col-span-3 lg:row-span-3 relative overflow-hidden glass-soft rounded-3xl p-7 sm:p-10 flex flex-col justify-between min-h-[300px] !border-award/25"
          >
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-award/10 to-transparent animate-sheen motion-reduce:hidden pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-award/10 blur-[90px] pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-12 rounded-2xl bg-award/15 border border-award/30 text-award flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </span>
                <span className="chip !text-award !border-award/30 !bg-award/10">{featured.kind}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-fg mb-4">{featured.event}</h3>
              <p className="text-fg-muted leading-relaxed max-w-xl">{featured.detail}</p>
            </div>
            <p className="relative flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-award/80 mt-8">
              <MapPin className="w-3.5 h-3.5" /> {featured.place}
            </p>
          </motion.article>

          {rest.map((item) => (
            <motion.article key={item.event} variants={itemVariants} className="lg:col-span-2 glass-soft rounded-2xl p-5 sm:p-6 hover:bg-white/[0.07] transition-colors">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-fg leading-tight">{item.event}</h3>
                <span className="chip inline-flex items-center gap-1.5 flex-shrink-0">
                  <Presentation className="w-3 h-3" /> {item.kind}
                </span>
              </div>
              <p className="text-fg-muted text-sm leading-relaxed mb-3">{item.detail}</p>
              <p className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-dim">
                <MapPin className="w-3 h-3" /> {item.place}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
