import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Sparse drifting points behind the Monolith so the glass has something to refract.
export default function Dust({ count = 400 }) {
  const ref = useRef(null);
  const { positions, seeds } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 14;
      p[i * 3 + 1] = (Math.random() - 0.5) * 9;
      p[i * 3 + 2] = -1 - Math.random() * 6;
      s[i] = Math.random() * Math.PI * 2;
    }
    return { positions: p, seeds: s };
  }, [count]);

  useFrame((state) => {
    if (document.hidden || !ref.current) return;
    const t = state.clock.elapsedTime;
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.3 + seeds[i]) * 0.0008;
      arr[i * 3] += Math.cos(t * 0.2 + seeds[i]) * 0.0006;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} sizeAttenuation color="#cfe8ff" transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
