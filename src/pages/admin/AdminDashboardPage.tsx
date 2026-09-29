import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Layers,
  FileText,
  Inbox,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Archive,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getJobStatus, formatDisplayDate } from '../../utils/dateUtils';
import { JobStatusBadge } from '../../components/common/JobStatusBadge';

export const AdminDashboardPage: React.FC = () => {
  const { jobs, services, posts, requests } = useApp();

  // Job Stats
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => getJobStatus(j.lastDate) === 'open').length;
  const expiredJobs = jobs.filter((j) => getJobStatus(j.lastDate) === 'closed').length;
  const featuredJobs = jobs.filter((j) => j.featured).length;

  // Service Stats
  const totalServices = services.length;

  // Post Stats
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.published).length;

  // Request Stats
  const pendingRequests = requests.filter((r) => r.status === 'Pending').length;
  const processingRequests = requests.filter((r) => r.status === 'Processing').length;
  const completedRequests = requests.filter((r) => r.status === 'Completed').length;

  // Recent jobs & requests
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentRequests = [...requests].slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-md">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
            Welcome to Control Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            LAJPAL Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Monitor real-time job openings, citizen service submissions, and updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/jobs/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 transition active:scale-95 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job</span>
          </Link>
          <Link
            to="/admin/updates/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-emerald-700 hover:bg-emerald-600 text-white transition border border-emerald-500/50"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Update</span>
          </Link>
        </div>
      </div>

      {/* 40. Dashboard Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Jobs */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total Jobs</span>
            <Briefcase className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {totalJobs}
          </span>
        </div>

        {/* Active Jobs */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Active Jobs</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {activeJobs}
          </span>
        </div>

        {/* Expired Jobs */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Expired Jobs</span>
            <Archive className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
            {expiredJobs}
          </span>
        </div>

        {/* Featured Jobs */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Featured Jobs</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {featuredJobs}
          </span>
        </div>

        {/* Total Services */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total Services</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {totalServices}
          </span>
        </div>

        {/* Total Posts */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total Posts</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {totalPosts}
          </span>
        </div>

        {/* Published Posts */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Published Posts</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {publishedPosts}
          </span>
        </div>

        {/* Pending Requests */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/60 shadow-xs bg-amber-50/30">
          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-1">
            <span className="text-xs font-bold">Pending Requests</span>
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {pendingRequests}
          </span>
        </div>

        {/* Processing Requests */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Processing</span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <span className="text-2xl font-black text-sky-600 dark:text-sky-400">
            {processingRequests}
          </span>
        </div>

        {/* Completed Requests */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {completedRequests}
          </span>
        </div>
      </div>

      {/* Main Grid: Recent Customer Requests & Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Customer Requests */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Recent Customer Requests
              </h3>
            </div>
            <Link
              to="/admin/requests"
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              View All ({requests.length})
            </Link>
          </div>

          {recentRequests.length > 0 ? (
            <div className="space-y-3">
              {recentRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 block">
                      {req.id}
                    </span>
                    <strong className="text-slate-900 dark:text-white text-sm">
                      {req.customerName}
                    </strong>
                    <span className="text-slate-500 dark:text-slate-400 block">
                      {req.serviceName} • {req.mobileNumber}
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        req.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : req.status === 'Processing'
                          ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {req.status}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1">
                      {req.createdAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic py-6 text-center">
              No customer requests yet.
            </p>
          )}
        </div>

        {/* Recent Jobs */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Recent Job Listings
              </h3>
            </div>
            <Link
              to="/admin/jobs"
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              View All ({jobs.length})
            </Link>
          </div>

          <div className="space-y-3">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate">
                    {job.title}
                  </h4>
                  <span className="text-slate-500 dark:text-slate-400 truncate block">
                    {job.department} • Last Date: {formatDisplayDate(job.lastDate)}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <JobStatusBadge lastDate={job.lastDate} size="sm" showDaysRemaining={false} />
                  <Link
                    to={`/admin/jobs/edit/${job.id}`}
                    className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-[11px] font-semibold text-slate-800 dark:text-slate-200"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
