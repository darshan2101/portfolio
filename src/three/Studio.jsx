import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

// Procedural lighting: no HDR download, nothing depends on a CDN.
export default function Studio() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#dfe8ff" />
      <directionalLight position={[-5, -2, -4]} intensity={0.6} color="#c9a3ff" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#8fe3ff" position={[3, 3, -2]} scale={[4, 2, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2} color="#ffd9a3" position={[-4, 1, 2]} scale={[3, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={1.5} color="#ffffff" position={[0, 5, 0]} scale={6} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.6} color="#c9a3ff" position={[0, -4, -3]} scale={[8, 2, 1]} target={[0, 0, 0]} />
      </Environment>
    </>
  );
}
