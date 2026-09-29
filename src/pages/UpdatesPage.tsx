import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BellRing, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UpdateCard } from '../components/updates/UpdateCard';
import { PostType } from '../types';
import { EmptyState } from '../components/common/EmptyState';
import { JobsChannelButton } from '../components/common/JobsChannelButton';

const POST_TYPES: (PostType | 'All')[] = [
  'All',
  'Advertisements',
  'General Updates',
  'Announcements',
  'Scholarships',
  'Admissions',
  'Internships',
  'Government Schemes',
  'Important Dates',
  'Notices',
  'Offers / Promotions',
];

export const UpdatesPage: React.FC = () => {
  const { posts } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialType = (searchParams.get('type') as PostType | 'All') || 'All';
  const [selectedType, setSelectedType] = useState<PostType | 'All'>(initialType);
  const [searchQuery, setSearchQuery] = useState('');

  const publishedPosts = useMemo(() => posts.filter((p) => p.published), [posts]);

  const filteredPosts = useMemo(() => {
    return publishedPosts.filter((post) => {
      if (selectedType !== 'All' && post.postType !== selectedType) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesDesc = post.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc) return false;
      }
      return true;
    });
  }, [publishedPosts, selectedType, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
            <span>Notice Board &amp; News</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Latest Updates &amp; Announcements
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Official advertisements, admissions, scholarship alerts, and critical deadlines published directly by the LAJPAL admin desk.
          </p>
        </div>

        <JobsChannelButton variant="header" size="md" />
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search updates, scholarships, admissions..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Post Type Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {POST_TYPES.map((type) => {
            const isSelected = selectedType === type;
            const count =
              type === 'All'
                ? publishedPosts.length
                : publishedPosts.filter((p) => p.postType === type).length;

            return (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setSearchParams(type === 'All' ? {} : { type });
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {type} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Updates Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <UpdateCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No updates found"
          description="There are currently no updates matching your selected filter or keywords."
          icon="inbox"
          action={
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setSearchParams({});
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Reset Filters
            </button>
          }
        />
      )}
    </div>
  );
};
