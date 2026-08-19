import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface StubPageProps {
  title: string;
  description?: string;
}

export const StubPage: React.FC<StubPageProps> = ({
  title,
  description = 'Module scheduled for upcoming enterprise release phase. Full data pipeline integration pending.',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6"
    >
      <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 border border-blue-200 dark:border-blue-800">
        <Clock className="w-7 h-7" />
      </div>

      <span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 border border-slate-300 dark:border-slate-700 mb-3">
        ARKEELABS STUB MODULE
      </span>

      <h1 className="text-3xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight max-w-md">
        {title} — Coming Soon
      </h1>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md leading-relaxed">
        {description}
      </p>

      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs px-5 py-2.5 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO DASHBOARD</span>
        </Link>
      </div>
    </motion.div>
  );
};
