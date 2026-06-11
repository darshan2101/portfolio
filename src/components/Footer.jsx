import React from 'react';
import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-white/10 bg-black/50 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-slate-500 text-xs sm:text-sm font-medium">
        <p>© {new Date().getFullYear()} {profile.name}. Designed & built meticulously.</p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Open to Work
          </span>
        </div>
      </div>
    </footer>
  );
}
