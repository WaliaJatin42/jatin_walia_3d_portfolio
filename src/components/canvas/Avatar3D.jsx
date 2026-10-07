import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { audio } from '../../utils/audio';

export const Avatar3D = ({ avatarState, setAvatarState }) => {
  const groupRef = useRef(null);
  const headRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const laptopRef = useRef(null);
  const visorRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [clickedEffect, setClickedEffect] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState(
    "Hi! I'm Jatin Walia 👋 Click me or explore my 3D universe!"
  );

  const targetRotation = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Responsive position: On wider screens, shift right (X = 2.0). On narrow screens, center (X = 0).
    const width = state.size.width;
    const targetX = width > 1024 ? 2.0 : width > 768 ? 1.4 : 0;

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.06 - 0.2;
    }

    // Head tracks mouse movement
    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, state.pointer.x * 0.45, 0.08);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, state.pointer.y * 0.35, 0.08);

    if (headRef.current) {
      headRef.current.rotation.y = targetRotation.current.x;
      headRef.current.rotation.x = -targetRotation.current.y * 0.5;
    }

    // Arm animations based on pose
    if (leftArmRef.current && rightArmRef.current) {
      if (avatarState.pose === 'coding') {
        leftArmRef.current.rotation.x = -0.7 + Math.sin(t * 8) * 0.04;
        rightArmRef.current.rotation.x = -0.7 + Math.cos(t * 8) * 0.04;
      } else if (avatarState.pose === 'presenting') {
        leftArmRef.current.rotation.x = -0.4;
        leftArmRef.current.rotation.z = Math.sin(t * 3) * 0.3 + 0.3;
        rightArmRef.current.rotation.x = -0.7;
      } else {
        leftArmRef.current.rotation.x = -0.6 + Math.sin(t * 2) * 0.05;
        rightArmRef.current.rotation.x = -0.6 + Math.sin(t * 2 + 1) * 0.05;
      }
    }

    // Visor pulse
    if (visorRef.current && visorRef.current.material) {
      visorRef.current.material.emissiveIntensity = 1.2 + Math.sin(t * 4) * 0.4;
    }
  });

  const handleAvatarClick = () => {
    audio.playClick();
    setClickedEffect(true);
    setTimeout(() => setClickedEffect(false), 800);

    const colors = ['#00f0ff', '#8a2be2', '#10b981', '#ff007f'];
    const nextColor = colors[(colors.indexOf(avatarState.visorColor) + 1) % colors.length];

    setAvatarState((prev) => ({
      ...prev,
      visorColor: nextColor,
    }));

    const speechBubbles = [
      "⚡ Senior Software Engineer I @ Datacultr",
      "🚀 Built Next.js & React Apps + Payment Integrations",
      "🔥 Optimized MongoDB queries by +30%",
      "💡 AI-Native Dev with Cursor & Project IDX!",
      "📍 Based in Gurugram, Haryana",
    ];

    const randomSpeech = speechBubbles[Math.floor(Math.random() * speechBubbles.length)];
    setActiveSpeech(randomSpeech);
  };

  const visorColorHex = avatarState.visorColor || '#00f0ff';

  return (
    <group ref={groupRef} position={[2.0, -0.2, 0]}>
      {/* Interactive Speech Bubble */}
      {activeSpeech && (
        <Html position={[0, 2.3, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div className="bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md whitespace-nowrap animate-bounce flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            {activeSpeech}
          </div>
        </Html>
      )}

      {/* Main Avatar Model Group */}
      <group
        onPointerOver={() => {
          setIsHovered(true);
          audio.playHover();
        }}
        onPointerOut={() => setIsHovered(false)}
        onClick={handleAvatarClick}
      >
        {/* Head & Face Group */}
        <group ref={headRef} position={[0, 1.2, 0]}>
          {/* Head Mesh */}
          <mesh castShadow position={[0, 0, 0]}>
            <boxGeometry args={[0.65, 0.75, 0.65]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Hair Cap */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.7, 0.15, 0.7]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} />
          </mesh>

          {/* Cyber Visor */}
          <mesh ref={visorRef} position={[0, 0.1, 0.34]}>
            <boxGeometry args={[0.55, 0.22, 0.08]} />
            <meshStandardMaterial
              color={visorColorHex}
              emissive={visorColorHex}
              emissiveIntensity={1.5}
              roughness={0.1}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Matrix Code Visor Line */}
          <mesh position={[0, 0.1, 0.39]}>
            <planeGeometry args={[0.45, 0.14]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>

          {/* Headphones */}
          <group position={[0, 0.1, 0]}>
            <mesh position={[-0.38, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color={visorColorHex} emissive={visorColorHex} emissiveIntensity={0.6} />
            </mesh>
            <mesh position={[0.38, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color={visorColorHex} emissive={visorColorHex} emissiveIntensity={0.6} />
            </mesh>
            <mesh position={[0, 0.42, 0]}>
              <torusGeometry args={[0.38, 0.04, 8, 24, Math.PI]} />
              <meshStandardMaterial color="#334155" metalness={0.9} />
            </mesh>
          </group>
        </group>

        {/* Neck */}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Torso / Hoodie */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.95, 1.0, 0.55]} />
          <meshStandardMaterial color="#090d16" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Hoodie Emblem */}
        <mesh position={[0, 0.25, 0.29]}>
          <circleGeometry args={[0.12, 32]} />
          <meshStandardMaterial color={visorColorHex} emissive={visorColorHex} emissiveIntensity={1.2} />
        </mesh>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.58, 0.45, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.11, 0.09, 0.65, 16]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, -0.65, 0.1]}>
            <boxGeometry args={[0.1, 0.1, 0.15]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.58, 0.45, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.11, 0.09, 0.65, 16]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, -0.65, 0.1]}>
            <boxGeometry args={[0.1, 0.1, 0.15]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* 3D Laptop */}
        <group ref={laptopRef} position={[0, -0.3, 0.5]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.85, 0.03, 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.02, 0.05]}>
            <boxGeometry args={[0.75, 0.01, 0.35]} />
            <meshStandardMaterial color="#0284c7" emissive="#00f0ff" emissiveIntensity={0.8} />
          </mesh>
          <group position={[0, 0.01, -0.28]} rotation={[-0.35, 0, 0]}>
            <mesh position={[0, 0.32, 0]}>
              <boxGeometry args={[0.85, 0.6, 0.03]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.32, 0.02]}>
              <planeGeometry args={[0.78, 0.52]} />
              <meshBasicMaterial color="#030712" />
            </mesh>
            <mesh position={[-0.1, 0.42, 0.025]}>
              <planeGeometry args={[0.45, 0.04]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
            <mesh position={[-0.05, 0.34, 0.025]}>
              <planeGeometry args={[0.55, 0.04]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
            <mesh position={[-0.15, 0.26, 0.025]}>
              <planeGeometry args={[0.35, 0.04]} />
              <meshBasicMaterial color="#8a2be2" />
            </mesh>
            <mesh position={[-0.02, 0.18, 0.025]}>
              <planeGeometry args={[0.6, 0.04]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          </group>
        </group>

        {/* Aura Ring Base */}
        <mesh position={[0, -0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1.1, 64]} />
          <meshBasicMaterial
            color={visorColorHex}
            transparent
            opacity={isHovered || clickedEffect ? 0.8 : 0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Orbiting Floating Shapes */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[-1.4, 1.1, 0.2]}>
          <mesh>
            <octahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#61dafb" emissive="#00d8ff" emissiveIntensity={0.8} wireframe />
          </mesh>
        </group>
      </Float>

      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <group position={[1.4, 1.2, 0.2]}>
          <mesh>
            <icosahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#3178c6" emissive="#2b7489" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};
