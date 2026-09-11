// Only Chromium renders SVG filters as backdrop-filter. Safari's CSS.supports can
// return true for the syntax yet paint nothing, hence the engine check.

let cached;

export function detectSvgBackdrop(env = globalThis) {
  const css = env.CSS;
  if (!css || typeof css.supports !== 'function') return false;
  const syntaxOk =
    css.supports('backdrop-filter', 'url(#x)') || css.supports('-webkit-backdrop-filter', 'url(#x)');
  const ua = (env.navigator && env.navigator.userAgent) || '';
  const isChromium = /Chrome\/|Chromium\/|Edg\//.test(ua) && !/Firefox\//.test(ua);
  return syntaxOk && isChromium;
}

export function supportsSvgBackdrop(env = globalThis) {
  if (cached === undefined) cached = detectSvgBackdrop(env);
  return cached;
}

export function resetSupportCache() {
  cached = undefined;
}
