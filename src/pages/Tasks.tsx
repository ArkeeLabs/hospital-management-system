import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import type { Task, TaskStatus } from '../types/crm';
import {
  CheckSquare,
  Plus,
  LayoutGrid,
  List,
  Filter,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Tasks: React.FC = () => {
  const { filteredTasks, addTask, updateTaskStatus, employees, selectedProperty, properties } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assigneeId: employees[0]?.id || 'emp-101',
    propertyId: properties[1]?.id || 'prop-1',
    status: 'Pending' as TaskStatus,
    priority: 'High' as const,
    greenPoints: 40,
    dueDate: '2026-08-20',
    department: 'Engineering',
  });

  const statusOptions: TaskStatus[] = ['Pending', 'Submitted', 'Approved', 'Overdue', 'Rejected'];

  const displayedTasks = filteredTasks.filter((t) =>
    statusFilter === 'All' ? true : t.status === statusFilter
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    const assignee = employees.find((e) => e.id === formData.assigneeId);
    const prop = properties.find((p) => p.id === formData.propertyId);

    addTask({
      ...formData,
      assigneeName: assignee?.name || 'Unassigned',
      assigneeAvatar: assignee?.avatar || '',
      propertyName: prop?.name || selectedProperty.name,
    });

    setIsCreateModalOpen(false);
    setFormData({
      title: '',
      description: '',
      assigneeId: employees[0]?.id || 'emp-101',
      propertyId: properties[1]?.id || 'prop-1',
      status: 'Pending',
      priority: 'High',
      greenPoints: 40,
      dueDate: '2026-08-20',
      department: 'Engineering',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
            Task Management Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            ArkeeLabs Enterprise ETMS task lifecycle tracking and assignment oversight.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>KANBAN</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>TABLE</span>
            </button>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-xs sm:text-sm px-4 py-2.5 shadow-xs transition-transform hover:-translate-y-0.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE TASK</span>
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="glass-card p-3 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {['All', ...statusOptions].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1 text-xs font-mono font-bold transition-colors shrink-0 ${
              statusFilter === st
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {st} ({st === 'All' ? filteredTasks.length : filteredTasks.filter((t) => t.status === st).length})
          </button>
        ))}
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statusOptions.map((statusKey) => {
            const columnTasks = displayedTasks.filter((t) => t.status === statusKey);

            return (
              <div
                key={statusKey}
                className="glass-card p-3 border-2 border-slate-900 flex flex-col min-h-[360px] md:min-h-[480px] bg-slate-50"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                  <StatusBadge status={statusKey} size="sm" />
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {columnTasks.length}
                  </span>
                </div>

                {/* Column Task Cards List */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  {columnTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setSelectedTask(task)}
                      className="p-3 bg-white border-2 border-slate-900 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                          {task.id}
                        </span>
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase ${
                            task.priority === 'Urgent'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                              : task.priority === 'High'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="text-xs md:text-sm font-heading font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </h4>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {task.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-1.5">
                          <img
                            src={task.assigneeAvatar}
                            alt={task.assigneeName}
                            className="w-4 h-4 object-cover shrink-0 border border-slate-300 dark:border-slate-700"
                          />
                          <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[80px]">
                            {task.assigneeName.split(' ')[0]}
                          </span>
                        </div>

                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                          +{task.greenPoints} PTS
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="h-28 flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-800 font-mono text-xs text-slate-400">
                      Empty column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="glass-card border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-mono font-bold text-[10px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Task ID & Title</th>
                  <th className="px-5 py-3.5">Assignee</th>
                  <th className="px-5 py-3.5">Department</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Priority</th>
                  <th className="px-5 py-3.5">Due Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {displayedTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex flex-col">
                        <span className="font-heading font-bold text-slate-900 dark:text-slate-100">
                          {task.title}
                        </span>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                          {task.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={task.assigneeAvatar}
                          alt={task.assigneeName}
                          className="w-6 h-6 object-cover border border-slate-300 dark:border-slate-700 shrink-0"
                        />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {task.assigneeName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                      {task.department}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={task.status} size="sm" />
                    </td>
                    <td className="px-5 py-3.5 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {task.priority}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-500">{task.dueDate}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        DETAILS
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Task Details Drawer */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex justify-end" role="presentation">
          <div role="dialog" aria-modal="true" aria-label="Task details" className="bg-white dark:bg-slate-900 h-full max-w-md w-full p-4 sm:p-6 border-l border-slate-300 dark:border-slate-700 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-150">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  {selectedTask.id}
                </span>
                <button
                  type="button"
                  aria-label="Close task details"
                  onClick={() => setSelectedTask(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                  {selectedTask.title}
                </h3>

                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedTask.status} size="md" />
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                    {selectedTask.priority} PRIORITY
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedTask.description}
                </div>

                {/* Workflow Status Switcher */}
                <div className="pt-2">
                  <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                    UPDATE WORKFLOW STATUS:
                  </label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    {statusOptions.map((st) => (
                      <button
                        key={st}
                        onClick={() => {
                          updateTaskStatus(selectedTask.id, st);
                          setSelectedTask({ ...selectedTask, status: st });
                        }}
                        className={`px-2 py-1.5 border font-bold transition-colors ${
                          selectedTask.status === st
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Assignee:</span>
                    <span className="font-heading font-bold text-slate-900 dark:text-white">
                      {selectedTask.assigneeName}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Department:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedTask.department}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Due Date:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      {selectedTask.dueDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Green Points Value:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      +{selectedTask.greenPoints} PTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-6">
              <button
                onClick={() => setSelectedTask(null)}
                className="w-full py-2.5 bg-blue-600 text-white font-mono font-bold text-xs hover:bg-blue-700"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4" role="presentation">
          <div role="dialog" aria-modal="true" aria-label="Create task" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl max-w-lg w-full max-h-[calc(100dvh-1.5rem)] overflow-y-auto p-4 sm:p-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-blue-600" /> CREATE NEW ETMS TASK
              </h3>
              <button
                type="button"
                aria-label="Close create task dialog"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Electrical Transformer Substation Audit"
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed instructions..."
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Assignee
                  </label>
                  <select
                    value={formData.assigneeId}
                    onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value as any })
                    }
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 font-mono text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-mono text-xs font-bold bg-blue-600 text-white hover:bg-blue-700"
                >
                  CREATE TASK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};
