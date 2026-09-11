import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { damp, damp3 } from 'maath/easing';
import * as THREE from 'three';
import { sceneState } from '../lib/sceneState';
import { profile } from '../data/profile';

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform sampler2D uMap;
uniform float uTime;
uniform vec2 uPointer;
uniform float uSpeed;
uniform float uOpacity;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  vec2 c = uv - 0.5;
  float d = length(c);

  // ripple radiating from the pointer
  vec2 pdir = uv - uPointer;
  float pd = length(pdir);
  float falloff = smoothstep(0.55, 0.0, pd);
  uv += normalize(pdir + 1e-4) * sin(pd * 28.0 - uTime * 6.0) * 0.012 * falloff;

  // chromatic split that grows with pointer speed
  float split = 0.004 * uSpeed;
  vec2 dir = normalize(c + 1e-4);
  float r = texture2D(uMap, uv + dir * split).r;
  float g = texture2D(uMap, uv).g;
  float b = texture2D(uMap, uv - dir * split).b;
  vec3 col = vec3(r, g, b);

  // soft circular mask and a thin luminous rim
  float mask = 1.0 - smoothstep(0.47, 0.5, d);
  float rim = smoothstep(0.42, 0.47, d) * (1.0 - smoothstep(0.47, 0.5, d));
  col += rim * vec3(0.56, 0.89, 1.0) * 0.6;

  gl_FragColor = vec4(col, mask * uOpacity);
  #include <colorspace_fragment>
}
`;

const DESKTOP = { position: [0.45, 0.15, -0.6], scale: 1 };
const MOBILE = { position: [-0.3, 1.3, -0.4], scale: 0.85 };

// The real photo on a plane: ripples and splits under the pointer, turns toward
// it, and is partly refracted by the Monolith's edge. Hero only.
export default function PortraitPlane() {
  const mesh = useRef(null);
  const texture = useTexture(profile.photo);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uMap: { value: texture },
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(-5, -5) },
          uSpeed: { value: 0 },
          uOpacity: { value: 1 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      }),
    [texture]
  );

  const st = useRef({ rx: 0, ry: 0, speed: 0, px: -5, py: -5, opacity: 1, lastX: 0, lastY: 0 });
  const ndc = useMemo(() => new THREE.Vector2(), []);

  useFrame((state, delta) => {
    if (document.hidden || !mesh.current) return;
    const dt = Math.min(delta, 1 / 30);
    const s = sceneState;
    const u = material.uniforms;
    const v = st.current;
    u.uTime.value = state.clock.elapsedTime;

    ndc.set(s.pointer.x, s.pointer.y);
    state.raycaster.setFromCamera(ndc, state.camera);
    const hit = state.raycaster.intersectObject(mesh.current, false)[0];
    damp(v, 'px', hit ? hit.uv.x : -5, 0.12, dt);
    damp(v, 'py', hit ? hit.uv.y : -5, 0.12, dt);
    u.uPointer.value.set(v.px, v.py);

    const speed = Math.hypot(s.pointer.x - v.lastX, s.pointer.y - v.lastY) / Math.max(dt, 1e-3);
    v.lastX = s.pointer.x;
    v.lastY = s.pointer.y;
    damp(v, 'speed', Math.min(speed * 0.5, 4), 0.2, dt);
    u.uSpeed.value = v.speed;

    damp(v, 'rx', -s.pointer.y * 0.18, 0.5, dt);
    damp(v, 'ry', s.pointer.x * 0.28, 0.5, dt);
    mesh.current.rotation.set(v.rx, v.ry, 0);

    damp(v, 'opacity', s.section === 'hero' ? 1 : 0, 0.4, dt);
    u.uOpacity.value = v.opacity;
    mesh.current.visible = v.opacity > 0.01;

    const layout = s.isMobile ? MOBILE : DESKTOP;
    damp3(mesh.current.position, layout.position, 0.6, dt);
    damp3(mesh.current.scale, [layout.scale, layout.scale, layout.scale], 0.6, dt);
  });

  return (
    <mesh ref={mesh} position={DESKTOP.position} material={material}>
      <planeGeometry args={[1.5, 1.5]} />
    </mesh>
  );
}
