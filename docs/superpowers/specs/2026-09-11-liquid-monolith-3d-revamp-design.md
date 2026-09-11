# Liquid Monolith — 3D Portfolio Revamp (Design Spec)

**Date:** 2026-09-11
**Status:** Approved direction, pending spec review
**Branch:** `feat/liquid-monolith-3d-revamp`

## 1. Goal

Replace the current "dark glassmorphism" template look with a single, committed 3D idea: a
refractive liquid-glass form (the Monolith) living on a persistent WebGL canvas behind crisp
2D content. The site must feel unique and current (2026), stay fast on mobile, remain
skimmable for recruiters, and keep every piece of existing content intact.

Decisions already approved by the owner:

- Direction: **Liquid Monolith** (one hero object, scroll and cursor reactive, liquid glass UI).
- Face treatment: **real photo on a shader plane** that ripples, refracts, and turns toward the cursor.
- Runtime: **upgrade React 18 to React 19** to use the current React Three Fiber v9 line.

Non-goals: page routing, CMS, blog, contact form backend, custom cursor, WebGPU renderer,
3D avatar model, sound. Copy in `src/data/profile.js` does not change.

## 2. Stack changes

| Package | From | To | Why |
|---|---|---|---|
| react, react-dom | 18.2 | 19.3 | Required by fiber v9 / drei v10 |
| framer-motion | 12.34 | 13.2 | Current, supports React 19 |
| three | — | 0.186 | Renderer |
| @react-three/fiber | — | 9.7 | React renderer for three |
| @react-three/drei | — | 10.7 | MeshTransmissionMaterial, Environment, Lightformer, useTexture, useProgress |
| @react-three/postprocessing + postprocessing | — | 3.1 / 6.36 | Bloom, Vignette, Noise (high tier only) |
| maath | — | 0.10 | damping helpers |
| lenis | — | 1.3 | smooth scroll with velocity readout |
| vitest, @testing-library/react, jsdom | — | latest | tests for pure logic |
| pdf-parse, pdf2json | present | removed | Unused in `src/` (verified by grep) |

Vite 5, Tailwind 3.4, PostCSS, Lucide, react-icons, Vercel Speed Insights stay as they are.

## 3. Visual system

**Palette.** Obsidian base, near-monochrome, one cool accent. The transmission material
supplies its own spectral colour, so the UI stays quiet around it.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#06070b` | page background |
| `--bg-2` | `#0b0d14` | section alternation |
| `--fg` | `#e9ebf2` | primary text |
| `--fg-muted` | `#9aa0b4` | secondary text |
| `--fg-dim` | `#5d6378` | labels, meta |
| `--accent` | `#8fe3ff` (glacier) | links, focus, eyebrow, glow |
| `--accent-2` | `#c9a3ff` (orchid) | gradient partner only |
| `--award` | `#f5c451` | Recognition award tint only |
| `--glass` | `rgba(255,255,255,0.05)` | glass fill |
| `--glass-edge` | `rgba(255,255,255,0.14)` | glass 1px edge |

**Type.** Bricolage Grotesque (display, variable, tight), Instrument Serif italic (one accent
word per heading, e.g. "*liquid*"), Inter (body), JetBrains Mono (eyebrows, meta, stats
labels). All from Google Fonts with `display=swap`; Outfit is dropped.

**Surfaces.** Two glass grades:

- **Liquid glass** (real refraction): nav pill, hero primary button, hero stat strip, Contact
  panel edge. At most six live instances per page for performance.
- **Soft glass** (blur + saturate + rim highlight): every card. Cheap, identical on all browsers.

**Motion.** Existing `containerVariants` / `itemVariants` stay and gain a reduced-motion
branch. Section headings animate in once. Scroll-driven effects use Framer Motion
`useScroll` / `useTransform`. The 3D layer never re-renders React on scroll or pointer; it
reads a mutable state object inside `useFrame`.

## 4. Architecture

