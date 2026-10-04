'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sun,
  LayoutDashboard,
  Cpu,
  Recycle,
  Beaker,
  Building2,
  Boxes,
  Leaf,
  Calculator,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  RotateCcw,
  Sparkles,
  LogOut,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useDemo } from '@/lib/demo-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, switchUserRole, resetDemoData, activityLogs } = useDemo();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Panel Screening', href: '/dashboard/assessment', icon: Cpu, badge: 'YOLOv8' },
    { name: 'Reuse Triage Gateway', href: '/dashboard/triage', icon: Recycle },
    { name: 'DES Recovery Batches', href: '/dashboard/batches', icon: Beaker, badge: '80°C' },
    { name: 'Micro-Plant Operations', href: '/dashboard/micro-plants', icon: Building2 },
    { name: 'Material Inventory', href: '/dashboard/inventory', icon: Boxes },
    { name: 'Environmental Impact', href: '/dashboard/impact', icon: Leaf },
    { name: 'MSME Unit Economics', href: '/dashboard/finance', icon: Calculator, badge: '69% Margin' },
    { name: 'Reports & CPCB EPR', href: '/dashboard/reports', icon: FileText },
    { name: 'Settings & Integrations', href: '/dashboard/settings', icon: Settings },
  ];

  const handleRoleChange = (role: any) => {
    switchUserRole(role);
    setRoleMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-midnight flex">
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden lg:flex lg:flex-col w-64 border-r border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-midnight/90 backdrop-blur-xl shrink-0 select-none">
        {/* Brand header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800/80">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-solargreen via-electriccyan to-violetaccent p-[1.5px] shadow-solar-glow group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-darknavy rounded-[9px] flex items-center justify-center">
                <Sun className="w-4 h-4 text-solargreen" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-slate-900 dark:text-cleanwhite leading-tight">
                Helio<span className="text-solargreen">Solv</span>
              </span>
              <span className="text-[10px] font-mono text-solargreen-dark dark:text-solargreen">
                CIRCULAR OS
              </span>
            </div>
          </Link>
        </div>

        {/* Facility Indicator */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800/60 bg-slate-100/60 dark:bg-darknavy/40">
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-mutedslate">
            <span className="h-2 w-2 rounded-full bg-successgreen animate-pulse" />
            <span className="font-semibold text-slate-900 dark:text-cleanwhite truncate">
              Bhadla Micro-Plant #01
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 truncate">
            Jodhpur District, Rajasthan
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-solargreen text-midnight font-bold shadow-solar-glow'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darknavy/60 hover:text-solargreen'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-midnight' : 'text-slate-400 group-hover:text-solargreen'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-midnight/20 text-midnight'
                        : 'bg-solargreen/15 text-solargreen-dark dark:text-solargreen border border-solargreen/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom SFL / SANKALP Info */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-midnight/60">
          <div className="p-2.5 rounded-xl bg-solargreen/10 border border-solargreen/20 text-[11px] text-slate-700 dark:text-mutedslate">
            <div className="flex items-center justify-between text-solargreen font-mono font-bold text-[10px] uppercase mb-1">
              <span>SANKALP 2026</span>
              <Sparkles className="w-3 h-3" />
            </div>
            <span>Deep Eutectic Solvents + YOLOv8 Edge Triage</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── TOP HEADER BAR ── */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-midnight/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-4 z-20">
          {/* Left: Mobile hamburger & breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-mutedslate">
              <Link href="/dashboard" className="hover:text-solargreen">
                Workspace
              </Link>
              <span>/</span>
              <span className="text-slate-900 dark:text-cleanwhite font-medium capitalize">
                {pathname.split('/')[2] || 'Overview'}
              </span>
            </div>
          </div>

          {/* Right: Controls & Persona Switcher */}
          <div className="flex items-center gap-3">
            {/* Live Demo Reset Button for Judges */}
            <button
              onClick={resetDemoData}
              title="Reset all demo data to baseline state"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-darknavy/50 text-[11px] font-mono text-slate-600 dark:text-mutedslate hover:border-solargreen/50 hover:text-solargreen transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-solargreen/30 bg-solargreen/10 text-xs font-medium text-slate-800 dark:text-cleanwhite hover:border-solargreen transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-solargreen" />
                <span className="max-w-[140px] truncate">{user.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel border border-slate-300 dark:border-slate-700 shadow-2xl py-2 z-50 text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-mutedslate border-b border-slate-700/60">
                    Switch Judge Persona:
                  </div>
                  <button
                    onClick={() => handleRoleChange('sfl_financier')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-800 dark:text-cleanwhite"
                  >
                    <div>
                      <div className="font-semibold text-solargreen">Satin Finserv Jury / ESG</div>
                      <div className="text-[10px] text-mutedslate">Loan financier perspective</div>
                    </div>
                    {user.role === 'sfl_financier' && <CheckCircle2 className="w-3.5 h-3.5 text-solargreen" />}
                  </button>
                  <button
                    onClick={() => handleRoleChange('microplant_operator')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-800 dark:text-cleanwhite"
                  >
                    <div>
                      <div className="font-semibold text-electriccyan">Bhadla MSME Operator</div>
                      <div className="text-[10px] text-mutedslate">Field recycling technician</div>
                    </div>
                    {user.role === 'microplant_operator' && <CheckCircle2 className="w-3.5 h-3.5 text-solargreen" />}
                  </button>
                  <button
                    onClick={() => handleRoleChange('sustainability_analyst')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-800 dark:text-cleanwhite"
                  >
                    <div>
                      <div className="font-semibold text-violetaccent">Sustainability Auditor</div>
                      <div className="text-[10px] text-mutedslate">CPCB EPR verification</div>
                    </div>
                    {user.role === 'sustainability_analyst' && <CheckCircle2 className="w-3.5 h-3.5 text-solargreen" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-solargreen/50 transition-colors"
                aria-label="Activity Feed"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-solargreen animate-ping" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-panel border border-slate-300 dark:border-slate-700 shadow-2xl p-4 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
                    <span className="font-mono uppercase text-slate-700 dark:text-cleanwhite">Live Micro-Plant Feed</span>
                    <span className="text-[10px] font-mono text-solargreen">{activityLogs.length} updates</span>
                  </div>
                  <div className="divide-y divide-slate-200 dark:divide-slate-800/80 max-h-72 overflow-y-auto">
                    {activityLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="py-2.5 text-xs">
                        <div className="font-medium text-slate-900 dark:text-cleanwhite">{log.title}</div>
                        <div className="text-[11px] text-slate-500 dark:text-mutedslate mt-0.5 leading-tight">{log.description}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">{log.actor}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Home / Exit */}
            <Link
              href="/"
              title="Return to Public Site"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-errorred hover:border-errorred/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* ── PAGE VIEWPORT ── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 glass-panel border-r border-slate-700 h-full flex flex-col p-4 z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-solargreen" />
                <span className="font-bold text-cleanwhite font-display">HelioSolv</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-cleanwhite"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium ${
                      isActive
                        ? 'bg-solargreen text-midnight font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <button
              onClick={() => {
                resetDemoData();
                setMobileSidebarOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 text-xs text-mutedslate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
