import React, { useState } from 'react';
import {
  Search,
  Printer,
  Trash2,
  Edit,
  Eye,
  MessageCircle,
  MessageSquare,
  Clock,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomerRequest, RequestStatus } from '../../types';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { PrintableReceipt } from '../../components/receipt/PrintableReceipt';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export const AdminRequestsPage: React.FC = () => {
  const { requests, updateRequestStatus, updateRequestNotes, deleteRequest } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedRequest, setSelectedRequest] = useState<CustomerRequest | null>(null);
  const [receiptModalRequest, setReceiptModalRequest] = useState<CustomerRequest | null>(null);
  const [requestToDelete, setRequestToDelete] = useState<CustomerRequest | null>(null);

  // Status edit modal states
  const [editStatus, setEditStatus] = useState<RequestStatus>('Pending');
  const [editNotes, setEditNotes] = useState('');

  const filteredRequests = requests.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.mobileNumber.toLowerCase().includes(q) ||
        r.serviceName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenStatusEdit = (req: CustomerRequest) => {
    setSelectedRequest(req);
    setEditStatus(req.status);
    setEditNotes(req.adminNotes || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;
    updateRequestStatus(selectedRequest.id, editStatus);
    updateRequestNotes(selectedRequest.id, editNotes.trim());
    setSelectedRequest(null);
  };

  const handleDirectWhatsApp = (req: CustomerRequest) => {
    const msg = `Assalam-o-Alaikum ${req.customerName}, this is LAJPAL Online Apply Services regarding your service request ${req.id} for "${req.serviceName}".`;
    const url = createWhatsAppUrl(msg, req.whatsappNumber || req.mobileNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Customer Service Requests
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track customer applications, update processing stages, and issue print receipts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Request ID, Customer Name, Mobile, Service..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5 sm:p-4">Request ID</th>
                <th className="p-3.5 sm:p-4">Customer Name</th>
                <th className="p-3.5 sm:p-4">Mobile / WhatsApp</th>
                <th className="p-3.5 sm:p-4">Service</th>
                <th className="p-3.5 sm:p-4">Date</th>
                <th className="p-3.5 sm:p-4 text-center">Status</th>
                <th className="p-3.5 sm:p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRequests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {req.id}
                  </td>

                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 dark:text-white">
                    {req.customerName}
                  </td>

                  <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <span>{req.mobileNumber}</span>
                      <button
                        onClick={() => handleDirectWhatsApp(req)}
                        className="text-[#25D366] hover:scale-110 transition"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </td>

                  <td className="p-3.5 sm:p-4 font-semibold text-slate-800 dark:text-slate-200">
                    {req.serviceName}
                  </td>

                  <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400 text-[11px]">
                    {req.createdAt}
                  </td>

                  <td className="p-3.5 sm:p-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        req.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : req.status === 'Processing'
                          ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                          : req.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>

                  <td className="p-3.5 sm:p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setReceiptModalRequest(req)}
                        className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                        title="View & Print Receipt"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenStatusEdit(req)}
                        className="p-1.5 rounded bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold"
                        title="Edit Status & Notes"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setRequestToDelete(req)}
                        className="p-1.5 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
                        title="Delete Request"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Status & Notes Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Update Request Status: {selectedRequest.id}
            </h3>

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as RequestStatus)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Internal Admin Notes
                </label>
                <textarea
                  rows={4}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Challan paid at NBP. Online form submitted, roll slip generated."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {receiptModalRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-xl my-8">
            <div className="flex justify-end mb-2 no-print">
              <button
                onClick={() => setReceiptModalRequest(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
              >
                Close Receipt
              </button>
            </div>
            <PrintableReceipt request={receiptModalRequest} />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!requestToDelete}
        title="Delete Customer Request"
        message={`Are you sure you want to delete request ${requestToDelete?.id} from ${requestToDelete?.customerName}?`}
        confirmText="Delete Request"
        onConfirm={() => {
          if (requestToDelete) {
            deleteRequest(requestToDelete.id);
            setRequestToDelete(null);
          }
        }}
        onCancel={() => setRequestToDelete(null)}
      />
    </div>
  );
};
