import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ServiceItem } from '../../types';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { getServiceInquiryMessage } from '../../utils/whatsapp';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Dynamic Lucide icon lookup with fallback
  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[service.iconName] || Icons.FileText;
  const whatsappMsg = getServiceInquiryMessage(service.name);

  return (
    <div className="group relative rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <IconComponent className="w-5 h-5 transition-colors" />
          </div>
          <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {service.category}
          </span>
        </div>

        <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {service.name}
        </h4>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
          {service.description}
        </p>

        {service.turnaroundTime && (
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <Icons.Clock className="w-3.5 h-3.5" />
            <span>Turnaround: {service.turnaroundTime}</span>
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
        <Link
          to={`/request-service?service=${encodeURIComponent(service.name)}`}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
        >
          Request Service
        </Link>

        {service.showWhatsAppButton && (
          <WhatsAppButton
            message={whatsappMsg}
            text="WhatsApp"
            size="sm"
            variant="primary"
          />
        )}
      </div>
    </div>
  );
};
