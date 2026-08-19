import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClipboardCheck, Search, Filter, Plus, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../components/ui/Toast';

export const Inspections: React.FC = () => {
  const { inspections, selectedProperty } = useApp();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInspections = inspections.filter(
    (ins) =>
      (selectedProperty.id === 'prop-all' || ins.propertyName === selectedProperty.name) &&
      (ins.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ins.inspectorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ins.category.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h1 className="text-2xl font-heading font-extrabold text-slate-900">Facility Inspections</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track safety, hygiene, and equipment checks.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => showToast('Inspection filters are available in the full product.', 'info')} className="btn-secondary">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button type="button" onClick={() => showToast('New inspection workflow opened in demo mode.', 'info')} className="btn-primary">
            <Plus className="w-4 h-4" /> New Inspection
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-none border border-slate-200 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search inspections by ID, inspector or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="text-sm font-medium text-slate-600">
          Showing {filteredInspections.length} records
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-700">ID</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Property</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Category</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Inspector</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Date</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Score</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInspections.map((ins) => (
                <tr key={ins.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">{ins.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{ins.propertyName}</td>
                  <td className="px-6 py-4 text-slate-600">{ins.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-none bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        {ins.inspectorName.charAt(0)}
                      </div>
                      <span className="text-slate-700">{ins.inspectorName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{ins.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-semibold ${
                        ins.status === 'Pass'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ins.status === 'Fail'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ins.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ins.status === 'Pending' ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      <span className={`font-semibold ${ins.score >= 80 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {ins.score}/100
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" onClick={() => showToast(`${ins.id} inspection report opened in demo mode.`, 'info')} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1">
                      <FileText className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInspections.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                    <ClipboardCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="font-medium text-slate-600">No inspections found</p>
                    <p className="text-sm">Try adjusting your filters or search term.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
