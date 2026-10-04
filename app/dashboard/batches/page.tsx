'use client';

import React, { useState } from 'react';
import {
  Beaker,
  Play,
  Pause,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Flame,
  Zap,
  Activity,
  Plus,
  ChevronRight,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { SolvoBatch, BatchStep } from '@/lib/types';
import { formatInr } from '@/lib/utils';

export default function RecoveryBatchesPage() {
  const { batches, addBatch, updateBatchStatus, user, showToast } = useDemo();

  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || '');
  const activeBatch = batches.find((b) => b.id === selectedBatchId) || batches[0];
  const [isSimulating, setIsSimulating] = useState(false);

  // New batch modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [newBatchName, setNewBatchName] = useState(`DES-BATCH-RAJ-00${batches.length + 1}`);
  const [newWeight, setNewWeight] = useState(100); // 100 kg (~5 panels)
  const [newTemp, setNewTemp] = useState(80);

  const stepsList: { step: BatchStep; label: string; desc: string }[] = [
    { step: 'intake', label: '1. Intake & Sort', desc: 'Panel barcodes registered' },
    { step: 'disassembly', label: '2. Frame Removal', desc: 'Aluminum unbolted & glass freed' },
    { step: 'delamination', label: '3. EVA Delamination', desc: 'Polymer swollen & separated' },
    { step: 'des_leaching', label: '4. DES Leaching (80°C)', desc: 'Ethaline selectively extracts Ag' },
    { step: 'electrowinning', label: '5. Electrowinning', desc: 'Precipitating 99.9% solid Ag bullion' },
    { step: 'completed', label: '6. Solvent Regeneration', desc: '>90% solvent reused for next cycle' },
  ];

  // Progress simulation handler
  const handleAdvanceStep = () => {
    if (!activeBatch) return;
    const currentIndex = stepsList.findIndex((s) => s.step === activeBatch.currentStep);
    if (currentIndex < stepsList.length - 1) {
      const nextStep = stepsList[currentIndex + 1].step;
      const isFinishing = nextStep === 'completed';
      updateBatchStatus(activeBatch.id, nextStep, isFinishing ? 'completed' : 'in_progress');
      showToast(`Batch ${activeBatch.batchCode} advanced to ${nextStep.replace('_', ' ')}.`);
    }
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addBatch({
      batchCode: newBatchName,
      microPlantId: 'mp-bhadla-01',
      panelIds: ['panel-002', 'panel-004'],
      panelCount: 5,
      weightKg: newWeight,
      currentStep: 'intake',
      status: 'in_progress',
      temperatureC: newTemp,
      solidLiquidRatio: '1:10',
      ultrasonicationFreqKhz: 40,
      leachingDurationMinutes: 18,
      solventRecycleCount: 3,
      silverYieldGrams: Math.round(newWeight * 0.49),
      siliconWaferYieldKg: Math.round(newWeight * 0.038),
      operatorName: user.name,
      notes: 'Standard 100kg micro-plant cycle with recycled Ethaline solvent.',
    });

    setSelectedBatchId(created.id);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase mb-2">
            <Beaker className="w-3.5 h-3.5" /> Deep Eutectic Solvent (DES) Solvometallurgy
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-cleanwhite">
            Solvo-Recovery Reactor Terminal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-mutedslate mt-1 max-w-2xl">
            Targeting selective silver dissolution using non-toxic <strong>Ethaline (ChCl : EG 1:2 molar @ 80°C)</strong>. Intact crystalline silicon wafers preserved for microchip &amp; solar ingot recycling.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-solargreen text-midnight font-bold text-xs shadow-solar-glow hover:opacity-95 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New DES Batch</span>
        </button>
      </div>

      {/* ── ACTIVE BATCH MONITOR ── */}
      {activeBatch && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-solargreen/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-base sm:text-lg font-bold text-slate-900 dark:text-cleanwhite">
                  {activeBatch.batchCode}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-solargreen/15 text-solargreen border border-solargreen/30">
                  {activeBatch.status.toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-mutedslate font-mono">
                Operator: {activeBatch.operatorName} • {activeBatch.weightKg} kg Input PV Waste (~{activeBatch.panelCount} Panels)
              </span>
            </div>

            {/* Batch action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleAdvanceStep}
                disabled={activeBatch.status === 'completed'}
                className="px-4 py-2 rounded-xl bg-solargreen text-midnight font-bold text-xs shadow-solar-glow hover:opacity-95 transition-all flex items-center gap-1.5 disabled:opacity-40"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Advance to Next Reaction Step</span>
              </button>
            </div>
          </div>

          {/* Step Progression Visualizer */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stepsList.map((item, idx) => {
              const currentStepIdx = stepsList.findIndex((s) => s.step === activeBatch.currentStep);
              const isPast = idx < currentStepIdx || activeBatch.status === 'completed';
              const isCurrent = activeBatch.currentStep === item.step && activeBatch.status !== 'completed';

              return (
                <div
                  key={item.step}
                  className={`p-3 rounded-2xl border transition-all text-xs ${
                    isCurrent
                      ? 'border-solargreen bg-solargreen/10 shadow-solar-glow'
                      : isPast
                      ? 'border-slate-700 bg-darknavy/40 text-slate-300'
                      : 'border-slate-800 bg-midnight/30 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase text-mutedslate">Step 0{idx + 1}</span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-solargreen" />}
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-solargreen animate-ping" />}
                  </div>
                  <div className="font-bold text-slate-900 dark:text-cleanwhite">{item.label}</div>
                  <div className="text-[10px] text-mutedslate mt-0.5 leading-tight">{item.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Reactor Chemical Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-midnight/80 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-mutedslate uppercase block">Reactor Solvent</span>
              <div className="font-mono font-bold text-slate-900 dark:text-cleanwhite mt-1">
                Ethaline (ChCl : EG 1:2)
              </div>
              <span className="text-[10px] text-solargreen mt-1 block">Cycle #{activeBatch.solventRecycleCount} Reused</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-midnight/80 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-mutedslate uppercase block">Operating Temp</span>
              <div className="font-mono font-bold text-solargreen mt-1 flex items-center gap-1">
                <Flame className="w-4 h-4 text-solargreen" />
                <span>{activeBatch.temperatureC}°C (353 K)</span>
              </div>
              <span className="text-[10px] text-mutedslate mt-1 block">Low Energy (No Smelter)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-midnight/80 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-mutedslate uppercase block">Ultrasonics &amp; S/L</span>
              <div className="font-mono font-bold text-electriccyan mt-1">
                {activeBatch.ultrasonicationFreqKhz} kHz • {activeBatch.solidLiquidRatio}
              </div>
              <span className="text-[10px] text-mutedslate mt-1 block">Dissolution: 18 Minutes</span>
            </div>

            <div className="p-4 rounded-2xl bg-solargreen/10 border border-solargreen/30">
              <span className="text-[10px] font-mono text-solargreen-dark dark:text-solargreen uppercase font-bold block">
                Estimated Silver Yield
              </span>
              <div className="font-mono font-bold text-solargreen text-lg mt-1">
                {(activeBatch.silverYieldGrams || 0).toFixed(1)} g (99.9% Ag)
              </div>
              <span className="text-[10px] text-solargreen mt-1 block">
                Market Value: {formatInr((activeBatch.silverYieldGrams || 0) * 90)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── BATCH ARCHIVE TABLE ── */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite">
          Active &amp; Historical Solvometallurgy Runs
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-mutedslate uppercase">
              <tr>
                <th className="py-3 px-3">Batch Code</th>
                <th className="py-3 px-3">Weight (kg)</th>
                <th className="py-3 px-3">Reaction Step</th>
                <th className="py-3 px-3">Solvent Temp</th>
                <th className="py-3 px-3">Ag Yield (g)</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-solargreen/5 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-cleanwhite">
                    {batch.batchCode}
                  </td>
                  <td className="py-3 px-3">{batch.weightKg || batch.feedstockMassKg} kg</td>
                  <td className="py-3 px-3 capitalize text-solargreen font-medium">
                    {(batch.currentStep || 'intake').replace('_', ' ')}
                  </td>
                  <td className="py-3 px-3">{batch.temperatureC || batch.operatingTemperatureC}°C</td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-cleanwhite">
                    {(batch.silverYieldGrams || 0).toFixed(1)}g
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        batch.status === 'completed'
                          ? 'bg-successgreen/15 text-successgreen'
                          : 'bg-solargreen/15 text-solargreen'
                      }`}
                    >
                      {batch.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedBatchId(batch.id)}
                      className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-midnight border border-slate-700 hover:border-solargreen transition-colors"
                    >
                      Monitor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CREATE BATCH MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-solargreen/40 max-w-lg w-full space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-cleanwhite">
                Launch Solvo-Recovery Batch
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-cleanwhite">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-mutedslate mb-1">Batch Tracking Code</label>
                <input
                  type="text"
                  required
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase text-mutedslate mb-1">Input Waste Weight (kg)</label>
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight font-mono"
                  />
                  <span className="text-[10px] text-mutedslate mt-1 block">~5 Panels @ 20kg each</span>
                </div>

                <div>
                  <label className="block font-mono uppercase text-mutedslate mb-1">DES Reactor Temp (°C)</label>
                  <input
                    type="number"
                    value={newTemp}
                    onChange={(e) => setNewTemp(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight font-mono"
                  />
                  <span className="text-[10px] text-solargreen mt-1 block">Target: 80°C (Non-boiling)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-solargreen/10 border border-solargreen/20 text-solargreen font-mono text-[11px]">
                Chemical Recipe: Choline Chloride + Ethylene Glycol (1:2 molar). 40 kHz ultrasonication active.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-mutedslate hover:text-cleanwhite"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-solargreen text-midnight font-bold shadow-solar-glow hover:opacity-95"
                >
                  Confirm &amp; Start Intake
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
