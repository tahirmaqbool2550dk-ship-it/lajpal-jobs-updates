import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Send, Printer, ArrowLeft, MessageSquare, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CustomerRequest } from '../types';
import { PrintableReceipt } from '../components/receipt/PrintableReceipt';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { getRequestFollowUpMessage } from '../utils/whatsapp';

export const RequestServicePage: React.FC = () => {
  const { services, submitRequest } = useApp();
  const [searchParams] = useSearchParams();

  const preselectedService = searchParams.get('service') || '';

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [serviceName, setServiceName] = useState(preselectedService || 'Government Jobs Apply');
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone Call' | 'Either'>('WhatsApp');
  const [hasMatric, setHasMatric] = useState(false);
  const [hasCnic, setHasCnic] = useState(true);
  const [hasPhoto, setHasPhoto] = useState(true);
  const [hasDomicile, setHasDomicile] = useState(false);

  // Submitted result state
  const [submittedRequest, setSubmittedRequest] = useState<CustomerRequest | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !mobileNumber.trim()) {
      return;
    }

    const docs: string[] = [];
    if (hasCnic) docs.push('CNIC / B-Form');
    if (hasMatric) docs.push('Matric / Degree Transcript');
    if (hasPhoto) docs.push('Passport Photo');
    if (hasDomicile) docs.push('Domicile Certificate');

    const created = submitRequest({
      customerName: customerName.trim(),
      mobileNumber: mobileNumber.trim(),
      whatsappNumber: (sameAsMobile ? mobileNumber : whatsappNumber).trim(),
      serviceName,
      message: message.trim(),
      requiredDocuments: docs,
      preferredContactMethod: preferredContact,
    });

    setSubmittedRequest(created);
  };

  const enabledServices = services.filter((s) => s.enabled);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto no-print">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
          <span>Official Service Counter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Request Online &amp; Computer Services
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Fill out this form to submit your online job application, E-Stamp, or printing service. You will receive an immediate Request ID and our operator will coordinate with you via WhatsApp.
        </p>
      </div>

      {submittedRequest ? (
        /* Post-submission Success & Printable Receipt */
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3 no-print">
            <div className="inline-flex p-3 rounded-full bg-emerald-600 text-white">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-300">
              Request Received Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 max-w-md mx-auto">
              Your tracking reference is{' '}
              <strong className="text-slate-950 dark:text-white font-mono text-base">
                {submittedRequest.id}
              </strong>
              . Print or screenshot this receipt for your records.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <WhatsAppButton
                message={getRequestFollowUpMessage(
                  submittedRequest.id,
                  submittedRequest.customerName,
                  submittedRequest.serviceName
                )}
                text="💬 Confirm with Shop on WhatsApp"
                size="md"
                variant="primary"
              />
              <button
                onClick={() => setSubmittedRequest(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 transition"
              >
                Submit Another Request
              </button>
            </div>
          </div>

          {/* Printable Receipt Card */}
          <PrintableReceipt request={submittedRequest} />
        </div>
      ) : (
        /* Form View */
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xs space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Customer Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Muhammad Rizwan"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Select Service <span className="text-rose-500">*</span>
              </label>
              <select
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {enabledServices.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  if (sameAsMobile) setWhatsappNumber(e.target.value);
                }}
                placeholder="0300-1234567"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  WhatsApp Number
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsMobile}
                    onChange={(e) => {
                      setSameAsMobile(e.target.checked);
                      if (e.target.checked) setWhatsappNumber(mobileNumber);
                    }}
                    className="rounded text-emerald-600"
                  />
                  <span>Same as mobile</span>
                </label>
              </div>
              <input
                type="tel"
                disabled={sameAsMobile}
                value={sameAsMobile ? mobileNumber : whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="0305-6359218"
                className={`w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                  sameAsMobile
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                }`}
              />
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Preferred Contact Method
            </label>
            <div className="flex items-center gap-4 text-xs font-medium">
              {(['WhatsApp', 'Phone Call', 'Either'] as const).map((method) => (
                <label key={method} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method}
                    checked={preferredContact === method}
                    onChange={() => setPreferredContact(method)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Available Documents Checklist */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Documents You Currently Have Ready:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasCnic}
                  onChange={(e) => setHasCnic(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>CNIC / Smart Card</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasMatric}
                  onChange={(e) => setHasMatric(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Matric / Degrees</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPhoto}
                  onChange={(e) => setHasPhoto(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Passport Photo</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasDomicile}
                  onChange={(e) => setHasDomicile(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Domicile Certificate</span>
              </label>
            </div>
          </div>

          {/* Customer Message / Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Specific Instructions or Details
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Please apply for Punjab Police Constable post. I am attaching documents on WhatsApp..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Your personal records are protected and kept strictly confidential.</span>
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Submit Service Request</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
