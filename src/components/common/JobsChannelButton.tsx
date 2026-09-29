import React from 'react';
import { WHATSAPP_JOBS_CHANNEL_URL, WHATSAPP_JOBS_CHANNEL_BUTTON_TEXT } from '../../utils/whatsapp';

interface JobsChannelButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent' | 'header';
}

export const JobsChannelButton: React.FC<JobsChannelButtonProps> = ({
  className = '',
  size = 'md',
  variant = 'primary',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base font-bold',
  }[size];

  const variantClasses = {
    primary:
      'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm hover:shadow-md transition-all active:scale-[0.98] border border-emerald-600',
    secondary:
      'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white shadow transition-all active:scale-[0.98]',
    accent:
      'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] border border-amber-400',
    header:
      'bg-emerald-800/90 hover:bg-emerald-900 text-white border border-emerald-600/50 shadow-sm transition-all text-xs font-semibold',
  }[variant];

  return (
    <a
      href={WHATSAPP_JOBS_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all ${sizeClasses} ${variantClasses} ${className}`}
      aria-label={WHATSAPP_JOBS_CHANNEL_BUTTON_TEXT}
    >
      <span>{WHATSAPP_JOBS_CHANNEL_BUTTON_TEXT}</span>
    </a>
  );
};
