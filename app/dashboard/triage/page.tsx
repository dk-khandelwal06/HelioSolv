'use client';

import React, { useState } from 'react';
import {
  Recycle,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  ArrowRight,
  FileCheck,
  ClipboardList,
  Printer,
  ChevronRight,
  ShieldAlert,
  Check,
} from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { PanelRecord, ElectricalTestData } from '@/lib/types';

export default function ReuseTriagePage() {
  const { panels, updatePanel, user, showToast } = useDemo();

  // Selected panel for triage audit
  const [selectedPanelId, setSelectedPanelId] = useState<string>(panels[0]?.id || '');
  const panel = panels.find((p) => p.id === selectedPanelId) || panels[0];

  // Electrical test inputs
  const [voc, setVoc] = useState<number>(panel?.electricalTest?.vocVolts || 36.4);
  const [isc, setIsc] = useState<number>(panel?.electricalTest?.iscAmps || 8.4);
  const [pmax, setPmax] = useState<number>(panel?.electricalTest?.pmaxWatts || 252.8);
  const [insulation, setInsulation] = useState<number>(panel?.electricalTest?.insulationResistanceMOhm || 240);
  const [testerNotes, setTesterNotes] = useState<string>(
    panel?.electricalTest?.testerNotes || 'I-V curve tracing conducted under standard test conditions (STC).'
  );
  const [decisionNotes, setDecisionNotes] = useState<string>(panel?.notes || '');

  // Calculate efficiency from test
  const ratedPower = panel?.ratedPowerWatts || 330;
  const calculatedEff = Number(((pmax / ratedPower) * 100).toFixed(1));
  const isEligibleForReuse = calculatedEff >= 70 && insulation >= 50;

  const handleSaveElectricalTest = () => {
    const testData: ElectricalTestData = {
      vocVolts: voc,
      iscAmps: isc,
      pmaxWatts: pmax,
      fillFactor: Math.min(80, Math.round((pmax / (voc * isc)) * 100)),
      insulationResistanceMOhm: insulation,
      efficiencyPercentage: calculatedEff,
      testedBy: user.name,
      testedAt: new Date().toISOString(),
      testerNotes,
    };

    const newStatus = isEligibleForReuse ? 'refurbish_reuse' : 'des_chemical_leaching';

    updatePanel(panel.id, {
      electricalTest: testData,
      finalTriageStatus: newStatus,
      reviewedBy: `${user.name} (Certified Auditor)`,
      reviewedAt: new Date().toISOString(),
      notes: decisionNotes || (isEligibleForReuse ? 'Passed electrical insulation & power threshold for secondary application.' : 'Power output below 70% threshold. Sent to DES recovery.'),
    });

    showToast(`Electrical audit logged. Panel triaged to ${newStatus.replace('_', ' ')}.`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase mb-2">
            <Recycle className="w-3.5 h-3.5" /> Reuse-First Decision Support Gateway
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-cleanwhite">
            Electrical Verification &amp; Final Disposition
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-mutedslate mt-1 max-w-2xl">
            Scientific rule: Never scrap a functioning solar asset. Measure real I-V curve characteristics and high-voltage insulation resistance before any chemical dissolution.
          </p>
        </div>

        {/* Panel selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-mutedslate">Audit Panel:</span>
          <select
            value={selectedPanelId}
            onChange={(e) => setSelectedPanelId(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs font-mono"
          >
            {panels.map((p) => (
              <option key={p.id} value={p.id}>
                {p.panelCode} ({p.manufacturer || 'PV'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── 4-STAGE DECISION FLOW PIPELINE ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Stage 1 */}
        <div className="p-4 rounded-2xl glass-panel border-t-4 border-t-solargreen">
          <div className="text-[10px] font-mono uppercase text-mutedslate mb-1">Stage 01</div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-cleanwhite">Visual Screening</h4>
          <p className="text-xs text-mutedslate mt-1">
            YOLOv8 defect identification for micro-cracks &amp; delamination.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-solargreen font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="p-4 rounded-2xl glass-panel border-t-4 border-t-electriccyan">
          <div className="text-[10px] font-mono uppercase text-mutedslate mb-1">Stage 02</div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-cleanwhite">Electrical Testing</h4>
          <p className="text-xs text-mutedslate mt-1">
            Mandatory Voc, Isc, Pmax, and &gt;50 MΩ insulation check.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-electriccyan font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>Active Terminal</span>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="p-4 rounded-2xl glass-panel border-t-4 border-t-violetaccent">
          <div className="text-[10px] font-mono uppercase text-mutedslate mb-1">Stage 03</div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-cleanwhite">Threshold Rule</h4>
          <p className="text-xs text-mutedslate mt-1">
            &gt;70% Efficiency Retained → Route to Refurbishing &amp; Secondary Sale.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-violetaccent font-mono">
            <Activity className="w-3.5 h-3.5" />
            <span>Calculated: {calculatedEff}%</span>
          </div>
        </div>

        {/* Stage 4 */}
        <div className="p-4 rounded-2xl glass-panel border-t-4 border-t-warningamber">
          <div className="text-[10px] font-mono uppercase text-mutedslate mb-1">Stage 04</div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-cleanwhite">Operational Disposition</h4>
          <p className="text-xs text-mutedslate mt-1">
            Clearance certificate issued or queued for DES batch.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-warningamber font-mono">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Auditor Sign-off</span>
          </div>
        </div>
      </div>

      {/* ── WORKBENCH & AUDIT FORM ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Electrical Measurements Form */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite">
                Log Electrical Tracer Telemetry
              </h3>
              <span className="text-xs text-mutedslate font-mono">
                Target: {panel.panelCode} ({panel.ratedPowerWatts}W rated)
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                isEligibleForReuse
                  ? 'bg-solargreen/15 text-solargreen border border-solargreen/30'
                  : 'bg-errorred/15 text-errorred border border-errorred/30'
              }`}
            >
              {isEligibleForReuse ? 'REUSE CANDIDATE (≥70%)' : 'LEACHING CANDIDATE (<70%)'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Open Circuit Voltage (Voc) [V]
              </label>
              <input
                type="number"
                step="0.1"
                value={voc}
                onChange={(e) => setVoc(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Short Circuit Current (Isc) [A]
              </label>
              <input
                type="number"
                step="0.1"
                value={isc}
                onChange={(e) => setIsc(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Measured Max Power (Pmax) [W]
              </label>
              <input
                type="number"
                step="1"
                value={pmax}
                onChange={(e) => setPmax(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Insulation Resistance [MΩ]
              </label>
              <input
                type="number"
                step="1"
                value={insulation}
                onChange={(e) => setInsulation(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
              Auditor Decision Notes &amp; Target Application
            </label>
            <textarea
              rows={3}
              value={decisionNotes}
              onChange={(e) => setDecisionNotes(e.target.value)}
              placeholder="e.g. Suitable for 5HP PM-KUSUM agricultural solar pump in Barmer district..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-mutedslate font-mono">
              Auditor: <strong className="text-slate-900 dark:text-cleanwhite">{user.name}</strong>
            </div>
            <button
              onClick={handleSaveElectricalTest}
              className="px-6 py-2.5 rounded-xl bg-solargreen text-midnight font-bold text-xs shadow-solar-glow hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Record &amp; Finalize Triage Decision</span>
            </button>
          </div>
        </div>

        {/* Right: Clearance Certificate Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-solargreen/30 relative space-y-4">
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-solargreen uppercase font-bold tracking-widest">
                  HelioSolv Triage Certificate
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-cleanwhite mt-0.5">
                  Asset Disposition Record
                </h4>
              </div>
              <button
                onClick={() => window.print()}
                className="p-1.5 rounded-lg border border-slate-700 hover:text-solargreen text-xs flex items-center gap-1 text-mutedslate"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-mutedslate">Panel Code:</span>
                <span className="text-cleanwhite font-bold">{panel.panelCode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-mutedslate">Manufacturer:</span>
                <span className="text-cleanwhite">{panel.manufacturer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-mutedslate">Efficiency Retention:</span>
                <span className="text-solargreen font-bold">{calculatedEff}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-mutedslate">Insulation Status:</span>
                <span className={insulation >= 50 ? 'text-successgreen' : 'text-errorred'}>
                  {insulation} MΩ ({insulation >= 50 ? 'SAFE' : 'LEAKAGE RISK'})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-mutedslate">Recommended Action:</span>
                <span className="font-bold text-solargreen uppercase">
                  {panel.finalTriageStatus.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-mutedslate">Auditor Sign-off:</span>
                <span className="text-cleanwhite">{panel.reviewedBy || user.name}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-solargreen/10 border border-solargreen/20 text-[11px] text-solargreen leading-relaxed">
              {panel.finalTriageStatus === 'refurbish_reuse' ? (
                <span>
                  ✓ <strong>CLEARED FOR REUSE:</strong> Diverted from chemical destruction. Safe for off-grid agricultural solar irrigation or rooftop micro-inverters.
                </span>
              ) : (
                <span>
                  ➔ <strong>ROUTED TO DES CHEMICAL LEACHING:</strong> Scheduled for frame removal and Ethaline Deep Eutectic Solvent bath at 80°C to extract 99.9% pure silver and intact silicon.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
