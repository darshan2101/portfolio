import React, { lazy, Suspense, useEffect, useState } from 'react';
import { motion, MotionConfig, useScroll } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Recognition from './components/Recognition';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import DeepDives from './components/DeepDives';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SceneErrorBoundary from './three/SceneErrorBoundary';
import StaticFallback from './three/StaticFallback';
import { getTier } from './lib/quality';
import { useSceneBindings } from './lib/useSceneBindings';

const Scene = lazy(() => import('./three/Scene'));

export default function Portfolio() {
  const [tier, setTierState] = useState(() => getTier());
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useSceneBindings({ enabled: tier !== 'off' });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg text-fg font-sans overflow-x-hidden">
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent-2 to-accent origin-left z-[100]"
        />

        {tier === 'off' ? (
          <StaticFallback />
        ) : (
          <SceneErrorBoundary fallback={<StaticFallback />}>
            <Suspense fallback={<StaticFallback />}>
              <Scene tier={tier} onContextLost={() => setTierState('off')} />
            </Suspense>
          </SceneErrorBoundary>
        )}

        <div className="fixed inset-0 z-[1] pointer-events-none bg-noise opacity-[0.035] mix-blend-overlay" />

        <Nav isScrolled={isScrolled} />

        <main className="relative z-10">
          <Hero tier={tier} />
          <Recognition />
          <Skills />
          <Projects />
          <Experience />
          <DeepDives />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
