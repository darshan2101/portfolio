import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { viewportOnce } from '../lib/motion';
import { profile } from '../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-950/20" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          className="p-6 sm:p-12 md:p-20 bg-white/5 border border-white/10 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] backdrop-blur-xl"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6">
            Let's build something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">extraordinary.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-10 max-w-2xl mx-auto">
            Open to remote backend, AI platform, and data infrastructure roles globally.
            Whether you have a role in mind or just want to talk systems, I'll get back to you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`mailto:${profile.email}`}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-950 text-sm sm:text-base font-bold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> Say Hello
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/10 bg-white/5 text-white backdrop-blur-md rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium text-sm sm:text-base">
              <Linkedin className="w-5 h-5" /> Connect via LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/10 bg-white/5 text-white backdrop-blur-md rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium text-sm sm:text-base">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
