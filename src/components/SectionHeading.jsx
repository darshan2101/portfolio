import React from 'react';
import { motion } from 'framer-motion';
import { viewportOnce } from '../lib/motion';

// A "*word*" marker picks the one word per heading rendered in the serif italic accent.
export function splitAccent(text) {
  const parts = [];
  const re = /\*([^*]+)\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), accent: false });
    parts.push({ text: m[1], accent: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), accent: false });
  return parts;
}

export default function SectionHeading({ eyebrow, title, align = 'left', tone = 'accent', className = '' }) {
  const parts = splitAccent(title);
  const alignClass = align === 'center' ? 'text-center' : '';
  const toneClass = tone === 'award' ? '!text-award' : '';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`${alignClass} ${className}`}
    >
      <p className={`eyebrow mb-3 sm:mb-4 ${toneClass}`}>{eyebrow}</p>
      <h2 className="font-display font-semibold tracking-[-0.02em] text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-fg text-balance">
        {parts.map((p, i) =>
          p.accent ? (
            <em key={i} className="font-serif italic font-normal text-accent">
              {p.text}
            </em>
          ) : (
            <React.Fragment key={i}>{p.text}</React.Fragment>
          )
        )}
      </h2>
    </motion.div>
  );
}
