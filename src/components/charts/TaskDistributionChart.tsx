import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { Task } from '../../types/crm';

interface TaskDistributionChartProps {
  tasks: Task[];
}

export const TaskDistributionChart: React.FC<TaskDistributionChartProps> = ({ tasks }) => {
  const counts = {
    Approved: tasks.filter((t) => t.status === 'Approved').length,
    Overdue: tasks.filter((t) => t.status === 'Overdue').length,
    Pending: tasks.filter((t) => t.status === 'Pending').length,
    Rejected: tasks.filter((t) => t.status === 'Rejected').length,
    Submitted: tasks.filter((t) => t.status === 'Submitted').length,
  };

  const data = [
    { name: 'Approved', value: counts.Approved, color: '#2563EB' },
    { name: 'Submitted', value: counts.Submitted, color: '#0EA5E9' },
    { name: 'Pending', value: counts.Pending, color: '#F59E0B' },
    { name: 'Overdue', value: counts.Overdue, color: '#F97316' },
    { name: 'Rejected', value: counts.Rejected, color: '#EF4444' },
  ];

  const total = tasks.length || 1;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="h-56 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '0px',
                color: '#FFF',
                fontSize: '12px',
                fontFamily: 'Space Grotesk',
              }}
              formatter={(value: any) => {
                const val = typeof value === 'number' ? value : 0;
                return [`${val} tasks (${Math.round((val / total) * 100)}%)`, 'Count'];
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
            {tasks.length}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Total Tasks
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-xs">
            <span
              className="w-2.5 h-2.5 shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-600 dark:text-slate-400 font-heading truncate">{item.name}</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 ml-auto font-mono">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
