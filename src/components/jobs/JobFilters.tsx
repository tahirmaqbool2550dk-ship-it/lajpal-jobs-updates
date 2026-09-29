import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { JobCategory } from '../../types';

export const JOB_CATEGORIES_LIST: (JobCategory | 'All')[] = [
  'All',
  'Government Jobs',
  'Punjab Jobs',
  'Federal Jobs',
  'Police Jobs',
  'Army Jobs',
  'Education Jobs',
  'Bank Jobs',
  'Private Jobs',
  'University Jobs',
  'Internship',
  'Scholarships',
  'Admissions',
  'Important Announcements',
];

export type JobSortOption = 'latest' | 'closingSoon' | 'expired';

interface JobFiltersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedSort: JobSortOption;
  onSelectSort: (sort: JobSortOption) => void;
  selectedProvince?: string;
  onSelectProvince?: (prov: string) => void;
  totalCount: number;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSort,
  onSelectSort,
  selectedProvince = 'All',
  onSelectProvince,
  totalCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Pills (horizontal scrolling on mobile, wrap on desktop) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {JOB_CATEGORIES_LIST.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Sorting & Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
        <div className="text-slate-500 dark:text-slate-400 font-medium">
          Showing <span className="font-bold text-slate-900 dark:text-white">{totalCount}</span> jobs available
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort by:</span>
          </label>
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value as JobSortOption)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500"
          >
            <option value="latest">Latest Jobs (Newest First)</option>
            <option value="closingSoon">Closing Soon (Urgent)</option>
            <option value="expired">Past Deadlines (Expired)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
