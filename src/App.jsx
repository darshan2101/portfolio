import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 1000], [0, 200]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 origin-left z-[100]"
      />

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-indigo-900/20 blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <Nav isScrolled={isScrolled} />

      <main className="relative z-10">
        <Hero parallaxY={heroParallaxY} />
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
  );
}
