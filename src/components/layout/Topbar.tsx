import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../ui/Toast';
import {
  Building2,
  ChevronDown,
  Search,
  Bell,
  Check,
  Menu,
} from 'lucide-react';

export const Topbar: React.FC = () => {
  const {
    selectedProperty,
    setSelectedProperty,
    properties,
    searchQuery,
    setSearchQuery,
    toggleMobileSidebar,
  } = useApp();
  const { showToast } = useToast();

  const [isPropertyDropdownOpen, setIsPropertyDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <header
      className="sticky top-0 z-30 min-h-16 bg-white border-b border-slate-200 transition-colors duration-150 px-4 md:px-6 py-3 md:py-0 flex flex-wrap items-center justify-between gap-3"
    >
      {/* Left: Property / Org Selector */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-none"
          aria-label="Open navigation"
          title="Open navigation"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsPropertyDropdownOpen(!isPropertyDropdownOpen)}
            aria-expanded={isPropertyDropdownOpen}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 transition-colors text-slate-900 font-heading font-semibold text-xs md:text-sm border border-slate-300 rounded-none"
          >
            <div className="w-5 h-5 bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 rounded-none">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <span className="max-w-[140px] md:max-w-[200px] truncate">
              {selectedProperty.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Property Dropdown Menu */}
          {isPropertyDropdownOpen && (
            <div className="absolute left-0 mt-1 w-72 bg-white border border-slate-200 shadow-lg rounded-none py-1 z-50 animate-in fade-in duration-100 overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-200 bg-slate-50">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  SELECT FACILITY / SITE
                </p>
              </div>

              <div className="max-h-60 overflow-y-auto py-1">
                {properties.map((prop) => {
                  const isSelected = prop.id === selectedProperty.id;
                  return (
                    <button
                      key={prop.id}
                      onClick={() => {
                        setSelectedProperty(prop);
                        setIsPropertyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-100 transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600'
                          : 'text-slate-700'
                      }`}
                    >
                      <div className="flex flex-col truncate">
                        <span className="truncate font-heading">{prop.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {prop.location} • {prop.activeTasks} tasks
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, employees, departments, IDs..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-transparent focus:border-blue-500 focus:bg-white text-xs md:text-sm text-slate-900 placeholder:text-slate-400 outline-none font-medium transition-all rounded-none focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>

      {/* Right: Notifications & Admin Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="p-2 text-slate-500 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 rounded-none relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasNotifications && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-none ring-2 ring-white" />}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-1 w-80 bg-white border border-slate-200 shadow-lg rounded-none p-3 z-50 animate-in fade-in duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider">
                  SYSTEM NOTIFICATIONS (2)
                </span>
                <button
                  type="button"
                  onClick={() => setHasNotifications(false)}
                  className="text-[10px] font-mono text-blue-600 cursor-pointer hover:underline"
                >
                  Clear
                </button>
              </div>
              {hasNotifications ? <div className="space-y-2 pt-2 text-xs">
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-none">
                  <p className="font-semibold text-slate-900">
                    Task TSK-803 Submitted by Aaliyah Chen
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">10m ago</p>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-none">
                  <p className="font-semibold text-slate-900">
                    Task TSK-802 flagged Overdue
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">1h ago</p>
                </div>
              </div> : <p className="pt-3 text-xs text-slate-500">You’re all caught up.</p>}
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-slate-300 hidden sm:block" />

        {/* User / Admin Profile Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            aria-expanded={isUserMenuOpen}
            className="flex items-center gap-2 p-1.5 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 rounded-none"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Admin Profile"
              className="w-8 h-8 object-cover rounded-none border-2 border-white shadow-sm"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-heading font-bold text-slate-900 leading-tight">
                Alex Vance
              </span>
              <span className="text-[9px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                ARKEELABS ADMIN
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 shadow-lg rounded-none py-1 z-50 animate-in fade-in duration-100 overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-200 bg-slate-50">
                <p className="text-xs font-heading font-bold text-slate-900">Alex Vance</p>
                <p className="text-[10px] font-mono text-slate-400">a.vance@arkeelabs.com</p>
              </div>
              <div className="py-1 text-xs font-heading font-medium">
                <button type="button" onClick={() => { setIsUserMenuOpen(false); showToast('Account settings are available in the full product.', 'info'); }} className="w-full text-left px-3 py-2 hover:bg-slate-100 text-slate-700">
                  Account Settings
                </button>
                <button type="button" onClick={() => { setIsUserMenuOpen(false); showToast('Role permissions are available in the full product.', 'info'); }} className="w-full text-left px-3 py-2 hover:bg-slate-100 text-slate-700">
                  Role Permissions
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative order-3 w-full md:hidden">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks, people, or IDs..."
          aria-label="Global search"
          className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-transparent focus:border-blue-500 focus:bg-white text-xs text-slate-900 placeholder:text-slate-400 outline-none font-medium transition-all rounded-none focus:ring-4 focus:ring-blue-500/10"
        />
      </div>
    </header>
  );
};