```
src/
  App.jsx                    Lenis root, section observers, lazy <Scene/>, layout
  lib/
    motion.js                existing variants + reduced-motion variants
    sceneState.js            mutable { scroll, velocity, pointer, section, hover }
    quality.js               tier detection: 'off' | 'low' | 'high'
    liquidGlass/
      displacement.js        pure: buildDisplacementMap(width, height, radius, ior) -> ImageData
      support.js             pure-ish: supportsSvgBackdrop() feature detection
  three/
    Scene.jsx                <Canvas> (fixed, full-screen, aria-hidden), dpr by tier, Suspense
    LiquidMonolith.jsx       noise-displaced icosahedron + MeshTransmissionMaterial, targets per section
    PortraitPlane.jsx        photo texture, ripple/RGB-split shader, turns toward pointer
    Studio.jsx               procedural Environment with Lightformers, key/rim lights
    Dust.jsx                 instanced drifting points (count by tier)
    Effects.jsx              Bloom + Vignette + Noise (high tier only)
    StaticFallback.jsx       CSS/SVG gradient blob + photo for tier 'off'
  components/
    LiquidGlass.jsx          surface with SVG displacement backdrop-filter or blur fallback
    TiltCard.jsx             pointer-driven 3D tilt + spotlight border (Skills, DeepDives)
    SectionHeading.jsx       eyebrow (mono) + display heading with italic accent word
    Marquee.jsx              tech logo strip
    Preloader.jsx            name + progress from drei useProgress, skipped when cached
    Nav.jsx, Hero.jsx, Recognition.jsx, Skills.jsx, Projects.jsx, Experience.jsx,
    DeepDives.jsx, Education.jsx, Contact.jsx, Footer.jsx   (restyled, same data)
```

**Layers.** `<Scene/>` is `position: fixed; inset: 0; z-index: 0` and `pointer-events: none`
(pointer position comes from a window listener, not from the canvas). Content is `z-index: 10`.
The Scene is `React.lazy` so HTML and text paint first, then the canvas fades in over 600 ms.

**Scene state.** `sceneState` is a plain module object. DOM side writes to it:

- Lenis `scroll` event → `scroll` (0..1 of document) and `velocity` (px/frame, signed).
- `pointermove` on window → `pointer` normalised to -1..1, plus `hover` when over the hero.
- `IntersectionObserver` on each `<section data-scene="...">` → `section` id of the most visible.

R3F side reads it in `useFrame` and damps toward per-section targets. No React state crosses
the boundary after mount, so scrolling never re-renders the tree.

**Section targets for the Monolith.**

| section | position (x, y, z) | scale | distortion | tint |
|---|---|---|---|---|
| hero | (1.6, 0.1, 0) desktop / (0, 1.2, 0) mobile | 1.0 | 0.35 | none |
| recognition | (2.4, 0.8, -1) | 0.7 | 0.25 | award, 15% |
| skills | (-2.2, 0.4, -1.5) | 0.6 | 0.3 | none |
| projects | (2.6, -0.2, -2) | 0.5 | 0.2 | none |
| experience | (-2.6, 0.2, -2) | 0.5 | 0.2 | none |
| deepdives | (2.2, 0.6, -1.5) | 0.6 | 0.3 | none |
| education | (-2.0, 0.0, -2) | 0.45 | 0.2 | none |
| contact | (0, 0.2, -0.5) | 1.2 | 0.4 | accent, 10% |

Transitions use `maath/easing.damp3` with λ ≈ 4. Scroll velocity adds a transient
distortion boost (`+ min(|velocity| / 40, 0.5)`) that decays, so fast scrolling visibly
stretches the liquid.

## 5. Component designs

### 5.1 LiquidMonolith

- Geometry: `IcosahedronGeometry(1, 48)` on high tier, `(1, 24)` on low. Vertex shader
  injection via `onBeforeCompile` adds 3D simplex noise displacement:
  `p += normal * (noise(p * 1.4 + t * 0.25) * distortion + pointerBulge)` where
  `pointerBulge = 0.25 * smoothstep(1.2, 0, distance(p, uPointerWorld))`.
- Material: drei `MeshTransmissionMaterial` with `transmission 1`, `thickness 1.4`,
  `roughness 0.08`, `ior 1.42`, `chromaticAberration 0.06`, `anisotropy 0.2`,
  `distortion 0.3`, `distortionScale 0.5`, `temporalDistortion 0.12`,
  `samples 6 / resolution 512 / backside true` (high) or `samples 2 / 256 / false` (low).
