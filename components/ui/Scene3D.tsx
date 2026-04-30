"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function InteractiveParticles() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state: any) => {
    if (groupRef.current) {
      // Rotate the group slowly
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Slight parallax based on mouse
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (state.pointer.y * Math.PI) / 10,
        0.05
      );
      groupRef.current.rotation.y += THREE.MathUtils.lerp(
        0,
        (state.pointer.x * Math.PI) / 10,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, -10]}>
          <icosahedronGeometry args={[3, 1]} />
          <meshStandardMaterial color="#b026ff" wireframe opacity={0.3} transparent />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[5, 2, -15]}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial color="#00f3ff" wireframe opacity={0.2} transparent />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <InteractiveParticles />
      </Canvas>
    </div>
  );
}
