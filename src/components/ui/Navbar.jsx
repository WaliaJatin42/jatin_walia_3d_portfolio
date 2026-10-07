import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Box, PhoneCall, Sun, Moon, Palette, Menu, X, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { audio } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../shadcn/Button';
import { Badge } from '../shadcn/Badge';
import { DropdownMenu, DropdownMenuItem } from '../shadcn/DropdownMenu';

export const Navbar = ({ soundEnabled, setSoundEnabled, avatarState, setAvatarState }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme, toggleTheme, accent, setAccentId, accentColors } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    audio.setEnabled(newState);
    if (newState) audio.playClick();
  };

  const toggleOrbit = () => {
    audio.playClick();
    setAvatarState((prev) => ({
      ...prev,
      orbitControls: !prev.orbitControls,
    }));
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 dark:bg-slate-950/85 light:bg-white/90 backdrop-blur-xl border-b border-slate-800/80 light:border-slate-200 py-3 shadow-lg'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a
          href="#"
          onClick={() => audio.playClick()}
          className="flex items-center gap-3 group shrink-0"
        >
          <div
            className="w-10 h-10 rounded-xl p-[2px] shadow-md group-hover:scale-105 transition-transform"
            style={{ background: `linear-gradient(135deg, ${accent.hex}, #a855f7)` }}
          >
            <div className="w-full h-full bg-slate-950 dark:bg-slate-950 light:bg-white rounded-[10px] flex items-center justify-center font-mono font-bold text-base" style={{ color: accent.hex }}>
              JW
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-base sm:text-lg text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight block group-hover:opacity-80 transition-opacity">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] font-mono tracking-wider block" style={{ color: accent.hex }}>
              SENIOR SOFTWARE ENGINEER I
            </span>
          </div>
        </a>

        {/* Desktop Nav Links - Fixed Height h-10 */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100/90 border border-slate-800/80 light:border-slate-300 px-3 h-10 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => audio.playHover()}
              className="text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-slate-950 px-3 py-1 rounded-full transition-all hover:bg-slate-800/50 light:hover:bg-slate-200/80"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls - All Share Unified Fixed Height h-10 */}
        <div className="hidden md:flex items-center gap-2">
          
          {/* Light / Dark Mode Switcher */}
          <Button
            variant="outline"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="h-10 w-10 p-0 rounded-full shrink-0"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-purple-600" />
            )}
          </Button>

          {/* Color Palette Accent Picker Dropdown */}
          <DropdownMenu
            trigger={
              <Button variant="outline" className="h-10 px-3.5 rounded-full gap-2 shrink-0">
                <Palette size={16} style={{ color: accent.hex }} />
                <span className="hidden lg:inline capitalize font-mono text-xs">{accent.name}</span>
                <span className="w-3.5 h-3.5 rounded-full border border-white/50 shrink-0" style={{ backgroundColor: accent.hex }} />
              </Button>
            }
          >
            <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800/60 mb-1">
              Select Theme Accent
            </div>
            {accentColors.map((color) => (
              <DropdownMenuItem
                key={color.id}
                active={accent.id === color.id}
                onClick={() => setAccentId(color.id)}
              >
                <span className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0" style={{ backgroundColor: color.hex }} />
                <span className="flex-1">{color.name}</span>
                {accent.id === color.id && <Check size={14} style={{ color: color.hex }} />}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>

          {/* SFX Sound Toggle */}
          <Button
            variant="outline"
            onClick={toggleSound}
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            className="h-10 w-10 p-0 rounded-full shrink-0"
          >
            {soundEnabled ? <Volume2 size={18} style={{ color: accent.hex }} /> : <VolumeX size={18} />}
          </Button>

          {/* Orbit Controls Toggle */}
          <Button
            variant={avatarState.orbitControls ? 'accent' : 'outline'}
            onClick={toggleOrbit}
            title={avatarState.orbitControls ? 'Lock 3D Camera' : 'Free 3D Orbit Mode'}
            className="h-10 px-3.5 rounded-full gap-1.5 shrink-0"
          >
            <Box size={16} />
            <span className="hidden lg:inline text-xs font-mono">{avatarState.orbitControls ? '3D Orbit: ON' : '3D Orbit: OFF'}</span>
          </Button>

          {/* Direct Contact CTA Button */}
          <a href="#contact" onClick={() => audio.playClick()} className="shrink-0">
            <Button variant="neon" className="h-10 px-4 rounded-full gap-2 text-xs">
              <PhoneCall size={14} />
              <span>Connect</span>
            </Button>
          </a>
        </div>

        {/* Mobile Controls & Hamburger - Unified h-10 height */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="outline" className="h-10 w-10 p-0 rounded-full" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-purple-600" />}
          </Button>

          <Button variant="outline" className="h-10 w-10 p-0 rounded-full" onClick={toggleSound}>
            {soundEnabled ? <Volume2 size={18} style={{ color: accent.hex }} /> : <VolumeX size={18} />}
          </Button>

          <Button variant="outline" className="h-10 w-10 p-0 rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 dark:bg-slate-950/95 light:bg-white/95 border-b border-slate-800 light:border-slate-200 px-6 py-6 space-y-4 backdrop-blur-2xl animate-in slide-in-from-top">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  audio.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-cyan-400 py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Color Accent Picker Mobile Grid */}
          <div className="pt-3 border-t border-slate-800/80 light:border-slate-200 space-y-2">
            <span className="text-xs font-mono text-slate-400 block">Accent Color Theme:</span>
            <div className="grid grid-cols-6 gap-2">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setAccentId(color.id)}
                  className={`h-8 rounded-xl flex items-center justify-center border transition-transform ${
                    accent.id === color.id ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-80'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 light:border-slate-200 flex items-center justify-between">
            <Button
              variant={avatarState.orbitControls ? 'accent' : 'outline'}
              className="h-10 px-4 rounded-full text-xs"
              onClick={toggleOrbit}
            >
              <Box size={16} />
              <span>3D Orbit Mode</span>
            </Button>

            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="neon" className="h-10 px-4 rounded-full text-xs">
                <PhoneCall size={14} />
                <span>Contact</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
