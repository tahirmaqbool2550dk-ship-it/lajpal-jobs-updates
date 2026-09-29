import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'auto',
  showSubtitle = true,
}) => {
  const isLightOnly = variant === 'light';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 transition-transform active:scale-95 ${className}`}
      aria-label="LAJPAL - Jobs Updates and Online Apply Services Home"
    >
      {/* Brand Emblem */}
      <div className="relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white flex items-center justify-center font-black shadow-md shadow-emerald-900/20 border border-emerald-500/40 group-hover:border-amber-400 transition-colors">
        <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
          L
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white dark:border-slate-900" />
      </div>

      {/* Typography Hierarchy */}
      <div className="flex flex-col text-left leading-tight">
        <span
          className={`font-black text-2xl sm:text-[1.75rem] tracking-tight transition-colors ${
            isLightOnly
              ? 'text-white'
              : 'text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
          }`}
        >
          LAJPAL
        </span>
        {showSubtitle && (
          <span
            className={`font-bold text-[10px] sm:text-xs tracking-wider uppercase ${
              isLightOnly
                ? 'text-emerald-200'
                : 'text-emerald-700 dark:text-emerald-400 font-semibold'
            }`}
          >
            Jobs Updates &amp; Online Apply Services
          </span>
        )}
      </div>
    </Link>
  );
};
