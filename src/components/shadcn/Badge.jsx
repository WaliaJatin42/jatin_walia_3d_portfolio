import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = React.forwardRef(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium transition-colors focus:outline-none';

    const variantStyles = {
      default:
        'bg-slate-900 border border-slate-800 text-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 light:bg-slate-100 light:border-slate-300 light:text-slate-800',
      outline:
        'border border-slate-700/60 text-slate-300 bg-transparent dark:border-slate-700/60 dark:text-slate-300 light:border-slate-300 light:text-slate-700',
      cyan:
        'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)]',
      purple:
        'bg-purple-950/80 border border-purple-500/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]',
      emerald:
        'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
      amber:
        'bg-amber-950/80 border border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
      rose:
        'bg-rose-950/80 border border-rose-500/40 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.2)]',
      secondary:
        'bg-slate-800 text-slate-200 dark:bg-slate-800 dark:text-slate-200 light:bg-slate-200 light:text-slate-800',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant] || variantStyles.default, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = 'Badge';
