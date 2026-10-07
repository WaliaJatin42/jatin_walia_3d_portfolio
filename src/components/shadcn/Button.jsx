import React from 'react';
import { cn } from '../../lib/utils';
import { audio } from '../../utils/audio';

export const Button = React.forwardRef(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      className = '',
      onClick,
      onMouseEnter,
      disabled = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const handleClick = (e) => {
      if (disabled) return;
      audio.playClick();
      if (onClick) onClick(e);
    };

    const handleMouseEnter = (e) => {
      if (disabled) return;
      audio.playHover();
      if (onMouseEnter) onMouseEnter(e);
    };

    const baseStyles =
      'neo-button inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 disabled:opacity-50 disabled:pointer-events-none rounded-full active:scale-[0.97] active:translate-y-[1px] select-none cursor-pointer';

    const sizeStyles = {
      sm: 'px-3.5 py-1.5 text-xs gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
      icon: 'p-2.5 text-sm justify-center',
    };

    const variantStyles = {
      default: 'neo-button-default',
      outline:
        'border border-slate-700/60 bg-slate-900/40 backdrop-blur-md text-slate-200 hover:bg-slate-800/70 hover:border-indigo-400 light:bg-white/80 light:text-slate-800 light:border-slate-300 light:hover:bg-white shadow-sm hover:shadow-md',
      ghost:
        'bg-transparent text-slate-300 hover:bg-slate-800/50 hover:text-indigo-400 light:text-slate-700 light:hover:bg-slate-200/60 light:hover:text-slate-900',
      accent:
        'bg-indigo-600 text-white font-bold hover:bg-indigo-500 shadow-[0_8px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_30px_rgba(99,102,241,0.6)] hover:-translate-y-0.5',
      neon:
        'bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 text-white font-bold shadow-[0_8px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.7)] hover:-translate-y-0.5',
      secondary:
        'bg-slate-800/80 text-slate-200 border border-slate-700/50 hover:bg-slate-700/80 light:bg-slate-200 light:text-slate-900 light:border-slate-300 light:hover:bg-slate-300',
      destructive:
        'bg-rose-600 text-white hover:bg-rose-500 shadow-md',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
