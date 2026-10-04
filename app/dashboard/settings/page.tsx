'use client';

import React, { useState } from 'react';
import {
  Settings,
  Database,
  Cpu,
  RotateCcw,
  Sparkles,
  Download,
  CheckCircle2,
  AlertTriangle,
  Server,
  Key,
  Shield,
  Radio,
} from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function SettingsPage() {
  const { user, switchUserRole, resetDemoData, showToast, panels, batches } = useDemo();
  const [aiEndpoint, setAiEndpoint] = useState('simulated_edge_yolov8');
  const [scaleWebhook, setScaleWebhook] = useState('https://iot-telemetry.heliosolv.com/v1/scale-weights');

  const handleExportJson = () => {
    const data = {
      user,
      exportTimestamp: new Date().toISOString(),
      panels,
      batches,
      platform: 'HelioSolv - SANKALP 2026 Climate Edition',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heliosolv-session-export-${Date.now()}.json`;
    a.click();
    showToast('Platform snapshot exported successfully.');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase mb-2">
            <Settings className="w-3.5 h-3.5" /> Platform Configuration
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-cleanwhite">
            Workspace Settings &amp; Telemetry Integrations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-mutedslate mt-1">
            Manage Supabase connectivity, edge AI computer vision endpoints, and SANKALP judge demonstration modes.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-darknavy/60 text-xs font-mono text-slate-700 dark:text-mutedslate hover:text-solargreen hover:border-solargreen transition-colors self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo to Baseline</span>
        </button>
      </div>

      {/* ── BACKEND & SUPABASE STATUS ── */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-solargreen" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite">
              Database &amp; Storage Architecture
            </h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
              isSupabaseConfigured
                ? 'bg-successgreen/15 text-successgreen border border-successgreen/30'
                : 'bg-warningamber/15 text-warningamber border border-warningamber/30'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-successgreen' : 'bg-warningamber'}`} />
            {isSupabaseConfigured ? 'Supabase Live Connected' : 'Hybrid Local Demo Mode'}
          </span>
        </div>

        <p className="text-xs text-mutedslate leading-relaxed">
          HelioSolv features an adaptive dual-layer architecture. When environment variables (<code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>) are configured, mutations sync directly with PostgreSQL with Row Level Security. In offline / judging demo mode, a reactive LocalStorage provider guarantees persistence and zero setup friction.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-midnight/70 border border-slate-700/60">
            <span className="text-mutedslate block text-[10px] uppercase">PostgreSQL Schema:</span>
            <span className="font-bold text-cleanwhite">supabase/schema.sql (Deployed)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-midnight/70 border border-slate-700/60">
            <span className="text-mutedslate block text-[10px] uppercase">Active Records in Memory:</span>
            <span className="font-bold text-solargreen">{panels.length} Panels • {batches.length} Batches</span>
          </div>
        </div>
      </div>

      {/* ── AI INFERENCE CONFIGURATION ── */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Cpu className="w-5 h-5 text-electriccyan" />
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite">
            AI Screening &amp; YOLOv8 Computer Vision Mode
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-solargreen/40 bg-solargreen/5 cursor-pointer">
            <input
              type="radio"
              name="aiMode"
              checked={aiEndpoint === 'simulated_edge_yolov8'}
              onChange={() => setAiEndpoint('simulated_edge_yolov8')}
              className="mt-0.5 accent-solargreen"
            />
            <div>
              <div className="font-bold text-slate-900 dark:text-cleanwhite">
                Desert-Trained Edge Fallback (YOLOv8s-PV-v2.4)
              </div>
              <div className="text-mutedslate text-[11px] mt-0.5">
                Deterministic computer vision simulator with thermal crack heuristics, bounding boxes, and &gt;70% efficiency triage logic. Zero API latency.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-700 bg-slate-100 dark:bg-midnight/50 cursor-pointer">
            <input
              type="radio"
              name="aiMode"
              checked={aiEndpoint === 'cloud_onnx'}
              onChange={() => setAiEndpoint('cloud_onnx')}
              className="mt-0.5 accent-solargreen"
            />
            <div>
              <div className="font-bold text-slate-900 dark:text-cleanwhite">
                Cloud ONNX / PyTorch Endpoint
              </div>
              <div className="text-mutedslate text-[11px] mt-0.5">
                Remote GPU cluster for high-resolution 4K electroluminescence (EL) drone flyover imagery.
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* ── JURY DEMO CONTROLS & EXPORT ── */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-solargreen/30 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-solargreen" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite">
              SANKALP 2026 Jury Demonstration Controls
            </h3>
          </div>
          <span className="text-xs font-mono text-solargreen">Demo Mode Active</span>
        </div>

        <p className="text-xs text-mutedslate leading-relaxed">
          Instantly export your live session data or reset back to default Bhadla Solar Park demonstration state:
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportJson}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-solargreen text-midnight font-bold text-xs shadow-solar-glow hover:opacity-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Session Snapshot (.json)</span>
          </button>
          <button
            onClick={resetDemoData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-midnight text-xs font-medium hover:border-solargreen transition-colors text-slate-700 dark:text-cleanwhite"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Baseline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
