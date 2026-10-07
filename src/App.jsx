import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioCanvas } from './components/canvas/PortfolioCanvas';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/ui/HeroSection';
import { AboutSection } from './components/ui/AboutSection';
import { SkillsSection } from './components/ui/SkillsSection';
import { ExperienceSection } from './components/ui/ExperienceSection';
import { ProjectsSection } from './components/ui/ProjectsSection';
import { EducationSection } from './components/ui/EducationSection';
import { ContactSection } from './components/ui/ContactSection';
import { AvatarControlPanel } from './components/ui/AvatarControlPanel';
import { Footer } from './components/ui/Footer';

export function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [avatarState, setAvatarState] = useState({
    pose: 'coding',
    visorColor: '#00f0ff',
    showHologram: true,
    lightingPreset: 'neon',
    orbitControls: false,
  });

  return (
    <ThemeProvider setAvatarState={setAvatarState}>
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden transition-colors duration-300">
        
        {/* Fixed 3D Canvas Background Layer */}
        <div className="fixed inset-0 z-0 pointer-events-auto">
          <PortfolioCanvas avatarState={avatarState} setAvatarState={setAvatarState} />
        </div>

        {/* Top Header Navbar */}
        <Navbar
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          avatarState={avatarState}
          setAvatarState={setAvatarState}
        />

        {/* Main Page Scrollable Overlay Content */}
        <main className="relative z-10">
          <HeroSection setAvatarState={setAvatarState} />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>

        {/* Floating 3D Avatar Control Widget */}
        <AvatarControlPanel avatarState={avatarState} setAvatarState={setAvatarState} />

        {/* Bottom Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
