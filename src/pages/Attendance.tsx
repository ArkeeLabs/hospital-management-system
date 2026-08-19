import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalendarCheck, Calendar as CalendarIcon, Clock, CheckCircle2, XCircle, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Attendance: React.FC = () => {
  const { filteredEmployees } = useApp();
  const [selectedMonth, setSelectedMonth] = useState('August 2026');

  // Days in month mock representation (1 to 15)
  const daysInMonth = Array.from({ length: 15 }, (_, i) => i + 1);

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
            Attendance & Roster Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            ArkeeLabs Enterprise shift telemetry, check-ins, and punctuality logs.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 border border-slate-300 dark:border-slate-700 font-mono text-xs">
          <CalendarIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 ml-1" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent font-bold text-slate-900 dark:text-white border-none outline-hidden cursor-pointer pr-2"
          >
            <option value="August 2026">August 2026</option>
            <option value="July 2026">July 2026</option>
            <option value="June 2026">June 2026</option>
          </select>
        </div>
      </div>

      {/* Summary Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 text-white font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">Punctuality</p>
            <h4 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">96.8%</h4>
          </div>
        </div>

        <div className="glass-card p-4 border border-slate-200 dark:border-slate-800 border-l-4 border-l-blue-600 flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 text-white font-bold">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">Present Today</p>
            <h4 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">
              {filteredEmployees.length - 1} / {filteredEmployees.length}
            </h4>
          </div>
        </div>

        <div className="glass-card p-4 border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 flex items-center gap-3">
          <div className="p-2.5 bg-amber-500 text-white font-bold">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">Late Arrivals</p>
            <h4 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">2 Staff</h4>
          </div>
        </div>

        <div className="glass-card p-4 border border-slate-200 dark:border-slate-800 border-l-4 border-l-rose-600 flex items-center gap-3">
          <div className="p-2.5 bg-rose-600 text-white font-bold">
            <XCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">On Approved Leave</p>
            <h4 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">1 Staff</h4>
          </div>
        </div>
      </div>

      {/* Calendar Roster Table */}
      <div className="glass-card border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Daily Attendance Log Matrix
          </h2>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-emerald-500" /> Present
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-amber-500" /> Late
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-rose-500" /> Absent/Leave
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 sticky left-0 bg-slate-100 dark:bg-slate-900 z-10 min-w-[160px]">
                  Employee
                </th>
                {daysInMonth.map((day) => (
                  <th key={day} className="px-2 py-3 text-center min-w-[36px]">
                    AUG {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredEmployees.map((emp, index) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 sticky left-0 bg-white dark:bg-slate-900 z-10 font-heading font-bold text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-5 h-5 object-cover border border-slate-300 dark:border-slate-700 shrink-0"
                      />
                      <span className="truncate">{emp.name}</span>
                    </div>
                  </td>

                  {daysInMonth.map((day) => {
                    const isLate = (index + day) % 7 === 0;
                    const isLeave = emp.status === 'On Leave' && day > 5;
                    const isAbsent = (index * 3 + day) % 11 === 0;

                    let statusClass = 'bg-emerald-500 text-white';
                    let statusLetter = 'P';

                    if (isLeave) {
                      statusClass = 'bg-blue-600 text-white';
                      statusLetter = 'L';
                    } else if (isAbsent) {
                      statusClass = 'bg-rose-500 text-white';
                      statusLetter = 'A';
                    } else if (isLate) {
                      statusClass = 'bg-amber-500 text-white';
                      statusLetter = 'T';
                    }

                    return (
                      <td key={day} className="px-1 py-2.5 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold ${statusClass}`}
                          title={`Aug ${day}: ${
                            statusLetter === 'P'
                              ? 'Present'
                              : statusLetter === 'T'
                              ? 'Tardy/Late'
                              : statusLetter === 'A'
                              ? 'Absent'
                              : 'On Leave'
                          }`}
                        >
                          {statusLetter}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
