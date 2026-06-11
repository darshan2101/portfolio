import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { viewportOnce } from '../lib/motion';
import { deepDives, sideProjects } from '../data/profile';

export default function DeepDives() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-16 lg:mb-20">
          <h2 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-3 sm:mb-4">Deep Dives</h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">Engineering Stories</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {deepDives.map((project, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: idx * 0.1 }}
              key={project.title}
              className="group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider rounded-md uppercase">{project.context}</span>
                <span className="text-xs text-slate-500 font-medium">{project.period}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors leading-tight">{project.title}</h3>

              <p className="text-sm text-cyan-400/80 font-medium mb-4">{project.tech}</p>

              <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Side projects — compact strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.2 }}
          className="mt-8 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <span className="inline-flex items-center gap-2 text-slate-300 font-display font-bold text-sm uppercase tracking-widest flex-shrink-0">
            <Wrench className="w-4 h-4 text-emerald-400" /> Also Built
          </span>
          <ul className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-x-6 sm:gap-y-2 text-sm text-slate-400">
            {sideProjects.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
