import React from 'react';
import type { TaskStatus } from '../../types/crm';
import { CheckCircle2, AlertTriangle, Clock, XCircle, Send } from 'lucide-react';

interface StatusBadgeProps {
  status: TaskStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let colorStyle = '';
  let icon = null;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1 font-mono uppercase font-bold',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-mono uppercase font-bold',
    lg: 'px-3 py-1.5 text-xs gap-2 font-mono uppercase font-bold tracking-wider',
  };

  switch (status) {
    case 'Approved':
      colorStyle = 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-800';
      icon = <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />;
      break;
    case 'Overdue':
      colorStyle = 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-300 dark:border-orange-800';
      icon = <AlertTriangle className="w-3 h-3 text-orange-600 dark:text-orange-400" />;
      break;
    case 'Pending':
      colorStyle = 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800';
      icon = <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />;
      break;
    case 'Rejected':
      colorStyle = 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800';
      icon = <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />;
      break;
    case 'Submitted':
      colorStyle = 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-300 dark:border-sky-800';
      icon = <Send className="w-3 h-3 text-sky-600 dark:text-sky-400" />;
      break;
    case 'Active':
    case 'Present':
      colorStyle = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800';
      icon = <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />;
      break;
    case 'On Leave':
    case 'Late':
      colorStyle = 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800';
      icon = <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />;
      break;
    case 'Absent':
    case 'Terminated':
      colorStyle = 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800';
      icon = <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />;
      break;
    default:
      colorStyle = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700';
      break;
  }

  return (
    <span className={`inline-flex items-center ${sizeClasses[size]} ${colorStyle}`}>
      {icon}
      {status}
    </span>
  );
};
