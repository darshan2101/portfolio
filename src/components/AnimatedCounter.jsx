import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [count, setCount] = useState(0);

  // Use native IntersectionObserver — far more reliable on mobile than
  // framer-motion useInView with a negative rootMargin.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      // 10 % of the element visible is enough to fire — works on all
      // viewport sizes including small mobile screens.
      { threshold: 0.1, rootMargin: '0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;
    const target = parseFloat(value);
    if (isNaN(target)) { setCount(value); return; }
    const isFloat = !Number.isInteger(target);
    const steps = 50;
    const stepDuration = (duration * 1000) / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      // Ease-out: progress faster at start, slower at end
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const displayed = isFloat ? (eased * target).toFixed(1) : Math.round(eased * target);
      setCount(displayed);
      if (current >= steps) {
        setCount(isFloat ? target.toFixed(1) : target);
        clearInterval(timer);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [hasTriggered, value, duration]);

  return (
    <span ref={ref}>
      {hasTriggered ? `${count}${suffix}` : `0${suffix}`}
    </span>
  );
}
