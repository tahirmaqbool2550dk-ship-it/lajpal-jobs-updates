import React, { useState } from 'react';
import { Share2, Copy, Check, MessageSquare } from 'lucide-react';
import { getJobShareMessage } from '../../utils/whatsapp';
import { useApp } from '../../context/AppContext';

interface ShareButtonsProps {
  title: string;
  lastDate?: string;
  url?: string;
  className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  title,
  lastDate = '',
  url,
  className = '',
}) => {
  const { addToast } = useApp();
  const [copied, setCopied] = useState(false);

  const fullUrl = url || window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      addToast('Link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      addToast('Unable to copy automatically. Please copy from browser address bar.', 'warning');
    }
  };

  const handleWhatsAppShare = () => {
    const text = getJobShareMessage(title, lastDate, fullUrl);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out ${title} on LAJPAL Jobs`,
          url: fullUrl,
        });
      } catch (e: unknown) {
        if ((e as Error).name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
        Share:
      </span>

      {/* WhatsApp Share */}
      <button
        onClick={handleWhatsAppShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#25D366]/10 text-[#1da851] hover:bg-[#25D366] hover:text-white dark:bg-[#25D366]/20 dark:text-[#2fe675] dark:hover:bg-[#25D366] dark:hover:text-white rounded-lg transition-all"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <MessageSquare className="w-3.5 h-3.5 fill-current" />
        <span>WhatsApp</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-lg transition-all"
        title="Copy Link"
        aria-label="Copy Link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Native Web Share */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/50 dark:text-emerald-300 rounded-lg transition-all"
          title="Share..."
          aria-label="Share"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>More</span>
        </button>
      )}
    </div>
  );
};
