import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { containerVariants, itemVariants, viewportOnce } from '../lib/motion';
import { experience } from '../data/profile';

export default function Experience() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white/[0.01] border-y border-white/5 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-16 lg:mb-20 text-center"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-400 uppercase mb-3 sm:mb-4">Journey</h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Professional Experience</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/30 to-cyan-500/0"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-12 sm:space-y-16"
          >
            {experience.map((exp) => (
              <motion.div
                variants={itemVariants}
                key={exp.company}
                className="relative group pl-8 sm:pl-12"
              >
                <div className="absolute left-0 top-6 w-4 h-4 bg-slate-950 border-2 border-cyan-400 rounded-full -translate-x-[7px] group-hover:bg-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all z-10"></div>

                <div className="shimmer-effect bg-white/[0.03] border border-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold tracking-widest rounded-md uppercase">
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5" /> {exp.location}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors tracking-tight">{exp.role}</h3>
                  <p className="text-base sm:text-lg text-slate-400 font-medium mb-3 sm:mb-4">{exp.company}</p>
                  <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6 leading-relaxed font-light">{exp.description}</p>

                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-slate-400 text-xs sm:text-sm group-hover:text-slate-200 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
