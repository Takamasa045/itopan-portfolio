import React, { useRef, useLayoutEffect } from 'react';
import { useScroll, Float, MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

type RelicType = 'torii' | 'watatsumi' | 'shimenawa';

type RelicConfig = {
  type: RelicType;
  float: {
    speed: number;
    rotationIntensity: number;
    floatIntensity: number;
  };
};

const relicConfigs: RelicConfig[] = [
  { type: 'torii', float: { speed: 1.7, rotationIntensity: 0.35, floatIntensity: 0.4 } },
  { type: 'watatsumi', float: { speed: 2.2, rotationIntensity: 0.5, floatIntensity: 0.55 } },
  { type: 'shimenawa', float: { speed: 1.5, rotationIntensity: 0.28, floatIntensity: 0.35 } },
];

const ToriiRelic: React.FC = () => (
  <group>
    <mesh position={[-1.1, -0.15, 0]}>
      <boxGeometry args={[0.35, 2.3, 0.35]} />
      <meshStandardMaterial color="#a81e1e" roughness={0.5} metalness={0.2} emissive="#3a0a0a" emissiveIntensity={0.3} />
    </mesh>
    <mesh position={[1.1, -0.15, 0]}>
      <boxGeometry args={[0.35, 2.3, 0.35]} />
      <meshStandardMaterial color="#a81e1e" roughness={0.5} metalness={0.2} emissive="#3a0a0a" emissiveIntensity={0.3} />
    </mesh>
    <mesh position={[0, 1.05, 0]}>
      <boxGeometry args={[3.2, 0.22, 0.5]} />
      <meshStandardMaterial color="#b8332a" roughness={0.4} metalness={0.2} emissive="#4a0f0f" emissiveIntensity={0.35} />
    </mesh>
    <mesh position={[0, 0.55, 0]}>
      <boxGeometry args={[2.7, 0.18, 0.4]} />
      <meshStandardMaterial color="#8f1f1f" roughness={0.6} metalness={0.1} emissive="#2f0a0a" emissiveIntensity={0.2} />
    </mesh>
    <mesh position={[0, 0.65, 0.28]}>
      <boxGeometry args={[0.45, 0.3, 0.12]} />
      <meshStandardMaterial color="#e7c86d" roughness={0.3} metalness={0.7} emissive="#5c4a1b" emissiveIntensity={0.4} />
    </mesh>
    <mesh position={[0, -1.25, 0]}>
      <boxGeometry args={[2.4, 0.12, 0.6]} />
      <meshStandardMaterial color="#531313" roughness={0.8} metalness={0.05} />
    </mesh>
  </group>
);

const WatatsumiRelic: React.FC = () => (
  <group>
    <mesh position={[0, 0.1, 0]}>
      <icosahedronGeometry args={[0.6, 0]} />
      <MeshDistortMaterial
        color="#7dd3fc"
        roughness={0.2}
        metalness={0.4}
        clearcoat={1}
        clearcoatRoughness={0.15}
        distort={0.25}
        speed={1.6}
      />
    </mesh>
    <mesh rotation={[0, Math.PI / 2, 0]} position={[0, -0.1, 0]}>
      <torusGeometry args={[1.15, 0.08, 16, 100, Math.PI * 1.2]} />
      <meshStandardMaterial color="#178a84" roughness={0.5} metalness={0.2} emissive="#0b3b39" emissiveIntensity={0.4} />
    </mesh>
    <mesh rotation={[0, -Math.PI / 4, 0]} position={[0, -0.25, 0]}>
      <torusGeometry args={[0.9, 0.06, 16, 100, Math.PI * 1.1]} />
      <meshStandardMaterial color="#1f766b" roughness={0.55} metalness={0.25} emissive="#0d2f2c" emissiveIntensity={0.35} />
    </mesh>
    <mesh position={[0, -0.95, 0]}>
      <coneGeometry args={[0.22, 0.4, 12]} />
      <meshStandardMaterial color="#0f3d3a" roughness={0.7} metalness={0.2} />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
      <torusGeometry args={[0.5, 0.02, 12, 60]} />
      <meshBasicMaterial color="#5eead4" transparent opacity={0.6} />
    </mesh>
  </group>
);

const ShimenawaRelic: React.FC = () => (
  <group>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.9, 0.12, 12, 60]} />
      <meshStandardMaterial color="#c7a47e" roughness={0.85} metalness={0.1} emissive="#3b2a1a" emissiveIntensity={0.2} />
    </mesh>
    <mesh position={[0, -0.85, 0]}>
      <cylinderGeometry args={[0.12, 0.18, 0.7, 10]} />
      <meshStandardMaterial color="#b8916a" roughness={0.9} metalness={0.1} />
    </mesh>
    <mesh position={[0, -1.25, 0]}>
      <sphereGeometry args={[0.14, 12, 12]} />
      <meshStandardMaterial color="#9b7b58" roughness={0.7} metalness={0.2} />
    </mesh>
    <mesh position={[-0.45, -0.95, 0.18]} rotation={[0, 0, 0.18]}>
      <boxGeometry args={[0.08, 0.6, 0.02]} />
      <meshStandardMaterial color="#f5f5f4" roughness={0.9} metalness={0} />
    </mesh>
    <mesh position={[0.45, -0.95, 0.18]} rotation={[0, 0, -0.18]}>
      <boxGeometry args={[0.08, 0.6, 0.02]} />
      <meshStandardMaterial color="#f5f5f4" roughness={0.9} metalness={0} />
    </mesh>
    <mesh position={[0, -1.0, 0.22]}>
      <boxGeometry args={[0.08, 0.5, 0.02]} />
      <meshStandardMaterial color="#f5f5f4" roughness={0.9} metalness={0} />
    </mesh>
  </group>
);

