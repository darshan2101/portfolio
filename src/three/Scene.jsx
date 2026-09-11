import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import { getTier, setTier, TIER_SETTINGS } from '../lib/quality';
import { sceneState } from '../lib/sceneState';
import Studio from './Studio';
import Dust from './Dust';
import Effects from './Effects';

// Reports asset progress to the Preloader without importing drei into the main chunk.
function ProgressBridge() {
  const { progress } = useProgress();
  useEffect(() => {
    sceneState.progress = progress;
  }, [progress]);
  return null;
}

// Mounts only once every suspended asset in the Scene has resolved.
function Ready() {
  useEffect(() => {
    sceneState.ready = true;
    return () => {
      sceneState.ready = false;
    };
  }, []);
  return null;
}

export default function Scene({ tier: tierProp, onContextLost }) {
  const tier = tierProp || getTier();
  const settings = TIER_SETTINGS[tier];
  if (!settings) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none animate-fade-in" aria-hidden="true">
      <Canvas
        dpr={settings.dpr}
        camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false, depth: true }}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            'webglcontextlost',
            (e) => {
              e.preventDefault();
              setTier('off');
              if (onContextLost) onContextLost();
            },
            { once: true }
          );
        }}
        style={{ background: 'transparent' }}
      >
        <ProgressBridge />
        <Suspense fallback={null}>
          <Studio />
          <Dust count={settings.dust} />
          {settings.effects && <Effects />}
          <Ready />
        </Suspense>
      </Canvas>
    </div>
  );
}
