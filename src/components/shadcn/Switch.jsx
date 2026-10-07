import React from 'react';
import { cn } from '../../lib/utils';
import { audio } from '../../utils/audio';

export const Switch = React.forwardRef(
  ({ checked, onCheckedChange, disabled = false, className, label, ...props }, ref) => {
    const toggle = () => {
      if (disabled) return;
      audio.playClick();
      if (onCheckedChange) onCheckedChange(!checked);
    };

    return (
      <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            'peer relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            checked ? 'bg-cyan-500 shadow-[0_0_12px_rgba(0,240,255,0.4)]' : 'bg-slate-800 light:bg-slate-300',
            className
          )}
          {...props}
        >
          <span
            className={cn(
              'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
              checked ? 'translate-x-5 bg-slate-950' : 'translate-x-0 bg-white'
            )}
          />
        </button>
        {label && <span className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">{label}</span>}
      </label>
    );
  }
);
Switch.displayName = 'Switch';
