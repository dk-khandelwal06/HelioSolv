'use client';

import React, { useState } from 'react';
import {
  FileText,
  Award,
  ShieldCheck,
  Printer,
  Download,
  CheckCircle2,
  Calendar,
  Building,
  QrCode,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { formatNumber, formatInr } from '@/lib/utils';

export default function ReportsPage() {
  const { environmentalImpact, user, batches } = useDemo();
  const [selectedCertId, setSelectedCertId] = useState('CPCB-EPR-2026-RAJ-4491');

  const certificates = [
    {
      id: 'CPCB-EPR-2026-RAJ-4491',
      producerName: 'Adani Green Energy / Bhadla O&M Corp',
      category: 'Category I: Crystalline Silicon Photovoltaic Modules',
      quantityKg: 28400,
      silverGrams: 13916,
      siliconKg: 1079,
      compliancePeriod: 'FY 2025–2026 Q3',
      issuedDate: '2026-09-28',
      hash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      status: 'VERIFIED & CREDITED',
    },
    {
      id: 'CPCB-EPR-2026-RAJ-3810',
      producerName: 'Tata Power Renewable Micro-Grid Consortium',
      category: 'Category I: Crystalline Silicon Photovoltaic Modules',
      quantityKg: 14200,
      silverGrams: 6958,
      siliconKg: 539,
      compliancePeriod: 'FY 2025–2026 Q2',
      issuedDate: '2026-06-15',
      hash: 'sha256:4a883b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d888',
      status: 'VERIFIED & CREDITED',
    },
  ];

  const currentCert = certificates.find((c) => c.id === selectedCertId) || certificates[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase mb-2">
            <Award className="w-3.5 h-3.5" /> Central Pollution Control Board (CPCB) Regulatory Gateway
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-cleanwhite">
            E-Waste Rules 2022 EPR Compliance Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-mutedslate mt-1 max-w-2xl">
            Issuing auditable Extended Producer Responsibility (EPR) digital certificates for solar cell recyclers. Cryptographically signed and verified for MoEFCC statutory submissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-solargreen text-midnight font-bold text-xs shadow-solar-glow hover:opacity-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Certificate</span>
          </button>
        </div>
      </div>

      {/* ── CERTIFICATE VIEWER ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Certificate Selection List */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-cleanwhite">
            Minted EPR Certificates ({certificates.length})
          </h3>
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCertId(cert.id)}
                className={`p-4 rounded-2xl glass-panel border cursor-pointer transition-all ${
                  cert.id === selectedCertId
                    ? 'border-solargreen shadow-solar-glow'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                  <span className="text-solargreen font-bold">{cert.id}</span>
                  <span className="text-mutedslate">{cert.issuedDate}</span>
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-cleanwhite truncate">
                  {cert.producerName}
                </div>
                <div className="text-[11px] text-mutedslate mt-1">
                  {(cert.quantityKg / 1000).toFixed(1)} Tonnes Recycled • {(cert.silverGrams / 1000).toFixed(2)} kg Silver
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-midnight/80 border border-slate-700/80 text-xs text-mutedslate space-y-2">
            <div className="font-bold text-cleanwhite flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-electriccyan" />
              Statutory Basis
            </div>
            <p className="text-[11px] leading-relaxed">
              Issued in accordance with the E-Waste (Management) Rules, 2022 notified by the Ministry of Environment, Forest and Climate Change (MoEFCC) via Gazette Notification G.S.R. 801(E).
            </p>
          </div>
        </div>

        {/* Right: Printable Certificate Document Sheet */}
        <div className="lg:col-span-8 glass-panel p-8 sm:p-12 rounded-3xl border border-solargreen/40 space-y-6 relative overflow-hidden bg-white/95 dark:bg-midnight/95 shadow-2xl">
          {/* Subtle watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200 dark:text-slate-800/20 font-black text-7xl select-none pointer-events-none uppercase tracking-widest -rotate-12">
            CPCB EPR
          </div>

          {/* Document Top */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-slate-300 dark:border-slate-700">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-solargreen font-bold">
                Government of India • Ministry of Environment &amp; Forests
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-cleanwhite mt-1">
                Central Pollution Control Board (CPCB)
              </h2>
              <span className="text-xs text-mutedslate font-mono">
                Extended Producer Responsibility (EPR) Certificate for Solar PV Waste
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-100 dark:bg-darknavy border border-slate-700 text-center font-mono text-[10px]">
              <QrCode className="w-12 h-12 mx-auto text-slate-900 dark:text-cleanwhite mb-1" />
              <span>VERIFY REGISTRY</span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="relative z-10 space-y-4 text-xs font-mono">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-mutedslate block text-[10px] uppercase">Certificate Identifier:</span>
                <span className="font-bold text-solargreen text-sm">{currentCert.id}</span>
              </div>
              <div>
                <span className="text-mutedslate block text-[10px] uppercase">Compliance Window:</span>
                <span className="font-bold text-slate-900 dark:text-cleanwhite">{currentCert.compliancePeriod}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-darknavy/60 border border-slate-700/60">
              <span className="text-mutedslate block text-[10px] uppercase">Registered Solar Producer / Decommissioner:</span>
              <span className="font-bold text-slate-900 dark:text-cleanwhite text-sm mt-0.5 block">
                {currentCert.producerName}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-darknavy/60 border border-slate-700/60">
                <span className="text-mutedslate block text-[10px] uppercase">Net PV Weight</span>
                <span className="font-bold text-cleanwhite text-sm">{(currentCert.quantityKg / 1000).toFixed(1)} Tonnes</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-darknavy/60 border border-slate-700/60">
                <span className="text-mutedslate block text-[10px] uppercase">99.9% Silver</span>
                <span className="font-bold text-solargreen text-sm">{(currentCert.silverGrams / 1000).toFixed(2)} kg</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-darknavy/60 border border-slate-700/60">
                <span className="text-mutedslate block text-[10px] uppercase">Silicon Wafers</span>
                <span className="font-bold text-electriccyan text-sm">{currentCert.siliconKg} kg</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-darknavy/60 border border-slate-700/60">
                <span className="text-mutedslate block text-[10px] uppercase">Hazardous Sludge</span>
                <span className="font-bold text-successgreen text-sm">0 kg (DES Safe)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 space-y-1">
              <span className="text-mutedslate text-[10px] uppercase block">Cryptographic Hash Validation:</span>
              <span className="text-[10px] font-mono text-slate-400 break-all bg-midnight p-2 rounded block border border-slate-800">
                {currentCert.hash}
              </span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-mutedslate block">Authorized Audit Sign-off:</span>
                <span className="font-bold text-slate-900 dark:text-cleanwhite">HelioSolv Digital Circularity Ledger</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-successgreen/15 text-successgreen font-bold text-xs border border-successgreen/30">
                ✓ {currentCert.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
