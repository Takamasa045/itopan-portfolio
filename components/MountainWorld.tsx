import React, { useRef, useLayoutEffect } from 'react';
import { useScroll, Float, MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const seaPalette = {
  surface: '#0f1815',
  mid: '#0c1512',
  deep: '#080f0d',
  band: '#131d19',
};

const fogSurfaceColor = new THREE.Color('#020403');
const fogDeepColor = new THREE.Color('#071412');

export const MountainWorld: React.FC = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  
  // Refs for specific 3D objects to animate
  const mountainRef1 = useRef<THREE.Mesh>(null);
  const mountainRef2 = useRef<THREE.Mesh>(null);
  const textPortalRef = useRef<THREE.Group>(null);
  const seaGroupRef = useRef<THREE.Group>(null);
  const seaSurfaceRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Adjusted ranges for 7 pages
    // Page 1: 0 - 0.14
    // Page 2: 0.14 - 0.28 (Philosophy / Monolith)
    // Page 3: 0.28 - 0.42 (Works / Gallery)

    const dive = scroll.range(0.2, 0.4);
    const diveEase = THREE.MathUtils.smoothstep(dive, 0, 1);

    // Camera sway + dive descent
    const targetX = -state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.5 - diveEase * 3.2;
    const targetZ = 5 - diveEase * 1.2;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 1, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 1, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 1, delta);

    // Move mountains based on scroll to create parallax
    if (mountainRef1.current) {
      mountainRef1.current.position.z = -2 + scroll.offset * 5;
      mountainRef1.current.rotation.z = scroll.offset * 0.2;
    }
    
    if (mountainRef2.current) {
      mountainRef2.current.position.z = -5 + scroll.offset * 10;
    }

    if (seaGroupRef.current) {
      seaGroupRef.current.position.y = THREE.MathUtils.lerp(2.2, -2.4, diveEase);
      seaGroupRef.current.position.z = THREE.MathUtils.lerp(-4, -9, diveEase);
      seaGroupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.03;
    }

    if (seaSurfaceRef.current) {
      seaSurfaceRef.current.position.y = 1.2 + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.06;
    }

    if (state.scene.fog) {
      state.scene.fog.near = THREE.MathUtils.lerp(5, 2.2, diveEase);
      state.scene.fog.far = THREE.MathUtils.lerp(20, 9, diveEase);
      state.scene.fog.color.lerpColors(fogSurfaceColor, fogDeepColor, diveEase);
    }

    const background = state.scene.background;
    if (background && background instanceof THREE.Color) {
      background.lerpColors(fogSurfaceColor, fogDeepColor, diveEase);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Foreground Mountain (Left) */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={mountainRef1} position={[-2, -1.5, -2]} rotation={[0, 0.5, 0.2]} receiveShadow>
          <coneGeometry args={[2.5, 4, 4]} />
          <meshStandardMaterial 
            color="#18211d" // Deep moss green/slate
            roughness={0.9} 
            flatShading
          />
        </mesh>
      </Float>

      {/* Background Mountain (Right) */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={mountainRef2} position={[2.5, -2, -5]} rotation={[0, -0.5, -0.1]} receiveShadow>
          <coneGeometry args={[4, 6, 5]} />
          <meshStandardMaterial 
            color="#111614" // Darker atmospheric green
            roughness={1.0} 
            flatShading 
          />
        </mesh>
      </Float>

      {/* Abstract "Portal" or "Monolith" representing GenAI/Tech - Appears in Section 2 (Philosophy) */}
      <group ref={textPortalRef} position={[0, 0, -15]}>
         {/* Curve peaks around 0.2 (Page 2ish) */}
         <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={[0, 1, 0]} scale={scroll.curve(0.14, 0.14) * 1.5}>
              <icosahedronGeometry args={[1, 0]} />
              <MeshDistortMaterial 
                color="#d1fae5" 
                envMapIntensity={1} 
                clearcoat={1} 
                clearcoatRoughness={0} 
                metalness={0.2}
                distort={0.4}
                speed={2}
              />
            </mesh>
         </Float>
         {/* A glowing ring */}
         <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1, 0]} scale={scroll.curve(0.14, 0.14) * 3}>
            <torusGeometry args={[1, 0.02, 16, 100]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.4} />
         </mesh>
      </group>

      {/* Sea layers - shift down as we scroll to simulate diving */}
      <group ref={seaGroupRef} position={[0, 2.2, -4]}>
        <mesh ref={seaSurfaceRef} position={[0, 1.2, 0]}>
          <boxGeometry args={[30, 0.08, 30]} />
          <meshStandardMaterial color={seaPalette.surface} roughness={0.98} metalness={0} transparent opacity={0.4} flatShading />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[30, 0.06, 30]} />
          <meshStandardMaterial color={seaPalette.mid} roughness={0.98} metalness={0} transparent opacity={0.3} flatShading />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <boxGeometry args={[30, 0.04, 30]} />
          <meshStandardMaterial color={seaPalette.deep} roughness={0.98} metalness={0} transparent opacity={0.25} flatShading />
        </mesh>
        <mesh position={[0, -1.4, 0]}>
          <boxGeometry args={[30, 0.02, 30]} />
          <meshStandardMaterial color={seaPalette.band} roughness={0.98} metalness={0} transparent opacity={0.18} flatShading />
        </mesh>
      </group>

    </group>
  );
};
