import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/jobs/JobCard';
import { EmptyState } from '../components/common/EmptyState';
import { JobsChannelButton } from '../components/common/JobsChannelButton';

export const FeaturedJobsPage: React.FC = () => {
  const { jobs } = useApp();

  const featuredJobs = jobs.filter((j) => j.published && j.featured);

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
            <span>Back to All Jobs</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500 fill-current" />
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Featured Job Openings
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            High-priority career advertisements handpicked by LAJPAL for Pakistani job seekers.
          </p>
        </div>

        <JobsChannelButton variant="accent" size="md" />
      </div>

      {featuredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No featured jobs at this time"
          description="Check our main jobs page to see all currently active vacancies."
          icon="inbox"
          action={
            <Link
              to="/jobs"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white"
            >
              View All Jobs
            </Link>
          }
        />
      )}
    </div>
  );
};