- Rotation: slow idle spin plus damped pointer offset (`±0.35 rad`).
- Hover on the hero region raises `distortion` by 0.15 and speeds the noise.

### 5.2 PortraitPlane

- `PlaneGeometry(1.5, 1.5, 1, 1)` with `useTexture('/darshan_profile_image.png')`,
  placed at hero `(0.9, 0.1, -0.6)` so the Monolith's edge overlaps and refracts part of it.
- Fragment shader: circular soft mask; radial ripple around the projected pointer
  (`uv += dir * sin(dist * 28 - t * 6) * 0.012 * falloff`); RGB split of 0.004 uv scaled by
  pointer speed; thin luminous rim.
- "Looks at you": plane rotation damped toward `(-pointer.y * 0.18, pointer.x * 0.28, 0)`.
- On sections other than hero it fades out (opacity uniform) and parks behind the Monolith.
- On mobile it is the hero image itself (canvas above the text), no separate `<img>`.

### 5.3 Studio, Dust, Effects

- `Environment resolution={256}` containing three `Lightformer`s (cool key, warm rim,
  wide soft top). No HDR downloads, so nothing depends on a CDN.
- Dust: `Points` with 600 (high) / 200 (low) instances, drifting with noise, additive,
  size 1.5px, opacity 0.35. Gives the transmission something to refract.
- Effects (high only): `Bloom intensity 0.35 luminanceThreshold 0.8`, `Vignette 0.35`,
  `Noise 0.04`. Wrapped in `EffectComposer multisampling={0}`.

### 5.4 LiquidGlass

Props: `as`, `className`, `radius` (px), `strength` (px, max displacement, default 24),
`blur` (px, default 12), `tint`, `children`.

- On mount and resize (ResizeObserver, debounced 100 ms) it calls
  `buildDisplacementMap(w, h, radius, ior=1.5)` (pure, tested) which returns `ImageData`
  encoding X/Y displacement in R/G with 128 as neutral, using a squircle edge profile and
  Snell's law, matching the published technique. Maps are cached by `w×h×radius` in a
  module `Map` so identical buttons share one.
- Renders an inline `<svg width=0 height=0>` with
  `<filter id> <feImage href={dataUrl} preserveAspectRatio="none"/> <feDisplacementMap
  in="SourceGraphic" in2 scale={strength} xChannelSelector="R" yChannelSelector="G"/>
  <feGaussianBlur stdDeviation={blur/4}/> </filter>` and sets
  `backdrop-filter: url(#id)` on the surface, plus `contain: paint` and `isolation: isolate`.
- If `supportsSvgBackdrop()` is false (Safari, Firefox) it renders no SVG and applies
  `backdrop-filter: blur(var(--blur)) saturate(160%)` instead. Both branches share the
  same rim highlight (`inset 0 1px 0 rgba(255,255,255,.18), inset 0 -1px 0 rgba(0,0,0,.35)`),
  a top-left specular `::before` gradient, and a 3% noise overlay.
- `prefers-reduced-motion` does not affect it (it is static), but tier `off` uses the blur branch.

### 5.5 TiltCard

Wraps a card. Pointer position over the card drives `rotateX/rotateY` (±6°) via Framer
Motion `useMotionValue` + `useSpring`, and a radial spotlight on the border
(`--mx`, `--my` CSS vars into a masked gradient). Disabled under reduced motion and on
coarse pointers.

### 5.6 Sections

- **Preloader:** full-screen obsidian, name in display type, mono percentage from
  `useProgress`; dismisses at 100% or after 2.5 s, whichever first; skipped when
  `sessionStorage.seen` is set.
- **Nav:** centred floating liquid-glass pill 16 px from the top, containing the DB mark,
  anchor links (Work, Experience, Contact), GitHub, LinkedIn, and "Let's talk". Shrinks
  padding after 50 px scroll. Mobile: mark + Let's talk + a menu button opening a glass sheet.
