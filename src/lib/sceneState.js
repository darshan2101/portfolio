// Shared mutable state between the DOM side (scroll, pointer, sections) and the
// R3F side (read in useFrame). Nothing here triggers React renders.

export const sceneState = {
  scroll: 0,
  velocity: 0,
  pointer: { x: 0, y: 0 },
  hover: false,
  section: 'hero',
  isMobile: false,
  progress: 0,
  ready: false,
  lenis: null,
};

export const SECTION_TARGETS = {
  hero:        { position: [1.6, 0.1, 0],     scale: 1.0,  distortion: 0.18, tint: null },
  recognition: { position: [2.4, 0.8, -1],    scale: 0.7,  distortion: 0.14, tint: 'award' },
  skills:      { position: [-2.2, 0.4, -1.5], scale: 0.6,  distortion: 0.16,  tint: null },
  projects:    { position: [2.6, -0.2, -2],   scale: 0.5,  distortion: 0.12, tint: null },
  experience:  { position: [-2.6, 0.2, -2],   scale: 0.5,  distortion: 0.12, tint: null },
  deepdives:   { position: [2.2, 0.6, -1.5],  scale: 0.6,  distortion: 0.16,  tint: null },
  education:   { position: [-2.0, 0.0, -2],   scale: 0.45, distortion: 0.12, tint: null },
  contact:     { position: [0, 0.2, -0.5],    scale: 1.2,  distortion: 0.22, tint: 'accent' },
};

export const MOBILE_HERO = { position: [0.45, 1.15, 0], scale: 0.75 };

export const TINTS = { award: '#f5c451', accent: '#8fe3ff', none: '#ffffff' };

export function getTarget(section, isMobile = false) {
  const t = SECTION_TARGETS[section] || SECTION_TARGETS.hero;
  if (!isMobile) return t;
  if (t === SECTION_TARGETS.hero) return { ...t, position: MOBILE_HERO.position, scale: MOBILE_HERO.scale };
  return { ...t, position: [t.position[0] * 0.5, t.position[1], t.position[2]], scale: t.scale * 0.8 };
}

export function velocityBoost(velocity) {
  return Math.min(Math.abs(velocity) / 40, 0.5);
}

export function setPointer(clientX, clientY, width, height) {
  sceneState.pointer.x = (clientX / width) * 2 - 1;
  sceneState.pointer.y = 0 - ((clientY / height) * 2 - 1);
}
