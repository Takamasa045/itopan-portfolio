import React, { useRef, useLayoutEffect } from 'react';
import { useScroll, Float, MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export const MountainWorld: React.FC = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  
  // Refs for specific 3D objects to animate
  const mountainRef1 = useRef<THREE.Mesh>(null);
  const mountainRef2 = useRef<THREE.Mesh>(null);
  const textPortalRef = useRef<THREE.Group>(null);
  const imagesGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Adjusted ranges for 7 pages
    // Page 1: 0 - 0.14
    // Page 2: 0.14 - 0.28 (Philosophy / Monolith)
    // Page 3: 0.28 - 0.42 (Works / Gallery)
    
    const r1 = scroll.range(0, 0.2);
    
    // Camera slight sway
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, -state.pointer.x * 0.5, 1, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, state.pointer.y * 0.5, 1, delta);

    // Move mountains based on scroll to create parallax
    if (mountainRef1.current) {
      mountainRef1.current.position.z = -2 + scroll.offset * 5;
      mountainRef1.current.rotation.z = scroll.offset * 0.2;
    }
    
    if (mountainRef2.current) {
      mountainRef2.current.position.z = -5 + scroll.offset * 10;
    }

    // Rotate the project gallery
    if (imagesGroupRef.current) {
      // Rotates the group based on scroll progress in the works section (approx 0.3)
      const workScroll = scroll.range(0.25, 0.2); 
      imagesGroupRef.current.rotation.y = THREE.MathUtils.lerp(0, -Math.PI / 2, workScroll);
      imagesGroupRef.current.position.x = THREE.MathUtils.lerp(10, 0, workScroll);
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

      {/* Projects "Gallery" - Cubes that float by */}
      <group ref={imagesGroupRef} position={[10, 0, -5]}>
         {[0, 1, 2].map((i) => (
            <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, i * 2.5 - 2.5, 0]}>
               <mesh castShadow receiveShadow rotation={[0, 0.5, 0]}>
                  <boxGeometry args={[3, 2, 0.2]} />
                  <meshStandardMaterial color="#292524" roughness={0.2} metalness={0.5} />
               </mesh>
            </Float>
         ))}
      </group>

    </group>
  );
};