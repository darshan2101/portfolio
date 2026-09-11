// Decides once how much 3D the device gets. 'off' renders the static fallback.
// Debug override: append ?tier=off|low|high to the URL.

export const TIER_SETTINGS = {
  off: null,
  low: { dpr: 1, detail: 24, samples: 2, resolution: 256, backside: false, effects: false, dust: 200 },
  high: { dpr: [1, 2], detail: 48, samples: 6, resolution: 512, backside: true, effects: true, dust: 600 },
};

export function hasWebGL2(env = globalThis) {
  try {
    const doc = env.document;
    if (!doc || typeof doc.createElement !== 'function') return false;
    const canvas = doc.createElement('canvas');
    return !!(canvas && typeof canvas.getContext === 'function' && canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

export function detectTier(env = globalThis) {
  const search = (env.location && env.location.search) || '';
  const forced = new URLSearchParams(search).get('tier');
  if (forced === 'off' || forced === 'low' || forced === 'high') return forced;

  const mm = typeof env.matchMedia === 'function' ? (q) => env.matchMedia(q).matches : () => false;
  if (mm('(prefers-reduced-motion: reduce)')) return 'off';
  if (!hasWebGL2(env)) return 'off';

  const nav = env.navigator || {};
  const narrow = (env.innerWidth || 1024) < 768;
  const coarse = mm('(pointer: coarse)');
  const cores = nav.hardwareConcurrency || 8;
  const mem = nav.deviceMemory || 8;
  if (narrow || coarse || cores <= 4 || mem <= 4) return 'low';
  return 'high';
}

let tier;

export function getTier() {
  if (!tier) tier = detectTier();
  return tier;
}

export function setTier(next) {
  tier = next;
}
