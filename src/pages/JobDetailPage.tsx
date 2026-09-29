import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Users,
  Award,
  Layers,
  Clock,
  Printer,
  FileText,
  ExternalLink,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobStatusBadge } from '../components/common/JobStatusBadge';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { ShareButtons } from '../components/common/ShareButtons';
import { ImageViewer } from '../components/common/ImageViewer';
import { PdfViewer } from '../components/common/PdfViewer';
import { JobsChannelButton } from '../components/common/JobsChannelButton';
import { formatDisplayDate, getJobStatus, getDaysRemaining } from '../utils/dateUtils';
import { getJobApplyMessage } from '../utils/whatsapp';

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, isAdminLoggedIn } = useApp();

  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Job Advertisement Not Found
        </h2>
        <p className="mt-2 text-slate-500 text-sm">
          The requested job might have been removed or the link is invalid.
        </p>
        <Link
          to="/jobs"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Jobs</span>
        </Link>
      </div>
    );
  }

  const status = getJobStatus(job.lastDate);
  const isOpen = status === 'open';
  const daysLeft = getDaysRemaining(job.lastDate);
  const whatsappMsg = getJobApplyMessage(job.title, job.department);
  const currentUrl = window.location.href;

  const handlePrint = () => {
    window.print();
  };

  const images = job.advertisementImages || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Listings</span>
        </button>

        <div className="flex items-center gap-2">
          {isAdminLoggedIn && (
            <Link
              to={`/admin/jobs/edit/${job.id}`}
              className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-300 dark:border-amber-700"
            >
              Edit in Admin
            </Link>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
            title="Print Job Details"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Job</span>
          </button>
        </div>
      </div>

      {/* Main Job Header Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs print:border-none print:p-0">
        {/* Print only brand title */}
        <div className="hidden print:block text-center border-b border-slate-300 pb-3 mb-4">
          <h1 className="text-2xl font-black text-emerald-800">LAJPAL</h1>
          <p className="text-xs text-slate-600 font-bold uppercase">
            Jobs Updates &amp; Online Apply Services • WhatsApp: 0305-6359218
          </p>
        </div>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {job.category}
            </span>
            {job.jobType && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {job.jobType}
              </span>
            )}
            {job.bps && (
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                {job.bps}
              </span>
            )}
          </div>

          <JobStatusBadge lastDate={job.lastDate} size="md" />
        </div>

        {/* Job Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
          {job.title}
        </h1>

        {/* Organization & Location Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{job.department}</span>
          </div>

          {job.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{job.location}</span>
            </div>
          )}

          {job.advertisementNumber && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
              <span>Adv No:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {job.advertisementNumber}
              </span>
            </div>
          )}
        </div>

        {/* Deadline Notice Bar */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-xs">
                Application Deadline
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {formatDisplayDate(job.lastDate, 'long')}
              </span>
            </div>
          </div>

          <div className="text-right sm:text-right">
            <span className="text-slate-500 dark:text-slate-400 block text-xs">
              Time Remaining
            </span>
            <span
              className={`font-black text-sm ${
                isOpen ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {daysLeft}
            </span>
          </div>
        </div>

        {/* Action Buttons: WhatsApp Apply & Official Apply */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3 no-print">
          {/* WhatsApp Apply Button */}
          {job.showWhatsAppApply && isOpen && (
            <WhatsAppButton
              message={whatsappMsg}
              text="💬 Apply Through WhatsApp (0305-6359218)"
              size="lg"
              variant="primary"
              className="flex-1 min-w-[260px]"
            />
          )}

          {/* Official Apply Button (only when enabled and valid link exists) */}
          {job.showOfficialApply && job.officialApplyLink && isOpen && (
            <a
              href={job.officialApplyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[260px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 transition active:scale-95 shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>🌐 Apply on Official Website</span>
            </a>
          )}

          {/* Jobs channel button */}
          <JobsChannelButton size="md" variant="secondary" />
        </div>

        {/* Social Sharing Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4 no-print">
          <ShareButtons
            title={job.title}
            lastDate={formatDisplayDate(job.lastDate)}
            url={currentUrl}
          />
          <Link
            to={`/request-service?service=${encodeURIComponent('Online Form Filling - ' + job.title)}`}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Need shop staff assistance? Submit Request →
          </Link>
        </div>
      </div>

      {/* Complete Specification Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-600" />
          <span>Job Specifications &amp; Eligibility Criteria</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
          {job.vacancies !== undefined && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">
                Number of Vacancies
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                {job.vacancies.toLocaleString()} Posts
              </span>
            </div>
          )}

          {job.bps && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">
                Pay Scale / BPS
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                {job.bps}
              </span>
            </div>
          )}

          {job.gender && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">
                Gender Eligibility
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                {job.gender}
              </span>
            </div>
          )}

          {job.ageLimit && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">
                Age Limit
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {job.ageLimit}
              </span>
            </div>
          )}

          {job.qualification && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 sm:col-span-2">
              <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">
                Required Qualification
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {job.qualification}
              </span>
            </div>
          )}

          {job.experience && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">
                Experience
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {job.experience}
              </span>
            </div>
          )}

          {job.domicile && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">
                Domicile
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {job.domicile}
              </span>
            </div>
          )}

          {job.province && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">
                Province / Region
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {job.province}
              </span>
            </div>
          )}

          {job.salary && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">
                Salary / Pay Scale
              </span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {job.salary}
              </span>
            </div>
          )}

          {job.applicationFee && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">
                Application / Challan Fee
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {job.applicationFee}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Job Description & Important Instructions */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
            Job Description &amp; Scope of Work
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {job.instructions && (
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Important Instructions &amp; Test Guidelines</span>
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed whitespace-pre-line">
              {job.instructions}
            </p>
          </div>
        )}

        {/* Required Documents Checklist */}
        {job.requiredDocuments && job.requiredDocuments.length > 0 && (
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Required Documents Checklist for Application
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {job.requiredDocuments.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Application Method */}
        {job.applicationMethod && (
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              How to Apply
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
              {job.applicationMethod}
            </p>
          </div>
        )}
      </div>

      {/* Official Advertisement Viewer (Images & PDF) */}
      {(images.length > 0 || job.advertisementPdf) && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Official Newspaper Advertisement
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Click any image to view full screen with high-resolution zoom.
              </p>
            </div>
            {images.length > 0 && (
              <button
                onClick={() => {
                  setActiveImageIndex(0);
                  setImageViewerOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Gallery</span>
              </button>
            )}
          </div>

          {/* Advertisement Gallery Images */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setImageViewerOpen(true);
                  }}
                  className="group relative h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer bg-slate-100 dark:bg-slate-950"
                >
                  <img
                    src={img}
                    alt={`${job.title} Advertisement ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold text-sm">
                    <Eye className="w-5 h-5" />
                    <span>Click to Zoom &amp; Fullscreen</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PDF Viewer if PDF advertisement attached */}
          {job.advertisementPdf && (
            <PdfViewer
              pdfUrl={job.advertisementPdf}
              title={`${job.title} - Official PDF Advertisement`}
            />
          )}
        </div>
      )}

      {/* Online Application Assistance Notice Card */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md no-print">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Online Application Assistance
          </span>
          <h3 className="text-xl sm:text-2xl font-black">
            Want LAJPAL to Submit Your Application?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
            Avoid rejection due to incorrect picture size, incomplete documents, or challan mismatch. Our operators verify and submit your application accurately.
          </p>
        </div>

        <WhatsAppButton
          message={whatsappMsg}
          text="💬 Apply via WhatsApp Assistance"
          size="lg"
          variant="primary"
          className="flex-shrink-0"
        />
      </div>

      {/* Full screen Image Modal Viewer */}
      <ImageViewer
        images={images}
        initialIndex={activeImageIndex}
        isOpen={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
        title={job.title}
      />
    </div>
  );
};
