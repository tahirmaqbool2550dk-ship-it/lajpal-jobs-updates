import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Job, JobCategory } from '../../types';
import { FileUploader } from '../../components/common/FileUploader';
import { JOB_CATEGORIES_LIST } from '../../components/jobs/JobFilters';
import { getTodayDateString } from '../../utils/dateUtils';

export const AdminJobEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { jobs, addJob, updateJob } = useApp();

  const existingJob = !isNew ? jobs.find((j) => j.id === id) : undefined;

  // Form states matching complete Job interface
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [category, setCategory] = useState<JobCategory>('Government Jobs');
  const [jobType, setJobType] = useState<Job['jobType']>('Permanent');
  const [advertisementNumber, setAdvertisementNumber] = useState('');
  const [vacancies, setVacancies] = useState<number | ''>('');
  const [bps, setBps] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [ageLimit, setAgeLimit] = useState('');
  const [gender, setGender] = useState<Job['gender']>('Both');
  const [domicile, setDomicile] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [applicationFee, setApplicationFee] = useState('');
  const [lastDate, setLastDate] = useState(getTodayDateString());
  const [documentsStr, setDocumentsStr] = useState('');
  const [applicationMethod, setApplicationMethod] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [officialSource, setOfficialSource] = useState('');
  const [officialApplyLink, setOfficialApplyLink] = useState('');
  const [showOfficialApply, setShowOfficialApply] = useState(false);
  const [showWhatsAppApply, setShowWhatsAppApply] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [advertisementImages, setAdvertisementImages] = useState<string[]>([]);
  const [advertisementPdf, setAdvertisementPdf] = useState<string>('');

  useEffect(() => {
    if (existingJob) {
      setTitle(existingJob.title);
      setDepartment(existingJob.department);
      setCategory(existingJob.category);
      setJobType(existingJob.jobType);
      setAdvertisementNumber(existingJob.advertisementNumber || '');
      setVacancies(existingJob.vacancies ?? '');
      setBps(existingJob.bps || '');
      setQualification(existingJob.qualification || '');
      setExperience(existingJob.experience || '');
      setAgeLimit(existingJob.ageLimit || '');
      setGender(existingJob.gender || 'Both');
      setDomicile(existingJob.domicile || '');
      setProvince(existingJob.province || '');
      setDistrict(existingJob.district || '');
      setLocation(existingJob.location || '');
      setSalary(existingJob.salary || '');
      setApplicationFee(existingJob.applicationFee || '');
      setLastDate(existingJob.lastDate);
      setDocumentsStr((existingJob.requiredDocuments || []).join('\n'));
      setApplicationMethod(existingJob.applicationMethod || '');
      setDescription(existingJob.description);
      setInstructions(existingJob.instructions || '');
      setOfficialSource(existingJob.officialSource || '');
      setOfficialApplyLink(existingJob.officialApplyLink || '');
      setShowOfficialApply(existingJob.showOfficialApply);
      setShowWhatsAppApply(existingJob.showWhatsAppApply);
      setFeatured(existingJob.featured);
      setPublished(existingJob.published);
      setAdvertisementImages(existingJob.advertisementImages || []);
      setAdvertisementPdf(existingJob.advertisementPdf || '');
    }
  }, [existingJob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredDocuments = documentsStr
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    const jobData = {
      title: title.trim(),
      department: department.trim(),
      category,
      jobType,
      advertisementNumber: advertisementNumber.trim() || undefined,
      vacancies: vacancies !== '' ? Number(vacancies) : undefined,
      bps: bps.trim() || undefined,
      qualification: qualification.trim() || undefined,
      experience: experience.trim() || undefined,
      ageLimit: ageLimit.trim() || undefined,
      gender,
      domicile: domicile.trim() || undefined,
      province: province.trim() || undefined,
      district: district.trim() || undefined,
      location: location.trim() || undefined,
      salary: salary.trim() || undefined,
      applicationFee: applicationFee.trim() || undefined,
      lastDate,
      requiredDocuments: requiredDocuments.length > 0 ? requiredDocuments : undefined,
      applicationMethod: applicationMethod.trim() || undefined,
      description: description.trim(),
      instructions: instructions.trim() || undefined,
      officialSource: officialSource.trim() || undefined,
      officialApplyLink: officialApplyLink.trim() || undefined,
      showOfficialApply,
      showWhatsAppApply,
      featured,
      published,
      advertisementImages: advertisementImages.length > 0 ? advertisementImages : undefined,
      advertisementPdf: advertisementPdf || undefined,
    };

    if (isNew) {
      addJob(jobData);
    } else if (existingJob) {
      updateJob(existingJob.id, jobData);
    }

    navigate('/admin/jobs');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/admin/jobs')}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {isNew ? 'Create New Job Listing' : 'Edit Job Listing'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provide thorough details. Deadlines automatically control open/closed status.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm"
      >
        {/* Basic Title & Organization */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            1. Core Job Information
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Job Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Punjab Police Constables &amp; Lady Constables (BPS-07) 2026"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Department / Organization <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Punjab Police Department"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Job Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as JobCategory)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {JOB_CATEGORIES_LIST.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scale & Eligibility */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            2. Scales, Vacancies &amp; Eligibility
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Number of Vacancies
              </label>
              <input
                type="number"
                value={vacancies}
                onChange={(e) =>
                  setVacancies(e.target.value === '' ? '' : parseInt(e.target.value, 10))
                }
                placeholder="e.g. 4850"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Pay Scale / BPS
              </label>
              <input
                type="text"
                value={bps}
                onChange={(e) => setBps(e.target.value)}
                placeholder="e.g. BPS-07 or BPS-16"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Job Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as Job['jobType'])}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Required Qualification
              </label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g. Matric / Intermediate / Graduation / Master"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Age Limit
              </label>
              <input
                type="text"
                value={ageLimit}
                onChange={(e) => setAgeLimit(e.target.value)}
                placeholder="e.g. 18 to 22 Years (+ General relaxation)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Job['gender'])}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Both">Both Male &amp; Female</option>
                <option value="Male">Male Only</option>
                <option value="Female">Female Only</option>
                <option value="All">All / Open</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Domicile / District
              </label>
              <input
                type="text"
                value={domicile}
                onChange={(e) => setDomicile(e.target.value)}
                placeholder="e.g. All Punjab / Specific District"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Posting Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Lahore / District Headquarters"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Salary Package
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. PKR 35,000 - 45,000 / month"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Application Fee
              </label>
              <input
                type="text"
                value={applicationFee}
                onChange={(e) => setApplicationFee(e.target.value)}
                placeholder="e.g. Rs. 600 Bank Challan"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 13. Automatic Closing: Last Date Input */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
              3. Application Deadline (Automatic Closing System)
            </h2>
            <p className="text-xs text-emerald-800 dark:text-emerald-200">
              Enter the exact deadline date. The website automatically switches status from 🟢 Applications Open to 🔴 Applications Closed when this date passes. You do NOT have to close jobs manually.
            </p>
          </div>

          <div className="max-w-xs">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Last Date to Apply <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              required
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Description & Instructions */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            4. Details, Instructions &amp; Required Documents
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Job Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive job description, scope, and key criteria..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Important Instructions (Testing/Physical requirements)
            </label>
            <textarea
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Physical running test: 1.6 KM in 7 minutes..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Required Documents (One per line)
            </label>
            <textarea
              rows={3}
              value={documentsStr}
              onChange={(e) => setDocumentsStr(e.target.value)}
              placeholder="CNIC&#10;Matric Certificate&#10;Domicile Certificate&#10;4 Passport Photos"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              How to Apply Method
            </label>
            <input
              type="text"
              value={applicationMethod}
              onChange={(e) => setApplicationMethod(e.target.value)}
              placeholder="e.g. Submit online via portal or visit LAJPAL counter for assistance."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 16 & 17. Official Apply & WhatsApp Apply Buttons */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            5. Application Buttons &amp; Official Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Official Apply Link URL
              </label>
              <input
                type="url"
                value={officialApplyLink}
                onChange={(e) => setOfficialApplyLink(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Official Source (Domain/Name)
              </label>
              <input
                type="text"
                value={officialSource}
                onChange={(e) => setOfficialSource(e.target.value)}
                placeholder="e.g. punjabpolice.gov.pk"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-semibold">
              <input
                type="checkbox"
                checked={showOfficialApply}
                onChange={(e) => setShowOfficialApply(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Show Official Apply Button (🌐 Apply on Official Website)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-semibold">
              <input
                type="checkbox"
                checked={showWhatsAppApply}
                onChange={(e) => setShowWhatsAppApply(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Show WhatsApp Apply Button (💬 Apply Through WhatsApp)</span>
            </label>
          </div>
        </div>

        {/* 19. Advertisement File Upload (JPG/PNG/PDF) */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            6. Official Advertisement Files (JPG, PNG, PDF)
          </h2>

          <FileUploader
            label="Upload Official Advertisement Images"
            accept="image/jpeg,image/png,image/webp"
            multiple={true}
            initialFiles={advertisementImages}
            onChange={setAdvertisementImages}
            helperText="Upload scanned newspaper advertisement clipping(s)"
          />
        </div>

        {/* Feature & Publish Toggles */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            7. Publishing Controls
          </h2>

          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-amber-700 dark:text-amber-400">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span>⭐ Mark as Featured Job (appears in Featured section)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-semibold text-emerald-700 dark:text-emerald-400">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Published (Uncheck to save as draft)</span>
            </label>
          </div>
        </div>

        {/* Save Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/jobs')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{isNew ? 'Publish Job Listing' : 'Save Job Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
