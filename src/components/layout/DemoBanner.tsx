import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, RefreshCw, X } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { resetDemoData } = useApp();

  if (!isVisible) return null;

  return (
    <div className="bg-slate-900 dark:bg-slate-950 text-white px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between border-b border-slate-800 relative z-50">
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="bg-blue-600 text-white px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" /> Demo Mode
        </span>
        <span className="truncate text-slate-300 font-mono text-xs">
          ETMS CRM Showcase — Sharp Enterprise Matrix Layout (Supermemory typography & architectural square aesthetic).
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={resetDemoData}
          className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 text-xs transition-colors border border-slate-700 font-mono"
          title="Reset tasks and employees to initial mock data"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Data</span>
        </button>

        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white transition-colors p-0.5"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
