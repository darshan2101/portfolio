import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Trophy } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import LiquidGlass from './LiquidGlass';
import { scrollToHash } from './Nav';
import { containerVariants, itemVariants } from '../lib/motion';
import { profile, heroStats, heroHighlights } from '../data/profile';
import { sceneState } from '../lib/sceneState';

export default function Hero({ tier = 'high' }) {
  const staticPhoto = tier === 'off';
  const [first, ...restName] = profile.name.split(' ');

  return (
    <section
      id="home"
      data-scene="hero"
      onPointerEnter={() => {
        sceneState.hover = true;
      }}
      onPointerLeave={() => {
        sceneState.hover = false;
      }}
      className="relative min-h-[100svh] flex items-center pt-28 pb-16 sm:pt-32 px-4 sm:px-6 lg:px-10"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Mobile: the canvas draws the portrait in this reserved space. */}
        <div className="lg:hidden h-[34svh] flex items-end justify-center">
          {staticPhoto && (
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover ring-1 ring-white/15 shadow-[0_0_80px_-20px_rgb(var(--accent)/0.7)]"
            />
          )}
        </div>

        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="lg:col-span-7 space-y-6 sm:space-y-8">
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              Open to remote · Backend / AI platform / Data infra
            </span>
            <span className="chip inline-flex items-center gap-1.5 !text-award !border-award/30 !bg-award/10">
              <Trophy className="w-3 h-3" /> IBC 2025 award-winning work
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display font-semibold tracking-[-0.035em] leading-[0.95] text-fg text-[clamp(3rem,8vw,7rem)]"
          >
            <span className="block">{first}</span>{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fg via-accent to-accent-2">
              {restName.join(' ')}
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="font-display text-xl sm:text-2xl lg:text-3xl text-fg-muted leading-snug max-w-2xl text-balance">
            {profile.title} — systems that stay <em className="font-serif italic text-accent">liquid</em> at petabyte scale.
          </motion.p>

          <motion.p variants={itemVariants} className="text-base sm:text-lg text-fg-muted max-w-xl leading-relaxed font-light">
            3.5 years shipping production systems at real scale — petabyte-class media catalogs for{' '}
            <strong className="text-fg font-medium">Netflix and Warner Bros.</strong>, a healthcare SaaS serving{' '}
            <strong className="text-fg font-medium">1,500+ organizations</strong> and{' '}
            <strong className="text-fg font-medium">10,000+ doctors</strong>, and award-winning AI ingestion across{' '}
            <strong className="text-fg font-medium">~18 cloud and AI providers</strong>.
          </motion.p>

          <motion.ul variants={itemVariants} className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-fg-muted max-w-2xl">
            {heroHighlights.map((h) => (
              <li key={h.label} className="flex gap-2">
                <span className="font-mono text-accent text-xs mt-1">/</span>
                <span>
                  <strong className="text-fg font-medium">{h.label}</strong> · {h.detail}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
            <LiquidGlass
              as="a"
              href="#projects"
              onClick={(e) => scrollToHash(e, '#projects')}
              radius={999}
              strength={20}
              className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 font-medium text-fg hover:text-bg hover:bg-fg transition-colors duration-300"
            >
              Explore work
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </LiquidGlass>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-soft rounded-full inline-flex items-center px-6 sm:px-7 py-3.5 font-medium text-fg-muted hover:text-fg transition-colors"
            >
              Resume
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4">
            <LiquidGlass radius={20} strength={16} blur={16} className="grid grid-cols-3 w-full max-w-md divide-x divide-white/10">
              {heroStats.map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center py-4 px-2 gap-1">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-fg tracking-tight leading-none">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-fg-dim text-center">{s.label}</span>
                </div>
              ))}
            </LiquidGlass>
          </motion.div>
        </motion.div>

        {/* Desktop: the canvas owns this column (Monolith + portrait). */}
        <div className="hidden lg:block lg:col-span-5 min-h-[560px]">
          {staticPhoto && (
            <div className="h-full flex items-center justify-center">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-64 h-64 rounded-full object-cover ring-1 ring-white/15 shadow-[0_0_120px_-30px_rgb(var(--accent)/0.7)]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
