import { useEffect } from 'react';
import Lenis from 'lenis';
import { sceneState, setPointer } from './sceneState';

// Wires DOM events into sceneState. Lenis smooth scroll runs only when enabled
// (tier != 'off'); otherwise native scroll feeds the same fields.
export function useSceneBindings({ enabled = true } = {}) {
  useEffect(() => {
    const onPointer = (e) => setPointer(e.clientX, e.clientY, window.innerWidth, window.innerHeight);
    window.addEventListener('pointermove', onPointer, { passive: true });

    const onResize = () => {
      sceneState.isMobile = window.innerWidth < 768;
    };
    onResize();
    window.addEventListener('resize', onResize);

    const ratios = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) ratios.set(en.target.dataset.scene, en.intersectionRatio);
        let best = 'hero';
        let bestRatio = -1;
        for (const [key, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = key;
            bestRatio = ratio;
          }
        }
        sceneState.section = best;
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );
    document.querySelectorAll('[data-scene]').forEach((el) => io.observe(el));

    let lenis = null;
    let onScroll = null;
    if (enabled) {
      lenis = new Lenis({ autoRaf: true, lerp: 0.09, smoothWheel: true });
      lenis.on('scroll', ({ progress, velocity }) => {
        sceneState.scroll = progress;
        sceneState.velocity = velocity;
      });
      sceneState.lenis = lenis;
    } else {
      onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        sceneState.scroll = max > 0 ? window.scrollY / max : 0;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      if (onScroll) window.removeEventListener('scroll', onScroll);
      io.disconnect();
      if (lenis) {
        lenis.destroy();
        sceneState.lenis = null;
      }
    };
  }, [enabled]);
}
