import React, { useState } from 'react';
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MessageCircle,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ServiceItem, ServiceMainCategory } from '../../types';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';

const CATEGORIES: ServiceMainCategory[] = [
  'Online Apply',
  'Vehicle',
  'Card & Document',
  'Government Document',
  'E-Stamp',
  'Computer & Printing',
  'CV / Resume',
  'Graphic Designing',
];

const AVAILABLE_ICONS = [
  'FileText',
  'Building2',
  'Briefcase',
  'GraduationCap',
  'Award',
  'Car',
  'CreditCard',
  'Printer',
  'Copy',
  'ScanLine',
  'Camera',
  'Edit3',
  'Layers',
  'Palette',
  'FileCheck',
  'FileSignature',
  'Shield',
  'HelpCircle',
];

export const AdminServicesPage: React.FC = () => {
  const {
    services,
    addService,
    updateService,
    deleteService,
    toggleServiceEnabled,
    toggleServiceWhatsApp,
  } = useApp();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceMainCategory>('Online Apply');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('FileText');
  const [isPopular, setIsPopular] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(true);
  const [turnaroundTime, setTurnaroundTime] = useState('');

  const filteredServices = services.filter((s) => {
    if (categoryFilter !== 'All' && s.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    }
    return true;
  });

  const openAddModal = () => {
    setEditingService(null);
    setName('');
    setCategory('Online Apply');
    setDescription('');
    setIconName('FileText');
    setIsPopular(false);
    setEnabled(true);
    setShowWhatsAppButton(true);
    setTurnaroundTime('Same Day');
    setModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setName(service.name);
    setCategory(service.category);
    setDescription(service.description);
    setIconName(service.iconName);
    setIsPopular(service.isPopular);
    setEnabled(service.enabled);
    setShowWhatsAppButton(service.showWhatsAppButton);
    setTurnaroundTime(service.turnaroundTime || '');
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    if (editingService) {
      updateService(editingService.id, {
        name: name.trim(),
        category,
        description: description.trim(),
        iconName,
        isPopular,
        enabled,
        showWhatsAppButton,
        turnaroundTime: turnaroundTime.trim() || undefined,
      });
    } else {
      addService({
        name: name.trim(),
        category,
        description: description.trim(),
        iconName,
        isPopular,
        enabled,
        showWhatsAppButton,
        turnaroundTime: turnaroundTime.trim() || undefined,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Services Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Control service offerings, category listings, and WhatsApp buttons.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Services Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5 sm:p-4">Service Name</th>
                <th className="p-3.5 sm:p-4">Category</th>
                <th className="p-3.5 sm:p-4">Description</th>
                <th className="p-3.5 sm:p-4 text-center">WhatsApp Button</th>
                <th className="p-3.5 sm:p-4 text-center">Status</th>
                <th className="p-3.5 sm:p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredServices.map((service) => {
                const IconComponent =
                  (Icons as unknown as Record<string, React.ElementType>)[service.iconName] ||
                  Icons.FileText;

                return (
                  <tr
                    key={service.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <span>{service.name}</span>
                          {service.isPopular && (
                            <span className="ml-2 text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold">
                              Popular
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-300 font-medium">
                      {service.category}
                    </td>

                    <td className="p-3.5 sm:p-4 max-w-sm truncate text-slate-500 dark:text-slate-400">
                      {service.description}
                    </td>

                    <td className="p-3.5 sm:p-4 text-center">
                      <button
                        onClick={() => toggleServiceWhatsApp(service.id)}
                        className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                          service.showWhatsAppButton
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
                            : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        {service.showWhatsAppButton ? 'Enabled' : 'Disabled'}
                      </button>
                    </td>

                    <td className="p-3.5 sm:p-4 text-center">
                      <button
                        onClick={() => toggleServiceEnabled(service.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                          service.enabled
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {service.enabled ? 'Active' : 'Disabled'}
                      </button>
                    </td>

                    <td className="p-3.5 sm:p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                          title="Edit Service"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setServiceToDelete(service)}
                          className="p-1.5 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
                          title="Delete Service"
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Service Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Government Jobs Apply"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceMainCategory)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Icon
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500"
                  >
                    {AVAILABLE_ICONS.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of service..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Turnaround Time
                </label>
                <input
                  type="text"
                  value={turnaroundTime}
                  onChange={(e) => setTurnaroundTime(e.target.value)}
                  placeholder="e.g. Same Day / 10 Minutes"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Popular Service (Homepage)</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={showWhatsAppButton}
                    onChange={(e) => setShowWhatsAppButton(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Show WhatsApp Button</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Enabled (Active)</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!serviceToDelete}
        title="Delete Service"
        message={`Are you sure you want to remove "${serviceToDelete?.name}"?`}
        confirmText="Delete Service"
        onConfirm={() => {
          if (serviceToDelete) {
            deleteService(serviceToDelete.id);
            setServiceToDelete(null);
          }
        }}
        onCancel={() => setServiceToDelete(null)}
      />
    </div>
  );
};
