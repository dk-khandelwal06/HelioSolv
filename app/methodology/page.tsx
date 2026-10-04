'use client';

import React from 'react';
import Link from 'next/link';
import { Sun, Beaker, FileText, ExternalLink, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-midnight selection:bg-solargreen selection:text-midnight">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-solargreen transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Platform Overview
        </Link>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase mb-3">
            <Beaker className="w-3.5 h-3.5" /> Scientific &amp; Regulatory Methodology
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-cleanwhite tracking-tight">
            Scientific Framework &amp; Technical Disclosures
          </h1>
          <p className="text-base text-slate-600 dark:text-mutedslate mt-3 leading-relaxed">
            Detailed chemical equations, thermodynamic parameters, CEEW 2024 baseline data, and statutory references powering the HelioSolv platform.
          </p>
        </div>

        {/* Section 1: Chemical Reaction & Kinetics */}
        <section className="glass-panel p-8 rounded-3xl border border-solargreen/30 space-y-4">
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-cleanwhite flex items-center gap-2">
            <span className="text-solargreen">01.</span> Deep Eutectic Solvent (DES) Reaction Mechanism
          </h2>
          <p className="text-sm text-slate-600 dark:text-mutedslate leading-relaxed">
            The solvometallurgical dissolution utilizes <strong>Ethaline</strong>, a type III Deep Eutectic Solvent synthesized by complexing Choline Chloride (hydrogen bond acceptor, HBA) with Ethylene Glycol (hydrogen bond donor, HBD) in a 1:2 molar ratio at 80°C.
          </p>

          <div className="p-4 rounded-2xl bg-midnight font-mono text-xs text-solargreen border border-slate-700/80 space-y-2">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Solvent Complex Formation:</div>
            <div>[HOC₂H₄N(CH₃)₃]⁺Cl⁻ + 2 HOCH₂CH₂OH → Ethaline DES (Liquid @ 12°C T_g)</div>
            <div className="text-slate-400 font-bold uppercase text-[10px] pt-2">Selective Silver Dissolution (Electrochemical Leaching):</div>
            <div>Ag(s) + 2 Cl⁻ (from DES) + e⁻_acceptor → [AgCl₂]⁻ (solvated) + reduced species</div>
          </div>

          <p className="text-xs text-slate-500 dark:text-mutedslate leading-relaxed">
            Unlike nitric acid ($HNO_3$), which aggressively oxidizes and pits the crystalline silicon matrix, Ethaline exhibits high selectivity toward silver metal fingers and lead-tin solder while leaving silicon covalent bonds ($Si-Si$) intact.
          </p>
        </section>

        {/* Section 2: Statutory and Benchmark Sources */}
        <section className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-cleanwhite flex items-center gap-2">
            <span className="text-electriccyan">02.</span> Benchmarks &amp; Peer-Reviewed Literature
          </h2>
          <ul className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-mutedslate">
            <li className="p-4 rounded-2xl bg-slate-100 dark:bg-midnight/70 border border-slate-700/60">
              <strong className="text-slate-900 dark:text-cleanwhite block mb-1">
                Council on Energy, Environment and Water (CEEW) - 2024
              </strong>
              <em>&quot;Enabling a Circular Economy in India&apos;s Solar Industry – Assessing the Solar Waste Landscape.&quot;</em>
              <div className="text-xs text-slate-400 mt-1">
                Provided the empirical baseline that mechanical crushing operates at a net loss of ₹10,230/t and projected cumulative solar PV waste reaching 600 kt by 2030 and 11,221 kt by 2047.
              </div>
            </li>

            <li className="p-4 rounded-2xl bg-slate-100 dark:bg-midnight/70 border border-slate-700/60">
              <strong className="text-slate-900 dark:text-cleanwhite block mb-1">
                Ministry of Environment, Forest and Climate Change (MoEFCC) - 2022
              </strong>
              <em>E-Waste (Management) Rules, 2022 (Notification G.S.R. 801(E))</em>
              <div className="text-xs text-slate-400 mt-1">
                Brought solar photovoltaic modules, panels, and cells under legal Extended Producer Responsibility (EPR) mandates, requiring recyclers to register on the Central Pollution Control Board (CPCB) portal.
              </div>
            </li>

            <li className="p-4 rounded-2xl bg-slate-100 dark:bg-midnight/70 border border-slate-700/60">
              <strong className="text-slate-900 dark:text-cleanwhite block mb-1">
                MDPI Molecules &amp; Royal Society of Chemistry (RSC Advances) - 2023/2024
              </strong>
              <em>&quot;Solvometallurgical Leaching of Critical Raw Materials from Photovoltaic Waste Using Choline Chloride-Based Deep Eutectic Solvents.&quot;</em>
              <div className="text-xs text-slate-400 mt-1">
                Validated 99.2% silver dissolution kinetics at 80°C within 18 minutes under 40 kHz ultrasonication and confirmed &gt;90% solvent recyclability.
              </div>
            </li>
          </ul>
        </section>

        {/* Section 3: Satin Finserv Commercial Model */}
        <section className="glass-panel p-8 rounded-3xl border border-warningamber/30 space-y-4">
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-cleanwhite flex items-center gap-2">
            <span className="text-warningamber">03.</span> Satin Finserv Limited (SFL) NBFC-MFI Alignment
          </h2>
          <p className="text-sm text-slate-600 dark:text-mutedslate leading-relaxed">
            HelioSolv is architected to operate symbiotically with Satin Finserv&apos;s MSME Lending and Sustainable Business Division. Rather than requiring centralized mega-refineries, the platform creates an investable &quot;Green Micro-Recycler&quot; asset class:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-midnight/80 border border-slate-700">
              <span className="text-mutedslate block uppercase text-[10px]">CAPEX Structure</span>
              <span className="text-cleanwhite font-bold block mt-1">₹18 Lakhs total equipment package</span>
              <span className="text-solargreen text-[10px]">80% SFL Debt / 20% MSME Promoter Equity</span>
            </div>
            <div className="p-3.5 rounded-xl bg-midnight/80 border border-slate-700">
              <span className="text-mutedslate block uppercase text-[10px]">Risk Mitigation</span>
              <span className="text-cleanwhite font-bold block mt-1">2.3x DSCR &amp; Escrow Settlement</span>
              <span className="text-electriccyan text-[10px]">Proceeds from bullion buyers pay EMI first</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
