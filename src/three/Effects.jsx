import React from 'react';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';

// High tier only: a touch of bloom, film grain, and a vignette.
export default function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.35} luminanceThreshold={0.8} luminanceSmoothing={0.2} mipmapBlur />
      <Noise opacity={0.04} />
      <Vignette eskil={false} offset={0.2} darkness={0.35} />
    </EffectComposer>
  );
}
