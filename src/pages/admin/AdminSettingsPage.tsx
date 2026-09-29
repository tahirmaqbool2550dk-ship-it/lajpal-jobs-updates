import React, { useState } from 'react';
import { Save, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, resetAllDemoData } = useApp();

  const [brandName, setBrandName] = useState(settings.brandName);
  const [serviceName, setServiceName] = useState(settings.serviceName);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [whatsappDisplay, setWhatsappDisplay] = useState(settings.whatsappDisplay);
  const [whatsappJobsChannelUrl, setWhatsappJobsChannelUrl] = useState(
    settings.whatsappJobsChannelUrl
  );
  const [shopAddress, setShopAddress] = useState(settings.shopAddress);
  const [shopHours, setShopHours] = useState(settings.shopHours);
  const [email, setEmail] = useState(settings.email);
  const [aboutText, setAboutText] = useState(settings.aboutText);
  const [disclaimer, setDisclaimer] = useState(settings.disclaimer);

  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      brandName: brandName.trim(),
      serviceName: serviceName.trim(),
      whatsappNumber: whatsappNumber.trim(),
      whatsappDisplay: whatsappDisplay.trim(),
      whatsappJobsChannelUrl: whatsappJobsChannelUrl.trim(),
      shopAddress: shopAddress.trim(),
      shopHours: shopHours.trim(),
      email: email.trim(),
      aboutText: aboutText.trim(),
      disclaimer: disclaimer.trim(),
    });
  };

  const handleConfirmReset = () => {
    resetAllDemoData();
    setResetModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          System &amp; Website Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Configure business phone numbers, jobs channel URL, address, and legal text.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm"
      >
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Brand &amp; Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Main Brand Name
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Website / Service Name
              </label>
              <input
                type="text"
                required
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                WhatsApp Display Format
              </label>
              <input
                type="text"
                required
                value={whatsappDisplay}
                onChange={(e) => setWhatsappDisplay(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                WhatsApp Country Code Format (wa.me)
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              WhatsApp Jobs Channel URL
            </label>
            <input
              type="url"
              required
              value={whatsappJobsChannelUrl}
              onChange={(e) => setWhatsappJobsChannelUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Physical Shop &amp; Timings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Physical Shop Address
              </label>
              <input
                type="text"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Business Hours
              </label>
              <input
                type="text"
                value={shopHours}
                onChange={(e) => setShopHours(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Contact Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            About &amp; Disclaimer Text
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              About LAJPAL Summary Text
            </label>
            <textarea
              rows={3}
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Legal Disclaimer (Government Affiliation Notice)
            </label>
            <textarea
              rows={3}
              value={disclaimer}
              onChange={(e) => setDisclaimer(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Website Settings</span>
          </button>
        </div>
      </form>

      {/* Factory Demo Data Reset Card */}
      <div className="p-6 rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-rose-900 dark:text-rose-300">
            Reset All Data to Demo Defaults
          </h3>
          <p className="text-xs text-rose-700 dark:text-rose-400 mt-0.5">
            Restores initial job posts, services catalog, and customer request records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setResetModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      <ConfirmationModal
        isOpen={resetModalOpen}
        title="Reset All Application Data"
        message="This will reset all jobs, services, updates, and requests back to factory demo content in your LocalStorage. Are you sure?"
        confirmText="Yes, Reset Everything"
        isDestructive={true}
        onConfirm={handleConfirmReset}
        onCancel={() => setResetModalOpen(false)}
      />
    </div>
  );
};
