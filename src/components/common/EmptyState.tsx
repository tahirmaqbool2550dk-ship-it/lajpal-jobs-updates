import React, { ReactNode } from 'react';
import { SearchX, Inbox, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: 'search' | 'inbox' | 'alert';
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'There are no records matching your criteria right now.',
  icon = 'inbox',
  action,
  className = '',
}) => {
  const icons = {
    search: <SearchX className="w-12 h-12 text-slate-400 dark:text-slate-500" />,
    inbox: <Inbox className="w-12 h-12 text-slate-400 dark:text-slate-500" />,
    alert: <AlertCircle className="w-12 h-12 text-amber-500" />,
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 ${className}`}
    >
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 mb-4">
        {icons[icon]}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-md">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};
