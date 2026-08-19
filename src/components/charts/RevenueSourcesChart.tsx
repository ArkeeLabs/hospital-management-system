import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const RevenueSourcesChart: React.FC = () => {
  const data = [
    { name: 'Direct Traffic', value: 4687233.79, pct: '63.92%', color: '#FF7A59' },
    { name: 'Organic Search', value: 1017550.46, pct: '13.88%', color: '#00BDA5' },
    { name: 'Email Marketing', value: 544957.28, pct: '7.43%', color: '#805AD5' },
    { name: 'Sales', value: 529044.13, pct: '7.21%', color: '#C084FC' },
    { name: 'Marketing Event', value: 245386.37, pct: '3.35%', color: '#FBBF24' },
    { name: 'Referrals', value: 115452.44, pct: '1.57%', color: '#38BDF8' },
    { name: 'Paid Social', value: 99715.23, pct: '1.36%', color: '#F472B6' },
  ];

  const total = '$7,332,564.46';

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-mono mb-2">
        {data.map((d) => (
          <span key={d.name} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-none" style={{ backgroundColor: d.color }} />
            <span>{d.name}</span>
          </span>
        ))}
      </div>

      <div className="h-60 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={95}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={1} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '0px',
                color: '#FFF',
                fontSize: '11px',
                fontFamily: 'Space Grotesk',
              }}
              formatter={(value: any, name: any) => [
                `$${Number(value).toLocaleString('en-US')}`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-center border-t border-slate-200 dark:border-slate-800 pt-2 w-full">
        <span className="text-xs font-mono text-slate-500">
          Total Revenue Linear: <strong className="text-slate-900 dark:text-white font-heading">{total}</strong>
        </span>
      </div>
    </div>
  );
};
