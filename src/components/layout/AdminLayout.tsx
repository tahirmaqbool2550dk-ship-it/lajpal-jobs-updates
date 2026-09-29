import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  FileText,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  GraduationCap,
  Award,
  Landmark,
  Megaphone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';

export const AdminLayout: React.FC = () => {
  const { isAdminLoggedIn, logoutAdmin, requests } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if unauthenticated
  if (!isAdminLoggedIn) {
    navigate('/admin/login');
    return null;
  }

  const pendingRequestsCount = requests.filter((r) => r.status === 'Pending').length;

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Jobs Manager', path: '/admin/jobs', icon: Briefcase },
    { label: 'Services Manager', path: '/admin/services', icon: Layers },
    {
      label: 'Customer Requests',
      path: '/admin/requests',
      icon: Inbox,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
    },
    { label: 'Updates & Posts', path: '/admin/updates', icon: FileText },
    { label: 'Advertisements', path: '/admin/updates?type=Advertisements', icon: Megaphone },
    { label: 'Announcements', path: '/admin/updates?type=Announcements', icon: FileText },
    { label: 'Scholarships', path: '/admin/updates?type=Scholarships', icon: Award },
    { label: 'Admissions', path: '/admin/updates?type=Admissions', icon: GraduationCap },
    { label: 'Internships', path: '/admin/updates?type=Internships', icon: Briefcase },
    { label: 'Government Schemes', path: '/admin/updates?type=Government Schemes', icon: Landmark },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <Logo showSubtitle={false} />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle admin sidebar"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Area */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800">
            <Logo />
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Admin Management Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Theme</span>
            <ThemeToggle />
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-1.5 w-full py-2 px-3 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 hover:bg-slate-200 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 w-full py-2 px-3 text-xs font-semibold rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
