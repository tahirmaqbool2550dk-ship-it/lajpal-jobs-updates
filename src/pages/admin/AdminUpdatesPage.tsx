import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostType, ContentPost } from '../../types';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { formatDisplayDate, isPostExpired } from '../../utils/dateUtils';

export const AdminUpdatesPage: React.FC = () => {
  const { posts, deletePost, togglePostPublish, togglePostFeatured } = useApp();
  const [searchParams] = useSearchParams();

  const typeParam = searchParams.get('type') || 'All';
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>(typeParam);
  const [postToDelete, setPostToDelete] = useState<ContentPost | null>(null);

  const filteredPosts = posts.filter((p) => {
    if (selectedType !== 'All' && p.postType !== selectedType) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  const postTypes = [
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
    'Other',
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Content &amp; Updates Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish advertisements, scholarships, admissions, notices, and press releases.
          </p>
        </div>

        <Link
          to="/admin/updates/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Post</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search updates or announcements..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white"
        >
          {postTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* 42. Content Admin Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5 sm:p-4">Title</th>
                <th className="p-3.5 sm:p-4">Type</th>
                <th className="p-3.5 sm:p-4">Date</th>
                <th className="p-3.5 sm:p-4">Expiry</th>
                <th className="p-3.5 sm:p-4 text-center">Featured</th>
                <th className="p-3.5 sm:p-4 text-center">Status</th>
                <th className="p-3.5 sm:p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPosts.map((post) => {
                const expired = isPostExpired(post.expiryDate);

                return (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 dark:text-white max-w-xs">
                      <Link
                        to={`/updates/${post.id}`}
                        target="_blank"
                        className="hover:text-emerald-600 transition inline-flex items-center gap-1"
                      >
                        <span className="truncate">{post.title}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                      </Link>
                    </td>

                    <td className="p-3.5 sm:p-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold text-[11px]">
                        {post.postType}
                      </span>
                    </td>

                    <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-300 font-medium">
                      {formatDisplayDate(post.date)}
                    </td>

                    <td className="p-3.5 sm:p-4">
                      {post.expiryDate ? (
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            expired
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          {expired ? '🔴 Expired' : `🟢 Active (${formatDisplayDate(post.expiryDate)})`}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">No Expiry</span>
                      )}
                    </td>

                    <td className="p-3.5 sm:p-4 text-center">
                      <button
                        onClick={() => togglePostFeatured(post.id)}
                        className={`p-1.5 rounded-lg transition ${
                          post.featured
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950'
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={post.featured ? 'Featured' : 'Click to feature'}
                      >
                        <Sparkles className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    <td className="p-3.5 sm:p-4 text-center">
                      <button
                        onClick={() => togglePostPublish(post.id)}
                        className={`p-1.5 rounded-lg transition font-bold text-[11px] ${
                          post.published
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
                            : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    <td className="p-3.5 sm:p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/updates/${post.id}`}
                          target="_blank"
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          to={`/admin/updates/edit/${post.id}`}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setPostToDelete(post)}
                          className="p-1.5 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!postToDelete}
        title="Delete Content Post"
        message={`Are you sure you want to delete "${postToDelete?.title}"?`}
        confirmText="Delete Post"
        onConfirm={() => {
          if (postToDelete) {
            deletePost(postToDelete.id);
            setPostToDelete(null);
          }
        }}
        onCancel={() => setPostToDelete(null)}
      />
    </div>
  );
};
