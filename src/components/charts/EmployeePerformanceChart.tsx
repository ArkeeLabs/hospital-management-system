import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Employee } from '../../types/crm';

interface EmployeePerformanceChartProps {
  employees: Employee[];
}

export const EmployeePerformanceChart: React.FC<EmployeePerformanceChartProps> = ({ employees }) => {
  const chartData = employees.slice(0, 6).map((emp) => ({
    name: emp.name.split(' ')[0], // First name for clean display
    fullName: emp.name,
    greenPoints: emp.greenPoints,
    totalScore: emp.totalScore,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#334155" opacity={0.2} />
          <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
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
          <Legend
            wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontFamily: 'Space Grotesk' }}
            iconType="square"
          />
          <Bar
            dataKey="greenPoints"
            name="Green Points"
            fill="#2563EB"
            radius={[0, 0, 0, 0]}
            barSize={16}
          />
          <Bar
            dataKey="totalScore"
            name="Total Score Index"
            fill="#10B981"
            radius={[0, 0, 0, 0]}
            barSize={16}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
