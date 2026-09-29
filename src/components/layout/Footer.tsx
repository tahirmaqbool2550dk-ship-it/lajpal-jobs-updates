import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from '../common/Logo';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { JobsChannelButton } from '../common/JobsChannelButton';
import { useApp } from '../../context/AppContext';
import { WHATSAPP_RAW_NUMBER } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  const { settings } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors no-print">
      {/* Top Banner / Channel Callout */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 py-6 border-b border-emerald-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="text-white text-lg font-bold">
              Never Miss A Government or Private Job Update!
            </h3>
            <p className="text-emerald-200 text-xs sm:text-sm mt-0.5">
              Get immediate alerts on WhatsApp channel for Punjab &amp; Federal job advertisements.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <JobsChannelButton variant="accent" size="md" />
            <WhatsAppButton
              text="WhatsApp Us"
              variant="primary"
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              {settings.aboutText}
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.shopAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.shopHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="font-semibold text-slate-200">
                  WhatsApp Contact: {WHATSAPP_RAW_NUMBER}
                </span>
              </div>
            </div>
          </div>

          {/* Jobs & Updates Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Jobs &amp; Updates
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/jobs" className="hover:text-emerald-400 transition">
                  🔥 Latest Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs/featured" className="hover:text-emerald-400 transition">
                  ⭐ Featured Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs/expired" className="hover:text-emerald-400 transition">
                  📁 Expired Jobs Archive
                </Link>
              </li>
              <li>
                <Link to="/updates" className="hover:text-emerald-400 transition">
                  📢 Latest Updates &amp; Notices
                </Link>
              </li>
              <li>
                <Link to="/services/online-apply" className="hover:text-emerald-400 transition">
                  🌐 Online Apply Assistance
                </Link>
              </li>
            </ul>
          </div>

          {/* Citizen & Shop Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Key Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/e-stamp" className="hover:text-emerald-400 transition">
                  📜 E-Stamp &amp; Affidavits
                </Link>
              </li>
              <li>
                <Link to="/services/printing" className="hover:text-emerald-400 transition">
                  🖨️ Computer &amp; Printing
                </Link>
              </li>
              <li>
                <Link to="/services/cv-resume" className="hover:text-emerald-400 transition">
                  📄 Professional CV / Resume
                </Link>
              </li>
              <li>
                <Link to="/services/vehicle" className="hover:text-emerald-400 transition">
                  🚗 Vehicle Token &amp; Licence
                </Link>
              </li>
              <li>
                <Link to="/services/documents" className="hover:text-emerald-400 transition">
                  🪪 PVC &amp; Smart Cards
                </Link>
              </li>
              <li>
                <Link to="/services/designing" className="hover:text-emerald-400 transition">
                  🎨 Graphic &amp; Flex Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Actions & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Assistance &amp; Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/request-service"
                  className="font-semibold text-emerald-400 hover:text-emerald-300 transition"
                >
                  📝 Submit Service Request
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition">
                  💬 Contact &amp; Hours
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <span className="text-[11px] block text-slate-400 mb-1.5 font-semibold">
                Official Jobs Channel
              </span>
              <JobsChannelButton size="sm" variant="header" className="w-full text-center" />
            </div>
          </div>
        </div>

        {/* Business Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-slate-400">Important Disclaimer:</strong> {settings.disclaimer}
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            &copy; {new Date().getFullYear()} <strong>LAJPAL</strong> - Jobs Updates &amp; Online Apply Services. All rights reserved.
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            Designed for Citizens of Pakistan with <Heart className="w-3 h-3 text-rose-500 fill-current" />
          </span>
        </div>
      </div>
    </footer>
  );
};
