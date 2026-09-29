import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { Logo } from '../common/Logo';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { JobsChannelButton } from '../common/JobsChannelButton';
import { ThemeToggle } from '../common/ThemeToggle';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { MobileMenu } from './MobileMenu';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdminLoggedIn } = useApp();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Online Apply', path: '/services/online-apply' },
    { label: 'Jobs & Updates', path: '/jobs' },
    { label: 'E-Stamp', path: '/services/e-stamp' },
    { label: 'Printing', path: '/services/printing' },
    { label: 'CV / Resume', path: '/services/cv-resume' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo: Prominent LAJPAL + Name */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Buttons: WhatsApp & Channel */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            {/* Install PWA Button */}
            <PWAInstallButton />

            {/* Dark / Light Toggle */}
            <ThemeToggle />

            {/* WhatsApp Contact */}
            <WhatsAppButton
              text="WhatsApp"
              size="sm"
              variant="header"
              className="text-xs"
            />

            {/* Join Jobs Channel CTA */}
            <JobsChannelButton
              size="sm"
              variant="header"
              className="text-xs py-2"
            />

            {/* Admin indicator if logged in */}
            {isAdminLoggedIn && (
              <Link
                to="/admin"
                className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 text-xs font-semibold flex items-center gap-1"
                title="Admin Dashboard"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden xl:inline">Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
