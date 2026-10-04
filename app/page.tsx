'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sun,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  Layers,
  Recycle,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Flame,
  Award,
  BarChart3,
  Cpu,
  ChevronRight,
  Database,
  Building2,
  FileSpreadsheet,
  Check,
  Play,
  RotateCcw,
  Sliders,
  DollarSign,
  HelpCircle,
  Clock,
  ArrowUpRight,
  Beaker,
  ShieldAlert,
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroParticles } from '@/components/hero-particles';
import { useDemo } from '@/lib/demo-context';
import { formatInr } from '@/lib/utils';

export default function LandingPage() {
  const router = useRouter();
  const { switchUserRole, environmentalImpact } = useDemo();
  const [activeTab, setActiveTab] = useState<'assess' | 'decide' | 'recover' | 'track' | 'monetize'>('recover');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [calculatorTonnage, setCalculatorTonnage] = useState<number>(30); // 30 tonnes per year for 100 kg/day MSME

  const handleLaunchJudgeDemo = () => {
    switchUserRole('sfl_financier');
    router.push('/dashboard');
  };

  const handleLaunchOperatorDemo = () => {
    switchUserRole('microplant_operator');
    router.push('/dashboard');
  };

  // Unit economics for landing page quick preview
  const previewCost = calculatorTonnage * 20000;
  const previewRev = calculatorTonnage * 65000;
  const previewProfit = previewRev - previewCost;
  const previewStatusQuoLoss = calculatorTonnage * -10230;

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-midnight selection:bg-solargreen selection:text-midnight">
      <Navbar />

      {/* ── 1. CINEMATIC HERO SECTION ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
        {/* Interactive background particle lattice */}
        <HeroParticles />

        {/* Ambient Radial Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-solargreen/15 via-electriccyan/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute -top-32 right-10 w-96 h-96 bg-violetaccent/10 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* SANKALP 2026 Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 dark:bg-darknavy/90 border border-solargreen/30 backdrop-blur-md shadow-solar-glow mb-8 animate-float">
            <span className="flex h-2 w-2 rounded-full bg-solargreen animate-ping" />
            <span className="text-xs font-mono font-medium text-solargreen uppercase tracking-wider">
              SANKALP by Satin Finserv • The Climate Edition 2026
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-slate-900 dark:text-cleanwhite max-w-5xl mx-auto leading-[1.1] mb-6">
            The Future of Solar Doesn&apos;t End{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-solargreen via-electriccyan to-cleanwhite">
              at the Panel.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-mutedslate max-w-3xl mx-auto leading-relaxed mb-10">
            Giving end-of-life solar panels a smarter next chapter through{' '}
            <strong className="text-slate-900 dark:text-cleanwhite font-semibold">AI-assisted triage</strong>,{' '}
            <strong className="text-solargreen font-semibold">reuse-first decisions</strong>, and{' '}
            <strong className="text-electriccyan font-semibold">non-toxic Deep Eutectic Solvent (DES) solvometallurgy</strong>—turning a ₹10,230/t loss into a high-margin decentralized MSME industry.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <button
              onClick={handleLaunchJudgeDemo}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-solargreen to-electriccyan text-midnight font-bold shadow-solar-glow hover:opacity-95 transition-all duration-300 active:scale-95 group text-sm"
            >
              <Play className="w-4 h-4 fill-current group-hover:translate-x-0.5 transition-transform" />
              <span>Explore Live Demo (Judge Mode)</span>
            </button>
            <Link
              href="#solution"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-darknavy/60 backdrop-blur-md text-slate-800 dark:text-cleanwhite font-medium hover:border-solargreen/50 transition-colors text-sm"
            >
              <span>See How It Works</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Live Metric Ribbon (Illustrative Pilot Data clearly labeled) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl glass-panel text-left border-l-4 border-l-solargreen">
              <span className="text-xs font-mono uppercase text-slate-500 dark:text-mutedslate">Panels Assessed</span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-cleanwhite mt-1">
                {environmentalImpact.panelsAssessedTotal.toLocaleString()}+
              </div>
              <span className="text-[10px] text-solargreen flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" /> Rajasthan Pilot Intake
              </span>
            </div>

            <div className="p-4 rounded-2xl glass-panel text-left border-l-4 border-l-electriccyan">
              <span className="text-xs font-mono uppercase text-slate-500 dark:text-mutedslate">Reused vs Leached</span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-cleanwhite mt-1">
                27% / 73%
              </div>
              <span className="text-[10px] text-electriccyan flex items-center gap-1 mt-1">
                <Recycle className="w-3 h-3" /> Reuse-First Triage
              </span>
            </div>

            <div className="p-4 rounded-2xl glass-panel text-left border-l-4 border-l-violetaccent">
              <span className="text-xs font-mono uppercase text-slate-500 dark:text-mutedslate">Silver Purity</span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-cleanwhite mt-1">
                99.9%
              </div>
              <span className="text-[10px] text-violetaccent flex items-center gap-1 mt-1">
                <Sparkles className="w-3 h-3" /> Zero Toxic Acids
              </span>
            </div>

            <div className="p-4 rounded-2xl glass-panel text-left border-l-4 border-l-warningamber">
              <span className="text-xs font-mono uppercase text-slate-500 dark:text-mutedslate">MSME Gross Margin</span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-cleanwhite mt-1">
                69.2%
              </div>
              <span className="text-[10px] text-warningamber flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> SFL Financed Micro-Plant
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 font-mono">
            *Pilot demonstration metrics derived from CEEW 2024 solar feasibility benchmarks and DES lab trials.
          </p>
        </div>
      </section>

      {/* ── 2. THE PROBLEM: INDIA'S IMPENDING SOLAR WASTE TSUNAMI ── */}
      <section id="problem" className="py-24 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-darknavy/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-errorred/10 border border-errorred/30 text-errorred text-xs font-mono font-semibold uppercase mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              The Hidden Vulnerability
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-cleanwhite tracking-tight">
              India&apos;s 500 GW Clean Energy Dream Harbors a 600,000 Tonne Nightmare.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-mutedslate mt-4 leading-relaxed">
              Accelerated desert degradation at massive sites like Rajasthan&apos;s 2,245 MW Bhadla Solar Park is creating an exponential wave of dead panels. The Ministry of Environment&apos;s E-Waste Rules 2022 legally mandate Extended Producer Responsibility (EPR), but current solutions fail catastrophically:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Failure 1: Mechanical Crushing */}
            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-errorred/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-errorred/15 text-errorred flex items-center justify-center mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-errorred font-bold uppercase tracking-wider mb-2">
                Conventional Failure #1
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-cleanwhite mb-3">
                Mechanical Crushing (Net Loss)
              </h3>
              <p className="text-sm text-slate-600 dark:text-mutedslate leading-relaxed mb-6">
                Shredders crush panels into low-grade glass dust. High-value crystalline silicon wafers are destroyed, and silver is permanently lost into contaminated aggregate.
              </p>
              <div className="p-3 rounded-xl bg-errorred/10 border border-errorred/20 font-mono text-xs text-errorred flex justify-between items-center">
                <span>Economic Result:</span>
                <span className="font-bold">-₹10,230 / tonne net loss</span>
              </div>
            </div>

            {/* Failure 2: Toxic Hydrometallurgy */}
            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-warningamber/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-warningamber/15 text-warningamber flex items-center justify-center mb-6">
                <Beaker className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-warningamber font-bold uppercase tracking-wider mb-2">
                Conventional Failure #2
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-cleanwhite mb-3">
                Toxic Acid Leaching (HNO₃ / HF)
              </h3>
              <p className="text-sm text-slate-600 dark:text-mutedslate leading-relaxed mb-6">
                Chemical recyclers boil panels in hazardous nitric and hydrofluoric acids. Produces catastrophic groundwater poison risk, hazardous sludge, and toxic NOx fumes unsuited for local communities.
              </p>
              <div className="p-3 rounded-xl bg-warningamber/10 border border-warningamber/20 font-mono text-xs text-warningamber flex justify-between items-center">
                <span>Environmental Risk:</span>
                <span className="font-bold">Severe toxic sludge & acid spills</span>
              </div>
            </div>

            {/* Failure 3: Centralized Transport Logistics */}
            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-slate-500 transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-500/15 text-slate-400 flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mb-2">
                Logistical Failure #3
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-cleanwhite mb-3">
                Prohibitive Freight Costs
              </h3>
              <p className="text-sm text-slate-600 dark:text-mutedslate leading-relaxed mb-6">
                Hauling heavy, low-density glass panels hundreds of kilometers from remote solar parks (like Thar or Kutch) to centralized industrial smelters completely destroys operating unit margins.
              </p>
              <div className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
                <span>Logistics Barrier:</span>
                <span className="font-bold">&gt;45% of total recycling budget</span>
              </div>
            </div>
          </div>

          {/* The "AHA" Value Trap Insight */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-darknavy to-midnight border border-solargreen/30 shadow-solar-glow text-cleanwhite">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-solargreen font-bold tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  The SANKALP &quot;Aha&quot; Value Trap Insight
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold">
                  Silver is 0.05% of a Panel&apos;s Mass, Yet Holds &gt;50% of its Entire Financial Value.
                </h3>
                <p className="text-sm text-mutedslate mt-3 leading-relaxed">
                  If this silver can be selectively dissolved at low temperatures without destroying the crystalline silicon wafer, solar waste instantly flips from an environmental liability into a lucrative 69% gross margin MSME enterprise.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3 p-5 rounded-2xl bg-midnight/80 border border-slate-700/60 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-mutedslate">Silver Mass Share:</span>
                  <span className="font-bold text-cleanwhite">~0.05% (~500g / tonne)</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-mutedslate">Silver Economic Value:</span>
                  <span className="font-bold text-solargreen">&gt;54% (₹45,000 / tonne)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-mutedslate">Silicon & Glass Value:</span>
                  <span className="font-bold text-electriccyan">₹15,000 / tonne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE HELIOSOLV SOLUTION: ASSESS → DECIDE → RECOVER → TRACK → MONETIZE ── */}
      <section id="solution" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-solargreen uppercase font-bold tracking-widest">
              A Complete Circular Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-cleanwhite mt-2">
              The 5-Step HelioSolv Circular Pipeline
            </h2>
            <p className="text-slate-600 dark:text-mutedslate text-sm sm:text-base mt-3">
              Replacing multi-million-dollar toxic smelters with localized, AI-triaged &quot;Micro-Plants in a Box&quot; financed by Satin Finserv.
            </p>
          </div>

          {/* Interactive Pipeline Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl glass-panel max-w-3xl mx-auto mb-12">
            {[
              { id: 'assess', label: '1. AI Assessment', icon: Cpu },
              { id: 'decide', label: '2. Reuse Triage', icon: Recycle },
              { id: 'recover', label: '3. DES Chemistry', icon: Beaker },
              { id: 'track', label: '4. Micro-Plant Ops', icon: Building2 },
              { id: 'monetize', label: '5. CPCB EPR Monetization', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-solargreen text-midnight font-bold shadow-solar-glow'
                      : 'text-slate-600 dark:text-slate-300 hover:text-solargreen'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl max-w-4xl mx-auto border border-solargreen/30">
            {activeTab === 'assess' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-solargreen/15 text-solargreen text-xs font-mono font-semibold">
                    <Cpu className="w-3.5 h-3.5" /> Step 1: Edge-AI Screening
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-cleanwhite">
                    Automated Defect Triage via YOLOv8
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-mutedslate leading-relaxed">
                    Solar panels entering the micro-plant are scanned under high-resolution imaging. The model detects micro-cracks, EVA yellowing, and potential-induced degradation (PID) caused by desert diurnal thermal swings.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-solargreen" /> Real-time bounding box defect detection
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-solargreen" /> Retention efficiency calculation (&gt;70% threshold)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-solargreen" /> Eliminates premature destruction of working modules
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/dashboard/assessment"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-solargreen hover:underline"
                    >
                      Try Panel Assessment Gateway <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-midnight/90 border border-slate-700/80 font-mono text-xs text-slate-300 space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-mutedslate border-b border-slate-800 pb-2">
                    <span>INFERENCE TELEMETRY</span>
                    <span className="text-solargreen">YOLOv8s-PV-v2.4</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-cleanwhite font-bold">DETECTIONS:</div>
                    <div className="text-warningamber">• [Micro-Crack] Conf: 91.2% | Bounding: [15, 18, 50, 40]</div>
                    <div className="text-electriccyan">• [EVA Yellowing] Conf: 88.4% | Light Trans: 86%</div>
                    <div className="text-solargreen font-semibold mt-2">
                      TRIAGE: &gt;70% Efficiency Potential → ROUTE TO REFURBISHING
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'decide' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-electriccyan/15 text-electriccyan text-xs font-mono font-semibold">
                    <Recycle className="w-3.5 h-3.5" /> Step 2: Reuse-First Philosophy
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-cleanwhite">
                    Protecting Working Clean Energy Assets
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-mutedslate leading-relaxed">
                    Processing a functional, slightly degraded module through chemical recycling destroys a valuable working asset. HelioSolv enforces an auditable electrical testing protocol (Voc, Isc, Pmax, insulation resistance) before any chemical processing can occur.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-electriccyan" /> Qualified engineering review &amp; sign-off
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-electriccyan" /> Diverts ~25–30% of panels to secondary farm pumps
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-electriccyan" /> Yields higher immediate cash return for MSME operators
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/dashboard/triage"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-electriccyan hover:underline"
                    >
                      Open Reuse Triage Gateway <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-midnight/90 border border-slate-700/80 font-mono text-xs text-slate-300 space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-mutedslate border-b border-slate-800 pb-2">
                    <span>ELECTRICAL CURVE VERIFICATION</span>
                    <span className="text-electriccyan">I-V TRACER PASSED</span>
                  </div>
                  <div className="space-y-1.5">
                    <div>Voc: 36.4 V | Isc: 8.4 A | Pmax: 252.8 W</div>
                    <div>Insulation Resistance: 240 MΩ (Safe)</div>
                    <div>Remaining Life: Estimated 6.5 Years</div>
                    <div className="p-2 rounded bg-solargreen/10 border border-solargreen/30 text-solargreen text-[11px] font-semibold mt-2">
                      CERTIFIED FOR SECONDARY AGRI-WATER PUMPING
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recover' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-solargreen/15 text-solargreen text-xs font-mono font-semibold">
                    <Beaker className="w-3.5 h-3.5" /> Step 3: Deep Eutectic Solvents (DES)
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-cleanwhite">
                    The Molecular Scalpel: Ethaline at 80°C
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-mutedslate leading-relaxed">
                    True end-of-life modules undergo mechanical frame unbolting and EVA delamination. The bare silicon cells are immersed into a heated Deep Eutectic Solvent bath composed of Choline Chloride and Ethylene Glycol (1:2 molar).
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-solargreen" /> Leaches &gt;99% silver in minutes without toxic acid fumes
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-solargreen" /> Leaves crystalline silicon wafer completely intact for resale
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-solargreen" /> Solvent is &gt;90% recyclable per cycle, minimizing OPEX
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/dashboard/batches"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-solargreen hover:underline"
                    >
                      View Active Solvo-Batches <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-midnight/90 border border-slate-700/80 font-mono text-xs text-slate-300 space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-mutedslate border-b border-slate-800 pb-2">
                    <span>SOLVENT REACTION TELEMETRY</span>
                    <span className="text-solargreen">CHCL:EG (1:2) @ 80°C</span>
                  </div>
                  <div className="space-y-1.5">
                    <div>Ag Dissolution Kinetics: &gt;99% in 18 mins</div>
                    <div>Wafer Integrity: 100% Intact (No acid etching)</div>
                    <div>Electrowinning Yield: 99.92% Pure Solid Ag</div>
                    <div className="text-electriccyan">Solvent Regeneration: 93.4% Recycled</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'track' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-warningamber/15 text-warningamber text-xs font-mono font-semibold">
                    <Building2 className="w-3.5 h-3.5" /> Step 4: Decentralized Micro-Plant Ops
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-cleanwhite">
                    Decentralized &quot;Plant-in-a-Box&quot; Network
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-mutedslate leading-relaxed">
                    Rather than hauling heavy panels across state lines, 100 kg/day micro-plants operate adjacent to major solar clusters like Bhadla, Phalodi, and Jaisalmer. Financed as green equipment loans by Satin Finserv.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-warningamber" /> Low CAPEX (₹18 Lakhs) vs ₹20+ Cr centralized smelter
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-warningamber" /> Transforms informal waste handlers into tech entrepreneurs
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-warningamber" /> Real-time telemetry monitoring for NBFC financiers
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/dashboard/micro-plants"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-warningamber hover:underline"
                    >
                      Explore Micro-Plant Hubs <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-midnight/90 border border-slate-700/80 font-mono text-xs text-slate-300 space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-mutedslate border-b border-slate-800 pb-2">
                    <span>BHADLA HUB #01 STATUS</span>
                    <span className="text-successgreen">ONLINE (98.2% Uptime)</span>
                  </div>
                  <div className="space-y-1.5">
                    <div>Capacity: 100 kg/day (~5 panels/day)</div>
                    <div>SFL Loan ID: SFL-GML-2025-0894 (Healthy)</div>
                    <div>Total Waste Diverted: 28.4 Tonnes</div>
                    <div className="text-warningamber">Monthly Operator Surplus: ~₹1,12,000</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'monetize' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-solargreen/15 text-solargreen text-xs font-mono font-semibold">
                    <Award className="w-3.5 h-3.5" /> Step 5: EPR Credits &amp; B2B Silver
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-cleanwhite">
                    Automated Compliance &amp; Mineral Sales
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-mutedslate leading-relaxed">
                    Recovered materials are weighed on tamper-proof IoT scales and automatically synced with the CPCB E-Waste portal API. Verified certificates are traded to Tier-1 solar producers needing statutory compliance.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-solargreen" /> Pure 99.9% silver sold directly to industrial jewelry/electronics
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-solargreen" /> Intact silicon wafers sold back to cell manufacturers
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-solargreen" /> Immutable digital EPR certificates minted on CPCB registry
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/dashboard/inventory"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-solargreen hover:underline"
                    >
                      View Recovered Material Inventory <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-midnight/90 border border-slate-700/80 font-mono text-xs text-slate-300 space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-mutedslate border-b border-slate-800 pb-2">
                    <span>CPCB EPR CERTIFICATE MINTED</span>
                    <span className="text-solargreen">CPCB-EPR-2026-RAJ-4491</span>
                  </div>
                  <div className="space-y-1.5">
                    <div>Material: 100 kg Crystalline PV Waste</div>
                    <div>EPR Credit Value: ₹5,000 / Tonne</div>
                    <div>Silver Bullion Escrow: 49.8g (99.92% Assay)</div>
                    <div className="text-solargreen font-semibold">TOTAL TRANSACTION: ₹3,250 CREDITED</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. COMPETITIVE LANDSCAPE & DEEP-TECH COMPARISON ── */}
      <section id="technology" className="py-24 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-darknavy/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono text-electriccyan uppercase font-bold tracking-widest">
              Global Scouting &amp; Scientific Benchmarking
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-cleanwhite mt-2">
              Why HelioSolv Solvometallurgy Wins
            </h2>
            <p className="text-slate-600 dark:text-mutedslate text-sm sm:text-base mt-3">
              Direct comparison against international paradigms (Rosi Solar, Recycle Solar) and conventional Indian acid recyclers:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm glass-panel rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-800/90 text-slate-700 dark:text-cleanwhite font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-5">Paradigm / Company</th>
                  <th className="py-4 px-5">Technology</th>
                  <th className="py-4 px-5">Core Weakness</th>
                  <th className="py-4 px-5 text-solargreen font-bold">The HelioSolv Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-sans">
                <tr className="hover:bg-solargreen/5 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900 dark:text-cleanwhite">
                    Rosi Solar (France)
                  </td>
                  <td className="py-4 px-5 text-slate-600 dark:text-mutedslate">
                    High-heat Pyrolysis + Thermal Chemistry (600°C)
                  </td>
                  <td className="py-4 px-5 text-errorred">
                    Extremely high CAPEX (₹25Cr+), demands massive centralized shipping.
                  </td>
                  <td className="py-4 px-5 font-semibold text-solargreen">
                    Low CAPEX (₹18L), decentralized MSME deployment; operates safely at only 80°C.
                  </td>
                </tr>
                <tr className="hover:bg-solargreen/5 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900 dark:text-cleanwhite">
                    Recycle Solar (USA)
                  </td>
                  <td className="py-4 px-5 text-slate-600 dark:text-mutedslate">
                    Mechanical shredding &amp; optical sorting
                  </td>
                  <td className="py-4 px-5 text-errorred">
                    Destroys silicon wafers; loses high-value silver into mixed glass dust (-₹10,230/t).
                  </td>
                  <td className="py-4 px-5 font-semibold text-solargreen">
                    Preserves intact silicon wafers for high-value resale; extracts 99.9% pure silver.
                  </td>
                </tr>
                <tr className="hover:bg-solargreen/5 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900 dark:text-cleanwhite">
                    Traditional Indian Recyclers
                  </td>
                  <td className="py-4 px-5 text-slate-600 dark:text-mutedslate">
                    Hydrometallurgy with Nitric &amp; Hydrofluoric Acids
                  </td>
                  <td className="py-4 px-5 text-errorred">
                    Highly toxic fumes, groundwater poison risk, impossible for rural MSME licensing.
                  </td>
                  <td className="py-4 px-5 font-semibold text-solargreen">
                    Non-toxic &amp; biodegradable DES solvent (Ethaline); &gt;90% reusable, safe for rural operators.
                  </td>
                </tr>
                <tr className="bg-solargreen/10 dark:bg-solargreen/15 font-bold">
                  <td className="py-4 px-5 text-solargreen-dark dark:text-solargreen flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-solargreen" /> HelioSolv Micro-Plants
                  </td>
                  <td className="py-4 px-5 text-slate-900 dark:text-cleanwhite">
                    Edge AI Triage + Deep Eutectic Solvents (80°C)
                  </td>
                  <td className="py-4 px-5 text-slate-500 dark:text-mutedslate">
                    None (Field-ready bench chemistry + IoT)
                  </td>
                  <td className="py-4 px-5 text-solargreen">
                    69% Gross Margin, ₹45,000 net profit/tonne, 14-month MSME payback.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 5. MSME UNIT ECONOMICS & SATIN FINSERV FINANCING FIT ── */}
      <section id="economics" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: SFL Strategic Fit */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase">
                <Building2 className="w-3.5 h-3.5" />
                Strategic Fit: Satin Finserv (NBFC-MFI)
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-cleanwhite">
                Financing the &quot;Green Micro-Recycler&quot; Loan Product
              </h2>
              <p className="text-slate-600 dark:text-mutedslate text-sm sm:text-base leading-relaxed">
                Satin Finserv&apos;s ₹15,174+ Crore AUM is focused on MSME lending and Sustainable &amp; Emerging Businesses. HelioSolv creates a new, collateral-backed green machinery loan product that turns local rural entrepreneurs into tech-enabled solar recyclers.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl glass-panel">
                  <div className="w-8 h-8 rounded-lg bg-solargreen/20 text-solargreen flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase font-bold text-slate-900 dark:text-cleanwhite">
                      Zero Centralized Hauling Deficit
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-mutedslate mt-0.5">
                      Micro-plants sit right at the perimeter of solar corridors (Bhadla, Phalodi), eliminating the 45% transport cost penalty.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl glass-panel">
                  <div className="w-8 h-8 rounded-lg bg-electriccyan/20 text-electriccyan flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase font-bold text-slate-900 dark:text-cleanwhite">
                      Fast Payback (&lt;14 Months)
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-mutedslate mt-0.5">
                      With ₹45,000 gross profit per tonne processed, an MSME operator generates ₹1.1+ Lakh monthly surplus, easily servicing SFL debt.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl glass-panel">
                  <div className="w-8 h-8 rounded-lg bg-violetaccent/20 text-violetaccent flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase font-bold text-slate-900 dark:text-cleanwhite">
                      Escrow-Secured Mineral Revenue
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-mutedslate mt-0.5">
                      Recovered 99.9% silver and CPCB EPR compliance receipts settle through SFL partner escrows, ensuring near-zero NPA risk.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="/dashboard/finance"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-solargreen text-midnight font-bold text-xs shadow-solar-glow hover:opacity-90 transition-all"
                >
                  <span>Open Full Financial Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Interactive Economics Card */}
            <div className="lg:col-span-6 glass-panel p-8 rounded-3xl border border-solargreen/40 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-700/60 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-cleanwhite font-display">
                    Interactive MSME Unit Economics
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-mutedslate font-mono">
                    Based on CEEW 2024 &amp; HelioSolv DES Benchmarks
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-solargreen/15 text-solargreen text-xs font-mono font-bold">
                  69% Gross Margin
                </span>
              </div>

              {/* Slider for Annual Throughput */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-600 dark:text-mutedslate">Annual Processing Throughput:</span>
                  <span className="font-bold text-solargreen">{calculatorTonnage} Tonnes / Year (~{Math.round((calculatorTonnage * 1000) / 300)} kg/day)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={calculatorTonnage}
                  onChange={(e) => setCalculatorTonnage(Number(e.target.value))}
                  className="w-full accent-solargreen cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-200/60 dark:bg-midnight/70 border border-slate-700/40">
                  <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-mutedslate">Est. Annual Revenue</span>
                  <div className="text-lg font-mono font-bold text-solargreen mt-1">
                    {formatInr(previewRev, true)}
                  </div>
                  <span className="text-[10px] text-mutedslate">Silver + Silicon + Glass + EPR</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-200/60 dark:bg-midnight/70 border border-slate-700/40">
                  <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-mutedslate">Est. Annual OPEX</span>
                  <div className="text-lg font-mono font-bold text-slate-700 dark:text-cleanwhite mt-1">
                    {formatInr(previewCost, true)}
                  </div>
                  <span className="text-[10px] text-mutedslate">₹20/kg operating cost</span>
                </div>

                <div className="p-3.5 rounded-xl bg-solargreen/10 border border-solargreen/30">
                  <span className="text-[10px] uppercase font-mono text-solargreen-dark dark:text-solargreen font-bold">HelioSolv Operating Surplus</span>
                  <div className="text-xl font-mono font-extrabold text-solargreen mt-1">
                    +{formatInr(previewProfit, true)}
                  </div>
                  <span className="text-[10px] text-solargreen-dark dark:text-solargreen">Payback: &lt;14 months</span>
                </div>

                <div className="p-3.5 rounded-xl bg-errorred/10 border border-errorred/30">
                  <span className="text-[10px] uppercase font-mono text-errorred font-bold">Status Quo Mechanical Crushing</span>
                  <div className="text-xl font-mono font-extrabold text-errorred mt-1">
                    {formatInr(previewStatusQuoLoss, true)}
                  </div>
                  <span className="text-[10px] text-errorred">-₹10,230 / tonne net loss</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-midnight/90 border border-slate-700 text-[11px] text-slate-600 dark:text-mutedslate flex items-center justify-between">
                <span>Net Financial Turnaround Advantage:</span>
                <span className="font-mono font-bold text-solargreen">
                  +{formatInr(previewProfit - previewStatusQuoLoss, true)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SANKALP PITCH DECK & COMPETITION HIGHLIGHTS ── */}
      <section id="sfl-pitch" className="py-24 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-darknavy/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Competition Jury Dossier
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-cleanwhite">
              SANKALP 2026: Why HelioSolv Wins First Prize
            </h2>
            <p className="text-slate-600 dark:text-mutedslate text-sm sm:text-base mt-3">
              Direct alignment with the 5 competition judges: Deep technical innovation, low CAPEX, and 100% alignment with Satin Finserv&apos;s rural MSME loan portfolio.
            </p>
          </div>

          {/* 3 Top Winning Reasons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-solargreen">
              <div className="text-xs font-mono font-bold text-solargreen uppercase mb-2">
                Advantage #1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-cleanwhite mb-2">
                Unseen Technical Novelty
              </h3>
              <p className="text-xs text-slate-600 dark:text-mutedslate leading-relaxed">
                Solvometallurgy with Deep Eutectic Solvents is virtually unknown in conventional student hackathons, elevating HelioSolv leagues above generic &quot;smart dustbins&quot; or basic recycling apps.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-electriccyan">
              <div className="text-xs font-mono font-bold text-electriccyan uppercase mb-2">
                Advantage #2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-cleanwhite mb-2">
                Symbiotic SFL Capital Fit
              </h3>
              <p className="text-xs text-slate-600 dark:text-mutedslate leading-relaxed">
                Instead of asking for abstract venture capital, HelioSolv fits right into Satin Finserv&apos;s core business model: high-margin &quot;Green Machinery Loans&quot; for rural entrepreneurs in semi-urban India.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-violetaccent">
              <div className="text-xs font-mono font-bold text-violetaccent uppercase mb-2">
                Advantage #3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-cleanwhite mb-2">
                Impeccable Regulatory Timing
              </h3>
              <p className="text-xs text-slate-600 dark:text-mutedslate leading-relaxed">
                The MoEFCC E-Waste Rules 2022 mandate solar module EPR and require waste storage up to 2034–2035. HelioSolv provides an immediate, profitable path for solar producers to meet their legal compliance.
              </p>
            </div>
          </div>

          {/* Jury Attack Test FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-3">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-cleanwhite mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-solargreen" />
              Jury Attack Test &amp; Deep-Tech Defense (From Research PDF)
            </h3>

            {[
              {
                q: "Why hasn't this been done commercially yet?",
                a: "Solvometallurgy has only achieved high efficiency and stability in academic research over the last 2-3 years (MDPI Molecules/RSC Advances 2024). Most legacy recyclers are trapped in heavy-CAPEX mechanical shredders or pyrometallurgy ovens. HelioSolv is commercializing this scientific breakthrough at the exact inflection point when India's E-Waste Rules 2022 legally mandate solar EPR compliance."
              },
              {
                q: "Deep Eutectic Solvents sound exotic and expensive. What is the actual cost?",
                a: "Despite the complex name, 'Ethaline' is synthesized from Choline Chloride (a mass-produced animal feed additive costing ~₹80/kg) and Ethylene Glycol (standard automotive antifreeze). They are bulk, inexpensive industrial commodities. Furthermore, the solvent is >90% recyclable after electrowinning the silver, driving ongoing chemical OPEX down to negligible amounts."
              },
              {
                q: "Why add AI? Is it just a buzzword to sound like a tech startup?",
                a: "Absolutely not. Processing a functional but slightly degraded solar panel through chemical leaching destroys a working asset. The AI acts as a vital triage gateway: it routes panels with >70% efficiency to refurbishment, which yields a higher economic return. Chemistry is reserved strictly for truly shattered, end-of-life panels."
              },
              {
                q: "How do you handle the tough EVA polymer layer before the solvent step?",
                a: "We utilize a brief thermal/mechanical pre-treatment or organic solvent swelling which efficiently delaminates the front glass and peels the EVA encapsulant, exposing the bare solar cell directly to the heated DES bath. The DES then acts selectively on the silver contacts."
              },
              {
                q: "What prevents well-funded competitors from simply copying the solvent?",
                a: "While the base formulation of Ethaline is academic literature, our defensible trade secret lies in the specific operational parameters: molar ratios, temperature ramps (80°C), ultrasonication frequencies (40 kHz), and electrochemical recovery voltages optimized specifically for Indian desert panels degraded by Bhadla's dust and extreme thermal cycling."
              }
            ].map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full py-4 px-6 text-left flex justify-between items-center gap-4 text-sm font-semibold text-slate-900 dark:text-cleanwhite hover:text-solargreen transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-solargreen transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 dark:text-mutedslate leading-relaxed border-t border-slate-200 dark:border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CALL TO ACTION ── */}
      <section className="py-24 relative overflow-hidden text-cleanwhite">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-darknavy to-midnight pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-solargreen/10 blur-[130px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-solargreen/15 border border-solargreen/30 text-solargreen text-xs font-mono font-bold uppercase mb-6">
            <Sun className="w-3.5 h-3.5" />
            Join the Clean Recovery Revolution
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight mb-6">
            Let&apos;s Give Every Solar Panel a Better Tomorrow.
          </h2>
          <p className="text-base sm:text-lg text-mutedslate max-w-2xl mx-auto mb-10 leading-relaxed">
            HelioSolv does not just recycle solar panels. It recycles the local economy, empowers rural MSMEs through financial inclusion, and ensures that clean energy leaves a clean legacy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={handleLaunchJudgeDemo}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-solargreen to-electriccyan text-midnight font-bold shadow-solar-glow hover:opacity-95 transition-all active:scale-95 text-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Live Competition Demo</span>
            </button>
            <button
              onClick={handleLaunchOperatorDemo}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-700 bg-darknavy/70 text-cleanwhite text-sm font-medium hover:border-solargreen/50 transition-colors"
            >
              <span>Explore as Micro-Plant Operator</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
