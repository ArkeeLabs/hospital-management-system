import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: string;
  isPositive?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  colorTheme: 'blue' | 'sky' | 'amber' | 'emerald' | 'orange' | 'rose';
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  colorTheme,
  subtitle,
}) => {
  const themeStyles = {
    blue: {
      border: 'border-l-4 border-l-blue-600 dark:border-l-blue-500',
      iconBg: 'bg-blue-600 text-white',
      text: 'text-blue-600 dark:text-blue-400',
    },
    sky: {
      border: 'border-l-4 border-l-sky-500 dark:border-l-sky-400',
      iconBg: 'bg-sky-500 text-white',
      text: 'text-sky-600 dark:text-sky-400',
    },
    amber: {
      border: 'border-l-4 border-l-amber-500 dark:border-l-amber-400',
      iconBg: 'bg-amber-500 text-white',
      text: 'text-amber-600 dark:text-amber-400',
    },
    emerald: {
      border: 'border-l-4 border-l-emerald-600 dark:border-l-emerald-500',
      iconBg: 'bg-emerald-600 text-white',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    orange: {
      border: 'border-l-4 border-l-orange-500 dark:border-l-orange-400',
      iconBg: 'bg-orange-500 text-white',
      text: 'text-orange-600 dark:text-orange-400',
    },
    rose: {
      border: 'border-l-4 border-l-rose-600 dark:border-l-rose-500',
      iconBg: 'bg-rose-600 text-white',
      text: 'text-rose-600 dark:text-rose-400',
    },
  };

  const currentTheme = themeStyles[colorTheme] || themeStyles.blue;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      className={`glass-card p-4 border border-slate-200 dark:border-slate-800 ${currentTheme.border} relative group`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl lg:text-3xl font-heading font-extrabold text-slate-900 dark:text-slate-50 mt-1 tracking-tight">
            {value}
          </h3>
        </div>

        <div className={`p-2.5 ${currentTheme.iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono">
        {change && (
          <span
            className={`inline-flex items-center gap-1 font-bold ${
              isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change}
          </span>
        )}
        <span className="text-slate-400 dark:text-slate-500 truncate">
          {subtitle || 'vs previous'}
        </span>
      </div>
    </motion.div>
  );
};