const Relic: React.FC<{ type: RelicType }> = ({ type }) => {
  if (type === 'torii') {
    return <ToriiRelic />;
  }
  if (type === 'watatsumi') {
    return <WatatsumiRelic />;
  }
  return <ShimenawaRelic />;
};

export const MountainWorld: React.FC = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  
  // Refs for specific 3D objects to animate
  const mountainRef1 = useRef<THREE.Mesh>(null);
  const mountainRef2 = useRef<THREE.Mesh>(null);
  const textPortalRef = useRef<THREE.Group>(null);
  const relicsGroupRef = useRef<THREE.Group>(null);
  const relicRefs = useRef<Array<THREE.Group | null>>([]);

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

    // Rotate the relic gallery
    if (relicsGroupRef.current) {
      // Rotates the group based on scroll progress in the works section (approx 0.3)
      const workScroll = scroll.range(0.25, 0.2); 
      relicsGroupRef.current.rotation.y = THREE.MathUtils.lerp(0, -Math.PI / 2, workScroll);
      relicsGroupRef.current.position.x = THREE.MathUtils.lerp(10, 0, workScroll);
    }

    const time = state.clock.getElapsedTime();
    relicRefs.current.forEach((relic, index) => {
      if (!relic) return;
      const sway = Math.sin(time * 0.6 + index) * 0.08;
      relic.rotation.z = sway;
      relic.rotation.y = Math.sin(time * 0.35 + index) * 0.5;
      const pulse = 1 + Math.sin(time * 0.7 + index) * 0.04;
      relic.scale.setScalar(pulse);
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

      {/* Mythic Relics - Torii / Watatsumi / Shimenawa */}
      <group ref={relicsGroupRef} position={[10, 0, -5]}>
        {relicConfigs.map((relic, index) => (
          <Float
            key={relic.type}
            speed={relic.float.speed}
            rotationIntensity={relic.float.rotationIntensity}
            floatIntensity={relic.float.floatIntensity}
            position={[0, index * 2.5 - 2.5, 0]}
          >
            <group
              ref={(node) => {
                relicRefs.current[index] = node;
              }}
            >
              <Relic type={relic.type} />
            </group>
          </Float>
        ))}
      </group>

    </group>
  );
};
