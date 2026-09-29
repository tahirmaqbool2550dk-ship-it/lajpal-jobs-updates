import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { OfflineIndicator } from '../common/OfflineIndicator';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <OfflineIndicator />
    </div>
  );
};
