import React from 'react';
import Link from 'next/link';
import { Sun, ShieldCheck, FileText, ExternalLink, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-midnight/90 backdrop-blur-md pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-solargreen to-electriccyan p-[2px]">
                <div className="w-full h-full bg-darknavy rounded-[10px] flex items-center justify-center">
                  <Sun className="w-4 h-4 text-solargreen" />
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-cleanwhite">
                Helio<span className="text-solargreen">Solv</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-mutedslate leading-relaxed">
              Powering a circular future through AI-assisted triage and decentralized Deep Eutectic Solvent (DES) solvometallurgy for end-of-life solar PV panels.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-solargreen/10 border border-solargreen/20 text-xs font-mono text-solargreen-dark dark:text-solargreen">
              <Leaf className="w-3.5 h-3.5" />
              <span>SANKALP 2026 Climate Edition</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-cleanwhite font-semibold mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-mutedslate">
              <li>
                <Link href="/dashboard/assessment" className="hover:text-solargreen transition-colors">
                  AI Visual Triage Gateway
                </Link>
              </li>
              <li>
                <Link href="/dashboard/triage" className="hover:text-solargreen transition-colors">
                  Reuse-First Decision Engine
                </Link>
              </li>
              <li>
                <Link href="/dashboard/batches" className="hover:text-solargreen transition-colors">
                  DES Solvometallurgy Batches
                </Link>
              </li>
              <li>
                <Link href="/dashboard/micro-plants" className="hover:text-solargreen transition-colors">
                  Decentralized Micro-Plant Ops
                </Link>
              </li>
              <li>
                <Link href="/dashboard/finance" className="hover:text-solargreen transition-colors">
                  MSME Unit Economics Model
                </Link>
              </li>
              <li>
                <Link href="/dashboard/reports" className="hover:text-solargreen transition-colors">
                  CPCB EPR Digital Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Research & Regulatory Basis */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-cleanwhite font-semibold mb-4">
              Scientific Basis
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-mutedslate">
              <li className="flex items-center gap-1.5">
                <span>E-Waste Management Rules 2022</span>
              </li>
              <li>
                <span>CEEW 2024 Solar Waste Feasibility</span>
              </li>
              <li>
                <span>Deep Eutectic Solvents (Ethaline at 80°C)</span>
              </li>
              <li>
                <span>YOLOv8 Edge Thermal Defect Model</span>
              </li>
              <li>
                <span>Satin Finserv Green Machinery Loans</span>
              </li>
            </ul>
          </div>

          {/* Governance & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-cleanwhite font-semibold mb-4">
              Scientific Notice
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-darknavy/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-mutedslate leading-relaxed">
              <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-electriccyan" />
                Transparency Disclosure
              </p>
              Recovery percentages, financial margins (69%), and climate emissions avoidance (1.5t CO₂e/t) are research-stage estimates derived from peer-reviewed solvometallurgy literature and CEEW modeling. AI triage recommendations require qualified electrical inspection prior to high-voltage reuse.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-mutedslate">
          <div>
            © {new Date().getFullYear()} HelioSolv. Developed for SANKALP by Satin Finserv – The Climate Edition 2026.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-solargreen transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-solargreen transition-colors">
              Terms of Service
            </Link>
            <Link href="/methodology" className="hover:text-solargreen transition-colors">
              Methodology & Sources
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
