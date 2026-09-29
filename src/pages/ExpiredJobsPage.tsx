import React from 'react';
import { Link } from 'react-router-dom';
import { Archive, ArrowLeft, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/jobs/JobCard';
import { EmptyState } from '../components/common/EmptyState';
import { getJobStatus } from '../utils/dateUtils';
import { JobsChannelButton } from '../components/common/JobsChannelButton';

export const ExpiredJobsPage: React.FC = () => {
  const { jobs } = useApp();

  // Expired jobs have passed deadline
  const expiredJobs = jobs.filter(
    (j) => j.published && getJobStatus(j.lastDate) === 'closed'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Active Jobs</span>
          </Link>
          <div className="flex items-center gap-2">
            <Archive className="w-6 h-6 text-slate-500" />
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Expired Jobs Archive
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            These jobs have passed their application deadline and are archived for reference, test schedules, and past merit tracking.
          </p>
        </div>

        <JobsChannelButton variant="secondary" size="md" />
      </div>

      {/* Info notice */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> Applications are closed for all vacancies on this page. If you applied through LAJPAL, check our WhatsApp channel for interview letters and roll number slips.
        </p>
      </div>

      {expiredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expiredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No expired jobs in archive"
          description="All currently published jobs are active and accepting applications."
          icon="inbox"
          action={
            <Link
              to="/jobs"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white"
            >
              View Active Jobs
            </Link>
          }
        />
      )}
    </div>
  );
};
