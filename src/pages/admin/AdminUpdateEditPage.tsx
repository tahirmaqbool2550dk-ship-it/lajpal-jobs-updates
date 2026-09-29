import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostType } from '../../types';
import { FileUploader } from '../../components/common/FileUploader';
import { getTodayDateString } from '../../utils/dateUtils';

const POST_TYPES: PostType[] = [
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

export const AdminUpdateEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { posts, addPost, updatePost } = useApp();

  const existing = !isNew ? posts.find((p) => p.id === id) : undefined;

  const [title, setTitle] = useState('');
  const [postType, setPostType] = useState<PostType>('Advertisements');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(getTodayDateString());
  const [featuredImage, setFeaturedImage] = useState('');
  const [multipleImages, setMultipleImages] = useState<string[]>([]);
  const [pdf, setPdf] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [officialWebsiteLink, setOfficialWebsiteLink] = useState('');
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setPostType(existing.postType);
      setDescription(existing.description);
      setDate(existing.date);
      setFeaturedImage(existing.featuredImage || '');
      setMultipleImages(existing.multipleImages || []);
      setPdf(existing.pdf || '');
      setVideoLink(existing.videoLink || '');
      setOfficialWebsiteLink(existing.officialWebsiteLink || '');
      setShowWhatsAppButton(existing.showWhatsAppButton);
      setFeatured(existing.featured);
      setPublished(existing.published);
      setExpiryDate(existing.expiryDate || '');
    }
  }, [existing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const data = {
      title: title.trim(),
      postType,
      description: description.trim(),
      date,
      featuredImage: featuredImage.trim() || undefined,
      multipleImages: multipleImages.length > 0 ? multipleImages : undefined,
      pdf: pdf.trim() || undefined,
      videoLink: videoLink.trim() || undefined,
      officialWebsiteLink: officialWebsiteLink.trim() || undefined,
      showWhatsAppButton,
      featured,
      published,
      expiryDate: expiryDate.trim() || undefined,
    };

    if (isNew) {
      addPost(data);
    } else if (existing) {
      updatePost(existing.id, data);
    }

    navigate('/admin/updates');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate('/admin/updates')}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {isNew ? 'Create New Content / Notice' : 'Edit Content Post'}
          </h1>
          <p className="text-xs text-slate-500">
            Publish without editing source code. Upload images, PDF, and links.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Post Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. PPSC Consolidated Advertisement No. 12/2026 Announced"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Post Type <span className="text-rose-500">*</span>
            </label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value as PostType)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {POST_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Publish Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Full Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write complete notice information, deadlines, and requirements..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Official Website Link
            </label>
            <input
              type="url"
              value={officialWebsiteLink}
              onChange={(e) => setOfficialWebsiteLink(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Video Guide Link (YouTube URL)
            </label>
            <input
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Featured Header Image URL
          </label>
          <input
            type="text"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            placeholder="https://... image URL or base64"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>

        {/* Multi Image Upload */}
        <FileUploader
          label="Multiple Gallery Images"
          accept="image/jpeg,image/png,image/webp"
          multiple={true}
          initialFiles={multipleImages}
          onChange={setMultipleImages}
          helperText="Upload supporting newspaper cuts or notices"
        />

        {/* Toggles */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-emerald-700 dark:text-emerald-400">
            <input
              type="checkbox"
              checked={showWhatsAppButton}
              onChange={(e) => setShowWhatsAppButton(e.target.checked)}
              className="rounded text-emerald-600"
            />
            <span>Show WhatsApp Inquire Button</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-amber-700 dark:text-amber-400">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded text-amber-600"
            />
            <span>Feature on Homepage</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded text-emerald-600"
            />
            <span>Published (Visible to public)</span>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/updates')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{isNew ? 'Publish Update' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
