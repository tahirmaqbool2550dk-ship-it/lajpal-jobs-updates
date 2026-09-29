import React, { useState } from 'react';
import {
  MessageSquare,
  MapPin,
  Clock,
  Mail,
  Send,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { JobsChannelButton } from '../components/common/JobsChannelButton';
import { WHATSAPP_RAW_NUMBER, createWhatsAppUrl } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const { settings, addToast } = useApp();

  const [inquiryName, setInquiryName] = useState('');
  const [inquirySubject, setInquirySubject] = useState('Job Application Inquiry');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) {
      addToast('Please enter your name and message.', 'warning');
      return;
    }

    const compiledMsg = `Assalam-o-Alaikum, I am ${inquiryName.trim()}.
Subject: ${inquirySubject}

Message:
${inquiryMessage.trim()}

Sent from LAJPAL Contact Page.`;

    const url = createWhatsAppUrl(compiledMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
          <span>Customer Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Contact LAJPAL
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Reach out to our customer care counter via WhatsApp or visit our computer shop during business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Contact Info & Primary WhatsApp Focus */}
        <div className="space-y-6">
          {/* Primary WhatsApp Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-900 text-white shadow-lg space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Fastest Response Method
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              WhatsApp Customer Desk
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              For instant queries, document review, roll number slip downloads, or fee challan prints, send us a message on WhatsApp directly.
            </p>

            <div className="pt-2">
              <span className="text-2xl sm:text-3xl font-mono font-black text-white block">
                {WHATSAPP_RAW_NUMBER}
              </span>
              <span className="text-xs text-emerald-200 mt-1 block">
                Pakistan Country Code: +92 305 6359218
              </span>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <WhatsAppButton
                text="Open WhatsApp Chat"
                size="lg"
                variant="outline"
                className="bg-white text-emerald-900 border-white hover:bg-emerald-50 hover:text-emerald-950 font-bold"
              />
              <JobsChannelButton variant="accent" size="lg" />
            </div>
          </div>

          {/* Shop Location & Working Hours */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Location &amp; Timings
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">
                    Shop Address:
                  </strong>
                  <span>{settings.shopAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">
                    Working Hours:
                  </strong>
                  <span>{settings.shopHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white mb-0.5">
                    Email Correspondence:
                  </strong>
                  <span>{settings.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Message Builder -> Direct WhatsApp */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Send Message to WhatsApp Desk
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Type your inquiry here and it will open directly in WhatsApp with your text pre-formatted.
            </p>
          </div>

          <form onSubmit={handleSendToWhatsApp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder="e.g. Usman Ali"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Topic / Subject
              </label>
              <select
                value={inquirySubject}
                onChange={(e) => setInquirySubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Job Application Inquiry">Job Application Inquiry</option>
                <option value="E-Stamp / Agreement Inquiry">E-Stamp / Agreement Inquiry</option>
                <option value="Printing & Scanning Inquiry">Printing &amp; Scanning Inquiry</option>
                <option value="CV / Resume Drafting">CV / Resume Drafting</option>
                <option value="Token Tax / Vehicle License">Token Tax / Vehicle License</option>
                <option value="Other Service Inquiry">Other General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Your Message / Question <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                placeholder="Please state how we can help you..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md transition active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Send via WhatsApp to 0305-6359218</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
