import React, { createContext, useContext, useState, useEffect } from 'react';

export const ACCENT_COLORS = [
  { id: 'cyan', name: 'Neon Cyan', hex: '#00f0ff', tailwind: 'cyan', glow: 'rgba(0,240,255,0.4)', textClass: 'text-cyan-400', borderClass: 'border-cyan-400', bgClass: 'bg-cyan-500' },
  { id: 'violet', name: 'Electric Violet', hex: '#a855f7', tailwind: 'purple', glow: 'rgba(168,85,247,0.4)', textClass: 'text-purple-400', borderClass: 'border-purple-400', bgClass: 'bg-purple-500' },
  { id: 'emerald', name: 'Emerald Matrix', hex: '#10b981', tailwind: 'emerald', glow: 'rgba(16,185,129,0.4)', textClass: 'text-emerald-400', borderClass: 'border-emerald-400', bgClass: 'bg-emerald-500' },
  { id: 'amber', name: 'Amber Gold', hex: '#f59e0b', tailwind: 'amber', glow: 'rgba(245,158,11,0.4)', textClass: 'text-amber-400', borderClass: 'border-amber-400', bgClass: 'bg-amber-500' },
  { id: 'rose', name: 'Rose Crimson', hex: '#f43f5e', tailwind: 'rose', glow: 'rgba(244,63,94,0.4)', textClass: 'text-rose-400', borderClass: 'border-rose-400', bgClass: 'bg-rose-500' },
  { id: 'blue', name: 'Sapphire Blue', hex: '#3b82f6', tailwind: 'blue', glow: 'rgba(59,130,246,0.4)', textClass: 'text-blue-400', borderClass: 'border-blue-400', bgClass: 'bg-blue-500' },
];

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children, setAvatarState }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'dark';
  });

  const [accentId, setAccentId] = useState(() => {
    return localStorage.getItem('app-accent') || 'cyan';
  });

  const currentAccent = ACCENT_COLORS.find((c) => c.id === accentId) || ACCENT_COLORS[0];

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('app-accent', accentId);
    document.documentElement.setAttribute('data-accent', accentId);
    
    // Sync with avatar visor color if provided
    if (setAvatarState) {
      setAvatarState((prev) => ({
        ...prev,
        visorColor: currentAccent.hex,
      }));
    }
  }, [accentId, setAvatarState, currentAccent.hex]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const changeAccent = (colorId) => {
    setAccentId(colorId);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        accent: currentAccent,
        setAccentId: changeAccent,
        accentColors: ACCENT_COLORS,
      }}
    >
      <div data-theme={theme} className={theme === 'light' ? 'light' : 'dark'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
