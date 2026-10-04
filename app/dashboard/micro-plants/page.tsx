'use client';

import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  TrendingUp,
  FileCheck,
  ShieldCheck,
  Coins,
  Cpu,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { MicroPlant } from '@/lib/types';
import { formatInr } from '@/lib/utils';

export default function MicroPlantsPage() {
  const { microPlants, user, showToast } = useDemo();
  const [selectedHub, setSelectedHub] = useState<MicroPlant>(microPlants[0]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warningamber/15 text-warningamber text-xs font-mono font-bold uppercase mb-2">
            <Building2 className="w-3.5 h-3.5" /> Decentralized Infrastructure Network
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-cleanwhite">
            Micro-Plant Operations &amp; SFL Loan Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-mutedslate mt-1 max-w-2xl">
            Decentralized 100 kg/day &quot;Plants-in-a-Box&quot; eliminating the 45% freight cost of centralized smelters. Financed as collateralized green machinery loans by Satin Finserv.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-solargreen px-3 py-1.5 rounded-xl bg-solargreen/10 border border-solargreen/20">
          <span className="w-2 h-2 rounded-full bg-solargreen animate-ping" />
          <span>Network Health: 98.4% Normal</span>
        </div>
      </div>

      {/* ── HUB CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {microPlants.map((plant: MicroPlant) => {
          const isSelected = plant.id === selectedHub.id;
          return (
            <div
              key={plant.id}
              onClick={() => setSelectedHub(plant)}
              className={`p-5 rounded-2xl glass-panel border cursor-pointer transition-all ${
                isSelected
                  ? 'border-solargreen shadow-solar-glow'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase text-mutedslate flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-solargreen" /> {plant.state}
                </span>
                <span
                  className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                    plant.operationalStatus === 'online'
                      ? 'bg-successgreen/15 text-successgreen'
                      : plant.operationalStatus === 'maintenance'
                      ? 'bg-warningamber/15 text-warningamber'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {plant.operationalStatus}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-cleanwhite truncate mb-1">
                {plant.name}
              </h3>
              <p className="text-xs text-mutedslate truncate mb-3">{plant.location}</p>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-mutedslate block">Throughput:</span>
                  <span className="font-bold text-slate-900 dark:text-cleanwhite">
                    {plant.dailyCapacityKg} kg/day
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-mutedslate block">Total Diverted:</span>
                  <span className="font-bold text-solargreen">
                    {plant.cumulativeWasteDivertedTonnes} t
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── SELECTED HUB DETAILED TELEMETRY & SATIN FINSERV AUDIT ── */}
      {selectedHub && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Operational Diagnostics */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-cleanwhite">
                  {selectedHub.name}
                </h3>
                <span className="text-xs font-mono text-mutedslate">
                  GPS: 27.5387° N, 71.9163° E • Operated by {selectedHub.operatorName}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-solargreen/15 text-solargreen border border-solargreen/30">
                ACTIVE CLUSTER
              </span>
            </div>

            {/* Sub-systems Health Telemetry */}
            <div>
              <h4 className="text-xs font-mono uppercase text-mutedslate mb-3">
                Sub-Systems &amp; Sensor Telemetry:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-midnight/70 border border-slate-700/60">
                  <span className="text-[10px] text-mutedslate block">DES Reactor</span>
                  <span className="text-successgreen font-bold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 80.2°C STABLE
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-midnight/70 border border-slate-700/60">
                  <span className="text-[10px] text-mutedslate block">Ultrasonics</span>
                  <span className="text-successgreen font-bold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 40 kHz LOCK
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-midnight/70 border border-slate-700/60">
                  <span className="text-[10px] text-mutedslate block">Electrowinning</span>
                  <span className="text-successgreen font-bold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 2.1 V (99.9% Ag)
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-midnight/70 border border-slate-700/60">
                  <span className="text-[10px] text-mutedslate block">Scrubber Vapor</span>
                  <span className="text-solargreen font-bold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Zero NOx
                  </span>
                </div>
              </div>
            </div>

            {/* Cumulative Yield Metrics */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-darknavy to-midnight border border-solargreen/30 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-mutedslate uppercase block">Silver Extracted</span>
                <span className="text-lg font-bold text-solargreen mt-1 block">
                  {selectedHub.silverRecoveredKg} kg (99.9% Pure)
                </span>
                <span className="text-[10px] text-slate-400">Sold to bullion off-taker</span>
              </div>
              <div>
                <span className="text-[10px] text-mutedslate uppercase block">Silicon Intact</span>
                <span className="text-lg font-bold text-electriccyan mt-1 block">
                  {selectedHub.siliconRecoveredKg} kg
                </span>
                <span className="text-[10px] text-slate-400">Solar cell precursor</span>
              </div>
              <div>
                <span className="text-[10px] text-mutedslate uppercase block">Total PV Diverted</span>
                <span className="text-lg font-bold text-cleanwhite mt-1 block">
                  {selectedHub.cumulativeWasteDivertedTonnes} Tonnes
                </span>
                <span className="text-[10px] text-slate-400">From landfill dumping</span>
              </div>
            </div>
          </div>

          {/* Right: Satin Finserv Green Loan Dossier */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 rounded-3xl border border-warningamber/30 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-warningamber" />
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite">
                    Satin Finserv Green Loan
                  </h4>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-successgreen/15 text-successgreen">
                  STANDARD ASSET (PERFORMING)
                </span>
              </div>

              {selectedHub.sflLoan ? (
                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-mutedslate">SFL Facility Code:</span>
                    <span className="text-cleanwhite font-bold">{selectedHub.sflLoan.loanId}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-mutedslate">Total Loan Sanctioned:</span>
                    <span className="text-solargreen font-bold">
                      {formatInr(selectedHub.sflLoan.sanctionedAmountInr)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-mutedslate">Monthly Equated Installment (EMI):</span>
                    <span className="text-cleanwhite font-bold">
                      {formatInr(selectedHub.sflLoan.monthlyEmiInr)} / mo
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-mutedslate">Debt Service Coverage (DSCR):</span>
                    <span className="text-solargreen font-bold">
                      {selectedHub.sflLoan.dscrCoverage}x (Healthy &gt;1.5x)
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-mutedslate">Repayment Track Record:</span>
                    <span className="text-successgreen font-bold">
                      {selectedHub.sflLoan.repaidMonths} of {selectedHub.sflLoan.tenureMonths} Months Repaid (0 Overdues)
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-mutedslate">Collateral Security:</span>
                    <span className="text-cleanwhite">DES Machine Hypothecation + Escrow</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-800/40 text-xs text-mutedslate">
                  Facility awaiting initial credit appraisal from Satin Finserv.
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-warningamber/10 border border-warningamber/20 text-[11px] text-warningamber leading-relaxed">
                <strong>NBFC Synergy Note:</strong> High gross margins (69%) generate ~₹1.12 Lakhs monthly operator cash flow, covering the ₹48,150 EMI by more than 2.3x. Low default risk makes this prime for SFL expansion.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
