import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, GraduationCap, Calendar, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { Job } from '../../types';
import { JobStatusBadge } from '../common/JobStatusBadge';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { getJobApplyMessage } from '../../utils/whatsapp';
import { formatDisplayDate, getJobStatus } from '../../utils/dateUtils';

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, compact = false }) => {
  const status = getJobStatus(job.lastDate);
  const isOpen = status === 'open';
  const whatsappMessage = getJobApplyMessage(job.title, job.department);

  return (
    <article
      className={`group relative rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden bg-white dark:bg-slate-900 ${
        job.featured
          ? 'border-amber-400/80 dark:border-amber-500/60 shadow-md hover:shadow-lg shadow-amber-500/5'
          : 'border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Featured Header Pill */}
      {job.featured && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-[11px] px-3 py-1 flex items-center gap-1.5 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Featured Job Opportunity</span>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        {/* Top Badges: Category & Status */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
            {job.category}
          </span>
          <JobStatusBadge lastDate={job.lastDate} size="sm" />
        </div>

        {/* Job Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
          <Link to={`/jobs/${job.id}`} className="focus:outline-none">
            {job.title}
          </Link>
        </h3>

        {/* Department */}
        <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate">{job.department}</span>
          {job.bps && (
            <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
              {job.bps}
            </span>
          )}
        </div>

        {/* Specs Grid */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
          {job.location && (
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
          )}
          {job.qualification && (
            <div className="flex items-center gap-1.5 truncate">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate" title={job.qualification}>
                {job.qualification}
              </span>
            </div>
          )}
        </div>

        {/* Deadline Notice */}
        <div className="mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Last Date:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {formatDisplayDate(job.lastDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 pt-2 bg-slate-50/60 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
        {/* View Details Button */}
        <Link
          to={`/jobs/${job.id}`}
          className="flex-1 min-w-[110px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {/* WhatsApp Apply Button */}
        {job.showWhatsAppApply && isOpen && (
          <WhatsAppButton
            message={whatsappMessage}
            text="WhatsApp Apply"
            size="sm"
            variant="primary"
            className="flex-1 min-w-[130px]"
          />
        )}

        {/* Official Apply Link (ONLY when enabled AND valid url exists) */}
        {job.showOfficialApply && job.officialApplyLink && isOpen && (
          <a
            href={job.officialApplyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60 transition border border-emerald-300/50 dark:border-emerald-700/50"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Apply on Official Website</span>
          </a>
        )}
      </div>
    </article>
  );
};
