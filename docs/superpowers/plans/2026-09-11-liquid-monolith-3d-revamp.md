# Liquid Monolith 3D Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio's visual layer around a persistent WebGL "Liquid Monolith" scene with liquid-glass UI, on React 19 + React Three Fiber v9, keeping all content and staying fast on mobile.

**Architecture:** A `React.lazy` `<Scene/>` renders a fixed, pointer-transparent canvas behind the 2D content. A mutable `sceneState` module is written by DOM listeners (Lenis scroll, pointer, section observers) and read inside `useFrame`, so scrolling never re-renders React. Glass surfaces come from two components: `LiquidGlass` (SVG displacement `backdrop-filter` in Chromium, blur fallback elsewhere) and the `.glass-soft` utility for cards. Every section keeps its data from `src/data/profile.js`.

**Tech Stack:** React 19.2, Vite 5, Tailwind 3.4, Framer Motion 13, three 0.186, @react-three/fiber 9.7, @react-three/drei 10.7, @react-three/postprocessing 3.1, maath 0.10, lenis 1.3, Vitest 3 + jsdom + Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-11-liquid-monolith-3d-revamp-design.md`

## Global Constraints

- React and react-dom `~19.2.0` (fiber 9.7 requires React below 19.3); fiber `^9.7.0`; drei `^10.7.8`; three `^0.186.0`; postprocessing `^6.39.5`; vitest `^3.2.4` (Vite stays `^5.0.8`).
- Content strings come from `src/data/profile.js` and are not edited. The only new copy is the hero role line and heading accent words listed in the tasks.
- Palette tokens exactly: `--bg #06070b`, `--bg-2 #0b0d14`, `--fg #e9ebf2`, `--fg-muted #9aa0b4`, `--fg-dim #5d6378`, `--accent #8fe3ff`, `--accent-2 #c9a3ff`, `--award #f5c451`.
- Fonts: Bricolage Grotesque (display), Instrument Serif italic (accent word), Inter (body), JetBrains Mono (labels).
- At most six `LiquidGlass` instances on the page (nav, hero CTA, hero stats, contact panel = 4).
- Canvas is `aria-hidden`, `pointer-events: none`, `z-index: 0`; content is `z-index: 10`.
- Quality tiers `off | low | high` as defined in `src/lib/quality.js`; `off` renders `StaticFallback`.
- Brand icons (GitHub, LinkedIn) come from `react-icons/fi` (`FiGithub`, `FiLinkedin`; simple-icons has no LinkedIn), never from lucide.
- Commit after every task with the trailer `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. Never `git add -A`; the untracked `UI-TOOLS-RESEARCH.md` and `public/linkedin_agent/` stay uncommitted.
- Run tests with `npm test` (vitest run). Run the dev server only through the in-app browser preview, never via a bare Bash `npm run dev`.

---

### Task 1: Stack upgrade and test harness

**Files:** Modify `package.json`, `vite.config.js`; Create `src/test/setup.js`; Test `src/test/harness.test.jsx`.

**Produces:** `npm test` and `npm run build` on React 19; jsdom polyfills for `IntersectionObserver`, `ResizeObserver`, `matchMedia`, `requestAnimationFrame`.

- [x] Replace `package.json` dependencies: add `@react-three/drei ^10.7.8`, `@react-three/fiber ^9.7.0`, `@react-three/postprocessing ^3.1.1`, `lenis ^1.3.26`, `maath ^0.10.8`, `postprocessing ^6.39.5`, `three ^0.186.0`; bump `react`/`react-dom ^19.3.0`, `framer-motion ^13.2.0`, `lucide-react ^1.44.0`, `react-icons ^5.7.0`; remove `pdf-parse`, `pdf2json`. Dev: `@testing-library/dom ^10.4.0`, `@testing-library/jest-dom ^6.6.3`, `@testing-library/react ^16.3.3`, `@types/react ^19`, `@types/react-dom ^19`, `jsdom ^26.1.0`, `vitest ^3.2.4`. Scripts: `"test": "vitest run"`, `"test:watch": "vitest"`. Version `2.0.0`.
- [x] `npm install` (no ERESOLVE).
- [x] `vite.config.js`: add `test: { environment: 'jsdom', globals: true, setupFiles: ['./src/test/setup.js'], css: false, include: ['src/**/*.test.{js,jsx}'] }`.
- [x] `src/test/setup.js`: import `@testing-library/jest-dom/vitest`; polyfill `IntersectionObserver`/`ResizeObserver` with a no-op class, `window.matchMedia` returning `{ matches: false, ... }`, and `requestAnimationFrame` via `setTimeout(16)`.
- [x] `src/test/harness.test.jsx`: render `<h1>hello</h1>`, assert heading text and `React.version.startsWith('19')`.
- [x] `npm test` → 1 passed; `npm run build` → succeeds.
- [x] Commit: `chore: upgrade to React 19, add R3F stack and vitest harness`.

### Task 2: Design tokens, typography, SectionHeading

**Files:** Modify `index.html`, `tailwind.config.js`, `src/index.css`; Create `src/components/SectionHeading.jsx`; Test `src/components/SectionHeading.test.jsx`.

**Produces:** Tailwind colours `bg`, `bg-2`, `fg`, `fg-muted`, `fg-dim`, `accent`, `accent-2`, `award` (all `rgb(var(--x) / <alpha-value>)`); fonts `font-display` (Bricolage Grotesque), `font-serif` (Instrument Serif), `font-mono` (JetBrains Mono), `font-sans` (Inter); utilities `.glass-soft`, `.liquid-glass` shell, `.eyebrow`, `.chip`, `.mask-fade-x`, `.text-balance`, `.bg-noise`; animations `animate-marquee` (translateX 0 → -50%, 40s), `animate-sheen` (skewed sweep, 7s), `animate-fade-in`. `SectionHeading({ eyebrow, title, align, tone, className })` and `splitAccent(text)` which splits `*word*` into `{ text, accent }` parts and renders the accent as `<em class="font-serif italic text-accent">`.

- [x] Fonts link: `Bricolage+Grotesque:opsz,wght@12..96,300..800`, `Instrument+Serif:ital@0;1`, `Inter:wght@300;400;500;600`, `JetBrains+Mono:wght@400;500;600`; add `<meta name="theme-color" content="#06070b">`.
- [x] `:root` tokens as RGB triplets: `--bg: 6 7 11; --bg-2: 11 13 20; --fg: 233 235 242; --fg-muted: 154 160 180; --fg-dim: 93 99 120; --accent: 143 227 255; --accent-2: 201 163 255; --award: 245 196 81;` plus `--glass rgba(255,255,255,.05)`, `--glass-edge rgba(255,255,255,.14)`. Lenis CSS: `html.lenis, html.lenis body { height: auto }`, `.lenis.lenis-smooth { scroll-behavior: auto !important }`. Focus ring 2px accent.
- [x] Failing test: `splitAccent('Work on the *world* stage')` → 3 parts; rendered heading has `<em>` "world" and eyebrow text.
- [x] Implement; `npm test`; `npm run build`; commit `feat: add obsidian design tokens, type system, and SectionHeading`.

### Task 3: Displacement map and backdrop support detection

**Files:** Create `src/lib/liquidGlass/displacement.js`, `src/lib/liquidGlass/support.js`; tests beside them.

**Produces:** `buildDisplacementMap(width, height, radius, ior = 1.5) -> { width, height, data: Uint8ClampedArray }` (cached by inputs; R = 128 + outwardX·m·127, G likewise; neutral 128 inside; band width = radius; magnitude from Snell's law through the squircle profile `edgeProfile(t) = (1-(1-t)^4)^(1/4)`, normalised so the outer edge is 1 and the inner end 0; cut-off corners neutral). `edgeProfile(t)`, `refractionMagnitude(t, ior)`. `detectSvgBackdrop(env)` = `CSS.supports('backdrop-filter','url(#x)')` AND Chromium UA (not Firefox); `supportsSvgBackdrop()` caches; `resetSupportCache()`.

- [x] Failing tests: dimensions; centre `[128,128,128,255]`; left-edge R < 128 and increasing toward the interior (`px(0) < px(3) < px(7) <= 128`), right-edge R > 128, top G < 128, bottom G > 128; corner pixel neutral; cache identity; support true/false/Safari/Firefox/no-CSS; cache.
- [x] Implement; `npm test`; commit `feat: add liquid glass displacement map builder and backdrop support detection`.

### Task 4: LiquidGlass component

**Files:** Create `src/components/LiquidGlass.jsx`; test.

**Produces:** `<LiquidGlass as="div" radius=24 strength=24 blur=12 className style ...rest>`; `mapToDataUrl(map)` (canvas → PNG data URL, WeakMap-cached). Measures itself (`getBoundingClientRect` + debounced `ResizeObserver`), builds a half-resolution map, renders an inline `<svg width=0 height=0>` with `<filter id primitiveUnits="userSpaceOnUse"> <feImage href preserveAspectRatio="none" result="map"/> <feGaussianBlur in="SourceGraphic" stdDeviation={blur/2} result="blurred"/> <feDisplacementMap in="blurred" in2="map" scale={strength} xChannelSelector="R" yChannelSelector="G"/> </filter>` and sets `backdrop-filter: url(#id)`; otherwise `blur(${blur}px) saturate(160%)`. Class `liquid-glass` gives the rim highlight, specular `::before`, and noise `::after`.

- [x] Failing tests: mocked `supportsSvgBackdrop` false → blur style, no `<svg>`; true (with mocked `getBoundingClientRect` 200×48 and canvas `getContext`/`toDataURL`) → `<filter>` present and `style.backdropFilter === url(#id)`, `as="span"` respected.
- [x] Implement; `npm test`; commit `feat: add LiquidGlass surface with SVG refraction and blur fallback`.

### Task 5: Quality tier detection

**Files:** Create `src/lib/quality.js`; test.

**Produces:** `detectTier(env)`: `?tier=off|low|high` override → reduced motion → off → no WebGL2 → off → narrow (<768) / coarse pointer / `hardwareConcurrency <= 4` / `deviceMemory <= 4` → low → high. `getTier()` cached, `setTier(t)`, `hasWebGL2(env)`, `TIER_SETTINGS = { off: null, low: { dpr: 1, detail: 24, samples: 2, resolution: 256, backside: false, effects: false, dust: 200 }, high: { dpr: [1, 2], detail: 48, samples: 6, resolution: 512, backside: true, effects: true, dust: 600 } }`.

- [x] Failing tests for each branch with a synthetic env object; implement; commit `feat: add quality tier detection for the 3D scene`.

### Task 6: Scene state and section targets

**Files:** Create `src/lib/sceneState.js`; test.

**Produces:** `sceneState = { scroll, velocity, pointer: {x,y}, hover, section: 'hero', isMobile, progress, ready, lenis }`; `SECTION_TARGETS` (hero (1.6,0.1,0) s1 d0.35; recognition (2.4,0.8,-1) s0.7 d0.25 tint award; skills (-2.2,0.4,-1.5) s0.6 d0.3; projects (2.6,-0.2,-2) s0.5 d0.2; experience (-2.6,0.2,-2) s0.5 d0.2; deepdives (2.2,0.6,-1.5) s0.6 d0.3; education (-2,0,-2) s0.45 d0.2; contact (0,0.2,-0.5) s1.2 d0.4 tint accent); `MOBILE_HERO = { position: [0.45, 1.15, 0], scale: 0.75 }`; `getTarget(section, isMobile)` (unknown → hero; mobile hero → MOBILE_HERO; other mobile → x·0.5, scale·0.8); `velocityBoost(v) = min(|v|/40, 0.5)`; `setPointer(clientX, clientY, w, h)` → NDC; `TINTS = { award: '#f5c451', accent: '#8fe3ff', none: '#ffffff' }`.

- [x] Failing tests; implement; commit `feat: add shared scene state and per-section Monolith targets`.

### Task 7: Scene scaffold, bindings, App integration

**Files:** Create `src/three/Scene.jsx`, `Studio.jsx`, `Dust.jsx`, `Effects.jsx`, `StaticFallback.jsx`, `SceneErrorBoundary.jsx`, `src/lib/useSceneBindings.js`; replace `src/App.jsx`; add `data-scene` + `id` to every existing section; test `SceneErrorBoundary`.

**Produces:** `<Scene tier onContextLost />`: fixed `aria-hidden` wrapper, `<Canvas dpr={settings.dpr} camera={{ position: [0,0,6], fov: 35 }} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}>` with `ProgressBridge` (drei `useProgress` → `sceneState.progress`), `<Suspense>` containing `Studio` (ambient + 2 directional + procedural `<Environment resolution={256} frames={1}>` with four `Lightformer`s), `Dust` (points, count by tier, additive, drifting in `useFrame`), `Effects` on high (Bloom 0.35 / Noise 0.04 / Vignette 0.35), and `Ready` (sets `sceneState.ready`). `webglcontextlost` → `setTier('off')` + `onContextLost()`. `StaticFallback`: two gradient blobs. `SceneErrorBoundary`: class component rendering `fallback` on error. `useSceneBindings({ enabled })`: pointer → `setPointer`; resize → `isMobile`; `IntersectionObserver` on `[data-scene]` → most-visible `section`; Lenis (`autoRaf`, `lerp 0.09`) → `scroll`/`velocity`, stored on `sceneState.lenis`; native scroll fallback when disabled. App: `MotionConfig reducedMotion="user"`, progress bar, tier state, lazy Scene inside boundary + Suspense (fallback StaticFallback), noise overlay, Nav, sections, Footer.

- [x] Boundary test; create files; replace App; add `data-scene` attributes; `npm test`; `npm run build` (separate three chunk); browser check via preview (`.claude/launch.json` entry `portfolio` → `npm run dev`, port 5173): dust visible, `?tier=off` fallback, smooth scroll; commit `feat: add lazy WebGL scene scaffold, scene bindings, and static fallback`.

### Task 8: LiquidMonolith

**Files:** Create `src/three/noise.js` (Ashima 3D simplex, `float snoise(vec3)`), `src/three/LiquidMonolith.jsx`; modify `Scene.jsx`.

**Produces:** `<LiquidMonolith settings />`: `<group>` → `<mesh frustumCulled={false}>` with `icosahedronGeometry [1, settings.detail]` and drei `MeshTransmissionMaterial` (transmission 1, thickness 1.4, roughness 0.08, ior 1.42, chromaticAberration 0.06, anisotropy 0.2, distortion 0.3, distortionScale 0.5, temporalDistortion 0.12, samples/resolution/backside from settings, backsideThickness 0.6, attenuationColor #bfe9ff, attenuationDistance 2.5). In `useEffect`, wrap the material's existing `onBeforeCompile` (call drei's first), merge uniforms `uTime, uDistortion, uPointer (vec3, object space), uSpeed`, inject into the vertex shader: after `<common>` the noise + `liquid(p) = (snoise(p*1.4 + t*0.25*uSpeed)*0.7 + snoise(p*3.1 - t*0.18*uSpeed)*0.3) * uDistortion + 0.25*smoothstep(1.2, 0, distance(p, uPointer))`; after `<beginnormal_vertex>` compute displaced `lmP0` plus two tangent offsets (ε 0.02) and set `objectNormal = normalize(cross(lmP1-lmP0, lmP2-lmP0))`; after `<begin_vertex>` set `transformed = lmP0`. Set `customProgramCacheKey = () => 'liquid-monolith'`, `needsUpdate = true`. `useFrame`: `damp3` position/scale to `getTarget(section, isMobile)` (smoothTime 0.6); rotation `(lean.x, t*0.08 + lean.y, 0)` with lean damped to pointer (±0.25/±0.35); distortion = target + hover·0.15 + `velocityBoost` (damped); `uSpeed = 1 + hover·0.8`; pointer world position from `viewport.getCurrentViewport(camera, [0,0,z])` → `mesh.worldToLocal`; material colour lerps toward white mixed 15 % (award) / 10 % (accent) with the tint.

- [x] Create; render in Scene after Dust; `npm run build`; browser check (blob visible, leans, bulges, drifts per section, no shader errors); commit `feat: add the LiquidMonolith transmission blob with noise displacement`.

### Task 9: PortraitPlane

**Files:** Create `src/three/PortraitPlane.jsx`; modify `Scene.jsx`.

**Produces:** `<PortraitPlane />`: `planeGeometry [1.5, 1.5]`, `useTexture(profile.photo)` with `SRGBColorSpace`, `ShaderMaterial` (transparent, no depthWrite) with uniforms `uMap, uTime, uPointer (uv), uSpeed, uOpacity`. Fragment: ripple `uv += normalize(uv-uPointer) * sin(pd*28 - t*6) * 0.012 * smoothstep(0.55, 0, pd)`; RGB split `0.004*uSpeed` along the radial direction; circular mask `1 - smoothstep(0.47, 0.5, d)`; rim `smoothstep(0.42,0.47,d)*(1-smoothstep(0.47,0.5,d))` × glacier; `#include <colorspace_fragment>`. `useFrame`: raycast `sceneState.pointer` NDC against the plane → uv (else (-5,-5)), damped; pointer speed → `uSpeed` (clamped 4); rotation damped to `(-pointer.y*0.18, pointer.x*0.28, 0)`; opacity 1 only when `section === 'hero'`, `visible` when > 0.01; layout desktop `{ position: [0.45, 0.15, -0.6], scale: 1 }`, mobile `{ position: [-0.3, 1.3, -0.4], scale: 0.85 }` damped.

- [x] Create; render after LiquidMonolith; build; browser check at 1440 and 375 px (photo partly refracted by the Monolith's edge, ripples under the pointer, fades outside the hero); if more than half covered at 1440 px lower desktop x by 0.15; commit `feat: add the shader PortraitPlane that ripples and looks toward the pointer`.

### Task 10: Nav and Preloader

**Files:** Replace `src/components/Nav.jsx`; create `src/components/Preloader.jsx`; mount in App; tests for both.

**Produces:** `scrollToHash(e, href)` (Lenis `scrollTo(el, { offset: -96, duration: 1.2 })` else `scrollIntoView smooth`; `history.replaceState`). Nav: fixed header, centred `LiquidGlass as="nav" radius=999 strength=18 blur=14` pill (max-w-3xl) with DB mark + first name, links Work `#projects` / Experience `#experience` / Contact `#contact` (md+), GitHub/LinkedIn (`FiGithub`, `FiLinkedin`), "Let's talk" mailto, menu button (`aria-expanded`, `aria-controls="mobile-menu"`, labels Open/Close menu) opening a `glass-soft` sheet via `AnimatePresence`; padding shrinks when `isScrolled`. Preloader: `enabled` prop; skipped when `sessionStorage['dgb-seen'] === '1'`; rAF loop where progress = 100 if `sceneState.ready`, else `max(creep = min(90, elapsed/25), sceneState.progress*0.9)`; dismiss at 100 or after 2500 ms; writes the session flag; name in display type + mono percentage + hairline bar; `AnimatePresence` fade-out 0.6 s.

- [x] Nav tests (links, menu toggle, `scrollToHash` lenis vs native); Preloader tests (disabled, seen, dismisses when ready); implement; mount `<Preloader enabled={tier !== 'off'} />` before Nav; test/build; browser check (preloader → page, nav refraction, smooth anchor scroll, mobile menu); commit `feat: floating liquid-glass nav and asset-aware preloader`.

### Task 11: Hero and Marquee

**Files:** Replace `src/components/Hero.jsx`; create `src/components/Marquee.jsx`; mount Marquee after Hero; tests.

**Produces:** `<Hero tier />`: `section#home[data-scene=hero]` with pointer enter/leave → `sceneState.hover`; `lg:grid-cols-12`; mobile reserved `h-[34svh]` block above the text (static `<img>` only when tier `off`); left `lg:col-span-7`: eyebrow with pulsing dot "Open to remote · Backend / AI platform / Data infra" + award chip; `<h1>` first name / surname (gradient fg→accent→accent-2) at `clamp(3rem, 8vw, 7rem)`; role line `{profile.title} — systems that stay <em>liquid</em> at petabyte scale.`; existing intro paragraph; four highlights with mono `/` markers; CTAs: `LiquidGlass as="a" href="#projects"` "Explore work" (+ArrowUpRight) and `glass-soft` "Resume"; stat strip as `LiquidGlass radius=20` 3-col grid with `AnimatedCounter`; right `lg:col-span-5 min-h-[560px]` empty (static `<img>` when `off`). `<Marquee />`: 12 tech icons (Node, TS, Python, Mongo, MySQL, Redis, Docker, Jenkins, AWS, Azure, GCP, Rails) in mono uppercase, list doubled, `animate-marquee`, pause on hover, `motion-reduce:animate-none`, `mask-fade-x`.

- [x] Tests (h1 = name, CTA hrefs, img only at `off`; each marquee label ×2); implement; test/build; browser check 1440/375; commit `feat: rebuild hero around the canvas and add the tech marquee`.

### Task 12: TiltCard, Skills, Deep Dives

**Files:** Create `src/components/TiltCard.jsx`; replace `Skills.jsx`, `DeepDives.jsx`; tests.

**Produces:** `<TiltCard className max=6 ...motionProps>`: `motion.div.group.glass-soft.rounded-3xl` with `rotateX/rotateY` springs (±max°) from pointer position, `transformPerspective 1000`, spotlight border layer (`radial-gradient(240px circle at mx% my%, accent/.35, transparent 60%)` masked to the 1px ring via `mask-composite: exclude`), children lifted `translateZ(24px)`; disabled on reduced motion / coarse pointer. Skills: `SectionHeading "Core competencies" / "A *technical* arsenal built in production"` centred, 4 TiltCards (accent icon plate, mono index, title, `.chip`s). DeepDives: heading `"Deep dives" / "Engineering *stories* from the trenches"`, 2×2 TiltCards (context chip, mono period, title, mono tech, description), side-project `glass-soft` strip.

- [x] Tests; implement; test/build; browser hover check; commit `feat: tilt cards with spotlight borders for Skills and Deep Dives`.

### Task 13: Recognition, Education, Footer

**Files:** Replace `Recognition.jsx`, `Education.jsx`, `Footer.jsx`; Recognition test.

**Produces:** Recognition: heading tone `award`, title `"Work that made it to the *world* stage"`; feature `glass-soft` article `!border-award/25` with `animate-sheen` sweep (`motion-reduce:hidden`), award blur, trophy plate, kind chip, event `text-5xl`, detail, mono place; showcase cards `lg:col-span-2` with presentation chip. Education: heading `"Academic *background*"`, single glass row (cap plate, degree, school, period chip, GPA accent chip). Footer: mono uppercase line, year + name, pulsing accent dot "Open to work · location".

- [x] Test (all events rendered, `/world/` accent); implement; test/build; browser check; commit `feat: restyle Recognition, Education, and Footer on the glass system`.

### Task 14: Projects sticky stack and Experience timeline

**Files:** Replace `Projects.jsx`, `Experience.jsx`; tests.

**Produces:** Projects: heading `"Selected work" / "Projects with *real* weight"`; `ProjectCard({ project, index, total })` wrapper `div.sticky` with `top: calc(96px + index*16px)`; `useScroll({ target, offset: ['start start', 'end start'] })` → `scale 1→0.94`, `opacity 1→0.5` (not on the last card; 1→1 under reduced motion); `glass-soft` article `md:grid-cols-5` (icon plate, mono `0i / 0N`, title, role, GitHub link with `FiGithub` when `project.link`, period; description, highlights with `/` markers, `.chip` tech). Experience: heading `"Journey" / "Professional *experience*"` centred, `bg-bg-2/60`; timeline with a static hairline plus a `motion.div` line `scaleY` from `useSpring(useScroll({ target, offset: ['start 80%', 'end 60%'] }).scrollYProgress)`; `ol` of `glass-soft` cards with node dots that glow on hover, period chip, mono location, role, company, description, achievements.

- [x] Tests (titles + `01 / 03`, GitHub link; roles + companies); implement; test/build; browser scroll check; commit `feat: sticky glass project stack and scroll-drawn experience timeline`.

### Task 15: Contact, motion notes, README, final verification, PR

**Files:** Replace `Contact.jsx`; annotate `src/lib/motion.js`; update `README.md` features/tech stack; test.

**Produces:** Contact: `section#contact[data-scene=contact]`, `LiquidGlass radius=40 strength=26 blur=20` panel, eyebrow "Contact", heading `Let's build something <em>extraordinary</em>.`, existing paragraph, buttons "Say hello" (mailto, solid), LinkedIn and GitHub (`glass-soft`, `FiLinkedin`/`FiGithub`). motion.js comment noting `MotionConfig reducedMotion="user"`. README: features (WebGL Monolith, shader portrait, liquid glass, sticky stack, tiers) and stack (React 19, R3F, drei, postprocessing, Framer Motion 13, Lenis, maath, Vitest) plus the `?tier=` debug note.

- [x] Test (mailto/LinkedIn/GitHub hrefs, `<em>extraordinary</em>`); implement; `npm test`; `npm run build` and confirm the three chunk ≤ 350 KB gzip and nothing outside `src/three/` imports three (`grep -rn "@react-three\|from 'three'" src | grep -v src/three/` empty); browser: desktop full scroll, 375 px, `?tier=off`, `?tier=low`, no console errors; commit `feat: liquid-glass contact panel, motion notes, README for the 3D revamp`.
- [x] `git push -u origin feat/liquid-monolith-3d-revamp` and `gh pr create --base master` titled "feat: Liquid Monolith 3D portfolio revamp" with summary, spec/plan links, test plan, and the `🤖 Generated with [Claude Code](https://claude.com/claude-code)` footer.

---

## Self-review

- **Spec coverage:** §2 → T1; §3 → T2, T4; §4 → T6, T7; §5.1 → T8; §5.2 → T9; §5.3 → T7; §5.4 → T4; §5.5 → T12; §5.6 → T10, T11, T12, T13, T14, T15; §6 → T5, T7; §7 → T15; §8 → every task; §9 → T15.
- **Type consistency:** `TIER_SETTINGS[tier]` fields `dpr, detail, samples, resolution, backside, effects, dust` are the names Scene (T7) and LiquidMonolith (T8) read. `sceneState` fields written by T7/T10/T11 (`scroll, velocity, pointer, section, isMobile, lenis, progress, ready, hover`) all exist in T6. `scrollToHash` is exported from Nav (T10) and imported by Hero (T11).
- The spec's "λ ≈ 4" damping is expressed as maath `smoothTime` values (0.15–0.6 s), which is the same feel in maath's API.
