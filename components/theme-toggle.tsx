'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`p-2 rounded-lg border border-slate-700/50 bg-slate-800/40 text-slate-400 opacity-60 ${className}`}
      >
        <Moon className="w-4 h-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative p-2 rounded-xl transition-all duration-300 border ${
        isDark
          ? 'bg-darknavy/80 border-slate-700/60 text-solargreen hover:border-solargreen/50 hover:shadow-solar-glow'
          : 'bg-white/90 border-slate-200 text-slate-700 hover:border-electriccyan hover:shadow-sm'
      } ${className}`}
    >
      {isDark ? <Sun className="w-4 h-4 transition-transform rotate-0 hover:rotate-45" /> : <Moon className="w-4 h-4 transition-transform rotate-0 hover:-rotate-12" />}
    </button>
  );
}
