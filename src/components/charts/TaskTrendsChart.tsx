import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { day: 'Mon', completed: 14, submitted: 18 },
  { day: 'Tue', completed: 22, submitted: 26 },
  { day: 'Wed', completed: 19, submitted: 21 },
  { day: 'Thu', completed: 28, submitted: 31 },
  { day: 'Fri', completed: 35, submitted: 38 },
  { day: 'Sat', completed: 18, submitted: 20 },
  { day: 'Sun', completed: 12, submitted: 14 },
];

export const TaskTrendsChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#334155" opacity={0.2} />
          <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              border: '1px solid #334155',
              borderRadius: '0px',
              color: '#FFF',
              fontSize: '12px',
              fontFamily: 'Space Grotesk',
            }}
          />
          <Area
            type="linear"
            dataKey="completed"
            name="Approved Tasks"
            stroke="#2563EB"
            strokeWidth={2}
            fill="#2563EB"
            fillOpacity={0.15}
          />
          <Area
            type="linear"
            dataKey="submitted"
            name="New Submissions"
            stroke="#0EA5E9"
            strokeWidth={2}
            strokeDasharray="3 3"
            fill="#0EA5E9"
            fillOpacity={0.08}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
