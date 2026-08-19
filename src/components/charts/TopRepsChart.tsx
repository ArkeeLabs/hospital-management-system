import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const TopRepsChart: React.FC = () => {
  const data = [
    { name: 'Kim Lindgren', value: 12776.92 },
    { name: 'John Kopke', value: 5263.16 },
    { name: 'Richie Cardinale', value: 4200.00 },
    { name: 'Alli Matson', value: 2813.66 },
    { name: 'Rusty Piston', value: 2009.09 },
    { name: 'Taylor Melton', value: 1840.50 },
    { name: 'Pierre Escot', value: 1420.00 },
    { name: 'Danielle Gregoire', value: 1111.11 },
    { name: 'Rachael Kellegher', value: 920.00 },
    { name: 'Mitch Walsh', value: 784.95 },
    { name: 'Maria Jaramillo', value: 540.20 },
    { name: 'Laura Fallon', value: 477.27 },
    { name: 'Kathleen Rush', value: 380.00 },
    { name: 'Anya Taschner', value: 277.78 },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9, fill: '#64748B' }}
              interval={0}
              angle={-45}
              textAnchor="end"
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '0px',
                color: '#FFF',
                fontSize: '11px',
                fontFamily: 'Space Grotesk',
              }}
              formatter={(val: any) => [`$${Number(val).toLocaleString('en-US')}`, 'Attributed Value']}
            />
            <Bar dataKey="value" radius={[0, 0, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#FF7A59' : '#FFA07A'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
