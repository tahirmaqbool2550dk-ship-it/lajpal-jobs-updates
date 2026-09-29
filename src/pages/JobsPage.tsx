import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Briefcase, AlertCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/jobs/JobCard';
import { JobSearch } from '../components/jobs/JobSearch';
import { JobFilters, JobSortOption } from '../components/jobs/JobFilters';
import { EmptyState } from '../components/common/EmptyState';
import { JobsChannelButton } from '../components/common/JobsChannelButton';
import { getJobStatus, parseDateOnly } from '../utils/dateUtils';

export const JobsPage: React.FC = () => {
  const { jobs } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params or local state
  const initialCategory = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<JobSortOption>('latest');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');

  // Filter published jobs only
  const publishedJobs = useMemo(() => jobs.filter((j) => j.published), [jobs]);

  // Comprehensive filter and search matching
  const filteredJobs = useMemo(() => {
    return publishedJobs.filter((job) => {
      // Category filter
      if (selectedCategory !== 'All' && job.category !== selectedCategory) {
        return false;
      }

      // Status filter
      const status = getJobStatus(job.lastDate);
      if (statusFilter === 'open' && status !== 'open') return false;
      if (statusFilter === 'closed' && status !== 'closed') return false;

      // Text search matching: title, department, qualification, city, district, province, location
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesDept = job.department.toLowerCase().includes(q);
        const matchesQual = job.qualification?.toLowerCase().includes(q);
        const matchesLoc = job.location?.toLowerCase().includes(q);
        const matchesDist = job.district?.toLowerCase().includes(q);
        const matchesProv = job.province?.toLowerCase().includes(q);
        const matchesDesc = job.description.toLowerCase().includes(q);

        if (
          !matchesTitle &&
          !matchesDept &&
          !matchesQual &&
          !matchesLoc &&
          !matchesDist &&
          !matchesProv &&
          !matchesDesc
        ) {
          return false;
        }
      }

      return true;
    });
  }, [publishedJobs, selectedCategory, statusFilter, searchQuery]);

  // Sorting
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (selectedSort === 'latest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (selectedSort === 'closingSoon') {
        // Active jobs nearest to deadline first
        const deadlineA = parseDateOnly(a.lastDate).getTime();
        const deadlineB = parseDateOnly(b.lastDate).getTime();
        return deadlineA - deadlineB;
      }
      if (selectedSort === 'expired') {
        // Expired jobs first
        const statusA = getJobStatus(a.lastDate);
        const statusB = getJobStatus(b.lastDate);
        if (statusA === 'closed' && statusB === 'open') return -1;
        if (statusA === 'open' && statusB === 'closed') return 1;
        return new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime();
      }
      return 0;
    });
  }, [filteredJobs, selectedSort]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setStatusFilter('all');
    setSelectedSort('latest');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
            <span>Employment Opportunities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Government &amp; Private Jobs in Pakistan
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Live vacancies verified across Punjab and Federal ministries. Filter by department, scale, qualifications, and deadline.
          </p>
        </div>

        <JobsChannelButton variant="header" size="md" />
      </div>

      {/* Search Input Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <JobSearch
          query={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by Job Title, Department, Qualification, City, District, Scale..."
        />

        {/* Status Tab Switcher (All vs Open vs Expired) */}
        <div className="flex items-center flex-wrap gap-2 pt-1">
          <span className="text-xs font-semibold text-slate-500 mr-2">Status:</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
              statusFilter === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Jobs ({publishedJobs.length})
          </button>
          <button
            onClick={() => setStatusFilter('open')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
              statusFilter === 'open'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
            }`}
          >
            🟢 Applications Open ({publishedJobs.filter((j) => getJobStatus(j.lastDate) === 'open').length})
          </button>
          <button
            onClick={() => setStatusFilter('closed')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
              statusFilter === 'closed'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
            }`}
          >
            🔴 Applications Closed ({publishedJobs.filter((j) => getJobStatus(j.lastDate) === 'closed').length})
          </button>

          {(searchQuery || selectedCategory !== 'All' || statusFilter !== 'all') && (
            <button
              onClick={handleClearFilters}
              className="ml-auto text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Category Filters and Sort */}
        <JobFilters
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSearchParams(cat === 'All' ? {} : { category: cat });
          }}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          totalCount={sortedJobs.length}
        />
      </div>

      {/* Jobs Listing Grid */}
      {sortedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No jobs found matching your search"
          description="Try clearing your keywords or checking different category filters."
          icon="search"
          action={
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Clear All Filters
            </button>
          }
        />
      )}
    </div>
  );
};
