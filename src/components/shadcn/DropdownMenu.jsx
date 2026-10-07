import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { audio } from '../../utils/audio';

export const DropdownMenu = ({ trigger, children, className }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = () => {
    audio.playClick();
    setOpen((prev) => !prev);
  };

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <div onClick={toggle}>{trigger}</div>
      {open && (
        <div
          className={cn(
            'absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-950/90 p-2 text-slate-100 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in-80 zoom-in-95 dark:border-slate-800 dark:bg-slate-950/95 light:border-slate-200 light:bg-white/95 light:text-slate-900',
            className
          )}
        >
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  onClose: () => setOpen(false),
                })
              : child
          )}
        </div>
      )}
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick, onClose, className, active }) => {
  const handleClick = (e) => {
    audio.playClick();
    if (onClick) onClick(e);
    if (onClose) onClose();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => audio.playHover()}
      className={cn(
        'flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-mono transition-colors text-left cursor-pointer',
        active
          ? 'bg-slate-800 text-cyan-300 font-bold dark:bg-slate-800 dark:text-cyan-300 light:bg-slate-100 light:text-slate-900'
          : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 light:text-slate-700 light:hover:bg-slate-100 light:hover:text-slate-900',
        className
      )}
    >
      {children}
    </button>
  );
};