- **Hero:** two columns on desktop. Left: mono eyebrow "OPEN TO REMOTE · BACKEND / AI PLATFORM /
  DATA INFRA", H1 name in display type at `clamp(3rem, 8vw, 7rem)`, role line with the
  serif-italic accent ("Backend & Data Platform Engineer — systems that stay *liquid* at
  petabyte scale"), the existing intro paragraph and four highlights, two CTAs (liquid glass
  primary "Explore work", soft glass "Resume"), and the stat strip as a liquid glass bar.
  Right: empty space owned by the canvas (Monolith + portrait). The dashed orbit rings and
  floating icon tiles are removed. Below the hero, the **Marquee** carries the ten tech
  icons in mono with names, scrolling slowly, paused on hover.
- **Recognition:** feature award card is soft glass with an award-tinted edge and a slow
  gold sheen; the three showcases are compact soft glass tiles. Scene tint goes award.
- **Skills:** four `TiltCard`s in a 4-up grid, mono skill chips, accent icon plate.
- **Projects:** sticky stack. Each project card is `position: sticky; top: 96px`; the
  previous card scales to 0.94 and dims as the next scrolls over it (per-card `useScroll`
  with `target` and `offset: ['start end','start start']`). Content layout inside stays
  2/5 + 3/5 as today.
- **Experience:** timeline whose vertical line draws with scroll progress (`scaleY` from
  `useScroll` of the section) and nodes light up when passed. Soft glass cards.
- **Deep Dives:** 2×2 `TiltCard` bento, side-project strip below unchanged in structure.
- **Education:** single soft glass row.
- **Contact:** large soft glass panel with a liquid glass edge ring; the Monolith returns
  centre-stage behind it at scale 1.2. Three buttons unchanged.
- **Footer:** one line, mono, availability dot.

## 6. Quality tiers and fallbacks

`quality.js` decides once at startup:

| tier | condition | behaviour |
|---|---|---|
| off | `prefers-reduced-motion: reduce`, or no WebGL2 context, or `webglcontextlost` | `StaticFallback` (SVG gradient blob + `<img>` portrait), entrance animations become fades, TiltCard static |
| low | viewport < 768 px, or coarse pointer, or `hardwareConcurrency ≤ 4`, or `deviceMemory ≤ 4` | dpr 1, geometry 24 subdivisions, samples 2, no backside, no Effects, dust 200 |
| high | everything else | dpr `min(2, devicePixelRatio)`, full settings |

Additional safeguards: the canvas is `frameloop="always"` but `useFrame` early-returns when
`document.hidden`; texture load failure hides `PortraitPlane` only; an `ErrorBoundary`
around the lazy Scene renders `StaticFallback` on any render error; `setPixelRatio` is
re-evaluated on `resize`.

## 7. Performance and SEO budget

- HTML and text paint before any 3D code downloads (Scene is a lazy chunk).
- 3D chunk (three + fiber + drei subset + postprocessing) ≤ 350 KB gzip.
- Target 60 fps on a mid-range laptop at high tier, ≥ 30 fps at low tier on a 2022 phone.
- Lighthouse mobile performance ≥ 85, accessibility ≥ 95.
- Canvas is `aria-hidden="true"`; all content remains real DOM text.
- Text on glass keeps ≥ 4.5:1 contrast; focus rings use `--accent` at 2 px.

## 8. Testing

Vitest with jsdom. Unit tests cover the pure and semi-pure layers only:

- `displacement.test.js`: output dimensions, neutral 128/128 at centre, monotonic
  displacement toward edges, cache hit for identical inputs.
- `support.test.js`: `supportsSvgBackdrop()` true/false paths with a mocked `CSS.supports`.
- `quality.test.js`: each tier condition with mocked `matchMedia`, `navigator`, canvas.
- `sceneState.test.js`: section target lookup and velocity boost clamp.
- `LiquidGlass.test.jsx`: renders SVG filter branch vs blur branch by mocked support.
- `SectionHeading.test.jsx`: italic accent word split.

Rendering of the WebGL scene is verified manually in the in-app browser at 1440 px and
375 px widths, plus a reduced-motion run to confirm the static fallback. `npm run build`
must pass and report chunk sizes.

## 9. Delivery

Work lands on `feat/liquid-monolith-3d-revamp` in small commits (stack upgrade, tokens and
type, LiquidGlass, Scene, sections, polish). A PR to `master` follows once the build, tests,
and browser checks pass. The two untracked items in the working tree
(`UI-TOOLS-RESEARCH.md`, `public/linkedin_agent/`) are left untouched and uncommitted.
