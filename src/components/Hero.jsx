import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Trophy } from 'lucide-react';
import { SiNodedotjs, SiRubyonrails, SiMysql, SiMongodb, SiAmazonwebservices, SiGooglecloud, SiPython, SiDocker, SiTypescript } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import AnimatedCounter from './AnimatedCounter';
import { containerVariants, itemVariants } from '../lib/motion';
import { profile, heroStats, heroHighlights } from '../data/profile';

const orbitIcons = [
  { Icon: SiNodedotjs, color: 'text-[#339933]', delay: 0, pos: 'top-[15%] right-[15%]' },
  { Icon: SiTypescript, color: 'text-[#3178C6]', delay: 1, pos: 'bottom-[20%] right-[10%]' },
  { Icon: SiMysql, color: 'text-[#4479A1]', delay: 2, pos: 'bottom-[5%] left-[30%]' },
  { Icon: SiMongodb, color: 'text-[#47A248]', delay: 3, pos: 'top-[5%] right-[40%]' },
  { Icon: SiAmazonwebservices, color: 'text-[#FF9900]', delay: 4, pos: 'top-[30%] left-[5%]' },
  { Icon: SiGooglecloud, color: 'text-[#4285F4]', delay: 5, pos: 'bottom-[30%] left-[10%]' },
  { Icon: VscAzure, color: 'text-[#0089D6]', delay: 1.5, pos: 'top-[15%] left-[25%]' },
  { Icon: SiPython, color: 'text-[#3776AB]', delay: 2.5, pos: 'bottom-[15%] right-[30%]' },
  { Icon: SiDocker, color: 'text-[#2496ED]', delay: 3.5, pos: 'top-[45%] right-[-5%]' },
  { Icon: SiRubyonrails, color: 'text-[#CC0000]', delay: 4.5, pos: 'bottom-[2%] right-[45%]' },
];

export default function Hero({ parallaxY }) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-5 sm:space-y-8"
        >
          {/* Mobile Profile Image */}
          <motion.div variants={itemVariants} className="flex lg:hidden justify-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_60px_-10px_rgba(6,182,212,0.5)]">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Open to Remote Roles — Backend · AI Platform · Data Infra
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium tracking-wide">
              <Trophy className="w-3.5 h-3.5" />
              IBC 2025 Award-Winning Work
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-sm"
          >
            Hi, I'm{' '}
            <span className="animate-gradient-text text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
              {profile.name}
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-light space-y-3 sm:space-y-4"
          >
            <p>
              <strong className="text-white font-medium text-lg sm:text-xl">{profile.title}</strong><br />
              <span className="text-cyan-400 text-xs sm:text-sm font-medium tracking-wide">{profile.tagline}</span>
            </p>
            <p>
              3.5 years shipping production systems at real scale — petabyte-class media catalogs for{' '}
              <strong className="text-white">Netflix and Warner Bros.</strong>, a healthcare SaaS serving{' '}
              <strong className="text-white">1,500+ organizations</strong> and{' '}
              <strong className="text-white">10,000+ doctors</strong>, and award-winning AI ingestion across{' '}
              <strong className="text-white">~18 cloud and AI providers</strong>.
            </p>
            <ul className="space-y-1.5 sm:space-y-2 text-[13px] sm:text-[15px] pt-2">
              {heroHighlights.map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span><strong>{item.label}:</strong> {item.detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
            <a href="#projects"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-950 font-medium rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)] text-sm sm:text-base">
              <span className="relative z-10 flex items-center gap-2">
                Explore Work <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium backdrop-blur-md transition-all text-sm sm:text-base">
              View Resume
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="pt-6 sm:pt-10 inline-flex items-stretch gap-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden text-xs sm:text-sm font-medium w-full max-w-xs sm:max-w-md"
          >
            {heroStats.map((item, i) => (
              <div
                key={item.label}
                className={`flex-1 flex flex-col items-center justify-center py-3 sm:py-4 gap-0.5 px-1 ${i < heroStats.length - 1 ? 'border-r border-white/10' : ''}`}
              >
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-none tracking-tight">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </span>
                <span className="text-slate-400 text-[10px] sm:text-xs font-semibold tracking-wide mt-1 text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Image + Tech Stack Orbit */}
        <motion.div
          style={{ y: parallaxY }}
          className="hidden lg:flex relative h-[600px] items-center justify-center lg:justify-end"
        >
          <div className="relative w-[450px] h-[450px]">
            <div className="absolute inset-0 rounded-full border border-white/5 border-dashed animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-cyan-500/20 border-dotted animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute inset-16 rounded-full border border-white/5 border-dashed animate-[spin_30s_linear_infinite]" />

            {orbitIcons.map((item, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
                className={`absolute ${item.pos} w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl flex items-center justify-center ${item.color} backdrop-blur-xl hover:scale-110 transition-transform`}
              >
                <item.Icon className="w-7 h-7" />
              </motion.div>
            ))}

            {/* Center — Profile Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_80px_-10px_rgba(6,182,212,0.5)]">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
