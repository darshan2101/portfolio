import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Menu, X } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import LiquidGlass from './LiquidGlass';
import { profile } from '../data/profile';
import { sceneState } from '../lib/sceneState';

const links = [
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export function scrollToHash(e, href) {
  const el = document.querySelector(href);
  if (!el) return;
  e.preventDefault();
  if (sceneState.lenis) sceneState.lenis.scrollTo(el, { offset: -96, duration: 1.2 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (window.history && window.history.replaceState) window.history.replaceState(null, '', href);
}

const iconBtn =
  'w-9 h-9 rounded-full flex items-center justify-center text-fg-muted hover:text-fg hover:bg-white/[0.08] transition-colors';

export default function Nav({ isScrolled }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pt-3 sm:pt-4 pointer-events-none">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="pointer-events-auto w-full max-w-3xl"
      >
        <LiquidGlass
          as="nav"
          radius={999}
          strength={18}
          blur={14}
          aria-label="Primary"
          className={`flex items-center justify-between gap-2 transition-[padding] duration-300 ${
            isScrolled ? 'px-2 py-1.5 sm:px-3 sm:py-2' : 'px-3 py-2.5 sm:px-4 sm:py-3'
          }`}
        >
          <a href="#home" onClick={(e) => scrollToHash(e, '#home')} className="flex items-center gap-2.5 group pl-1">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-2 text-bg font-display font-bold text-sm flex items-center justify-center shadow-[0_0_24px_-6px_rgb(var(--accent)/0.8)]">
              {profile.initials}
            </span>
            <span className="hidden sm:inline font-display font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
              {profile.name.split(' ')[0]}
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => scrollToHash(e, l.href)}
                  className="px-3.5 py-2 rounded-full font-mono text-[12px] tracking-[0.12em] uppercase text-fg-muted hover:text-fg hover:bg-white/[0.06] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconBtn}>
              <FiGithub className="w-[18px] h-[18px]" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconBtn}>
              <FiLinkedin className="w-[18px] h-[18px]" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="ml-1 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-fg text-bg font-medium text-sm hover:bg-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden xs:inline">Let's talk</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`md:hidden ${iconBtn}`}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </LiquidGlass>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-2 glass-soft rounded-2xl p-2"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    scrollToHash(e, l.href);
                    setOpen(false);
                  }}
                  className="block px-4 py-3 rounded-xl font-mono text-xs tracking-[0.12em] uppercase text-fg-muted hover:text-fg hover:bg-white/[0.06]"
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
