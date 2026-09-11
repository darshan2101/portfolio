import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { supportsSvgBackdrop } from '../lib/liquidGlass/support';
import LiquidGlass from './LiquidGlass';

vi.mock('../lib/liquidGlass/support', () => ({ supportsSvgBackdrop: vi.fn() }));

describe('LiquidGlass', () => {
  const originalRect = Element.prototype.getBoundingClientRect;
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;

  beforeEach(() => {
    Element.prototype.getBoundingClientRect = () => ({ width: 200, height: 48, top: 0, left: 0, right: 200, bottom: 48 });
    HTMLCanvasElement.prototype.getContext = () => ({
      createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
      putImageData() {},
    });
    HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,AAAA';
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalRect;
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    HTMLCanvasElement.prototype.toDataURL = originalToDataURL;
  });

  it('falls back to a blur backdrop when SVG backdrop filters are unsupported', () => {
    supportsSvgBackdrop.mockReturnValue(false);
    render(<LiquidGlass data-testid="glass">hi</LiquidGlass>);
    const el = screen.getByTestId('glass');
    expect(el.style.backdropFilter).toMatch(/blur\(/);
    expect(el.querySelector('svg')).toBeNull();
    expect(el).toHaveTextContent('hi');
  });

  it('renders an SVG displacement filter and references it when supported', () => {
    supportsSvgBackdrop.mockReturnValue(true);
    render(<LiquidGlass data-testid="glass" as="span">hi</LiquidGlass>);
    const el = screen.getByTestId('glass');
    expect(el.tagName).toBe('SPAN');
    const filter = el.querySelector('filter');
    expect(filter).not.toBeNull();
    expect(el.style.backdropFilter).toBe(`url(#${filter.id})`);
    expect(el.querySelector('feDisplacementMap')).not.toBeNull();
  });
});
