import { describe, it, expect } from 'vitest';
import { buildDisplacementMap, edgeProfile, refractionMagnitude } from './displacement';

const px = (m, x, y) => {
  const i = (y * m.width + x) * 4;
  return [m.data[i], m.data[i + 1], m.data[i + 2], m.data[i + 3]];
};

describe('edgeProfile', () => {
  it('rises from 0 at the outer edge to 1 at the inner end of the band', () => {
    expect(edgeProfile(0)).toBe(0);
    expect(edgeProfile(1)).toBe(1);
    expect(edgeProfile(0.5)).toBeGreaterThan(0.9);
  });
});

describe('refractionMagnitude', () => {
  it('is strongest near the edge and zero at the inner end', () => {
    expect(refractionMagnitude(0.01)).toBeGreaterThan(refractionMagnitude(0.5));
    expect(refractionMagnitude(1)).toBeCloseTo(0, 5);
  });
});

describe('buildDisplacementMap', () => {
  it('returns a map with the requested dimensions', () => {
    const m = buildDisplacementMap(40, 20, 6);
    expect(m.width).toBe(40);
    expect(m.height).toBe(20);
    expect(m.data.length).toBe(40 * 20 * 4);
  });

  it('is neutral (128,128) at the centre', () => {
    const m = buildDisplacementMap(40, 20, 6);
    expect(px(m, 20, 10)).toEqual([128, 128, 128, 255]);
  });

  it('displaces outward, strongest at the edge, fading inward', () => {
    const m = buildDisplacementMap(40, 20, 8);
    const r0 = px(m, 0, 10)[0];
    const r3 = px(m, 3, 10)[0];
    const r7 = px(m, 7, 10)[0];
    expect(r0).toBeLessThan(128);
    expect(r0).toBeLessThan(r3);
    expect(r3).toBeLessThan(r7);
    expect(r7).toBeLessThanOrEqual(128);
    expect(px(m, 39, 10)[0]).toBeGreaterThan(128);
    expect(px(m, 20, 0)[1]).toBeLessThan(128);
    expect(px(m, 20, 19)[1]).toBeGreaterThan(128);
  });

  it('leaves the cut-off corner neutral', () => {
    const m = buildDisplacementMap(40, 40, 10);
    expect(px(m, 0, 0)).toEqual([128, 128, 128, 255]);
  });

  it('caches identical requests', () => {
    expect(buildDisplacementMap(12, 12, 3)).toBe(buildDisplacementMap(12, 12, 3));
  });
});
