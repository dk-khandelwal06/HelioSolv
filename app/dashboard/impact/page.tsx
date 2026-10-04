'use client';

import React, { useState } from 'react';
import {
  Leaf,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplets,
  Trees,
  TrendingUp,
  Award,
  Download,
  Info,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import { useDemo } from '@/lib/demo-context';
import { formatNumber } from '@/lib/utils';

export default function EnvironmentalImpactPage() {
  const { environmentalImpact } = useDemo();
  const [co2CreditPrice, setCo2CreditPrice] = useState(1200); // INR per tonne of carbon offset

  // LCA Comparison Radar Data
  const lcaRadarData = [
    { metric: 'Low Carbon (CO2e)', heliosolv: 95, conventionalPyrolysis: 25, mechanicalCrush: 60 },
    { metric: 'Zero Toxic Acid', heliosolv: 100, conventionalPyrolysis: 40, mechanicalCrush: 80 },
    { metric: 'Material Circularity', heliosolv: 96, conventionalPyrolysis: 45, mechanicalCrush: 15 },
    { metric: 'Groundwater Safety', heliosolv: 100, conventionalPyrolysis: 50, mechanicalCrush: 65 },
    { metric: 'Energy Efficiency', heliosolv: 90, conventionalPyrolysis: 20, mechanicalCrush: 70 },
  ];

  // Direct comparison data between paradigms
  const emissionsComparison = [
    { name: 'Mechanical Crushing', co2PerTonne: 0.85, toxicAcidKg: 0, materialYieldPercent: 18 },
    { name: 'Pyrometallurgy (600°C)', co2PerTonne: 2.40, toxicAcidKg: 35, materialYieldPercent: 42 },
    { name: 'Acid Hydrometallurgy (HNO3/HF)', co2PerTonne: 1.95, toxicAcidKg: 180, materialYieldPercent: 68 },
    { name: 'HelioSolv DES (80°C)', co2PerTonne: 0.22, toxicAcidKg: 0, materialYieldPercent: 96 },
  ];

  const carbonCreditValue = environmentalImpact.co2eAvoidedTonnes * co2CreditPrice;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-successgreen/15 text-successgreen text-xs font-mono font-bold uppercase mb-2">
            <Leaf className="w-3.5 h-3.5" /> Life Cycle Assessment (LCA) &amp; ESG Accounting
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-cleanwhite">
            Climate Impact &amp; Toxic Hazard Elimination
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-mutedslate mt-1 max-w-2xl">
            Verifying the ecological dividend of low-temperature Deep Eutectic Solvents (Ethaline @ 80°C) versus conventional acid leaching and high-heat pyrometallurgical smelting.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-darknavy/60 text-xs font-mono hover:border-solargreen transition-colors self-start sm:self-center"
        >
          <Download className="w-3.5 h-3.5 text-solargreen" />
          <span>Export ESG Audit (PDF)</span>
        </button>
      </div>

      {/* ── PRIMARY ESG KPI CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-successgreen">
          <div className="flex items-center justify-between text-xs font-mono text-mutedslate">
            <span>CO₂e AVOIDED</span>
            <Leaf className="w-4 h-4 text-successgreen" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-cleanwhite mt-2">
            {environmentalImpact.co2eAvoidedTonnes} <span className="text-xs text-mutedslate font-sans">Tonnes</span>
          </div>
          <div className="text-[11px] text-successgreen mt-2 flex items-center gap-1">
            <Trees className="w-3.5 h-3.5" />
            <span>~{environmentalImpact.equivalentTreesPlanted.toLocaleString()} Mature Tree-Years</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-solargreen">
          <div className="flex items-center justify-between text-xs font-mono text-mutedslate">
            <span>PV LANDFILL DIVERTED</span>
            <Sparkles className="w-4 h-4 text-solargreen" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-cleanwhite mt-2">
            {environmentalImpact.totalWasteDivertedKg.toLocaleString()} <span className="text-xs text-mutedslate font-sans">kg</span>
          </div>
          <div className="text-[11px] text-solargreen mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{environmentalImpact.panelsAssessedTotal} Modules Processed</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-electriccyan">
          <div className="flex items-center justify-between text-xs font-mono text-mutedslate">
            <span>TOXIC ACIDS AVOIDED</span>
            <Droplets className="w-4 h-4 text-electriccyan" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-cleanwhite mt-2">
            100% <span className="text-xs text-mutedslate font-sans">Zero HNO₃ / HF</span>
          </div>
          <div className="text-[11px] text-electriccyan mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Toxic Sludge Runoff</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-violetaccent">
          <div className="flex items-center justify-between text-xs font-mono text-mutedslate">
            <span>CARBON OFFSET VALUE</span>
            <Award className="w-4 h-4 text-violetaccent" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-cleanwhite mt-2">
            ₹{formatNumber(carbonCreditValue)}
          </div>
          <div className="text-[11px] text-violetaccent mt-2 flex items-center gap-1">
            <span>@ ₹{co2CreditPrice}/t Voluntary Credit</span>
          </div>
        </div>
      </div>

      {/* ── CHARTS ROW: LCA COMPARISON & TOXICITY RADAR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Radar: Circularity Index */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite mb-1">
            Multi-Dimensional Circularity Benchmark
          </h3>
          <p className="text-xs text-mutedslate mb-4">
            Normalized 0–100 ecological index comparing recycling approaches
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={85} data={lcaRadarData}>
                <PolarGrid stroke="#334155" opacity={0.4} />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis stroke="#64748b" angle={30} domain={[0, 100]} />
                <Radar name="HelioSolv DES" dataKey="heliosolv" stroke="#B7F34A" fill="#B7F34A" fillOpacity={0.4} />
                <Radar name="Pyrometallurgy" dataKey="conventionalPyrolysis" stroke="#F5B942" fill="#F5B942" fillOpacity={0.15} />
                <Radar name="Crushing" dataKey="mechanicalCrush" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar: Carbon Footprint Comparison */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite">
                Lifecycle Carbon Footprint Comparison
              </h3>
              <p className="text-xs text-mutedslate">
                Emissions in metric tonnes CO₂e per tonne of solar waste treated
              </p>
            </div>
            <span className="text-xs font-mono text-solargreen px-2.5 py-1 rounded bg-solargreen/15">
              -90.8% Lower Footprint
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emissionsComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1730',
                    borderRadius: '0.75rem',
                    border: '1px solid #334155',
                    fontSize: '11px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="co2PerTonne" name="t CO₂e / t Waste" fill="#29D9E8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── TOXIC HAZARD ELIMINATION DETAILS ── */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-solargreen/30 space-y-4">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-cleanwhite flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-solargreen" />
          Hazardous Waste Elimination Ledger (Bhadla Pilot)
        </h3>
        <p className="text-xs sm:text-sm text-mutedslate leading-relaxed">
          In compliance with CPCB Schedule II Hazardous Waste rules, the micro-plant network replaces corrosive mineral acids with biodegradable Ethaline Deep Eutectic Solvent.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-midnight/80 border border-slate-700/80 font-mono text-xs">
            <span className="text-mutedslate block text-[10px] uppercase">Nitric Acid (HNO₃) Avoided</span>
            <span className="text-xl font-bold text-solargreen mt-1 block">5,112 Liters</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Eliminates toxic orange NOx smog plumes</span>
          </div>

          <div className="p-4 rounded-2xl bg-midnight/80 border border-slate-700/80 font-mono text-xs">
            <span className="text-mutedslate block text-[10px] uppercase">Hydrofluoric Acid (HF) Avoided</span>
            <span className="text-xl font-bold text-electriccyan mt-1 block">1,820 Liters</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Zero bone/tissue corrosive hazards</span>
          </div>

          <div className="p-4 rounded-2xl bg-midnight/80 border border-slate-700/80 font-mono text-xs">
            <span className="text-mutedslate block text-[10px] uppercase">Lead Leaching Prevented</span>
            <span className="text-xl font-bold text-warningamber mt-1 block">142 kg</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Desert groundwater table fully safeguarded</span>
          </div>
        </div>
      </div>
    </div>
  );
}
