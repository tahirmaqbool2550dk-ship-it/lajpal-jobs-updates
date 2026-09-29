import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/common/Toast';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { FeaturedJobsPage } from './pages/FeaturedJobsPage';
import { ExpiredJobsPage } from './pages/ExpiredJobsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceCategoryPage } from './pages/ServiceCategoryPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { UpdateDetailPage } from './pages/UpdateDetailPage';
import { RequestServicePage } from './pages/RequestServicePage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminJobsPage } from './pages/admin/AdminJobsPage';
import { AdminJobEditPage } from './pages/admin/AdminJobEditPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminUpdatesPage } from './pages/admin/AdminUpdatesPage';
import { AdminUpdateEditPage } from './pages/admin/AdminUpdateEditPage';
import { AdminRequestsPage } from './pages/admin/AdminRequestsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            
            {/* Jobs Routes */}
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/jobs/featured" element={<FeaturedJobsPage />} />
            <Route path="/jobs/expired" element={<ExpiredJobsPage />} />

            {/* Services Routes */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:categorySlug" element={<ServiceCategoryPage />} />

            {/* Updates Routes */}
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/updates/:id" element={<UpdateDetailPage />} />

            {/* Service Request & Contact */}
            <Route path="/request-service" element={<RequestServicePage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Login within public shell or dedicated */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
          </Route>

          {/* Admin Management Dashboard Routes (Protected) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="jobs" element={<AdminJobsPage />} />
            <Route path="jobs/new" element={<AdminJobEditPage />} />
            <Route path="jobs/edit/:id" element={<AdminJobEditPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="updates" element={<AdminUpdatesPage />} />
            <Route path="updates/new" element={<AdminUpdateEditPage />} />
            <Route path="updates/edit/:id" element={<AdminUpdateEditPage />} />
            <Route path="requests" element={<AdminRequestsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Fallback route to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
