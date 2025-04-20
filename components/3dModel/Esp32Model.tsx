"use client";

import { Model } from "@/public/esp32_wroom_32_-_low_poly_photorealistic/Scene";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Esp32Model() {
  return (
    <Canvas camera={{ position: [0, 0, 0.4], fov: 25 }}>
      <ambientLight intensity={1.25} />
      <directionalLight intensity={0.6} />
      <Model scale={2} rotation={[-Math.PI / 3, 4.2, 0]} />
      <Environment preset="sunset" />
      <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
    </Canvas>
  );
}
