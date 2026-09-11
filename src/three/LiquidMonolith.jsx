import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { damp, damp3 } from 'maath/easing';
import * as THREE from 'three';
import { sceneState, getTarget, velocityBoost, TINTS } from '../lib/sceneState';
import { simplexNoise3D } from './noise';

const white = new THREE.Color('#ffffff');
const tintColor = new THREE.Color();
const targetColor = new THREE.Color();

// The hero object: a transmission-material blob displaced by simplex noise in the
// vertex shader, leaning toward the pointer, bulging where the pointer is, and
// drifting to a per-section target as the page scrolls.
export default function LiquidMonolith({ settings }) {
  const group = useRef(null);
  const mesh = useRef(null);
  const mat = useRef(null);
  const { camera, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: 0.18 },
      uPointer: { value: new THREE.Vector3(0, 0, 0) },
      uSpeed: { value: 1 },
    }),
    []
  );
  const smooth = useRef({ lx: 0, ly: 0, boost: 0, hover: 0, distortion: 0.18 });
  const pointerWorld = useMemo(() => new THREE.Vector3(), []);

  // Wrap drei's onBeforeCompile so its transmission code still runs, then add the
  // liquid displacement and a finite-difference normal so refraction stays correct.
  useEffect(() => {
    const m = mat.current;
    if (!m || m.userData.liquidPatched) return;
    m.userData.liquidPatched = true;
    const previous = m.onBeforeCompile;
    m.onBeforeCompile = (shader, renderer) => {
      if (previous) previous.call(m, shader, renderer);
      Object.assign(shader.uniforms, uniforms);
      // StrictMode and hot reload can call this twice; never inject twice.
      if (shader.vertexShader.includes('float liquid(')) return;
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
uniform float uTime;
uniform float uDistortion;
uniform vec3 uPointer;
uniform float uSpeed;
${simplexNoise3D}
float liquid(vec3 p) {
  float n = snoise(p * 1.1 + uTime * 0.22 * uSpeed) * 0.75 + snoise(p * 2.4 - uTime * 0.15 * uSpeed) * 0.25;
  float bulge = 0.25 * smoothstep(1.2, 0.0, distance(p, uPointer));
  return n * uDistortion + bulge;
}`
        )
        .replace(
          '#include <beginnormal_vertex>',
          `#include <beginnormal_vertex>
  vec3 lmN = normalize(normal);
  vec3 lmT = normalize(cross(lmN, abs(lmN.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
  vec3 lmB = cross(lmN, lmT);
  float lmE = 0.02;
  vec3 lmP0 = position + lmN * liquid(position);
  vec3 lmP1 = position + lmT * lmE;
  lmP1 += lmN * liquid(lmP1);
  vec3 lmP2 = position + lmB * lmE;
  lmP2 += lmN * liquid(lmP2);
  objectNormal = normalize(cross(lmP1 - lmP0, lmP2 - lmP0));`
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
  transformed = lmP0;`
        );
    };
    m.customProgramCacheKey = () => 'liquid-monolith';
    m.needsUpdate = true;
  }, [uniforms]);

  useFrame((state, delta) => {
    if (document.hidden || !group.current || !mesh.current) return;
    const dt = Math.min(delta, 1 / 30);
    const t = state.clock.elapsedTime;
    const s = sceneState;
    const sm = smooth.current;
    const target = getTarget(s.section, s.isMobile);

    damp3(group.current.position, target.position, 0.6, dt);
    damp3(group.current.scale, [target.scale, target.scale, target.scale], 0.6, dt);

    damp(sm, 'ly', s.pointer.x * 0.35, 0.4, dt);
    damp(sm, 'lx', -s.pointer.y * 0.25, 0.4, dt);
    group.current.rotation.set(sm.lx, t * 0.08 + sm.ly, 0);

    damp(sm, 'boost', velocityBoost(s.velocity), 0.15, dt);
    damp(sm, 'hover', s.hover ? 1 : 0, 0.3, dt);
    damp(sm, 'distortion', target.distortion + sm.hover * 0.15 + sm.boost, 0.35, dt);
    uniforms.uDistortion.value = sm.distortion;
    uniforms.uSpeed.value = 1 + sm.hover * 0.8;
    uniforms.uTime.value = t;

    const v = viewport.getCurrentViewport(camera, [0, 0, group.current.position.z]);
    pointerWorld.set((s.pointer.x * v.width) / 2, (s.pointer.y * v.height) / 2, group.current.position.z);
    uniforms.uPointer.value.copy(pointerWorld);
    mesh.current.worldToLocal(uniforms.uPointer.value);

    const m = mat.current;
    if (m) {
      tintColor.set(TINTS[target.tint || 'none']);
      targetColor.copy(white).lerp(tintColor, target.tint === 'award' ? 0.15 : target.tint ? 0.1 : 0);
      m.color.lerp(targetColor, 1 - Math.exp(-3 * dt));
    }
  });

  return (
    <group ref={group} position={[1.6, 0.1, 0]}>
      <mesh ref={mesh} frustumCulled={false}>
        <icosahedronGeometry args={[1, settings.detail]} />
        <MeshTransmissionMaterial
          ref={mat}
          transmission={1}
          thickness={1.4}
          roughness={0.08}
          ior={1.42}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.12}
          samples={settings.samples}
          resolution={settings.resolution}
          backside={settings.backside}
          backsideThickness={0.6}
          color="#ffffff"
          attenuationColor="#bfe9ff"
          attenuationDistance={2.5}
        />
      </mesh>
    </group>
  );
}
