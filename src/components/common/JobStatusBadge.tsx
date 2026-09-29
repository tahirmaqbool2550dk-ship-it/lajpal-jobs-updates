import React from 'react';
import { getJobStatus, getDaysRemaining } from '../../utils/dateUtils';

interface JobStatusBadgeProps {
  lastDate: string;
  showDaysRemaining?: boolean;
  size?: 'sm' | 'md';
}

export const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({
  lastDate,
  showDaysRemaining = true,
  size = 'md',
}) => {
  const status = getJobStatus(lastDate);
  const daysText = getDaysRemaining(lastDate);
  const isOpen = status === 'open';

  const isLastDay = daysText.includes('Last Day') || daysText === '1 Day Left';

  return (
    <div className="inline-flex items-center flex-wrap gap-1.5">
      {/* Primary Status: Open vs Closed */}
      <span
        className={`inline-flex items-center gap-1.5 font-bold rounded-full border ${
          size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs'
        } ${
          isOpen
            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
            : 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
          }`}
        />
        {isOpen ? 'Applications Open' : 'Applications Closed'}
      </span>

      {/* Days remaining badge */}
      {showDaysRemaining && isOpen && (
        <span
          className={`inline-flex items-center font-medium rounded-full ${
            size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs'
          } ${
            isLastDay
              ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-700 font-semibold'
              : 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
          }`}
        >
          ⏱️ {daysText}
        </span>
      )}
    </div>
  );
};
