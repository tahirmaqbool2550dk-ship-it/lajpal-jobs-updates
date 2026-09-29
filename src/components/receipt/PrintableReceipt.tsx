import React from 'react';
import { Printer, CheckCircle, Clock } from 'lucide-react';
import { CustomerRequest } from '../../types';

interface PrintableReceiptProps {
  request: CustomerRequest;
  onPrint?: () => void;
  className?: string;
}

export const PrintableReceipt: React.FC<PrintableReceiptProps> = ({
  request,
  onPrint,
  className = '',
}) => {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div
      className={`bg-white text-slate-900 border border-slate-300 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-lg print:shadow-none print:border-none print:p-2 ${className}`}
    >
      {/* Top Header */}
      <div className="text-center border-b-2 border-emerald-700 pb-5 mb-5">
        <h1 className="text-3xl font-black tracking-tight text-emerald-800">
          LAJPAL
        </h1>
        <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-700 mt-1">
          Jobs Updates and Online Apply Services
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Online Applications • E-Stamp • Computer &amp; Printing • Citizen Services
        </p>
        <p className="text-xs font-semibold text-emerald-700 mt-0.5">
          WhatsApp: 0305-6359218
        </p>
      </div>

      {/* Slip Title */}
      <div className="flex items-center justify-between bg-slate-100 p-3 rounded-lg mb-5 text-xs font-mono">
        <div>
          <span className="text-slate-500 block">Tracking / Request ID</span>
          <span className="font-bold text-sm text-slate-900">{request.id}</span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 block">Date &amp; Time</span>
          <span className="font-semibold text-slate-800">{request.createdAt}</span>
        </div>
      </div>

      {/* Details Table */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2 border-b border-slate-200">
          <span className="text-slate-500 font-medium">Customer Name:</span>
          <span className="font-bold text-slate-900">{request.customerName}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-200">
          <span className="text-slate-500 font-medium">Mobile / WhatsApp:</span>
          <span className="font-semibold text-slate-900">{request.mobileNumber}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-200">
          <span className="text-slate-500 font-medium">Requested Service:</span>
          <span className="font-bold text-emerald-800">{request.serviceName}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-200">
          <span className="text-slate-500 font-medium">Application Status:</span>
          <span className="inline-flex items-center gap-1 font-bold text-xs uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-800">
            {request.status}
          </span>
        </div>

        {request.message && (
          <div className="py-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium block mb-1">
              Customer Note:
            </span>
            <p className="text-xs bg-slate-50 p-2.5 rounded text-slate-700 italic">
              {request.message}
            </p>
          </div>
        )}

        {request.adminNotes && (
          <div className="py-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium block mb-1">
              Shop Status Notes:
            </span>
            <p className="text-xs bg-emerald-50 text-emerald-900 p-2.5 rounded font-medium">
              {request.adminNotes}
            </p>
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="mt-6 pt-4 border-t border-dashed border-slate-300 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">
          Thank you for choosing LAJPAL Online Apply &amp; Computer Services!
        </p>
        <p>
          Please save your Request ID: <strong>{request.id}</strong> for status follow-ups on WhatsApp (0305-6359218).
        </p>
        <p className="text-[11px] text-slate-400">
          Computer generated receipt. No physical signature required.
        </p>
      </div>

      {/* Print Action Button */}
      <div className="mt-6 pt-2 flex justify-center no-print">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg transition active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>
      </div>
    </div>
  );
};
