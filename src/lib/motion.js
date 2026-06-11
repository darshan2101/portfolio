// Shared framer-motion variants — keep entrance choreography consistent across sections.

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.98, filter: 'blur(8px)' },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // cinematic ease-out
    },
  },
};

export const viewportOnce = { once: true, margin: '-100px' };
