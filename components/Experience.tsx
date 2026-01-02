import React, { useRef } from 'react';
import { ScrollControls, Scroll, Environment, Stars, Sparkles, Cloud } from '@react-three/drei';
import { Overlay } from './Overlay';
import { MountainWorld } from './MountainWorld';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DetailViewContext, useDetailView } from '../contexts/DetailViewContext';
import { LanguageContext, useLanguage } from '../contexts/LanguageContext';

export const Experience: React.FC = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const [detailPages, setDetailPages] = React.useState(0);
  const [contentPages, setContentPages] = React.useState(0);
  const detailViewContextValue = useDetailView();
  const languageContextValue = useLanguage();

  useFrame(({ clock }) => {
    if (lightRef.current) {
      // Subtle moving light to simulate passing time/clouds
      lightRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 10;
      lightRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.2) * 10;
    }
  });

  // Dynamic page count based on screen width
  const [pages, setPages] = React.useState(6);

  React.useEffect(() => {
    const updatePages = () => {
      const isMobile = window.innerWidth < 768;
      const basePages = contentPages > 0 ? contentPages : (isMobile ? 12 : 6);

      // Mobile needs more scroll space due to stacked layout
      if (detailPages > 0) {
        setPages(Math.max(1, detailPages));
      } else {
        setPages(Math.max(1, basePages));
      }
    };

    updatePages();
    window.addEventListener('resize', updatePages);
    return () => window.removeEventListener('resize', updatePages);
  }, [detailPages, contentPages]);

  return (
    <>
      {/* Ambient light slightly greenish/blue for nature feel */}
      <ambientLight intensity={0.2} color="#cce3de" />
      <directionalLight
        ref={lightRef}
        position={[5, 10, 5]}
        intensity={1.5}
        color="#ecfccb" // Sunlight hint
        castShadow
        shadow-bias={-0.0001}
      />
      {/* Deep forest fog */}
      <fog attach="fog" args={['#020403', 5, 20]} />

      {/* Pages for content sections */}
      <ScrollControls pages={pages} damping={0.3}>
        {/* 3D Content Layer - Moves with Scroll */}
        <MountainWorld />

        {/* Atmospheric Particles - Green/Gold spirits */}
        <Sparkles
          count={80}
          scale={12}
          size={2}
          speed={0.4}
          opacity={0.4}
          color="#6ee7b7"
        />

        <group position={[0, 5, -10]}>
          <Cloud opacity={0.2} speed={0.1} segments={20} color="#d1fae5" />
        </group>

        {/* HTML Content Layer - Syncs with Scroll */}
        <Scroll html style={{ width: '100%', height: '100%' }}>
          <DetailViewContext.Provider value={detailViewContextValue}>
            <LanguageContext.Provider value={languageContextValue}>
              <Overlay onDetailPagesChange={setDetailPages} onPagesChange={setContentPages} />
            </LanguageContext.Provider>
          </DetailViewContext.Provider>
        </Scroll>
      </ScrollControls>

      <Environment preset="park" environmentIntensity={0.3} />
    </>
  );
};
