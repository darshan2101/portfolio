import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from 'framer-motion';

// Pointer-driven 3D tilt plus a spotlight that travels along the 1px border.
// Off for reduced motion and coarse pointers.
export default function TiltCard({ className = '', children, max = 6, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mx}% ${my}%, rgb(var(--accent) / 0.35), transparent 60%)`;

  const coarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const enabled = !reduce && !coarse;

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={`group relative glass-soft rounded-3xl ${className}`}
      {...rest}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="absolute -inset-px rounded-[inherit] p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] [-webkit-mask-composite:xor]"
      />
      <div className="relative" style={{ transform: 'translateZ(24px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
