import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Presentation, MapPin } from 'lucide-react';
import { containerVariants, itemVariants, viewportOnce } from '../lib/motion';
import { recognition } from '../data/profile';

// Asymmetric grid: the IBC award win is the feature card, showcases support it.
export default function Recognition() {
  const featured = recognition.find((r) => r.featured);
  const rest = recognition.filter((r) => !r.featured);

  return (
    <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-amber-400 uppercase mb-3 sm:mb-4">Recognition</h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Work that made it to the world stage
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {/* Feature card — the award win */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 lg:row-span-3 group relative p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-500/[0.08] to-transparent border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500 overflow-hidden shimmer-effect flex flex-col justify-between min-h-[280px]"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-amber-500/20 transition-all duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-2xl shadow-amber-500/20">
                  <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="px-3 py-1 bg-amber-500/15 text-amber-300 text-[11px] font-bold tracking-widest rounded-md uppercase">
                  {featured.kind}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-3 tracking-tight">
                {featured.event}
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-xl font-light">
                {featured.detail}
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-amber-300/80 text-sm font-medium mt-6">
              <MapPin className="w-4 h-4" /> {featured.place}
            </div>
          </motion.div>

          {/* Showcase cards */}
          {rest.map((item) => (
            <motion.div
              variants={itemVariants}
              key={item.event}
              className="lg:col-span-2 group relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg sm:text-xl font-display font-bold text-white leading-tight group-hover:text-cyan-300 transition-colors">
                  {item.event}
                </h3>
                <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 text-blue-300 text-[10px] font-bold tracking-widest rounded-md uppercase">
                  <Presentation className="w-3 h-3" /> {item.kind}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.detail}</p>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5" /> {item.place}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
