'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Recycle,
  Beaker,
  Filter,
  Search,
  Check,
  ChevronRight,
  Eye,
  Camera,
  Layers,
  ArrowRight,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { PanelRecord, BoundingBox, TriageDecisionOutcome } from '@/lib/types';
import { runAIScreening } from '@/lib/ai-service';

export default function PanelAssessmentPage() {
  const { panels, addPanel, updatePanel, user } = useDemo();

  // Registration form state
  const [panelCode, setPanelCode] = useState(`HS-BHD-2026-0${panels.length + 10}`);
  const [manufacturer, setManufacturer] = useState('Canadian Solar');
  const [model, setModel] = useState('CS6U-330P Poly');
  const [approxAge, setApproxAge] = useState(7);
  const [ratedPower, setRatedPower] = useState(330);
  const [location, setLocation] = useState('Bhadla Solar Park Sector 4');
  const [sourcePartner, setSourcePartner] = useState('Rajasthan Solar Decommissioning EPC');
  const [visualCondition, setVisualCondition] = useState<any>('severe_cracks');
  const [notes, setNotes] = useState('Detected high thermal stress and busbar discoloration.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80');

  // Interactive AI screening viewer state
  const [selectedPanel, setSelectedPanel] = useState<PanelRecord>(panels[0]);
  const [isScreening, setIsScreening] = useState(false);
  const [activeTab, setActiveTab] = useState<'register' | 'viewer' | 'history'>('viewer');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPathway, setFilterPathway] = useState<string>('all');

  // Run AI screening on selected panel
  const handleTriggerAIScreening = async (panel: PanelRecord) => {
    setIsScreening(true);
    const result = await runAIScreening(
      panel.panelCode,
      panel.imageUrl,
      panel.approxAgeYears,
      panel.knownDefects.join(' ')
    );

    updatePanel(panel.id, {
      aiScreeningDone: true,
      aiSuggestedPathway: result.recommendedPathway,
      aiConfidence: result.confidenceScore,
      detectedBoxes: result.detectedBoxes,
      finalTriageStatus: result.recommendedPathway,
      reviewedBy: `${user.name} (Operator Confirmed)`,
      reviewedAt: new Date().toISOString(),
      notes: result.suggestedActionExplanation,
    });

    setSelectedPanel({
      ...panel,
      aiScreeningDone: true,
      aiSuggestedPathway: result.recommendedPathway,
      aiConfidence: result.confidenceScore,
      detectedBoxes: result.detectedBoxes,
      finalTriageStatus: result.recommendedPathway,
    });

    setIsScreening(false);
  };

  const handleRegisterNewPanel = (e: React.FormEvent) => {
    e.preventDefault();
    const newPanel = addPanel({
      panelCode,
      manufacturer,
      model,
      approxAgeYears: approxAge,
      ratedPowerWatts: ratedPower,
      dimensions: '1960 x 992 x 40 mm',
      location,
      sourcePartner,
      visualCondition,
      knownDefects: ['Thermal Micro-Cracks', 'Photothermal Aging'],
      imageUrl,
      aiScreeningDone: false,
      finalTriageStatus: 'manual_review_pending',
      notes,
    });

    setSelectedPanel(newPanel);
    setActiveTab('viewer');
  };

  const filteredPanels = panels.filter((p) => {
    const matchesSearch =
      p.panelCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.manufacturer && p.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPathway === 'all' || p.finalTriageStatus === filterPathway;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── HEADER BANNER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase mb-2">
            <Cpu className="w-3.5 h-3.5" /> Edge AI Computer Vision Gateway
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-cleanwhite">
            AI-Assisted Solar Panel Visual Screening
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-mutedslate mt-1 max-w-2xl">
            Trained on desert-degradation patterns (Bhadla &amp; Rajasthan Sunbelt) to triage panels between secondary market reuse (&gt;70% efficiency) and non-toxic DES solvometallurgical recovery.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel self-start sm:self-center">
          <button
            onClick={() => setActiveTab('viewer')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'viewer'
                ? 'bg-solargreen text-midnight font-bold shadow-solar-glow'
                : 'text-slate-600 dark:text-slate-300 hover:text-solargreen'
            }`}
          >
            AI Screening Canvas
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'register'
                ? 'bg-solargreen text-midnight font-bold shadow-solar-glow'
                : 'text-slate-600 dark:text-slate-300 hover:text-solargreen'
            }`}
          >
            + Intake Form
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-solargreen text-midnight font-bold shadow-solar-glow'
                : 'text-slate-600 dark:text-slate-300 hover:text-solargreen'
            }`}
          >
            Registry Archive ({panels.length})
          </button>
        </div>
      </div>

      {/* ── 1. AI SCREENING CANVAS VIEW ── */}
      {activeTab === 'viewer' && selectedPanel && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Bounding Box Visualizer */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-200 dark:bg-midnight text-slate-800 dark:text-cleanwhite border border-slate-700">
                  {selectedPanel.panelCode}
                </span>
                <span className="text-xs text-mutedslate">
                  {selectedPanel.manufacturer} • {selectedPanel.ratedPowerWatts}W
                </span>
              </div>
              <span className="text-[11px] font-mono text-solargreen flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-solargreen animate-ping" />
                YOLOv8 Edge Vision Ready
              </span>
            </div>

            {/* Panel Image Container with Bounding Box Overlays */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-inner group">
              <img
                src={selectedPanel.imageUrl}
                alt={selectedPanel.panelCode}
                className="w-full h-full object-cover"
              />

              {/* Bounding Box Overlays */}
              {selectedPanel.detectedBoxes?.map((b) => {
                const [top, left, width, height] = b.box;
                const isHigh = b.severity === 'high';
                return (
                  <div
                    key={b.id}
                    style={{
                      top: `${top}%`,
                      left: `${left}%`,
                      width: `${width}%`,
                      height: `${height}%`,
                    }}
                    className={`absolute border-2 pointer-events-auto transition-transform hover:scale-105 ${
                      isHigh ? 'border-errorred bg-errorred/15' : 'border-warningamber bg-warningamber/15'
                    }`}
                  >
                    <div
                      className={`absolute -top-6 left-0 px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded shadow ${
                        isHigh ? 'bg-errorred text-white' : 'bg-warningamber text-midnight'
                      }`}
                    >
                      {b.label} ({(b.confidence * 100).toFixed(0)}%)
                    </div>
                  </div>
                );
              })}

              {!selectedPanel.aiScreeningDone && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-cleanwhite">
                  <Cpu className="w-12 h-12 text-solargreen mb-3 animate-pulse" />
                  <h4 className="font-bold text-lg mb-1">Awaiting AI Screening</h4>
                  <p className="text-xs text-mutedslate max-w-sm mb-4">
                    Trigger edge inference to detect micro-cracks, EVA browning, and cell fractures.
                  </p>
                  <button
                    onClick={() => handleTriggerAIScreening(selectedPanel)}
                    disabled={isScreening}
                    className="px-6 py-2.5 rounded-xl bg-solargreen text-midnight font-bold text-xs shadow-solar-glow hover:opacity-95 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isScreening ? 'Processing YOLOv8...' : 'Run AI Defect Screening'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick switcher under canvas */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 text-xs">
              <span className="text-[10px] font-mono text-mutedslate uppercase shrink-0">Switch Sample:</span>
              {panels.slice(0, 5).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPanel(p)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] shrink-0 border transition-all ${
                    p.id === selectedPanel.id
                      ? 'bg-solargreen text-midnight font-bold border-solargreen'
                      : 'bg-slate-200 dark:bg-darknavy/60 text-slate-700 dark:text-mutedslate border-slate-700'
                  }`}
                >
                  {p.panelCode}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Structured AI Assessment Diagnostics */}
          <div className="lg:col-span-5 space-y-5">
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-cleanwhite">
                    Triage Recommendation
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-mutedslate font-mono">
                    Model: YOLOv8s-HelioSolv-v2.4
                  </span>
                </div>

                {selectedPanel.finalTriageStatus === 'refurbish_reuse' && (
                  <span className="px-3 py-1 rounded-full bg-solargreen/15 text-solargreen border border-solargreen/30 text-xs font-mono font-bold flex items-center gap-1.5">
                    <Recycle className="w-3.5 h-3.5" /> REUSE FIRST (&gt;70%)
                  </span>
                )}
                {selectedPanel.finalTriageStatus === 'des_chemical_leaching' && (
                  <span className="px-3 py-1 rounded-full bg-electriccyan/15 text-electriccyan border border-electriccyan/30 text-xs font-mono font-bold flex items-center gap-1.5">
                    <Beaker className="w-3.5 h-3.5" /> DES CHEMICAL LEACHING
                  </span>
                )}
                {selectedPanel.finalTriageStatus === 'further_testing_required' && (
                  <span className="px-3 py-1 rounded-full bg-warningamber/15 text-warningamber border border-warningamber/30 text-xs font-mono font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> ELECTRICAL TEST NEEDED
                  </span>
                )}
              </div>

              {/* Action explanation */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-midnight/80 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                <span className="font-mono text-solargreen font-bold block mb-1">
                  PATHWAY RATIONALE:
                </span>
                {selectedPanel.notes || 'Awaiting initial computer-vision diagnostic.'}
              </div>

              {/* Detected Defect Badges */}
              <div>
                <span className="text-xs font-mono uppercase text-slate-500 dark:text-mutedslate block mb-2">
                  Observed Defect Signatures:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPanel.detectedBoxes && selectedPanel.detectedBoxes.length > 0 ? (
                    selectedPanel.detectedBoxes.map((box) => (
                      <span
                        key={box.id}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-darknavy border border-slate-700 text-cleanwhite flex items-center gap-1.5"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            box.severity === 'high' ? 'bg-errorred' : 'bg-warningamber'
                          }`}
                        />
                        {box.label} ({(box.confidence * 100).toFixed(0)}%)
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-mutedslate">No active defect detections</span>
                  )}
                </div>
              </div>

              {/* Electrical Testing Telemetry if available */}
              {selectedPanel.electricalTest && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-mutedslate uppercase">Electrical Verification:</span>
                    <span className="text-solargreen font-bold">
                      {selectedPanel.electricalTest.efficiencyPercentage}% Retained
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-slate-100 dark:bg-midnight border border-slate-800">
                      <span className="text-[10px] text-mutedslate block">Voc</span>
                      <span className="font-bold">{selectedPanel.electricalTest.vocVolts} V</span>
                    </div>
                    <div className="p-2 rounded bg-slate-100 dark:bg-midnight border border-slate-800">
                      <span className="text-[10px] text-mutedslate block">Isc</span>
                      <span className="font-bold">{selectedPanel.electricalTest.iscAmps} A</span>
                    </div>
                    <div className="p-2 rounded bg-slate-100 dark:bg-midnight border border-slate-800">
                      <span className="text-[10px] text-mutedslate block">Insulation</span>
                      <span className="font-bold">{selectedPanel.electricalTest.insulationResistanceMOhm} MΩ</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Human-in-the-Loop Override Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-mono text-mutedslate block">
                  Human-in-the-Loop Operator Confirmation:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      updatePanel(selectedPanel.id, {
                        finalTriageStatus: 'refurbish_reuse',
                        reviewedBy: `${user.name} (Audited)`,
                        reviewedAt: new Date().toISOString(),
                      });
                      setSelectedPanel((prev) => ({ ...prev, finalTriageStatus: 'refurbish_reuse' }));
                    }}
                    className="py-2 px-3 rounded-xl border border-solargreen/40 bg-solargreen/10 text-solargreen font-bold text-xs hover:bg-solargreen hover:text-midnight transition-colors"
                  >
                    Confirm Reuse
                  </button>
                  <button
                    onClick={() => {
                      updatePanel(selectedPanel.id, {
                        finalTriageStatus: 'des_chemical_leaching',
                        reviewedBy: `${user.name} (Audited)`,
                        reviewedAt: new Date().toISOString(),
                      });
                      setSelectedPanel((prev) => ({ ...prev, finalTriageStatus: 'des_chemical_leaching' }));
                    }}
                    className="py-2 px-3 rounded-xl border border-electriccyan/40 bg-electriccyan/10 text-electriccyan font-bold text-xs hover:bg-electriccyan hover:text-midnight transition-colors"
                  >
                    Route to DES Bath
                  </button>
                </div>
              </div>

              {/* Re-run button */}
              <button
                onClick={() => handleTriggerAIScreening(selectedPanel)}
                disabled={isScreening}
                className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-darknavy/60 text-xs font-semibold hover:border-solargreen/50 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-solargreen" />
                <span>Re-run YOLOv8 Inference</span>
              </button>
            </div>

            {/* Scientific disclaimer badge */}
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-darknavy/40 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-mutedslate flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-warningamber shrink-0 mt-0.5" />
              <span>
                <strong>Safety Disclaimer:</strong> AI visual screening identifies physical cracks and encapsulant discoloration. In accordance with platform governance, high-voltage electrical insulation must be tested before grid or pump re-energization.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. INTAKE REGISTRATION FORM ── */}
      {activeTab === 'register' && (
        <div className="max-w-3xl mx-auto glass-panel p-8 rounded-3xl border border-solargreen/30">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
            <Camera className="w-5 h-5 text-solargreen" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-cleanwhite font-display">
                Register Solar Module for Intake &amp; AI Screening
              </h2>
              <p className="text-xs text-slate-500 dark:text-mutedslate">
                Log physical parameters, source site, and upload module photographs
              </p>
            </div>
          </div>

          <form onSubmit={handleRegisterNewPanel} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                  Panel Barcode / Tracking ID
                </label>
                <input
                  type="text"
                  required
                  value={panelCode}
                  onChange={(e) => setPanelCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                  Manufacturer / OEM
                </label>
                <select
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs"
                >
                  <option value="Canadian Solar">Canadian Solar</option>
                  <option value="Vikram Solar">Vikram Solar</option>
                  <option value="Adani Solar">Adani Solar</option>
                  <option value="Waaree Energies">Waaree Energies</option>
                  <option value="Tata Power Solar">Tata Power Solar</option>
                  <option value="Goldi Solar">Goldi Solar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                  Approximate Age (Years in Field)
                </label>
                <input
                  type="number"
                  value={approxAge}
                  onChange={(e) => setApproxAge(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                  Nameplate Rated Power (Watts)
                </label>
                <input
                  type="number"
                  value={ratedPower}
                  onChange={(e) => setRatedPower(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                  Source Site / Solar Park
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Bhadla Solar Park Sector 4"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                  Initial Visual Assessment
                </label>
                <select
                  value={visualCondition}
                  onChange={(e) => setVisualCondition(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs"
                >
                  <option value="severe_cracks">Severe Thermal Cracks / Shatter</option>
                  <option value="eva_yellowed">EVA Photochemical Yellowing</option>
                  <option value="minor_cracks">Minor Hairline Cracks</option>
                  <option value="delaminated">Front Glass Delaminated</option>
                  <option value="busbar_corroded">Busbar / Finger Corrosion</option>
                  <option value="intact">Visually Intact</option>
                </select>
              </div>
            </div>

            {/* Photo preset / upload */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Module High-Resolution Image URL (or Drag &amp; Drop)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImageUrl('https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80')
                  }
                  className="px-3 py-2 rounded-xl border border-slate-700 text-xs text-mutedslate hover:text-cleanwhite"
                >
                  Preset 2
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Field Technician Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-solargreen to-electriccyan text-midnight font-bold text-xs shadow-solar-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Ingest Panel &amp; Open AI Screening</span>
            </button>
          </form>
        </div>
      )}

      {/* ── 3. REGISTRY ARCHIVE LIST ── */}
      {activeTab === 'history' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search barcode, OEM, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterPathway}
                onChange={(e) => setFilterPathway(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight text-xs"
              >
                <option value="all">All Pathways</option>
                <option value="refurbish_reuse">Reuse / Refurbish</option>
                <option value="des_chemical_leaching">DES Leaching</option>
                <option value="further_testing_required">Testing Required</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-mutedslate font-mono uppercase">
                <tr>
                  <th className="py-3 px-3">Panel ID</th>
                  <th className="py-3 px-3">OEM / Model</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Condition</th>
                  <th className="py-3 px-3">AI Recommendation</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 font-mono">
                {filteredPanels.map((panel) => (
                  <tr key={panel.id} className="hover:bg-solargreen/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-cleanwhite">
                      {panel.panelCode}
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-700 dark:text-slate-300">
                      {panel.manufacturer} ({panel.ratedPowerWatts}W)
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-500 dark:text-mutedslate">
                      {panel.location}
                    </td>
                    <td className="py-3 px-3 capitalize">
                      {panel.visualCondition.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3">
                      {panel.finalTriageStatus === 'refurbish_reuse' && (
                        <span className="px-2 py-0.5 rounded bg-solargreen/15 text-solargreen border border-solargreen/30 font-mono text-[10px]">
                          Reuse (&gt;70%)
                        </span>
                      )}
                      {panel.finalTriageStatus === 'des_chemical_leaching' && (
                        <span className="px-2 py-0.5 rounded bg-electriccyan/15 text-electriccyan border border-electriccyan/30 font-mono text-[10px]">
                          DES Leaching
                        </span>
                      )}
                      {panel.finalTriageStatus === 'further_testing_required' && (
                        <span className="px-2 py-0.5 rounded bg-warningamber/15 text-warningamber border border-warningamber/30 font-mono text-[10px]">
                          Testing Req.
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedPanel(panel);
                          setActiveTab('viewer');
                        }}
                        className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-midnight border border-slate-700 hover:border-solargreen text-xs transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
