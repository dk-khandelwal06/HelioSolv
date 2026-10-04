'use client';

import React, { useState } from 'react';
import {
  Calculator,
  Coins,
  TrendingUp,
  DollarSign,
  Building2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Percent,
  Calendar,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { formatInr, formatNumber } from '@/lib/utils';

export default function MSMEFinancePage() {
  const { financialMetrics } = useDemo();

  // Dynamic simulation parameters
  const [dailyCapacityKg, setDailyCapacityKg] = useState(100); // 100 kg/day (5 panels/day)
  const [silverPricePerGram, setSilverPricePerGram] = useState(90); // INR 90 / gram
  const [solventRecyclePercent, setSolventRecyclePercent] = useState(93); // 93% solvent recovery
  const [eprPricePerTonne, setEprPricePerTonne] = useState(5000); // INR 5000 / t

  // Baseline calculations
  const operatingDaysPerMonth = 26;
  const monthlyTonnage = (dailyCapacityKg * operatingDaysPerMonth) / 1000; // e.g. 2.6 tonnes
  const annualTonnage = monthlyTonnage * 12; // ~31.2 tonnes

  // Dynamic OPEX per kg (Solvent cost scales inversely with recovery rate)
  const baseSolventCostPerKg = 3.5 * ((100 - solventRecyclePercent) / 7);
  const opexPerKg = 8.0 /* labor */ + 4.0 /* electricity */ + baseSolventCostPerKg + 4.5 /* consumables */;
  const opexPerTonne = opexPerKg * 1000;

  // Dynamic Revenue per kg
  const silverPerTonneGrams = 500; // 0.05% mass
  const silverRevPerTonne = silverPerTonneGrams * silverPricePerGram;
  const siliconRevPerTonne = 38 * 250; // ₹9,500
  const aluminumRevPerTonne = 180 * 18; // ₹3,240
  const glassRevPerTonne = 700 * 5; // ₹3,500
  const eprRevPerTonne = eprPricePerTonne;

  const totalRevPerTonne = silverRevPerTonne + siliconRevPerTonne + aluminumRevPerTonne + glassRevPerTonne + eprRevPerTonne;
  const totalRevPerKg = totalRevPerTonne / 1000;

  // Profitability
  const profitPerTonne = totalRevPerTonne - opexPerTonne;
  const grossMargin = ((profitPerTonne / totalRevPerTonne) * 100).toFixed(1);

  const monthlyGrossRev = monthlyTonnage * totalRevPerTonne;
  const monthlyOpex = monthlyTonnage * opexPerTonne;
  const monthlyProfit = monthlyTonnage * profitPerTonne;

  // Satin Finserv Loan Model (18L CAPEX, 14.4L Loan @ 12.5% for 36 mos)
  const capexTotal = 1800000;
  const loanPrincipal = 1440000;
  const monthlyEmi = 48150; // Standard 36-mo EMI
  const netMonthlyOperatorCash = monthlyProfit - monthlyEmi;
  const dscr = (monthlyProfit / monthlyEmi).toFixed(2);
  const paybackMonths = ((capexTotal / (monthlyProfit * 12)) * 12).toFixed(1);

  // Status quo comparison (-₹10,230/t deficit)
  const statusQuoMonthlyLoss = monthlyTonnage * -10230;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase mb-2">
            <Coins className="w-3.5 h-3.5" /> Unit Economics &amp; Green Loan Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-cleanwhite">
            MSME Financial Model &amp; SFL Credit Appraisal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-mutedslate mt-1 max-w-2xl">
            Simulate 100 kg/day micro-plant cash flows, debt service coverage ratio (DSCR), and the 69% gross margin turnaround against status-quo mechanical crushing.
          </p>
        </div>

        <div className="p-3 rounded-2xl glass-panel border border-solargreen/30 self-start sm:self-center">
          <span className="text-[10px] font-mono uppercase text-mutedslate block">Gross Margin</span>
          <div className="text-2xl font-extrabold font-mono text-solargreen">
            {grossMargin}%
          </div>
          <span className="text-[10px] text-mutedslate">Payback: {paybackMonths} Months</span>
        </div>
      </div>

      {/* ── 3 CORE METRICS COMPARISON ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-solargreen">
          <span className="text-xs font-mono text-mutedslate uppercase block">HelioSolv Net Profit / Tonne</span>
          <div className="text-3xl font-mono font-extrabold text-solargreen mt-2">
            +{formatInr(profitPerTonne)}
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            ₹{totalRevPerKg.toFixed(1)}/kg Rev vs ₹{opexPerKg.toFixed(1)}/kg OPEX
          </span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-errorred">
          <span className="text-xs font-mono text-mutedslate uppercase block">Status Quo Mechanical Loss</span>
          <div className="text-3xl font-mono font-extrabold text-errorred mt-2">
            -₹10,230
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            CEEW 2024 Benchmarked Deficit per Tonne
          </span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-warningamber">
          <span className="text-xs font-mono text-mutedslate uppercase block">SFL Debt Coverage (DSCR)</span>
          <div className="text-3xl font-mono font-extrabold text-warningamber mt-2">
            {dscr}x
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            Cash Surplus {formatInr(monthlyProfit)} / {formatInr(monthlyEmi)} EMI
          </span>
        </div>
      </div>

      {/* ── INTERACTIVE SCENARIO SIMULATOR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite flex items-center gap-2">
              <Calculator className="w-4 h-4 text-solargreen" /> Scenario Variable Sliders
            </h3>
            <span className="text-xs font-mono text-mutedslate">Real-time Recalculation</span>
          </div>

          {/* Slider 1: Daily Capacity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-mutedslate">Daily Processing Capacity:</span>
              <span className="font-bold text-solargreen">{dailyCapacityKg} kg / day (~{(dailyCapacityKg / 20).toFixed(0)} panels)</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="25"
              value={dailyCapacityKg}
              onChange={(e) => setDailyCapacityKg(Number(e.target.value))}
              className="w-full accent-solargreen cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Slider 2: Silver Price */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-mutedslate">Silver Spot Price (99.9% Assay):</span>
              <span className="font-bold text-solargreen">₹{silverPricePerGram} / gram</span>
            </div>
            <input
              type="range"
              min="60"
              max="120"
              step="5"
              value={silverPricePerGram}
              onChange={(e) => setSilverPricePerGram(Number(e.target.value))}
              className="w-full accent-solargreen cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Slider 3: Solvent Recycling Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-mutedslate">DES Solvent Regeneration Rate:</span>
              <span className="font-bold text-electriccyan">{solventRecyclePercent}% Recycled</span>
            </div>
            <input
              type="range"
              min="80"
              max="98"
              step="1"
              value={solventRecyclePercent}
              onChange={(e) => setSolventRecyclePercent(Number(e.target.value))}
              className="w-full accent-electriccyan cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Slider 4: CPCB EPR Credit Price */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-mutedslate">CPCB EPR Credit Market Value:</span>
              <span className="font-bold text-violetaccent">₹{eprPricePerTonne} / tonne</span>
            </div>
            <input
              type="range"
              min="2000"
              max="8000"
              step="500"
              value={eprPricePerTonne}
              onChange={(e) => setEprPricePerTonne(Number(e.target.value))}
              className="w-full accent-violetaccent cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Quick presets */}
          <div className="pt-2 flex items-center gap-2 text-xs font-mono">
            <span className="text-mutedslate">Presets:</span>
            <button
              onClick={() => {
                setDailyCapacityKg(100);
                setSilverPricePerGram(90);
                setSolventRecyclePercent(93);
              }}
              className="px-2.5 py-1 rounded bg-slate-200 dark:bg-midnight border border-slate-700 text-xs hover:border-solargreen"
            >
              Baseline Bhadla (100 kg/d)
            </button>
            <button
              onClick={() => {
                setDailyCapacityKg(250);
                setSilverPricePerGram(105);
                setSolventRecyclePercent(95);
              }}
              className="px-2.5 py-1 rounded bg-slate-200 dark:bg-midnight border border-slate-700 text-xs hover:border-solargreen"
            >
              Scale Hub (250 kg/d)
            </button>
          </div>
        </div>

        {/* Financial Projections Breakdown */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-solargreen/30 space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite">
              Projected Monthly Operator Ledger
            </h3>
            <span className="text-xs font-mono text-solargreen">
              {monthlyTonnage.toFixed(1)} Tonnes / Mo
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-mutedslate">Gross Revenue (Silver + Si + Al + Glass + EPR):</span>
              <span className="font-bold text-slate-900 dark:text-cleanwhite">{formatInr(monthlyGrossRev)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-mutedslate">Direct OPEX (Labor, Energy, DES top-up):</span>
              <span className="text-errorred font-bold">-{formatInr(monthlyOpex)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800 bg-solargreen/10 px-2 rounded-lg">
              <span className="font-bold text-solargreen-dark dark:text-solargreen">Monthly Operating Surplus:</span>
              <span className="font-extrabold text-solargreen">{formatInr(monthlyProfit)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-mutedslate">Satin Finserv Green Loan EMI:</span>
              <span className="text-warningamber font-bold">-{formatInr(monthlyEmi)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="font-bold text-slate-900 dark:text-cleanwhite">Net Cash to Rural MSME Operator:</span>
              <span className="font-extrabold font-mono text-solargreen">{formatInr(netMonthlyOperatorCash)} / mo</span>
            </div>
          </div>

          {/* SFL Credit Opinion Box */}
          <div className="p-4 rounded-2xl bg-midnight/90 border border-warningamber/30 text-xs text-mutedslate space-y-2">
            <div className="flex justify-between items-center text-warningamber font-bold font-mono">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> SATIN FINSERV CREDIT OPINION
              </span>
              <span>APPROVED / TIER-1</span>
            </div>
            <p className="leading-relaxed">
              With a DSCR of <strong>{dscr}x</strong> (surpassing SFL&apos;s 1.5x minimum benchmark) and mineral receivables secured via buyer escrow, this equipment loan presents prime underwriting feasibility with payback under <strong>{paybackMonths} months</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* ── CAPEX & OPEX ITEMIZATION TABLE ── */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite">
          Itemized Capital (CAPEX) &amp; Operational (OPEX) Cost Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          {/* CAPEX List */}
          <div className="space-y-2">
            <div className="text-solargreen font-bold uppercase pb-1 border-b border-slate-700">
              Total CAPEX: ₹18.00 Lakhs (80% SFL Debt / 20% MSME Equity)
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-mutedslate">DES Reactor Reaction Tank (316L SS @ 80°C):</span>
              <span className="font-bold text-cleanwhite">₹5,50,000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-mutedslate">Frame Unbolter &amp; EVA Delamination Rig:</span>
              <span className="font-bold text-cleanwhite">₹3,80,000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-mutedslate">Electrowinning Metal Precipitation Cell:</span>
              <span className="font-bold text-cleanwhite">₹2,70,000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-mutedslate">40 kHz Ultrasonic Array &amp; IoT Telemetry:</span>
              <span className="font-bold text-cleanwhite">₹2,50,000</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-mutedslate">Initial Ethaline Batch &amp; Working Capital:</span>
              <span className="font-bold text-cleanwhite">₹3,50,000</span>
            </div>
          </div>

          {/* OPEX List */}
          <div className="space-y-2">
            <div className="text-electriccyan font-bold uppercase pb-1 border-b border-slate-700">
              Itemized OPEX: ₹20.00 / kg (₹20,000 / Tonne)
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-mutedslate">Skilled &amp; Semi-skilled Local Operator Labor:</span>
              <span className="font-bold text-cleanwhite">₹8.00 / kg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-mutedslate">Thermal Electric Power (@ 80°C Low Heat):</span>
              <span className="font-bold text-cleanwhite">₹4.00 / kg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-mutedslate">Ethaline DES Solvent Top-up (93% Recycled):</span>
              <span className="font-bold text-cleanwhite">₹3.50 / kg</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-mutedslate">Consumables, Filter Bags, PPE &amp; QA:</span>
              <span className="font-bold text-cleanwhite">₹4.50 / kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
