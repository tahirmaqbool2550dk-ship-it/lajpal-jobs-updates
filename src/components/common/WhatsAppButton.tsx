import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl, getGeneralContactMessage } from '../../utils/whatsapp';

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string;
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'subtle' | 'header';
  iconOnly?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message,
  phoneNumber,
  text = 'WhatsApp',
  className = '',
  size = 'md',
  variant = 'primary',
  iconOnly = false,
}) => {
  const finalMessage = message || getGeneralContactMessage();
  const url = createWhatsAppUrl(finalMessage, phoneNumber);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#25D366] hover:bg-[#20ba59] text-white shadow-sm hover:shadow-md transition-all active:scale-[0.98]',
    outline:
      'border-2 border-[#25D366] text-[#25D366] dark:text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all',
    subtle:
      'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/50',
    header:
      'bg-[#25D366] hover:bg-[#1faa51] text-white font-medium shadow-sm hover:shadow active:scale-95 transition-all',
  }[variant];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all ${
        iconOnly ? 'p-2 rounded-full' : sizeClasses
      } ${variantClasses} ${className}`}
      aria-label={text}
      title={text}
    >
      <MessageCircle
        className={`flex-shrink-0 ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} fill-current`}
      />
      {!iconOnly && <span>{text}</span>}
    </a>
  );
};
