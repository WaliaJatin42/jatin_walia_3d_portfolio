import React, { useState } from 'react';
import { Sliders, X, ChevronUp } from 'lucide-react';
import { audio } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../shadcn/Card';
import { Button } from '../shadcn/Button';
import { Switch } from '../shadcn/Switch';

export const AvatarControlPanel = ({ avatarState, setAvatarState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, accent, setAccentId, accentColors } = useTheme();

  const poses = [
    { id: 'coding', label: 'Coding', emoji: '💻' },
    { id: 'presenting', label: 'Presenting', emoji: '🎤' },
    { id: 'zen', label: 'Zen Focus', emoji: '🧘' },
  ];

  const handleColorChange = (colorObj) => {
    audio.playModeChange();
    setAccentId(colorObj.id);
    setAvatarState((prev) => ({ ...prev, visorColor: colorObj.hex }));
  };

  const handlePoseChange = (pose) => {
    audio.playModeChange();
    setAvatarState((prev) => ({ ...prev, pose }));
  };

  const toggleOrbit = (val) => {
    setAvatarState((prev) => ({ ...prev, orbitControls: val }));
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {!isOpen ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            audio.playClick();
            setIsOpen(true);
          }}
          className="gap-2 backdrop-blur-xl shadow-xl border-slate-800 bg-slate-950/80 hover:scale-105 transition-all text-xs font-mono"
        >
          <Sliders size={14} style={{ color: accent.hex }} />
          <span>3D & Theme Controls</span>
          <ChevronUp size={14} className="text-slate-400" />
        </Button>
      ) : (
        <Card className="p-4.5 space-y-4 w-[340px] shadow-2xl border border-slate-800 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 light:border-slate-200 pb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold" style={{ color: accent.hex }}>
              <Sliders size={14} />
              <span>3D & THEME CONTROLS</span>
            </div>
            <button
              onClick={() => {
                audio.playClick();
                setIsOpen(false);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Visor & Accent Color Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 block uppercase">
                ACCENT & VISOR GLOW
              </span>
              <span className="text-[10px] font-mono font-semibold" style={{ color: accent.hex }}>
                {accent.name}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color)}
                  title={color.name}
                  className={`w-8 h-8 rounded-xl transition-all flex items-center justify-center border cursor-pointer ${
                    accent.id === color.id
                      ? 'border-white scale-110 shadow-lg ring-2 ring-indigo-400/50'
                      : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                ></button>
              ))}
            </div>
          </div>

          {/* Pose Selector */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 block uppercase">
              ANIMATION POSE
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {poses.map((p) => (
                <Button
                  key={p.id}
                  variant={avatarState.pose === p.id ? 'accent' : 'outline'}
                  onClick={() => handlePoseChange(p.id)}
                  title={p.label}
                  className="h-9 px-2 text-[11px] font-mono gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis justify-center rounded-xl"
                >
                  <span className="shrink-0">{p.emoji}</span>
                  <span className="truncate">{p.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Theme & Orbit Controls */}
          <div className="pt-2.5 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between">
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              label={theme === 'dark' ? 'Dark Theme' : 'Light Theme'}
            />

            <Button
              variant={avatarState.orbitControls ? 'accent' : 'outline'}
              onClick={() => toggleOrbit(!avatarState.orbitControls)}
              className="h-9 px-3 text-[11px] font-mono rounded-xl"
            >
              {avatarState.orbitControls ? 'Orbit: ON' : 'Orbit: OFF'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
