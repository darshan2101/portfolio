import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cloud, Database, Cpu } from 'lucide-react';
import { containerVariants, itemVariants, viewportOnce } from '../lib/motion';
import { skillGroups } from '../data/profile';

const icons = {
  server: <Server className="w-6 h-6" />,
  cloud: <Cloud className="w-6 h-6" />,
  database: <Database className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
};

const accents = {
  cyan: { gradient: 'from-cyan-400 to-cyan-600', shadow: 'hover:shadow-cyan-500/20' },
  blue: { gradient: 'from-blue-400 to-blue-600', shadow: 'hover:shadow-blue-500/20' },
  emerald: { gradient: 'from-emerald-400 to-emerald-600', shadow: 'hover:shadow-emerald-500/20' },
  indigo: { gradient: 'from-indigo-400 to-indigo-600', shadow: 'hover:shadow-indigo-500/20' },
};

export default function Skills() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative bg-white/[0.01] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-16 lg:mb-20 text-center"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase mb-3 sm:mb-4">Core Competencies</h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Technical Arsenal</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {skillGroups.map((category) => {
            const accent = accents[category.accent];
            return (
              <motion.div
                variants={itemVariants}
                key={category.key}
                className={`group shimmer-effect relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${accent.shadow}`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 flex items-center justify-center bg-gradient-to-br ${accent.gradient} text-white shadow-lg relative z-10`}>
                  {icons[category.icon]}
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight relative z-10">{category.title}</h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {category.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-lg text-[13px] text-slate-300 group-hover:border-white/20 group-hover:text-white transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
