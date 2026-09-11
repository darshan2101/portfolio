import { describe, it, expect } from 'vitest';
import { detectTier, TIER_SETTINGS } from './quality';

const gl = () => ({ getContext: (kind) => (kind === 'webgl2' ? {} : null) });
const noGl = () => ({ getContext: () => null });

function env({ reduce = false, coarse = false, width = 1440, cores = 8, mem = 8, canvas = gl, search = '' } = {}) {
  return {
    innerWidth: width,
    location: { search },
    matchMedia: (q) => ({ matches: q.includes('reduced-motion') ? reduce : q.includes('coarse') ? coarse : false }),
    navigator: { hardwareConcurrency: cores, deviceMemory: mem },
    document: { createElement: canvas },
  };
}

describe('detectTier', () => {
  it('is high on a capable desktop', () => {
    expect(detectTier(env())).toBe('high');
  });
  it('is off when the user prefers reduced motion', () => {
    expect(detectTier(env({ reduce: true }))).toBe('off');
  });
  it('is off without WebGL2', () => {
    expect(detectTier(env({ canvas: noGl }))).toBe('off');
  });
  it('is low on narrow viewports, coarse pointers, few cores, or low memory', () => {
    expect(detectTier(env({ width: 390 }))).toBe('low');
    expect(detectTier(env({ coarse: true }))).toBe('low');
    expect(detectTier(env({ cores: 4 }))).toBe('low');
    expect(detectTier(env({ mem: 4 }))).toBe('low');
  });
  it('honours a ?tier= query override', () => {
    expect(detectTier(env({ search: '?tier=off' }))).toBe('off');
    expect(detectTier(env({ search: '?tier=low' }))).toBe('low');
    expect(detectTier(env({ width: 390, search: '?tier=high' }))).toBe('high');
  });
});

describe('TIER_SETTINGS', () => {
  it('defines low and high, and null for off', () => {
    expect(TIER_SETTINGS.off).toBeNull();
    expect(TIER_SETTINGS.low.samples).toBeLessThan(TIER_SETTINGS.high.samples);
    expect(TIER_SETTINGS.low.effects).toBe(false);
    expect(TIER_SETTINGS.high.effects).toBe(true);
  });
});
