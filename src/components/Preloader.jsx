import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sceneState } from '../lib/sceneState';
import { profile } from '../data/profile';

const KEY = 'dgb-seen';

function seen() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* storage blocked: the loader simply shows again next visit */
  }
}

// Shows the name with a progress readout until the scene's assets resolve,
// capped at 2.5 s. Skipped for return visits within the session.
export default function Preloader({ enabled = true }) {
  const [done, setDone] = useState(() => !enabled || seen());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (done) return undefined;
    const start = performance.now();
    let raf;
    const tick = () => {
      const elapsed = performance.now() - start;
      const creep = Math.min(90, elapsed / 25);
      const value = sceneState.ready ? 100 : Math.max(creep, sceneState.progress * 0.9);
      setProgress(value);
      if (value >= 100 || elapsed > 2500) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [done]);

  useEffect(() => {
    if (done) markSeen();
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center gap-6"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          aria-live="polite"
        >
          <span className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-fg">{profile.name}</span>
          <span className="font-mono text-xs text-fg-dim tracking-[0.3em]">{String(Math.round(progress)).padStart(3, '0')}%</span>
          <div className="w-40 h-px bg-white/10 overflow-hidden">
            <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
