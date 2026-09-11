import { describe, it, expect, beforeEach } from 'vitest';
import { detectSvgBackdrop, supportsSvgBackdrop, resetSupportCache } from './support';

const chromeUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const safariUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15';
const firefoxUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0';

const env = (supports, ua) => ({ CSS: { supports: () => supports }, navigator: { userAgent: ua } });

describe('detectSvgBackdrop', () => {
  it('is true in Chromium when CSS.supports accepts url() backdrop filters', () => {
    expect(detectSvgBackdrop(env(true, chromeUA))).toBe(true);
  });
  it('is false when CSS.supports rejects url() backdrop filters', () => {
    expect(detectSvgBackdrop(env(false, chromeUA))).toBe(false);
  });
  it('is false in Safari and Firefox even if CSS.supports says yes', () => {
    expect(detectSvgBackdrop(env(true, safariUA))).toBe(false);
    expect(detectSvgBackdrop(env(true, firefoxUA))).toBe(false);
  });
  it('is false without a CSS object', () => {
    expect(detectSvgBackdrop({ navigator: { userAgent: chromeUA } })).toBe(false);
  });
});

describe('supportsSvgBackdrop', () => {
  beforeEach(() => resetSupportCache());
  it('caches the first answer', () => {
    expect(supportsSvgBackdrop(env(true, chromeUA))).toBe(true);
    expect(supportsSvgBackdrop(env(false, chromeUA))).toBe(true);
  });
});
