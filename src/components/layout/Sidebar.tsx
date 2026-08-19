"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useToast } from "../ui/Toast";
import {
  LayoutDashboard,
  Store,
  Users,
  CheckSquare,
  Clock,
  MessageSquareWarning,
  Package,
  ClipboardCheck,
  ShoppingBag,
  CreditCard,
  Target,
  Grid,
  CalendarCheck,
  CalendarDays,
  BarChart3,
  ListChecks,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * SHARP ENTERPRISE CRM SIDEBAR NAV (100% Rough Edge)
 * Fixed header layout overflow for both expanded (w-64) and
 * collapsed (w-20) states. Zero round edges, zero clipping.
 * ───────────────────────────────────────────────────────── */

export interface NavItemDef {
  key: string;
  label: string;
  path: string;
  icon: React.ElementType;
  section: "Workspace" | "Objects & Operations";
  isFullyBuilt?: boolean;
  count?: boolean;
  plus?: boolean;
}

const navItems: NavItemDef[] = [
  // Workspace Section
  { key: "dashboard", label: "Dashboard", path: "/", icon: LayoutDashboard, section: "Workspace", isFullyBuilt: true },
  { key: "tasks", label: "Agent Tasks", path: "/tasks", icon: CheckSquare, section: "Workspace", isFullyBuilt: true, count: true },
  { key: "attendance", label: "Attendance & Inbox", path: "/attendance", icon: CalendarCheck, section: "Workspace", isFullyBuilt: true },
  { key: "reports", label: "Analytics & Reports", path: "/reports", icon: BarChart3, section: "Workspace", isFullyBuilt: true },

  // Objects & Operations Section
  { key: "employees", label: "Employees", path: "/employees", icon: Users, section: "Objects & Operations", isFullyBuilt: true },
  { key: "shops", label: "Suppliers & Shops", path: "/shops", icon: Store, section: "Objects & Operations", isFullyBuilt: true, plus: true },
  { key: "inventory", label: "Inventory", path: "/inventory", icon: Package, section: "Objects & Operations", isFullyBuilt: true },
  { key: "postpone", label: "Postpone Requests", path: "/postpone-requests", icon: Clock, section: "Objects & Operations" },
  { key: "apologies", label: "Apologies Log", path: "/apologies", icon: MessageSquareWarning, section: "Objects & Operations" },
  { key: "inspections", label: "Inspections", path: "/inspections", icon: ClipboardCheck, section: "Objects & Operations", isFullyBuilt: true },
  { key: "purchases", label: "Purchases", path: "/purchases", icon: ShoppingBag, section: "Objects & Operations" },
  { key: "payroll", label: "Payroll", path: "/payroll", icon: CreditCard, section: "Objects & Operations" },
  { key: "targets", label: "Targets", path: "/targets", icon: Target, section: "Objects & Operations" },
  { key: "matrix", label: "Target Matrix", path: "/target-matrix", icon: Grid, section: "Objects & Operations" },
  { key: "roster", label: "Shift Roster", path: "/roster-sheet", icon: CalendarDays, section: "Objects & Operations" },
  { key: "templates", label: "Checklist Templates", path: "/checklist-templates", icon: ListChecks, section: "Objects & Operations" },
];

export const Sidebar: React.FC = () => {
  const {
    isSidebarCollapsed,
    toggleSidebar,
    filteredTasks,
    selectedProperty,
    isMobileSidebarOpen,
    closeMobileSidebar,
  } = useApp();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState<string | null>(null);
  const [box, setBox] = useState<{ top: number; height: number } | null>(null);
  const [query, setQuery] = useState("");
  const badgeCount = filteredTasks.length;

  const sections: ("Workspace" | "Objects & Operations")[] = ["Workspace", "Objects & Operations"];
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  const activeItem = navItems.find((item) => item.path === location.pathname) || navItems[0];

  useLayoutEffect(() => {
    const container = navRef.current;
    const targetKey = hovered ?? activeItem.key;
    const target = itemRefs.current[targetKey];
    if (!container || !target || isSidebarCollapsed) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setBox({
      top: targetRect.top - containerRect.top,
      height: targetRect.height,
    });
  }, [hovered, activeItem.key, location.pathname, isSidebarCollapsed]);

  const filteredNavItems = query
    ? navItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : navItems;

  const brandLetter = selectedProperty?.name ? selectedProperty.name.charAt(0) : "C";

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-[transform,width] duration-300 ease-out flex flex-col bg-surface border-r border-slate-200 dark:border-slate-800 select-none shadow-xl lg:shadow-none ${
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } ${isSidebarCollapsed ? "lg:w-20" : "w-72 lg:w-64"}`}
    >
      {/* Workspace Header Row - Clean non-overlapping structure */}
      <div className="h-16 flex items-center px-3 border-b border-slate-200 dark:border-slate-800 shrink-0 relative">
        {!isSidebarCollapsed ? (
          <div className="flex items-center justify-between w-full min-w-0">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 min-w-0 flex-1 text-left hover:opacity-90 transition-opacity"
              title={`${selectedProperty?.name || "Creamery Ops"} - Production Workspace`}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-none bg-blue-600 text-[13px] font-bold text-white font-mono">
                {brandLetter}
              </span>
              <span className="min-w-0 flex-1 truncate">
                <span className="block truncate text-[13px] font-bold leading-tight text-ink font-heading">
                  {selectedProperty?.name || "Creamery Ops"}
                </span>
                <span className="block truncate text-[10.5px] leading-tight text-ink-3 font-mono">
                  Production Workspace
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={toggleSidebar}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 rounded-none shrink-0 ml-1"
              title="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full relative">
            <button
              type="button"
              onClick={toggleSidebar}
              className="size-9 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-sm flex items-center justify-center rounded-none transition-colors border border-blue-700"
              title="Expand sidebar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {!isSidebarCollapsed && (
        <div className="px-2 pt-2 pb-1 shrink-0">
          {/* Quick Search Bar */}
          <label className="mb-2 flex h-8 items-center gap-2 rounded-none bg-inset px-2.5 border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--ink-3)"
              strokeWidth="2"
              strokeLinecap="square"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Quick search..."
              className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-ink-3 font-medium"
            />
            <kbd className="flex size-4.5 items-center justify-center rounded bg-surface text-[10px] text-ink-3 border border-slate-200 dark:border-slate-800 font-mono">
              /
            </kbd>
          </label>

          {/* Accent Action: New Task */}
          <button
            type="button"
            onClick={() => {
              navigate("/tasks");
              closeMobileSidebar();
            }}
            className="flex w-full items-center gap-2 rounded-none px-2 py-1.5 text-[12.5px]
              font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 transition-colors active:scale-[0.98]"
          >
            <span className="min-w-0 flex-1 truncate text-left font-heading uppercase tracking-wide">
              New task
            </span>
            <span className="flex size-4.5 shrink-0 items-center justify-center rounded-none bg-blue-600 text-white font-bold">
              <Plus className="w-3 h-3" />
            </span>
          </button>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div
          ref={navRef}
          onMouseLeave={() => setHovered(null)}
          className="relative flex flex-col gap-2"
        >
          {!isSidebarCollapsed && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 rounded-none bg-hover border-l-3 border-blue-600"
              style={{
                top: box?.top ?? 0,
                height: box?.height ?? 0,
                opacity: box ? 1 : 0,
                transition:
                  "top 200ms cubic-bezier(0.23,1,0.32,1), height 200ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease",
              }}
            />
          )}

          {sections.map((section) => {
            const sectionItems = filteredNavItems.filter((item) => item.section === section);
            if (sectionItems.length === 0) return null;

            return (
              <div key={section}>
                {!isSidebarCollapsed && (
                  <div className="px-2 pb-1 pt-1 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-ink-3 font-mono">
                    {section}
                  </div>
                )}
                <div className="flex flex-col gap-0.5">
                  {sectionItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <NavLink
                        key={item.key}
                        to={item.path}
                        ref={(el) => {
                          itemRefs.current[item.key] = el;
                        }}
                        onMouseEnter={() => setHovered(item.key)}
                        onFocus={() => setHovered(item.key)}
                        onBlur={() => setHovered(null)}
                        onClick={closeMobileSidebar}
                        aria-current={isActive ? "page" : undefined}
                        title={isSidebarCollapsed ? item.label : undefined}
                        className={`group relative z-10 flex w-full items-center gap-2.5 rounded-none px-2.5 py-2 text-left transition-colors ${
                          isSidebarCollapsed ? "justify-center" : ""
                        } ${
                          isActive ? "bg-blue-50/80 text-blue-700 font-semibold border-l-3 border-blue-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-l-3 border-transparent"
                        }`}
                      >
                        <span
                          className={`shrink-0 transition-colors ${
                            isActive ? "text-blue-600 font-bold" : "text-ink-3 group-hover:text-ink"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </span>

                        {!isSidebarCollapsed && (
                          <span
                            className={`min-w-0 flex-1 truncate text-[13px] transition-colors font-heading ${
                              isActive ? "font-bold text-ink" : "text-ink-2 group-hover:text-ink"
                            }`}
                          >
                            {item.label}
                          </span>
                        )}

                        {!isSidebarCollapsed && item.count && (
                          <span
                            key={badgeCount}
                            className={`flex h-4.5 min-w-4.5 items-center justify-center rounded-none px-1.5 text-[10.5px] font-extrabold font-mono tabular-nums border shrink-0 ${
                              isActive
                                ? "bg-blue-600 text-white border-blue-700"
                                : "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800"
                            }`}
                          >
                            {badgeCount}
                          </span>
                        )}

                        {!isSidebarCollapsed && !item.isFullyBuilt && !item.count && (
                          <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1 py-0.5 font-mono shrink-0 uppercase rounded-none">
                            Stub
                          </span>
                        )}

                        {!isSidebarCollapsed && item.plus && (
                          <span
                            className="flex size-4.5 items-center justify-center rounded-none text-ink-3 opacity-0
                              transition-[background-color,color,opacity] duration-100 group-hover:opacity-100 hover:bg-line/70 hover:text-ink shrink-0"
                            style={isActive ? { opacity: 1 } : undefined}
                          >
                            <Plus className="w-3 h-3" />
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Pinned Sign Out Action */}
      <div className="p-2 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <button
          type="button"
          onClick={() => showToast("Sign out is simulated in this client demo.", "info")}
          className={`w-full flex items-center gap-2 px-2 py-2 text-[12px] font-mono font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors rounded-none ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isSidebarCollapsed && <span>SIGN OUT</span>}
        </button>
      </div>
    </aside>
  );
};

export const SidebarNav = Sidebar;
export default Sidebar;
