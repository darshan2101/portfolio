import React from 'react';
import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="relative z-10 py-6 sm:py-8 px-4 sm:px-6 border-t border-white/[0.06] bg-bg/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-dim">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Open to work · {profile.location}
        </p>
      </div>
    </footer>
  );
}
