import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  ExternalLink,
  ArrowLeft,
  Video,
  FileText,
  Share2,
  Clock,
  Printer,
  Eye,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { ShareButtons } from '../components/common/ShareButtons';
import { ImageViewer } from '../components/common/ImageViewer';
import { PdfViewer } from '../components/common/PdfViewer';
import { formatDisplayDate, isPostExpired } from '../utils/dateUtils';

export const UpdateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, isAdminLoggedIn } = useApp();

  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Update Not Found</h2>
        <Link
          to="/updates"
          className="mt-4 inline-flex items-center gap-2 text-emerald-600 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Updates</span>
        </Link>
      </div>
    );
  }

  const expired = isPostExpired(post.expiryDate);
  const images = [
    ...(post.featuredImage ? [post.featuredImage] : []),
    ...(post.multipleImages || []),
  ];

  const whatsappMsg = `Assalam-o-Alaikum, I am inquiring about the post "${post.title}" published on LAJPAL website. Please guide me.`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          {isAdminLoggedIn && (
            <Link
              to={`/admin/updates/edit/${post.id}`}
              className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-300"
            >
              Edit in Admin
            </Link>
          )}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <article className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Meta badges */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {post.postType}
            </span>
            {post.expiryDate && (
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  expired
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                }`}
              >
                {expired ? '🔴 Expired' : '🟢 Active Post'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Published: {formatDisplayDate(post.date, 'long')}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        {/* Featured Image if present */}
        {post.featuredImage && (
          <div
            onClick={() => {
              setActiveImageIdx(0);
              setViewerOpen(true);
            }}
            className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-96 w-full bg-slate-100 dark:bg-slate-950 cursor-pointer group relative"
          >
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold text-sm">
              <Eye className="w-5 h-5" />
              <span>Click to view larger</span>
            </div>
          </div>
        )}

        {/* Description Body */}
        <div className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
          {post.description}
        </div>

        {/* Expiry Date note if specified */}
        {post.expiryDate && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Notice Valid Until:</span>
            <strong className="text-slate-900 dark:text-white">
              {formatDisplayDate(post.expiryDate, 'long')}
            </strong>
          </div>
        )}

        {/* Multiple Images Gallery */}
        {post.multipleImages && post.multipleImages.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Attached Images Gallery ({post.multipleImages.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {post.multipleImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const offset = post.featuredImage ? 1 : 0;
                    setActiveImageIdx(idx + offset);
                    setViewerOpen(true);
                  }}
                  className="h-32 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer hover:opacity-90 transition"
                >
                  <img
                    src={img}
                    alt={`Attachment ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PDF Viewer if exists */}
        {post.pdf && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <PdfViewer pdfUrl={post.pdf} title={`${post.title} (PDF Document)`} />
          </div>
        )}

        {/* Video Link */}
        {post.videoLink && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <a
              href={post.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-xs transition"
            >
              <Video className="w-4 h-4" />
              <span>Watch Video / Video Explanation</span>
            </a>
          </div>
        )}

        {/* Actions Bar */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 no-print">
          <div className="flex items-center gap-2 flex-wrap">
            {post.showWhatsAppButton && (
              <WhatsAppButton
                message={whatsappMsg}
                text="Inquire via WhatsApp"
                size="md"
                variant="primary"
              />
            )}

            {post.officialWebsiteLink && (
              <a
                href={post.officialWebsiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Official Website</span>
              </a>
            )}
          </div>

          <ShareButtons title={post.title} />
        </div>
      </article>

      {/* ImageViewer Modal */}
      {images.length > 0 && (
        <ImageViewer
          images={images}
          initialIndex={activeImageIdx}
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          title={post.title}
        />
      )}
    </div>
  );
};
