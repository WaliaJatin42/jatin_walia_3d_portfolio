import React, { createContext, useContext } from 'react';
import { cn } from '../../lib/utils';
import { audio } from '../../utils/audio';

const TabsContext = createContext(null);

export const Tabs = ({ value, onValueChange, children, className }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn('w-full flex flex-col items-center justify-center', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className }) => {
  return (
    <div
      className={cn(
        'mx-auto inline-flex items-center justify-center rounded-full bg-slate-900/80 p-1.5 border border-slate-800/80 backdrop-blur-xl shadow-lg dark:bg-slate-900/80 dark:border-slate-800 light:bg-slate-100/90 light:border-slate-300',
        className
      )}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children, className, activeStyle }) => {
  const context = useContext(TabsContext);
  const isSelected = context?.value === value;

  const handleClick = () => {
    audio.playClick();
    if (context?.onValueChange) {
      context.onValueChange(value);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => audio.playHover()}
      style={isSelected ? activeStyle : undefined}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-xs font-mono font-semibold transition-all focus-visible:outline-none cursor-pointer',
        isSelected
          ? 'bg-slate-950 text-indigo-400 border border-indigo-500/50 shadow-md font-bold dark:bg-slate-950 dark:text-indigo-400 light:bg-white light:text-slate-900 light:border-slate-300 scale-[1.02]'
          : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900',
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className }) => {
  const context = useContext(TabsContext);
  if (context?.value !== value) return null;

  return (
    <div
      className={cn(
        'mt-4 w-full focus-visible:outline-none transition-all duration-300 animate-in fade-in-50',
        className
      )}
    >
      {children}
    </div>
  );
};
