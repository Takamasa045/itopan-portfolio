import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, useContextBridge } from '@react-three/drei';
import { Experience } from './components/Experience';
import { LanguageToggle } from './components/LanguageToggle';
import { DetailViewContext, DetailViewProvider, useDetailView } from './contexts/DetailViewContext';
import { LanguageContext, LanguageProvider } from './contexts/LanguageContext';

// Inner component that uses the context
const AppContent: React.FC = () => {
  const { isDetailOpen } = useDetailView();
  const ContextBridge = useContextBridge(DetailViewContext, LanguageContext);

  return (
    <>
      <div
        className="w-full h-screen bg-[#020403]"
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 35 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          frameloop={isDetailOpen ? 'demand' : 'always'}
        >
          <ContextBridge>
            <color attach="background" args={['#020403']} />
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </ContextBridge>
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
      <div className="fixed top-6 right-24 z-40 pointer-events-none mix-blend-difference text-white/40 text-xs tracking-widest">
        PORTFOLIO
      </div>
      <div className="fixed top-6 right-6 z-50 pointer-events-auto">
        <LanguageToggle />
      </div>
    </>
  );
};

// Augment the global JSX namespace to include Three.js elements
// We explicitly define the used elements to ensure compatibility
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      boxGeometry: any;
      color: any;
      coneGeometry: any;
      directionalLight: any;
      fog: any;
      group: any;
      icosahedronGeometry: any;
      mesh: any;
      meshBasicMaterial: any;
      meshStandardMaterial: any;
      torusGeometry: any;
    }
  }
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <DetailViewProvider>
        <AppContent />
      </DetailViewProvider>
    </LanguageProvider>
  );
};

export default App;
