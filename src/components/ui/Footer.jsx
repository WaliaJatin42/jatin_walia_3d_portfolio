import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { audio } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../shadcn/Button';
import { Badge } from '../shadcn/Badge';

export const Footer = () => {
  const { accent } = useTheme();

  const scrollToTop = () => {
    audio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative z-20 border-t border-slate-800/80 light:border-slate-200 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 text-lg">{PERSONAL_INFO.name}</span>
            <Badge variant="cyan">3D Portfolio</Badge>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 font-mono">
            Crafted with React, Three.js & Tailwind CSS • Gurugram, Haryana
          </p>
        </div>

        {/* Center Status */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 light:border-slate-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent.hex }}></span>
          <span className="text-slate-300 dark:text-slate-300 light:text-slate-700">© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</span>
        </div>

        {/* Right Back to Top */}
        <Button
          variant="outline"
          size="sm"
          onClick={scrollToTop}
          className="gap-2 font-mono text-xs"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} style={{ color: accent.hex }} />
        </Button>

      </div>
    </footer>
  );
};
