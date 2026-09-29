import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Eye,
  Edit,
  Copy,
  Trash2,
  Sparkles,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobStatusBadge } from '../../components/common/JobStatusBadge';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { formatDisplayDate, getJobStatus } from '../../utils/dateUtils';
import { Job } from '../../types';

export const AdminJobsPage: React.FC = () => {
  const {
    jobs,
    deleteJob,
    duplicateJob,
    toggleJobPublish,
    toggleJobFeatured,
  } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  const filteredJobs = jobs.filter((job) => {
    if (categoryFilter !== 'All' && job.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories = ['All', ...Array.from(new Set(jobs.map((j) => j.category)))];

  const handleConfirmDelete = () => {
    if (jobToDelete) {
      deleteJob(jobToDelete.id);
      setJobToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Jobs Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish, edit, duplicate, and manage employment announcements.
          </p>
        </div>

        <Link
          to="/admin/jobs/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Job</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title or department..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 41. Job Admin Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5 sm:p-4">Job Title</th>
                <th className="p-3.5 sm:p-4">Department</th>
                <th className="p-3.5 sm:p-4">Category</th>
                <th className="p-3.5 sm:p-4">Last Date</th>
                <th className="p-3.5 sm:p-4">Status</th>
                <th className="p-3.5 sm:p-4 text-center">Featured</th>
                <th className="p-3.5 sm:p-4 text-center">Published</th>
                <th className="p-3.5 sm:p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredJobs.map((job) => {
                const status = getJobStatus(job.lastDate);

                return (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Title */}
                    <td className="p-3.5 sm:p-4 max-w-xs font-bold text-slate-900 dark:text-white">
                      <Link
                        to={`/jobs/${job.id}`}
                        target="_blank"
                        className="hover:text-emerald-600 transition inline-flex items-center gap-1"
                      >
                        <span className="truncate">{job.title}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                      </Link>
                    </td>

                    {/* Department */}
                    <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-300">
                      {job.department}
                    </td>

                    {/* Category */}
                    <td className="p-3.5 sm:p-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold text-[11px]">
                        {job.category}
                      </span>
                    </td>

                    {/* Last Date */}
                    <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300 font-medium">
                      {formatDisplayDate(job.lastDate)}
                    </td>

                    {/* Auto status */}
                    <td className="p-3.5 sm:p-4">
                      <JobStatusBadge lastDate={job.lastDate} size="sm" showDaysRemaining={false} />
                    </td>

                    {/* Featured toggle */}
                    <td className="p-3.5 sm:p-4 text-center">
                      <button
                        onClick={() => toggleJobFeatured(job.id)}
                        className={`p-1.5 rounded-lg transition ${
                          job.featured
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950'
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={job.featured ? 'Featured (Click to unfeature)' : 'Click to feature'}
                      >
                        <Sparkles className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* Published toggle */}
                    <td className="p-3.5 sm:p-4 text-center">
                      <button
                        onClick={() => toggleJobPublish(job.id)}
                        className={`p-1.5 rounded-lg transition font-bold text-[11px] ${
                          job.published
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
                            : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        {job.published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 sm:p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/jobs/${job.id}`}
                          target="_blank"
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          title="View on site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          to={`/admin/jobs/edit/${job.id}`}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                          title="Edit Job"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => duplicateJob(job.id)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                          title="Duplicate Job"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setJobToDelete(job)}
                          className="p-1.5 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
                          title="Delete Job"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!jobToDelete}
        title="Delete Job Advertisement"
        message={`Are you sure you want to permanently delete "${jobToDelete?.title}"? This cannot be undone.`}
        confirmText="Delete Job"
        onConfirm={handleConfirmDelete}
        onCancel={() => setJobToDelete(null)}
      />
    </div>
  );
};
