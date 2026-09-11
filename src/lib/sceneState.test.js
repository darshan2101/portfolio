import { describe, it, expect, beforeEach } from 'vitest';
import { sceneState, getTarget, velocityBoost, setPointer, SECTION_TARGETS, MOBILE_HERO } from './sceneState';

describe('getTarget', () => {
  it('returns the section target on desktop', () => {
    expect(getTarget('contact', false)).toBe(SECTION_TARGETS.contact);
  });
  it('falls back to hero for unknown sections', () => {
    expect(getTarget('nope', false)).toBe(SECTION_TARGETS.hero);
  });
  it('uses the mobile hero placement on mobile', () => {
    const t = getTarget('hero', true);
    expect(t.position).toEqual(MOBILE_HERO.position);
    expect(t.scale).toBe(MOBILE_HERO.scale);
  });
  it('pulls other sections toward centre and shrinks them on mobile', () => {
    const t = getTarget('skills', true);
    expect(Math.abs(t.position[0])).toBeLessThan(Math.abs(SECTION_TARGETS.skills.position[0]));
    expect(t.scale).toBeLessThan(SECTION_TARGETS.skills.scale);
  });
});

describe('velocityBoost', () => {
  it('scales with speed and clamps at 0.5', () => {
    expect(velocityBoost(0)).toBe(0);
    expect(velocityBoost(-20)).toBeCloseTo(0.5, 5);
    expect(velocityBoost(400)).toBe(0.5);
  });
});

describe('setPointer', () => {
  beforeEach(() => {
    sceneState.pointer.x = 0;
    sceneState.pointer.y = 0;
  });
  it('maps the viewport centre to (0,0) and the top-right to (1,1)', () => {
    setPointer(500, 250, 1000, 500);
    expect(sceneState.pointer).toEqual({ x: 0, y: 0 });
    setPointer(1000, 0, 1000, 500);
    expect(sceneState.pointer).toEqual({ x: 1, y: 1 });
  });
});
