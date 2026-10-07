import React from 'react';
import { ArrowRight, Globe, Mail, Headphones, Music } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { audio } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../shadcn/Button';
import { Badge } from '../shadcn/Badge';
import { Card } from '../shadcn/Card';

export const HeroSection = ({ setAvatarState }) => {
  const { accent } = useTheme();

  const triggerAvatarPose = (pose) => {
    audio.playModeChange();
    setAvatarState((prev) => ({ ...prev, pose }));
  };

  // Helper to get clean responsive font size for metric card values
  const getMetricValueFontSize = (val) => {
    if (val.length <= 5) return 'text-2xl sm:text-3xl font-extrabold';
    if (val.length <= 12) return 'text-base sm:text-lg font-bold leading-tight';
    return 'text-xs sm:text-sm font-bold leading-snug break-words';
  };

  return (
    <section className="relative min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Text Details Column (Left) */}
        <div className="lg:col-span-7 space-y-7 text-left z-20">
          
          {/* Status Pill Badge */}
          <Badge variant="cyan" className="neo-pill gap-2 px-4 py-1.5 backdrop-blur-xl animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent.hex }}></span>
            <span>AVAILABLE FOR HIGH-IMPACT ROLES & MENTORSHIP</span>
          </Badge>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight leading-tight sm:leading-none">
              Hi, I'm{' '}
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent drop-shadow-md"
                style={{
                  backgroundImage: `linear-gradient(to right, ${accent.hex}, #a855f7, #ec4899)`,
                }}
              >
                {PERSONAL_INFO.name}
              </span>
            </h1>
            <p className="text-lg sm:text-2xl font-semibold font-mono" style={{ color: accent.hex }}>
              {PERSONAL_INFO.title}
            </p>
            <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-2xl leading-relaxed">
              Specializing in <span className="font-semibold underline decoration-indigo-400/50">React.js</span> & <span className="font-semibold underline decoration-purple-400/50">Next.js</span> architectures. Expert in payment systems (<span className="font-mono" style={{ color: accent.hex }}>Stripe & Razorpay</span>), database performance tuning (<span className="text-emerald-400 font-mono">+30% MongoDB speedup</span>), and AI-native delivery with <span className="text-purple-400 font-mono">Cursor & Google Project IDX</span>.
            </p>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
            {PERSONAL_INFO.highlights.map((item, idx) => (
              <Card
                key={idx}
                onMouseEnter={() => audio.playHover()}
                className="p-3.5 rounded-3xl border-slate-800/80 hover:border-indigo-500/40 transition-all group overflow-hidden flex flex-col justify-between min-h-[105px]"
              >
                <div
                  className={`${getMetricValueFontSize(item.value)} tracking-tight font-mono group-hover:scale-105 transition-transform`}
                  style={{ color: accent.hex }}
                >
                  {item.value}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 font-medium mt-1 leading-tight">
                  {item.label}
                </div>
              </Card>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            <a href="#projects" onClick={() => audio.playClick()}>
              <Button variant="neon" size="lg" className="shadow-xl">
                <span>Explore 3D Work</span>
                <ArrowRight size={16} />
              </Button>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick()}
            >
              <Button variant="outline" size="lg">
                <Globe size={16} style={{ color: accent.hex }} />
                <span>LinkedIn Profile</span>
              </Button>
            </a>

            <a href="#contact" onClick={() => audio.playClick()}>
              <Button variant="outline" size="lg">
                <Mail size={16} className="text-emerald-400" />
                <span>Get in Touch</span>
              </Button>
            </a>
          </div>

          {/* Avatar Pose Quick Controller */}
          <div className="pt-2 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-600">3D Pose:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => triggerAvatarPose('coding')}
              className="text-xs font-mono"
            >
              💻 Coding
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => triggerAvatarPose('presenting')}
              className="text-xs font-mono"
            >
              🎤 Presenting
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => triggerAvatarPose('zen')}
              className="text-xs font-mono"
            >
              🧘 Zen Focus
            </Button>
          </div>

        </div>

        {/* Neo-Tactile 3D Developer Avatar Card Column (Right) */}
        <div className="lg:col-span-5 flex items-center justify-center relative z-20">
          <div className="relative w-full max-w-md aspect-square group">
            
            {/* Glowing Accent Ambient Halo */}
            <div
              className="absolute -inset-3 rounded-[2.5rem] opacity-40 blur-3xl transition-all group-hover:opacity-70 group-hover:blur-[60px]"
              style={{
                background: `radial-gradient(circle, ${accent.hex} 0%, rgba(168,85,247,0.4) 60%, transparent 100%)`,
              }}
            ></div>

            {/* Main Neo-Tactile 3D Card Frame */}
            <Card className="relative w-full h-full p-3.5 rounded-[2.2rem] border border-white/10 dark:border-white/10 light:border-slate-200/90 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/90 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Image Container with Floating Ambient Sound Wave Overlay */}
              <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-slate-900/60 flex items-center justify-center">
                <img
                  src="/avatar-zen.png"
                  alt="3D Developer Avatar with Headphones"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Floating Glass Badges */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="cyan" className="neo-pill gap-1.5 bg-slate-950/80 backdrop-blur-md shadow-lg border-cyan-500/40">
                    <Headphones size={14} style={{ color: accent.hex }} className="animate-pulse" />
                    <span>3D ZEN LOFI DEV</span>
                  </Badge>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <div className="p-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 flex items-center gap-1 text-xs font-mono shadow-lg">
                    <Music size={14} className="text-purple-400 animate-bounce" />
                  </div>
                </div>

                {/* Floating Tactile Glass Badges */}
                <div className="absolute bottom-16 right-4 z-10 hidden sm:block">
                  <div className="neo-card p-3 bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 text-xs font-mono shadow-xl space-y-1">
                    <span className="text-[10px] text-emerald-400 font-bold block uppercase">ENGINEERING IMPACT</span>
                    <span className="font-bold text-slate-100">+30% MongoDB Boost</span>
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[92%]">
                  <div className="bg-slate-950/85 dark:bg-slate-950/85 light:bg-white/95 border border-slate-800/90 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-800 px-4 py-2.5 rounded-2xl backdrop-blur-xl flex items-center justify-between shadow-xl text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: accent.hex }}></span>
                      <span className="font-bold">Senior Software Engineer I</span>
                    </div>
                    <span className="text-[10px] text-slate-400">@ Datacultr</span>
                  </div>
                </div>

              </div>

            </Card>

          </div>
        </div>

      </div>
    </section>
  );
};
