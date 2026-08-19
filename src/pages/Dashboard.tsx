import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { EmployeePerformanceChart } from '../components/charts/EmployeePerformanceChart';
import { TaskTrendsChart } from '../components/charts/TaskTrendsChart';
import { InsightCards } from '../components/charts/InsightCards';
import { RevenueSourcesChart } from '../components/charts/RevenueSourcesChart';
import { TopRepsChart } from '../components/charts/TopRepsChart';
import {
  ArrowRight,
  Activity,
  Filter,
  TrendingUp,
  TrendingDown,
  Plus,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../components/ui/Toast';

export const Dashboard: React.FC = () => {
  const { filteredTasks, filteredEmployees, selectedProperty } = useApp();
  const { showToast } = useToast();
  const dateRange = 'In the last 30 days';

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Client Reference Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => showToast('Dashboard filters are available in the full product. Use the site selector to change the demo scope.', 'info')}
            className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-heading font-bold text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-none transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter dashboard</span>
            <span className="bg-blue-600 text-white text-[9px] font-mono px-1.5 py-0.2 font-bold uppercase rounded">
              BETA
            </span>
          </button>

          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            Site: <strong className="text-slate-700 dark:text-slate-300">{selectedProperty.name}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500">
            Assigned: <span className="text-blue-600 font-bold hover:underline cursor-pointer">Everyone can edit</span>
          </span>

          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-xs px-3.5 py-2 shadow-sm transition-transform hover:-translate-y-0.5 rounded-none"
          >
            <Plus className="w-4 h-4" />
            <span>NEW ACTION</span>
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards matching reference screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="glass-card p-4 border border-slate-200 dark:border-slate-800 rounded-none shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold text-slate-900 dark:text-white">
              Contacts created
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Daily</span>
          </div>
          <p className="text-[10.5px] font-mono text-slate-400 mt-0.5">Date range: {dateRange}</p>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-heading font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              611
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 font-mono">
              <TrendingUp className="w-3 h-3" /> +12.4%
            </span>
          </div>
          <span className="block text-[10px] font-mono text-slate-400 uppercase mt-1">
            OFFLINE SOURCES
          </span>
        </div>

        {/* Metric 2 */}
        <div className="glass-card p-4 border border-slate-200 dark:border-slate-800 rounded-none shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold text-slate-900 dark:text-white">
              Website visitor engagement
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Live</span>
          </div>
          <p className="text-[10.5px] font-mono text-slate-400 mt-0.5">Date range: {dateRange}</p>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-heading font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              70.96%
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 font-mono">
              <TrendingUp className="w-3 h-3" /> ▲ 0.02%
            </span>
          </div>
          <span className="block text-[10px] font-mono text-slate-400 uppercase mt-1">
            BOUNCE RATE
          </span>
        </div>

        {/* Metric 3 */}
        <div className="glass-card p-4 border border-slate-200 dark:border-slate-800 rounded-none shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold text-slate-900 dark:text-white">
              Blog post total views
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Monthly</span>
          </div>
          <p className="text-[10.5px] font-mono text-slate-400 mt-0.5">Date range: {dateRange}</p>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-heading font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              51,937
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-600 font-mono">
              <TrendingDown className="w-3 h-3" /> ▼ 0.17%
            </span>
          </div>
          <span className="block text-[10px] font-mono text-slate-400 uppercase mt-1">
            TOTAL VIEWS
          </span>
        </div>

        {/* Metric 4 */}
        <div className="glass-card p-4 border border-slate-200 dark:border-slate-800 rounded-none shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold text-slate-900 dark:text-white">
              Landing page total views
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Overall</span>
          </div>
          <p className="text-[10.5px] font-mono text-slate-400 mt-0.5">Date range: {dateRange}</p>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-heading font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              440,323
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-600 font-mono">
              <TrendingDown className="w-3 h-3" /> ▼ 0.06%
            </span>
          </div>
          <span className="block text-[10px] font-mono text-slate-400 uppercase mt-1">
            UNIQUE VISITS
          </span>
        </div>
      </div>

      {/* Primary Analytics Grid: Multi-touch attribution (Bar) + Revenue Sources (Pie) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multi-touch attribution: Top reps */}
        <div className="glass-card p-5 border border-slate-200 dark:border-slate-800 rounded-none shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                Multi-touch attribution: Top reps
              </h2>
              <p className="text-xs text-slate-400 font-mono">Date range: In the last 90 days</p>
            </div>
            <span className="text-xs font-mono text-coral font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-coral inline-block" /> Linear
            </span>
          </div>

          <TopRepsChart />
        </div>

        {/* Top sources of revenue (Pie Chart) */}
        <div className="glass-card p-5 border border-slate-200 dark:border-slate-800 rounded-none shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                Top sources of revenue
              </h2>
              <p className="text-xs text-slate-400 font-mono">Date range: In the last 60 days</p>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold">
              Total Linear
            </span>
          </div>

          <RevenueSourcesChart />
        </div>
      </div>

      {/* Secondary Analytics Grid: Task Velocity & Live Liveline Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Completion Velocity Trends */}
        <div className="glass-card p-5 border border-slate-200 dark:border-slate-800 lg:col-span-2 rounded-none shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                Task Completion Velocity Trends
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily submission vs approval velocity for {selectedProperty.name}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-blue-600 font-bold">
                <span className="w-2.5 h-2.5 bg-blue-600" /> Approved
              </span>
              <span className="flex items-center gap-1.5 text-sky-500 font-bold">
                <span className="w-2.5 h-2.5 bg-sky-500" /> Submitted
              </span>
            </div>
          </div>

          <TaskTrendsChart />
        </div>

        {/* Live Liveline Telemetry Insights */}
        <div className="glass-card p-5 border border-slate-200 dark:border-slate-800 rounded-none shadow-sm flex flex-col items-center justify-center overflow-hidden">
          <InsightCards />
        </div>
      </div>

      {/* Tertiary Row: Top Performing Roster + Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Employees Performance Chart */}
        <div className="glass-card p-5 border border-slate-200 dark:border-slate-800 lg:col-span-2 rounded-none shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                Top Performing Team Roster
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Green Points vs Performance Index Score
              </p>
            </div>
            <Link
              to="/employees"
              className="text-xs font-heading font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <span>VIEW ROSTER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <EmployeePerformanceChart employees={filteredEmployees} />
        </div>

        {/* Recent Task Feed */}
        <div className="glass-card p-5 border border-slate-200 dark:border-slate-800 rounded-none shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-600" /> Recent Operations Feed
            </h2>
            <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 border border-slate-300 dark:border-slate-700 rounded-none">
              LIVE
            </span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto max-h-[260px] pr-1">
            {filteredTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 transition-colors flex items-start gap-3 rounded-none"
              >
                <img
                  src={task.assigneeAvatar}
                  alt={task.assigneeName}
                  className="w-7 h-7 object-cover shrink-0 mt-0.5 border border-slate-300 dark:border-slate-700 rounded-none"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-heading font-bold text-slate-900 dark:text-white truncate">
                      {task.title}
                    </p>
                    <StatusBadge status={task.status} size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    Assigned to {task.assigneeName} • {task.department}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-3 text-center">
            <Link
              to="/tasks"
              className="text-xs font-heading font-bold text-blue-600 hover:underline"
            >
              SEE ALL TASKS →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
