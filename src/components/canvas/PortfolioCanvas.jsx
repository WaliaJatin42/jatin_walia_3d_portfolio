import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Avatar3D } from './Avatar3D';
import { ParticleBackground3D } from './ParticleBackground3D';
import { useTheme } from '../../context/ThemeContext';

export const PortfolioCanvas = ({ avatarState, setAvatarState }) => {
  const { theme, accent } = useTheme();

  const isLight = theme === 'light';
  const activeColor = avatarState?.visorColor || accent?.hex || '#00f0ff';

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={isLight ? 1.2 : 0.6} />
        <directionalLight position={[5, 8, 5]} intensity={isLight ? 1.8 : 1.2} castShadow />
        <pointLight position={[-5, 3, -2]} intensity={1.5} color={activeColor} />
        <spotLight position={[0, 6, 4]} angle={0.6} penumbra={0.8} intensity={isLight ? 2.2 : 1.8} color="#ffffff" />

        <Suspense fallback={null}>
          {/* 3D Interactive Avatar */}
          <Avatar3D avatarState={avatarState} setAvatarState={setAvatarState} />

          {/* 3D Constellation Stars Background */}
          <ParticleBackground3D count={isLight ? 150 : 300} />

          {/* Futuristic Cyber Floor Grid */}
          <Grid
            position={[0, -1.8, 0]}
            args={[20, 20]}
            cellSize={0.6}
            cellThickness={1}
            cellColor={isLight ? '#cbd5e1' : '#1e293b'}
            sectionSize={2.4}
            sectionThickness={1.5}
            sectionColor={activeColor}
            fadeDistance={12}
            fadeStrength={1.5}
          />
        </Suspense>

        {/* Orbit Controls if enabled */}
        {avatarState?.orbitControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.1}
            minPolarAngle={Math.PI / 3}
          />
        )}
      </Canvas>

      {/* Control Hint Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden md:block">
        <div className="bg-slate-950/70 border border-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-2 dark:bg-slate-950/70 dark:border-slate-800 dark:text-slate-400 light:bg-white/80 light:border-slate-200 light:text-slate-600 shadow-md">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeColor }}></span>
          <span>Move mouse to tilt avatar • Click avatar to change visor glow</span>
        </div>
      </div>
    </div>
  );
};
