'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sun, Shield, Lock, Mail, Eye, EyeOff, ArrowRight, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  const router = useRouter();
  const { switchUserRole, showToast } = useDemo();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
      showToast('Authenticated successfully with Supabase.');
      router.push('/dashboard');
    } else {
      // Demo Mode login fallback
      setTimeout(() => {
        setLoading(false);
        showToast('Logged in via Demo Session (Simulated Auth).');
        router.push('/dashboard');
      }, 500);
    }
  };

  const handleQuickRole = (role: 'sfl_financier' | 'microplant_operator' | 'sustainability_analyst') => {
    switchUserRole(role);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 dark:bg-midnight relative selection:bg-solargreen selection:text-midnight">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-solargreen/10 blur-[120px] pointer-events-none" />

      {/* Top bar controls */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <ThemeToggle />
        <Link
          href="/"
          className="text-xs font-mono text-slate-500 hover:text-solargreen transition-colors"
        >
          ← Back to Overview
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-solargreen to-electriccyan p-[2px] shadow-solar-glow group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-darknavy rounded-[10px] flex items-center justify-center">
              <Sun className="w-5 h-5 text-solargreen" />
            </div>
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-slate-900 dark:text-cleanwhite">
            Helio<span className="text-solargreen">Solv</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-cleanwhite">
          Sign In to Your Workspace
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-mutedslate">
          Decentralized Solar PV Circular Management &amp; EPR Ledger
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Judge / Demo Quick Access Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-solargreen/15 via-electriccyan/10 to-transparent border border-solargreen/30 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-solargreen mb-2">
            <Play className="w-3.5 h-3.5 fill-current" /> SANKALP 2026 1-Click Judge Access
          </div>
          <p className="text-xs text-slate-600 dark:text-mutedslate mb-3">
            Explore the complete platform instantly with realistic pilot records from Bhadla Solar Park:
          </p>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleQuickRole('sfl_financier')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-darknavy text-cleanwhite border border-solargreen/40 hover:border-solargreen text-xs font-medium transition-all group"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-solargreen" />
                Satin Finserv Jury / ESG Financier
              </span>
              <span className="text-solargreen text-[10px] font-mono group-hover:translate-x-1 transition-transform">Enter →</span>
            </button>
            <button
              onClick={() => handleQuickRole('microplant_operator')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-darknavy/60 text-cleanwhite border border-slate-700 hover:border-electriccyan text-xs font-medium transition-all group"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-electriccyan" />
                Bhadla Micro-Plant Operator (MSME)
              </span>
              <span className="text-electriccyan text-[10px] font-mono group-hover:translate-x-1 transition-transform">Enter →</span>
            </button>
          </div>
        </div>

        {/* Standard Login Form */}
        <div className="glass-panel py-8 px-6 sm:px-8 rounded-3xl shadow-xl">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-errorred/10 border border-errorred/30 text-errorred text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@bhadla.heliosolv.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight/70 text-slate-900 dark:text-cleanwhite text-sm focus:outline-none focus:ring-2 focus:ring-solargreen"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight/70 text-slate-900 dark:text-cleanwhite text-sm focus:outline-none focus:ring-2 focus:ring-solargreen"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-cleanwhite"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-mutedslate">
                <input type="checkbox" className="rounded border-slate-700 accent-solargreen" defaultChecked />
                <span>Remember this terminal</span>
              </label>
              <span className="text-solargreen hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-solargreen to-electriccyan text-midnight font-bold text-sm shadow-solar-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-midnight border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500 dark:text-mutedslate">
            Need a new facility registration?{' '}
            <Link href="/auth/register" className="text-solargreen font-semibold hover:underline">
              Create an Account
            </Link>
          </div>
        </div>

        {/* Database status indicator */}
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 dark:text-mutedslate">
            <span className={`h-2 w-2 rounded-full ${isSupabaseConfigured ? 'bg-successgreen' : 'bg-warningamber'}`} />
            Backend Mode: {isSupabaseConfigured ? 'Supabase Live Connected' : 'Demo Mode (Simulated Storage)'}
          </span>
        </div>
      </div>
    </div>
  );
}
