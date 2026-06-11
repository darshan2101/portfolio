import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { viewportOnce } from '../lib/motion';
import { education } from '../data/profile';

export default function Education() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 sm:mb-16 text-center">
          <h2 className="text-sm font-bold tracking-widest text-amber-400 uppercase mb-3 sm:mb-4">Education</h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">Academic Background</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="bg-white/5 border border-white/10 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl hover:bg-white/[0.07] transition-all duration-500 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-2xl flex-shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">{education.degree}</h3>
              <p className="text-base sm:text-lg text-slate-400 font-medium mb-2">{education.school}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <span className="px-2 sm:px-3 py-1 bg-amber-500/10 text-amber-400 font-bold tracking-wider rounded-md uppercase">{education.period}</span>
                <span className="px-2 sm:px-3 py-1 bg-emerald-500/10 text-emerald-400 font-bold tracking-wider rounded-md uppercase">{education.gpa}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
