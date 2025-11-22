import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Experience } from './components/Experience';

// Augment the global JSX namespace to include Three.js elements
// We use 'any' to ensure compatibility and avoid strict type resolution issues
declare global {
  namespace JSX {
    interface IntrinsicElements {
      color: any;
      ambientLight: any;
      directionalLight: any;
      fog: any;
      group: any;
      mesh: any;
      coneGeometry: any;
      meshStandardMaterial: any;
      icosahedronGeometry: any;
      torusGeometry: any;
      meshBasicMaterial: any;
      boxGeometry: any;
    }
  }
}

const App: React.FC = () => {
  return (
    <>
      <div className="w-full h-screen bg-[#020403]">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 35 }}
          dpr={[1, 2]} // Optimization for pixel ratio
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={['#020403']} />
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
        <Loader 
          containerStyles={{ background: '#020403' }}
          innerStyles={{ width: '200px', height: '2px', background: '#1c2621' }}
          barStyles={{ background: '#34d399', height: '2px' }}
          dataStyles={{ fontFamily: 'Zen Old Mincho', fontSize: '12px', color: '#666' }}
        />
      </div>
      
      {/* Static Logo/Nav overlay if needed outside canvas */}
      <div className="fixed top-6 left-6 z-40 pointer-events-none mix-blend-difference text-white/40 text-xs tracking-widest">
        ITOPAN / イトパン
      </div>
      <div className="fixed top-6 right-6 z-40 pointer-events-none mix-blend-difference text-white/40 text-xs tracking-widest">
        PORTFOLIO 2024
      </div>
    </>
  );
};

export default App;