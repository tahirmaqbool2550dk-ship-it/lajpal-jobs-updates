import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Printer,
  FileCheck,
  GraduationCap,
  MessageCircle,
  Car,
  CreditCard,
  Palette,
  FileSignature,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/jobs/JobCard';
import { ServiceCard } from '../components/services/ServiceCard';
import { UpdateCard } from '../components/updates/UpdateCard';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { JobsChannelButton } from '../components/common/JobsChannelButton';
import { JOB_CATEGORIES_LIST } from '../components/jobs/JobFilters';
import { getJobStatus } from '../utils/dateUtils';
import { WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const { jobs, services, posts, settings } = useApp();
  const [selectedHomeCategory, setSelectedHomeCategory] = useState<string>('All');

  // Filter published jobs only for public view
  const publishedJobs = jobs.filter((j) => j.published);

  // Latest jobs: sorted by date (newest first)
  const latestJobs = [...publishedJobs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  // Featured jobs: marked as featured by admin
  const featuredJobs = publishedJobs.filter((j) => j.featured).slice(0, 4);

  // Filtered jobs by category if user clicks a category chip on homepage
  const categoryFilteredJobs =
    selectedHomeCategory === 'All'
      ? []
      : publishedJobs.filter((j) => j.category === selectedHomeCategory);

  // Published updates
  const publishedUpdates = posts.filter((p) => p.published).slice(0, 3);

  // Services breakdown
  const popularServices = services.filter((s) => s.enabled && s.isPopular).slice(0, 8);
  const onlineApplyServices = services.filter((s) => s.enabled && s.category === 'Online Apply').slice(0, 6);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-12 pb-20 sm:pb-24 border-b border-emerald-900/40">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-in fade-in duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pakistan’s Trusted Online Apply &amp; Jobs Information Center</span>
          </div>

          {/* Prominent Brand Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase drop-shadow-sm">
            LAJPAL
          </h1>

          {/* Service Name */}
          <h2 className="mt-3 text-lg sm:text-2xl lg:text-3xl font-extrabold text-amber-400 tracking-wide uppercase max-w-4xl mx-auto">
            Jobs Updates and Online Apply Services
          </h2>

          {/* Short professional description */}
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your single destination for verified government &amp; private job announcements, error-free online application assistance, Punjab E-Stamp, high-speed document printing, and citizen registration services.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
            {/* Latest Jobs Primary Anchor */}
            <a
              href="#latest-jobs"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Latest Jobs</span>
            </a>

            {/* Explore Services */}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all active:scale-95"
            >
              <span>Explore Services</span>
            </Link>

            {/* Contact on WhatsApp */}
            <WhatsAppButton
              text="Contact on WhatsApp"
              size="lg"
              variant="primary"
              className="rounded-xl shadow-lg"
            />

            {/* Join Jobs Channel */}
            <JobsChannelButton
              variant="accent"
              size="lg"
              className="rounded-xl"
            />
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-white">
                {publishedJobs.filter((j) => getJobStatus(j.lastDate) === 'open').length}+
              </span>
              <span className="text-xs text-slate-400 font-medium">Active Job Openings</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-amber-400">100%</span>
              <span className="text-xs text-slate-400 font-medium">Verified Advertisements</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-white">8+</span>
              <span className="text-xs text-slate-400 font-medium">Service Categories</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-emerald-400">0305-6359218</span>
              <span className="text-xs text-slate-400 font-medium">WhatsApp Helpdesk</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST JOBS — FIRST MAJOR CONTENT SECTION */}
      <section id="latest-jobs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
              <span>Jobs Portal Priority</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <span>🔥 Latest Jobs</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Freshly published vacancies in Police, Education, Federal, Army, Banking &amp; Provincial departments with automatic deadline tracking.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition"
          >
            <span>View All Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Latest Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED JOBS */}
      {featuredJobs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-slate-900/5 dark:from-amber-950/20 dark:to-slate-900 border border-amber-300 dark:border-amber-700/50 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Handpicked by Admin</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  🔥 Featured Jobs
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  High-priority public recruitments with large vacancies or closing deadlines.
                </p>
              </div>

              <Link
                to="/jobs/featured"
                className="text-xs font-bold text-amber-800 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Browse All Featured</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. JOB CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Explore Jobs by Category
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Click any sector to instantly discover matching employment notices and eligibility criteria.
          </p>
        </div>

        {/* Category Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {JOB_CATEGORIES_LIST.filter((c) => c !== 'All').map((category) => {
            const count = publishedJobs.filter((j) => j.category === category).length;
            const isSelected = selectedHomeCategory === category;

            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedHomeCategory(isSelected ? 'All' : category);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/50'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 hover:shadow-xs'
                }`}
              >
                <span className="font-bold text-xs sm:text-sm leading-snug">
                  {category}
                </span>
                <span
                  className={`mt-2 text-[11px] font-semibold ${
                    isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count} {count === 1 ? 'Job' : 'Jobs'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected category results if clicked */}
        {selectedHomeCategory !== 'All' && (
          <div className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Filtered: <span className="text-emerald-600">{selectedHomeCategory}</span> ({categoryFilteredJobs.length})
              </h4>
              <button
                onClick={() => setSelectedHomeCategory('All')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Clear Selection
              </button>
            </div>

            {categoryFilteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryFilteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-4 text-center">
                No active jobs currently listed in {selectedHomeCategory}. Check back soon or view all jobs.
              </p>
            )}
          </div>
        )}
      </section>

      {/* 6. VIEW ALL JOBS CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-md">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-black">Looking for Complete Job Listings?</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Search by qualification, city, district, scale, or browse archived expired notices.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition active:scale-95"
            >
              <span>View All Published Jobs ({publishedJobs.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/jobs/expired"
              className="px-4 py-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Past Deadlines
            </Link>
          </div>
        </div>
      </section>

      {/* 7. WHATSAPP JOBS CHANNEL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white p-8 sm:p-12 shadow-xl border border-emerald-600/50">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 bg-emerald-900/60 px-3 py-1 rounded-full mb-3">
              Official Broadcast Channel
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Get Instant Job Alerts Direct on WhatsApp
            </h3>
            <p className="mt-3 text-xs sm:text-sm sm:leading-relaxed text-emerald-100">
              Join thousands of job seekers across Punjab and Pakistan who receive immediate PDF advertisements, test dates, and roll number slip updates directly from LAJPAL.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <JobsChannelButton
                size="lg"
                variant="accent"
                className="text-slate-950"
              />
              <WhatsAppButton
                text="Inquire on 0305-6359218"
                size="lg"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. LATEST UPDATES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
              <span>Notice Board</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              📢 Latest Updates &amp; Notices
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Official press releases, admission deadlines, scholarship schedules, and important public announcements.
            </p>
          </div>

          <Link
            to="/updates"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 transition"
          >
            <span>View All Updates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedUpdates.map((post) => (
            <UpdateCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 9. POPULAR SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1">
            <span>Customer Favorites</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">
            ⭐ Popular Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Fast, reliable, and error-free computer &amp; documentation services handled by our experienced shop staff.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 10. ONLINE APPLY SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Full-Service Submission
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Online Apply Services
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                We handle complete registration, profile building, challan generation, fee upload, and final admission slips for all major testing agencies and government portals.
              </p>
            </div>

            <Link
              to="/services/online-apply"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white transition active:scale-95"
            >
              <span>View All 14 Online Apply Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {onlineApplyServices.map((srv) => (
              <ServiceCard key={srv.id} service={srv} />
            ))}
          </div>
        </div>
      </section>

      {/* 11. OTHER SERVICE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Complete Shop Services Catalog
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Browse our dedicated service counters for instant physical and digital document handling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* E-Stamp */}
          <Link
            to="/services/e-stamp"
            className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileSignature className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                📜 E-Stamp &amp; Legal Agreements
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Punjab e-Stamping 32-A Challan, Stamp Paper Guidance, Affidavits, Rental Agreements, and Barcode Verification.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
              Explore E-Stamp →
            </span>
          </Link>

          {/* Computer & Printing */}
          <Link
            to="/services/printing"
            className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Printer className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                🖨️ Computer &amp; Printing Services
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Color/B&amp;W Laser Printing, Photocopy, High-Res Scanning, Lamination, Spiral Binding, Urdu &amp; English Typing, PDF Merge/Split.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
              Explore Printing →
            </span>
          </Link>

          {/* CV / Resume */}
          <Link
            to="/services/cv-resume"
            className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                📄 CV &amp; Resume Services
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Professional ATS CV, Modern Resumes, Cover Letters, English &amp; Urdu CV Drafting, and Premium Heavy Paper Printing.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
              Explore CV Services →
            </span>
          </Link>

          {/* Vehicle Services */}
          <Link
            to="/services/vehicle"
            className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Car className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                🚗 Vehicle Services
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Token Tax E-Payment, Learner Driving Licence Issuance, Licence Renewal Guidance, and Duplicate Smart Registration Cards.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
              Explore Vehicle Services →
            </span>
          </Link>

          {/* Card & Documents */}
          <Link
            to="/services/documents"
            className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                🪪 Card &amp; Document Services
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Plastic PVC Smart Cards, Student/Employee ID Badges, Visiting Cards, Domicile Guidance, and FRC Certificate Information.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
              Explore Card Services →
            </span>
          </Link>

          {/* Graphic Designing */}
          <Link
            to="/services/designing"
            className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                🎨 Graphic Designing Services
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Flex Boards, Business Banners, Visiting Cards, Wedding Cards, YouTube Thumbnails, and Passport Photo Suit/Background Editing.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
              Explore Graphic Design →
            </span>
          </Link>
        </div>
      </section>

      {/* 12. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Reliable Experience
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1">
              Why Choose LAJPAL Online Services?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              We treat your crucial job applications, degrees, and legal documents with precision and confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start space-y-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-white">Zero Form Rejection Guarantee</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Double-checked academic credentials, accurate image compression (under 25KB/50KB), and correct fee deposit verification.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start space-y-3">
              <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-white">Instant WhatsApp Submission</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No need to stand in long lines. Send pictures of your certificates to 0305-6359218 and receive verified apply receipts right at home.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start space-y-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-white">100% Genuine Government Sources</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every job posted is backed by official gazette copies, departmental advertisements, and direct portal links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 13. REQUEST A SERVICE CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Fast Track Processing
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1">
              Need Help with an Application or Document?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
              Submit your request online. You will receive an instant unique Request ID to track status, and our operator will contact you on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/request-service"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-100 text-emerald-900 shadow-md transition active:scale-95"
            >
              Request a Service Now
            </Link>
            <WhatsAppButton
              text="Direct WhatsApp"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-emerald-900"
            />
          </div>
        </div>
      </section>

      {/* 14. CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Get In Touch
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Visit LAJPAL or Contact on WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {settings.aboutText}
              </p>

              <div className="mt-6 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Shop Address:</strong> {settings.shopAddress}
                </p>
                <p>
                  <strong>Working Hours:</strong> {settings.shopHours}
                </p>
                <p>
                  <strong>Primary WhatsApp:</strong>{' '}
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {WHATSAPP_RAW_NUMBER}
                  </span>
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppButton
                  text="Chat on WhatsApp (0305-6359218)"
                  size="md"
                  variant="primary"
                />
                <JobsChannelButton
                  variant="primary"
                  size="md"
                />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center sm:text-left">
              <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                Need Immediate Help?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Whether you need urgent CV drafting, police recruitment form submission, or e-stamp challan generation, our operators respond promptly during working hours.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No physical presence needed for most online apply services</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Challans and roll number slips sent via WhatsApp PDF</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Printout delivery &amp; urgent counter pickup available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
