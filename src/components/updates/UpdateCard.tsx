import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BellRing, ExternalLink, ArrowRight, Image as ImageIcon, FileText } from 'lucide-react';
import { ContentPost } from '../../types';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { formatDisplayDate, isPostExpired } from '../../utils/dateUtils';
import { createWhatsAppUrl } from '../../utils/whatsapp';

interface UpdateCardProps {
  post: ContentPost;
}

export const UpdateCard: React.FC<UpdateCardProps> = ({ post }) => {
  const expired = isPostExpired(post.expiryDate);
  const whatsappMsg = `Assalam-o-Alaikum, I am inquiring about the update: "${post.title}" on LAJPAL website. Please provide guidance.`;

  return (
    <article className="group rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between">
      {/* Optional Featured Image */}
      {post.featuredImage && (
        <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
            {post.postType}
          </div>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        {!post.featuredImage && (
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {post.postType}
            </span>
            {post.expiryDate && (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  expired
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                }`}
              >
                {expired ? '🔴 Expired' : '🟢 Active'}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{formatDisplayDate(post.date)}</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
          <Link to={`/updates/${post.id}`}>{post.title}</Link>
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
          {post.description}
        </p>

        {/* Attachment badges */}
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          {post.pdf && (
            <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
              <FileText className="w-3.5 h-3.5" /> PDF
            </span>
          )}
          {post.multipleImages && post.multipleImages.length > 0 && (
            <span className="flex items-center gap-1 font-medium">
              <ImageIcon className="w-3.5 h-3.5" /> {post.multipleImages.length} Images
            </span>
          )}
        </div>
      </div>

      <div className="p-4 pt-2 bg-slate-50/60 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <Link
          to={`/updates/${post.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
        >
          <span>Read Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {post.showWhatsAppButton && (
          <WhatsAppButton
            message={whatsappMsg}
            text="Inquire"
            size="sm"
            variant="primary"
          />
        )}
      </div>
    </article>
  );
};
