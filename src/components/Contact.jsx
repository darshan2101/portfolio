import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import LiquidGlass from './LiquidGlass';
import { viewportOnce } from '../lib/motion';
import { profile } from '../data/profile';

const secondary =
  'w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full glass-soft text-fg-muted hover:text-fg transition-colors';

export default function Contact() {
  return (
    <section id="contact" data-scene="contact" className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <LiquidGlass radius={40} strength={26} blur={20} className="p-8 sm:p-14 md:p-20 text-center">
            <p className="eyebrow mb-6">Contact</p>
            <h2 className="font-display font-semibold tracking-[-0.03em] text-4xl sm:text-5xl lg:text-6xl leading-[1] text-fg mb-6 text-balance">
              Let's build something <em className="font-serif italic font-normal text-accent">extraordinary</em>.
            </h2>
            <p className="text-base sm:text-lg text-fg-muted max-w-2xl mx-auto mb-10">
              Open to remote backend, AI platform, and data infrastructure roles globally. Whether you have a role in mind or just want
              to talk systems, I'll get back to you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-fg text-bg font-medium hover:bg-accent transition-colors"
              >
                <Mail className="w-4 h-4" /> Say hello
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={secondary}>
                <FiLinkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={secondary}>
                <FiGithub className="w-4 h-4" /> GitHub
              </a>
            </div>
          </LiquidGlass>
        </motion.div>
      </div>
    </section>
  );
}
