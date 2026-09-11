import React from 'react';
import {
  SiNodedotjs, SiTypescript, SiPython, SiMongodb, SiMysql, SiRedis, SiDocker, SiJenkins,
  SiGooglecloud, SiRubyonrails,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';

const items = [
  { Icon: SiNodedotjs, label: 'Node.js' },
  { Icon: SiTypescript, label: 'TypeScript' },
  { Icon: SiPython, label: 'Python' },
  { Icon: SiMongodb, label: 'MongoDB' },
  { Icon: SiMysql, label: 'MySQL' },
  { Icon: SiRedis, label: 'Redis' },
  { Icon: SiDocker, label: 'Docker' },
  { Icon: SiJenkins, label: 'Jenkins' },
  { Icon: FaAws, label: 'AWS' },
  { Icon: VscAzure, label: 'Azure' },
  { Icon: SiGooglecloud, label: 'GCP' },
  { Icon: SiRubyonrails, label: 'Rails' },
];

// Replaces the old floating icon orbit: one quiet strip, doubled for a seamless loop.
export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative z-10 border-y border-white/[0.06] bg-bg/40 backdrop-blur-sm py-4 overflow-hidden mask-fade-x" aria-label="Technologies">
      <ul className="flex w-max gap-10 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row.map((it, i) => (
          <li
            key={`${it.label}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim whitespace-nowrap"
          >
            <it.Icon className="w-4 h-4 text-fg-muted" /> {it.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
