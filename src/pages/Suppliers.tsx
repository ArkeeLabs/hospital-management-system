import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Store, Search, Mail, Phone, ExternalLink, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../components/ui/Toast';

export const Suppliers: React.FC = () => {
  const { suppliers } = useApp();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = suppliers.filter(
    (sup) =>
      sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-slate-900">Suppliers & Shops</h1>
          <p className="text-sm text-slate-500 mt-1">Manage external vendors and partner retail locations.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => showToast('Add Supplier is available in the connected vendor module.', 'info')} className="btn-primary">
            <Plus className="w-4 h-4" /> Add Supplier
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-none border border-slate-200 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search suppliers or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((sup) => (
          <div key={sup.id} className="bg-white border border-slate-200 rounded-none p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-none flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    sup.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : sup.status === 'Inactive'
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {sup.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{sup.name}</h3>
              <p className="text-sm font-medium text-slate-500 mb-4">{sup.category}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${sup.email}`} className="hover:text-blue-600 hover:underline">{sup.email}</a>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{sup.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-slate-500">Rating:</span>
                <span className="text-sm font-bold text-slate-900">{sup.rating}</span>
                <span className="text-yellow-400 text-xs">★</span>
              </div>
              <button type="button" onClick={() => showToast(`${sup.name} details opened in demo mode.`, 'info')} className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1">
                Details <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {filteredSuppliers.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white border border-slate-200 rounded-none border-dashed">
            <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="font-medium text-slate-600">No suppliers found</p>
            <p className="text-sm">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
