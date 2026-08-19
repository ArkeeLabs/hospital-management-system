import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
  Users,
  Plus,
  Filter,
  Award,
  Mail,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../components/ui/Toast';

export const Employees: React.FC = () => {
  const { filteredEmployees, addEmployee, properties } = useApp();
  const { showToast } = useToast();
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: 'Operations',
    propertyId: properties[1]?.id || 'prop-1',
    phone: '',
    greenPoints: 100,
    totalScore: 85,
    attendanceRate: 98.0,
    status: 'Active' as const,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  });

  const departments = ['All', 'Operations', 'Engineering', 'Quality Assurance', 'Logistics', 'Security', 'HR & Payroll'];

  const displayedEmployees = filteredEmployees.filter((emp) =>
    departmentFilter === 'All' ? true : emp.department === departmentFilter
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;
    addEmployee(formData);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      email: '',
      role: '',
      department: 'Operations',
      propertyId: properties[1]?.id || 'prop-1',
      phone: '',
      greenPoints: 100,
      totalScore: 85,
      attendanceRate: 98.0,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
            Employee Performance Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            ArkeeLabs Enterprise staff directory, shift tracking, and green points.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-xs sm:text-sm px-4 py-2.5 shadow-xs transition-transform hover:-translate-y-0.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>ADD EMPLOYEE</span>
        </button>
      </div>

      {/* Filter & Controls Bar */}
      <div className="glass-card p-4 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Department:
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-3 py-1 text-xs font-heading font-semibold transition-colors ${
                departmentFilter === dept
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Total: <span className="text-slate-900 dark:text-white font-bold">{displayedEmployees.length}</span> staff
        </div>
      </div>

      {/* Employee Data Table */}
      <div className="glass-card border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-mono font-bold text-[10px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-5 py-3.5">Role & Dept</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Attendance</th>
                <th className="px-5 py-3.5">Green Points</th>
                <th className="px-5 py-3.5">Score Index</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {displayedEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* Name & Avatar */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-9 h-9 object-cover border border-slate-300 dark:border-slate-700 shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-heading font-bold text-slate-900 dark:text-slate-100">
                          {emp.name}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {emp.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Role & Dept */}
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col">
                      <span className="font-heading font-semibold text-slate-800 dark:text-slate-200">
                        {emp.role}
                      </span>
                      <span className="text-xs text-slate-400">{emp.department}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-5 py-3.5">
                    <StatusBadge status={emp.status} size="sm" />
                  </td>

                  {/* Attendance Rate */}
                  <td className="px-5 py-3.5 font-mono font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500"
                          style={{ width: `${emp.attendanceRate}%` }}
                        />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-bold">
                        {emp.attendanceRate}%
                      </span>
                    </div>
                  </td>

                  {/* Green Points */}
                  <td className="px-5 py-3.5 font-bold text-blue-600 dark:text-blue-400 font-mono">
                    <span className="inline-flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-emerald-500" />
                      {emp.greenPoints} pts
                    </span>
                  </td>

                  {/* Score Index */}
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-mono font-extrabold text-xs border border-blue-200 dark:border-blue-800">
                      {emp.totalScore}/100
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => showToast(`${emp.name}'s profile opened in demo mode.`, 'info')}
                      className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      PROFILE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4" role="presentation">
          <div role="dialog" aria-modal="true" aria-label="Add employee" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl max-w-lg w-full max-h-[calc(100dvh-1.5rem)] overflow-y-auto p-4 sm:p-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> ADD NEW EMPLOYEE
              </h3>
              <button
                type="button"
                aria-label="Close add employee dialog"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jason Blake"
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="j.blake@arkeelabs.com"
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-1111"
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Systems Engineer"
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                  >
                    <option value="Operations">Operations</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Security">Security</option>
                    <option value="HR & Payroll">HR & Payroll</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 font-mono text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-mono text-xs font-bold bg-blue-600 text-white hover:bg-blue-700"
                >
                  SAVE EMPLOYEE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};
