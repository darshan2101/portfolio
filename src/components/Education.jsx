import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { viewportOnce } from '../lib/motion';
import { education } from '../data/profile';

export default function Education() {
  return (
    <section id="education" data-scene="education" className="relative py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Education" title="Academic *background*" align="center" className="mb-10 sm:mb-14" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="glass-soft rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <span className="w-14 h-14 rounded-2xl bg-award/15 border border-award/30 text-award flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-7 h-7" />
          </span>
          <div className="flex-1">
            <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1">{education.degree}</h3>
            <p className="text-fg-muted mb-3">{education.school}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">{education.period}</span>
              <span className="chip !text-accent !border-accent/30 !bg-accent/10">{education.gpa}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
