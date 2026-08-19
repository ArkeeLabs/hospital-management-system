import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TaskDistributionChart } from '../components/charts/TaskDistributionChart';
import { EmployeePerformanceChart } from '../components/charts/EmployeePerformanceChart';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../components/ui/Toast';

export const Reports: React.FC = () => {
  const { reports, filteredTasks, filteredEmployees } = useApp();
  const { showToast } = useToast();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (reportTitle: string, id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      showToast(`${reportTitle} is ready. Downloading export file...`, 'success');
    }, 1000);
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
            Analytics & Exportable Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            ArkeeLabs Enterprise operational intelligence files and compliance audits.
          </p>
        </div>

        <button
          onClick={() => handleDownload('All Analytics Digest', 'all')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-xs sm:text-sm px-4 py-2.5 shadow-xs transition-transform hover:-translate-y-0.5 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT DIGEST</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <motion.div
            key={report.id}
            whileHover={{ y: -2 }}
            className="glass-card p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-blue-600 dark:hover:border-blue-400 transition-colors group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {report.category}
                </span>

                <span className="text-xs font-mono text-slate-400 font-bold flex items-center gap-1">
                  {report.format === 'PDF' ? (
                    <FileText className="w-3.5 h-3.5 text-rose-500" />
                  ) : (
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                  {report.format} ({report.fileSize})
                </span>
              </div>

              <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {report.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {report.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">
                GENERATED: <span className="text-slate-700 dark:text-slate-300 font-bold">{report.lastGenerated}</span>
              </span>

              <button
                onClick={() => handleDownload(report.title, report.id)}
                disabled={downloadingId === report.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold border border-slate-300 dark:border-slate-700 transition-colors disabled:opacity-50"
              >
                {downloadingId === report.id ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>EXPORTING...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>DOWNLOAD</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Embedded Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        <div className="glass-card p-5 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white mb-4">
            Task Status Audit Summary
          </h3>
          <TaskDistributionChart tasks={filteredTasks} />
        </div>

        <div className="glass-card p-5 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white mb-4">
            Employee Performance Ratings
          </h3>
          <EmployeePerformanceChart employees={filteredEmployees} />
        </div>
      </div>
    </motion.div>
  );
};
