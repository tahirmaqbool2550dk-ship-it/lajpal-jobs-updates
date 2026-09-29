import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { Logo } from '../common/Logo';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { JobsChannelButton } from '../common/JobsChannelButton';
import { ThemeToggle } from '../common/ThemeToggle';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { useApp } from '../../context/AppContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAdminLoggedIn } = useApp();

  if (!isOpen) return null;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: '🔥 Latest Jobs', path: '/jobs' },
    { label: 'Featured Jobs', path: '/jobs/featured' },
    { label: 'Online Apply Services', path: '/services/online-apply' },
    { label: 'All Services', path: '/services' },
    { label: 'E-Stamp', path: '/services/e-stamp' },
    { label: 'Printing & Computer', path: '/services/printing' },
    { label: 'CV / Resume', path: '/services/cv-resume' },
    { label: 'Vehicle Services', path: '/services/vehicle' },
    { label: 'Card & Documents', path: '/services/documents' },
    { label: 'Graphic Designing', path: '/services/designing' },
    { label: '📢 Latest Updates', path: '/updates' },
    { label: 'Request a Service', path: '/request-service' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-xs md:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-4/5 max-w-sm h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-y-auto border-r border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-200">
        {/* Top bar inside mobile drawer */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Logo showSubtitle={false} />
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Priority Action Buttons */}
        <div className="p-4 space-y-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
          <JobsChannelButton className="w-full justify-center text-xs py-2.5" />
          <WhatsAppButton
            text="WhatsApp Us"
            className="w-full justify-center text-xs py-2.5"
            size="sm"
          />
          <PWAInstallButton className="w-full justify-center" />
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1 flex-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Admin Link */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs">
          <Link
            to={isAdminLoggedIn ? '/admin' : '/admin/login'}
            onClick={onClose}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Portal Login'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
