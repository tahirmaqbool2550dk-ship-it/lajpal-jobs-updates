import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Layers, Search, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/services/ServiceCard';
import { ServiceMainCategory } from '../types';
import { EmptyState } from '../components/common/EmptyState';
import { WhatsAppButton } from '../components/common/WhatsAppButton';

const SERVICE_CATEGORIES: (ServiceMainCategory | 'All')[] = [
  'All',
  'Online Apply',
  'Vehicle',
  'Card & Document',
  'Government Document',
  'E-Stamp',
  'Computer & Printing',
  'CV / Resume',
  'Graphic Designing',
];

export const ServicesPage: React.FC = () => {
  const { services } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = (searchParams.get('category') as ServiceMainCategory | 'All') || 'All';
  const [selectedCategory, setSelectedCategory] = useState<ServiceMainCategory | 'All'>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');

  const enabledServices = useMemo(() => services.filter((s) => s.enabled), [services]);

  const filteredServices = useMemo(() => {
    return enabledServices.filter((s) => {
      if (selectedCategory !== 'All' && s.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesDesc = s.description.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }
      return true;
    });
  }, [enabledServices, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
            <span>Online &amp; Computer Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            All Shop Services &amp; Facilitation
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            From online government form submission to official e-stamp issuance, laser printing, and high-impact CV writing.
          </p>
        </div>

        <WhatsAppButton text="Inquire on WhatsApp" size="md" />
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services (e.g. Police apply, E-Stamp, Token Tax, PVC Card)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {SERVICE_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const count =
              category === 'All'
                ? enabledServices.length
                : enabledServices.filter((s) => s.category === category).length;

            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchParams(category === 'All' ? {} : { category });
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No services found"
          description="Try searching with a different keyword or reset category filter."
          icon="search"
          action={
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSearchParams({});
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Reset Search
            </button>
          }
        />
      )}
    </div>
  );
};
