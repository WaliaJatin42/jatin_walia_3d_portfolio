import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { audio } from '../../utils/audio';

const SKILLS_3D = [
  { name: 'React.js', color: '#61dafb', position: [0.8, 1.6, 0.2], speed: 1.2 },
  { name: 'Next.js', color: '#ffffff', position: [2.2, 1.8, -0.4], speed: 1.4 },
  { name: 'TypeScript', color: '#3178c6', position: [2.3, -0.2, 0.5], speed: 0.9 },
  { name: 'Node.js', color: '#339933', position: [1.2, -1.4, 0.4], speed: 1.1 },
  { name: 'MongoDB', color: '#47a248', position: [2.4, -1.5, -0.6], speed: 1.5 },
  { name: 'Stripe & Razorpay', color: '#635bfc', position: [0.5, -2.0, -0.2], speed: 1.3 },
  { name: 'Tailwind CSS', color: '#06b6d4', position: [1.5, 2.2, -0.8], speed: 1.0 },
];

const SingleSkillOrb = ({ name, color, position, speed }) => {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * speed) * 0.4;
      meshRef.current.rotation.y = t * speed * 0.5;
    }
  });

  const handleClick = () => {
    audio.playClick();
    setActive(!active);
  };

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={1.1} position={position}>
      <group>
        <mesh
          ref={meshRef}
          onPointerOver={() => {
            setHovered(true);
            audio.playHover();
          }}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick}
          scale={hovered ? 1.2 : active ? 1.3 : 1}
        >
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered || active ? 1.5 : 0.6}
            roughness={0.2}
            metalness={0.8}
            wireframe={!hovered && !active}
          />
        </mesh>

        {/* Outer Ring */}
        <mesh scale={hovered ? 1.3 : 1.1}>
          <ringGeometry args={[0.22, 0.25, 24]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.35} side={THREE.DoubleSide} />
        </mesh>

        {/* Skill Label Tag */}
        <Html distanceFactor={8} position={[0, 0.32, 0]} center zIndexRange={[50, 0]}>
          <div
            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold tracking-wide backdrop-blur-md transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md ${
              hovered || active
                ? 'bg-slate-900/95 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)] scale-110'
                : 'bg-slate-950/80 text-slate-200 border border-slate-700/80 dark:bg-slate-950/80 dark:text-slate-200 light:bg-white/90 light:text-slate-900 light:border-slate-300'
            }`}
          >
            {name}
          </div>
        </Html>
      </group>
    </Float>
  );
};

export const FloatingSkills3D = () => {
  const groupRef = useRef(null);

  useFrame((state) => {
    const width = state.size.width;
    const targetX = width > 1024 ? 1.8 : width > 768 ? 1.2 : 0;
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[1.8, 0, 0]}>
      {SKILLS_3D.map((skill, index) => (
        <SingleSkillOrb key={index} {...skill} />
      ))}
    </group>
  );
};
