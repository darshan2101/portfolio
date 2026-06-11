import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile';

export default function Nav({ isScrolled }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-2 sm:py-3' : 'bg-transparent py-3 sm:py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-display font-bold text-base sm:text-lg shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 flex-shrink-0">
            {profile.initials}
          </div>
          <span className="hidden xs:inline text-lg sm:text-xl font-display font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            {profile.name}
          </span>
        </motion.a>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-5"
        >
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300">
            <Github className="w-5 h-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0A66C2]/20 transition-all duration-300">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={`mailto:${profile.email}`}
            className="px-3 sm:px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-all duration-300 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Let's Talk</span>
          </a>
        </motion.div>
      </div>
    </nav>
  );
}
