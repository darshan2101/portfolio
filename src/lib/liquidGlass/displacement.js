// Builds an RGBA displacement map for an SVG feDisplacementMap.
// R encodes X displacement and G encodes Y, with 128 meaning "no displacement".
// The glass is modelled as a rounded-rect slab whose edge band (width = radius)
// bends light following Snell's law through a squircle thickness profile, so the
// backdrop near the rim appears pulled outward, like Apple's Liquid Glass.
// The interior stays flat (128,128). Pure: no DOM, safe to unit test.

const cache = new Map();

// t = 0 at the outer edge, 1 at the inner end of the band.
export function edgeProfile(t) {
  const c = Math.min(Math.max(t, 0), 1);
  return Math.pow(1 - Math.pow(1 - c, 4), 0.25);
}

// Lateral shift per unit thickness for a ray entering at band position t.
export function refractionMagnitude(t, ior = 1.5) {
  const d = 0.001;
  const slope = (edgeProfile(t + d) - edgeProfile(t - d)) / (2 * d);
  const theta1 = Math.atan(slope);
  const sinT2 = Math.sin(theta1) / ior;
  const theta2 = Math.asin(Math.min(Math.max(sinT2, -1), 1));
  return Math.tan(theta1 - theta2);
}

export function buildDisplacementMap(width, height, radius, ior = 1.5) {
  const w = Math.max(2, Math.round(width));
  const h = Math.max(2, Math.round(height));
  const r = Math.max(1, Math.min(Math.round(radius), Math.floor(w / 2), Math.floor(h / 2)));
  const key = `${w}x${h}x${r}x${ior}`;
  const hit = cache.get(key);
  if (hit) return hit;

  // Sample the band magnitude once, normalised to [0, 1].
  const steps = 64;
  const lut = new Float32Array(steps + 1);
  let max = 0;
  for (let i = 0; i <= steps; i++) {
    lut[i] = Math.abs(refractionMagnitude(i / steps, ior));
    if (lut[i] > max) max = lut[i];
  }
  for (let i = 0; i <= steps; i++) lut[i] = max > 0 ? lut[i] / max : 0;
  const sample = (t) => {
    const f = Math.min(Math.max(t, 0), 1) * steps;
    const i = Math.floor(f);
    const j = Math.min(i + 1, steps);
    return lut[i] + (lut[j] - lut[i]) * (f - i);
  };

  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pxc = x + 0.5;
      const pyc = y + 0.5;
      const inCornerX = pxc < r || pxc > w - r;
      const inCornerY = pyc < r || pyc > h - r;
      let e; // distance from the outer edge
      let ox; // unit vector pointing outward (x)
      let oy; // unit vector pointing outward (y)
      if (inCornerX && inCornerY) {
        const cx = pxc < r ? r : w - r;
        const cy = pyc < r ? r : h - r;
        const dx = pxc - cx;
        const dy = pyc - cy;
        const len = Math.hypot(dx, dy) || 1;
        e = r - len;
        ox = dx / len;
        oy = dy / len;
      } else {
        const dl = pxc;
        const dr = w - pxc;
        const dt = pyc;
        const db = h - pyc;
        e = Math.min(dl, dr, dt, db);
        if (e === dl) { ox = -1; oy = 0; }
        else if (e === dr) { ox = 1; oy = 0; }
        else if (e === dt) { ox = 0; oy = -1; }
        else { ox = 0; oy = 1; }
      }
      const m = e >= 0 && e <= r ? sample(e / r) : 0;
      const i = (y * w + x) * 4;
      data[i] = Math.round(128 + ox * m * 127);
      data[i + 1] = Math.round(128 + oy * m * 127);
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }

  const result = { width: w, height: h, data };
  cache.set(key, result);
  return result;
}
