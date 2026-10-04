'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sun,
  Cpu,
  Recycle,
  Beaker,
  Building2,
  Boxes,
  Leaf,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Plus,
  Play,
  RotateCcw,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useDemo } from '@/lib/demo-context';
import { formatInr, formatNumber } from '@/lib/utils';

export default function OverviewDashboardPage() {
  const {
    panels,
    batches,
    inventory,
    environmentalImpact,
    financialMetrics,
    user,
    activityLogs,
  } = useDemo();

  // Intake monthly trend data (CEEW & Bhadla pilot history)
  const intakeTrendData = [
    { month: 'May 26', intakeTonnes: 3.2, reusedTonnes: 0.8, recycledTonnes: 2.4 },
    { month: 'Jun 26', intakeTonnes: 4.8, reusedTonnes: 1.4, recycledTonnes: 3.4 },
    { month: 'Jul 26', intakeTonnes: 5.9, reusedTonnes: 1.6, recycledTonnes: 4.3 },
    { month: 'Aug 26', intakeTonnes: 6.7, reusedTonnes: 1.9, recycledTonnes: 4.8 },
    { month: 'Sep 26', intakeTonnes: 7.8, reusedTonnes: 2.2, recycledTonnes: 5.6 },
    { month: 'Oct 26 (Est)', intakeTonnes: 9.5, reusedTonnes: 2.8, recycledTonnes: 6.7 },
  ];

  // Triage breakdown
  const reuseCount = panels.filter((p) => p.finalTriageStatus === 'refurbish_reuse').length;
  const leachCount = panels.filter((p) => p.finalTriageStatus === 'des_chemical_leaching').length;
  const pendingCount = panels.filter((p) => p.finalTriageStatus === 'further_testing_required' || p.finalTriageStatus === 'manual_review_pending').length;

  const triagePieData = [
    { name: 'Reuse / Refurbish (>70% Eff)', value: reuseCount || 2, color: '#B7F34A' },
    { name: 'DES Chemical Leaching', value: leachCount || 4, color: '#29D9E8' },
    { name: 'Testing / In Review', value: pendingCount || 1, color: '#F5B942' },
  ];

  // Calculate active batch metrics
  const activeBatches = batches.filter((b) => b.status !== 'completed');
  const totalAgGrams = inventory.find((i) => i.materialType === 'silver_999')?.quantity || 1420.5;
  const totalSiKg = inventory.find((i) => i.materialType === 'intact_silicon')?.quantity || 178.4;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── TOP WELCOME BANNER ── */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-solargreen/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-solargreen/10 blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Active Persona: {user.organization}
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-cleanwhite">
              Circular Solar Operations Terminal
            </h1>
            <p className="text-sm text-slate-600 dark:text-mutedslate max-w-2xl">
              Decentralized solvometallurgy hub monitoring Rajasthan Sunbelt PV waste streams, selective silver leaching kinetics, and CPCB EPR credit monetization.
            </p>
          </div>

          {/* Quick Action Triggers */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/dashboard/assessment"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-solargreen text-midnight font-bold text-xs shadow-solar-glow hover:opacity-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Register &amp; AI Triage</span>
            </Link>
            <Link
              href="/dashboard/batches"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-darknavy/60 text-slate-800 dark:text-cleanwhite font-medium text-xs hover:border-solargreen/50 transition-colors"
            >
              <Beaker className="w-4 h-4 text-solargreen" />
              <span>DES Batches ({activeBatches.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── HIGH-LEVEL KPI METRIC CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Panels in Registry */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-solargreen">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-mutedslate">
            <span>PANELS INGESTED</span>
            <Cpu className="w-4 h-4 text-solargreen" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-cleanwhite mt-2">
            {panels.length}
          </div>
          <div className="text-[11px] text-solargreen flex items-center gap-1.5 mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{reuseCount} routed to Reuse ({Math.round((reuseCount / panels.length) * 100 || 0)}%)</span>
          </div>
        </div>

        {/* KPI 2: Active Recovery Batches */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-electriccyan">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-mutedslate">
            <span>ACTIVE DES RUNS</span>
            <Beaker className="w-4 h-4 text-electriccyan" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-cleanwhite mt-2">
            {activeBatches.length} <span className="text-xs text-mutedslate font-sans">/ {batches.length} Total</span>
          </div>
          <div className="text-[11px] text-electriccyan flex items-center gap-1.5 mt-2">
            <span>Ethaline @ 80°C • 40 kHz</span>
          </div>
        </div>

        {/* KPI 3: Recovered Silver (99.9% Pure) */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-violetaccent">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-mutedslate">
            <span>99.9% SILVER RECOVERED</span>
            <Boxes className="w-4 h-4 text-violetaccent" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-cleanwhite mt-2">
            {(totalAgGrams / 1000).toFixed(2)} <span className="text-xs text-mutedslate font-sans">kg ({totalAgGrams.toFixed(0)}g)</span>
          </div>
          <div className="text-[11px] text-violetaccent flex items-center gap-1.5 mt-2">
            <span>Market Value: {formatInr(totalAgGrams * 90)}</span>
          </div>
        </div>

        {/* KPI 4: CO2e Emissions Avoided */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-successgreen">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-mutedslate">
            <span>CO₂e AVOIDED</span>
            <Leaf className="w-4 h-4 text-successgreen" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-cleanwhite mt-2">
            {environmentalImpact.co2eAvoidedTonnes} <span className="text-xs text-mutedslate font-sans">Tonnes</span>
          </div>
          <div className="text-[11px] text-successgreen flex items-center gap-1.5 mt-2">
            <span>100% Toxic HNO₃/HF Avoided</span>
          </div>
        </div>
      </div>

      {/* ── ECONOMIC TURNAROUND HIGHLIGHT BANNER ── */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-darknavy via-midnight to-darknavy border border-solargreen/40 shadow-solar-glow text-cleanwhite">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-solargreen font-bold">
              <TrendingUp className="w-4 h-4" /> The HelioSolv Unit Economics Reversal
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold">
              Turning a -₹10,230 / Tonne Mechanical Deficit into a +₹45,000 / Tonne MSME Profit
            </h3>
            <p className="text-xs sm:text-sm text-mutedslate leading-relaxed">
              Selective Deep Eutectic Solvent solvometallurgy isolates 99.9% pure silver and intact silicon wafers without boiling acids. The result is a 69% operating gross margin and a payback period under 14 months for rural entrepreneurs.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-2 font-mono text-xs">
            <div className="p-3 rounded-xl bg-errorred/15 border border-errorred/30 flex justify-between items-center text-errorred">
              <span>Mechanical Crushing:</span>
              <span className="font-bold">-₹10,230 / t (CEEW)</span>
            </div>
            <div className="p-3 rounded-xl bg-solargreen/15 border border-solargreen/30 flex justify-between items-center text-solargreen">
              <span>HelioSolv Solvometallurgy:</span>
              <span className="font-bold">+₹45,000 / t (69% margin)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE CHARTS ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart 1: Monthly Intake & Recovery Trends */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-2 mb-6">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-cleanwhite">
                Monthly Solar PV Waste Intake &amp; Triage Volume
              </h3>
              <p className="text-xs text-slate-500 dark:text-mutedslate">
                Pilot operational throughput in metric tonnes across Rajasthan Sunbelt corridor
              </p>
            </div>
            <span className="text-xs font-mono text-solargreen px-2.5 py-1 rounded bg-solargreen/15 border border-solargreen/30">
              Pilot Growth: +196%
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intakeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1730',
                    border: '1px solid rgba(183, 243, 74, 0.3)',
                    borderRadius: '0.75rem',
                    color: '#F7FAFC',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="reusedTonnes" name="Reused / Refurbished (t)" fill="#B7F34A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="recycledTonnes" name="DES Solvo-Recycled (t)" fill="#29D9E8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Triage Disposition Distribution */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-cleanwhite">
              Triage Gateway Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-mutedslate mb-4">
              AI screening breakdown of registered panel stock
            </p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={triagePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {triagePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B1730',
                      borderRadius: '0.75rem',
                      border: '1px solid #334155',
                      color: '#F7FAFC',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            {triagePieData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-cleanwhite">{item.value} panels</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LOWER SECTION: RECENT ACTIVITY & QUICK DISPATCH ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Activity Stream */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-solargreen" />
              Live Telemetry &amp; Operational Audit Feed
            </h3>
            <span className="text-[11px] font-mono text-mutedslate">Bhadla Solar Corridor</span>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800/80">
            {activityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="py-3 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-solargreen mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 dark:text-cleanwhite">{log.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-mutedslate mt-0.5">{log.description}</p>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block">Actor: {log.actor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-3xl border border-solargreen/30">
            <h4 className="text-sm font-bold text-slate-900 dark:text-cleanwhite flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-warningamber" /> Satin Finserv Green Loan Telemetry
            </h4>
            <p className="text-xs text-slate-500 dark:text-mutedslate leading-relaxed mb-4">
              Micro-Plant equipment loan SFL-GML-2025-0894 is performing at 100% repayment health. Escrow-settled silver sales cover monthly debt service 4.8x.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-midnight/70">
                <span className="text-[10px] text-mutedslate block">Loan Health</span>
                <span className="text-successgreen font-bold">Standard Asset (No Overdue)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-midnight/70">
                <span className="text-[10px] text-mutedslate block">DSCR Coverage</span>
                <span className="text-solargreen font-bold">4.8x Operating Cash</span>
              </div>
            </div>
            <Link
              href="/dashboard/micro-plants"
              className="text-xs font-semibold text-solargreen flex items-center gap-1 hover:underline"
            >
              Open Facility &amp; Loan Dashboard →
            </Link>
          </div>

          <div className="glass-panel p-5 rounded-3xl border border-electriccyan/30">
            <h4 className="text-sm font-bold text-slate-900 dark:text-cleanwhite flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-electriccyan" /> CPCB EPR Compliance Portal
            </h4>
            <p className="text-xs text-slate-500 dark:text-mutedslate leading-relaxed mb-4">
              Automated API dispatch pushes verified weights from IoT telemetry scales directly to the national CPCB E-Waste registry to mint instant compliance credits.
            </p>
            <Link
              href="/dashboard/reports"
              className="text-xs font-semibold text-electriccyan flex items-center gap-1 hover:underline"
            >
              Generate EPR Certificates &amp; Export →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
