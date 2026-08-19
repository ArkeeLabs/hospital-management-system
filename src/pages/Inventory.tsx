import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Package, Search, Filter, Plus, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../components/ui/Toast';

export const Inventory: React.FC = () => {
  const { inventory } = useApp();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-heading font-extrabold text-slate-900">Inventory Management</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor stock levels across all facilities.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => showToast('Category filters are ready for the connected inventory module.', 'info')} className="btn-secondary">
            <Filter className="w-4 h-4" /> Categories
          </button>
          <button type="button" onClick={() => showToast('Add Item is available in the connected inventory module.', 'info')} className="btn-primary">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-none border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Items</p>
            <p className="text-2xl font-bold text-slate-900">{inventory.length}</p>
          </div>
          <div className="w-10 h-10 rounded-none bg-blue-100 flex items-center justify-center text-blue-600">
            <Package className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-none border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Low Stock Alerts</p>
            <p className="text-2xl font-bold text-amber-600">
              {inventory.filter(i => i.status === 'Low Stock').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-none bg-amber-100 flex items-center justify-center text-amber-600">
            <Package className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-none border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Out of Stock</p>
            <p className="text-2xl font-bold text-red-600">
              {inventory.filter(i => i.status === 'Out of Stock').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-none bg-red-100 flex items-center justify-center text-red-600">
            <Package className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-none border border-slate-200 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search items, categories, or suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-700">SKU</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Item Name</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Category</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Quantity</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Last Restocked</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500 text-xs">{item.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">{item.quantity}</span>{' '}
                    <span className="text-slate-500">{item.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-semibold ${
                        item.status === 'In Stock'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'Out of Stock'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.lastRestocked}</td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" onClick={() => showToast(`Transfer workflow opened for ${item.name}.`, 'info')} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1">
                      <ArrowRightLeft className="w-4 h-4" /> Transfer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
