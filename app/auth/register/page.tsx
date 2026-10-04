'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sun, Shield, Lock, Mail, User, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { ThemeToggle } from '@/components/theme-toggle';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, showToast } = useDemo();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<'microplant_operator' | 'asset_owner' | 'recycler' | 'sustainability_analyst' | 'sfl_financier'>('microplant_operator');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, organization, role },
        },
      });
      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
    }

    // Set demo user state
    setUser({
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: fullName || 'New Operator',
      email: email || 'operator@heliosolv.com',
      role,
      organization: organization || 'Thar Solar Recovery MSME',
      isDemoUser: !isSupabaseConfigured,
    });

    setLoading(false);
    showToast('Account setup completed. Welcome to HelioSolv!');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 dark:bg-midnight relative selection:bg-solargreen selection:text-midnight">
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <ThemeToggle />
        <Link href="/" className="text-xs font-mono text-slate-500 hover:text-solargreen">
          ← Overview
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-solargreen to-electriccyan p-[2px] shadow-solar-glow">
            <div className="w-full h-full bg-darknavy rounded-[10px] flex items-center justify-center">
              <Sun className="w-5 h-5 text-solargreen" />
            </div>
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-slate-900 dark:text-cleanwhite">
            Helio<span className="text-solargreen">Solv</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-cleanwhite">
          Onboard Your Recovery Facility
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-mutedslate">
          Join the decentralized solar circular economy network
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="glass-panel py-8 px-6 sm:px-8 rounded-3xl shadow-xl">
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Devendra Rathore"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight/70 text-slate-900 dark:text-cleanwhite text-sm focus:outline-none focus:ring-2 focus:ring-solargreen"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Business Email
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
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight/70 text-slate-900 dark:text-cleanwhite text-sm focus:outline-none focus:ring-2 focus:ring-solargreen"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Organization / MSME Unit
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Building className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Bhadla Green Solvo MSME Unit #01"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight/70 text-slate-900 dark:text-cleanwhite text-sm focus:outline-none focus:ring-2 focus:ring-solargreen"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Primary Operational Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight/70 text-slate-900 dark:text-cleanwhite text-sm focus:outline-none focus:ring-2 focus:ring-solargreen"
              >
                <option value="microplant_operator">MSME Micro-Plant Operator (Decentralized)</option>
                <option value="sfl_financier">Satin Finserv (NBFC-MFI Green Loan Officer)</option>
                <option value="asset_owner">Solar Asset Owner / EPC Utility Decommissioner</option>
                <option value="sustainability_analyst">CPCB Compliance &amp; Sustainability Auditor</option>
                <option value="recycler">Secondary Market Wafer / Metal Offtaker</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 dark:text-mutedslate mb-1">
                Create Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight/70 text-slate-900 dark:text-cleanwhite text-sm focus:outline-none focus:ring-2 focus:ring-solargreen"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-solargreen to-electriccyan text-midnight font-bold text-sm shadow-solar-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-midnight border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Complete Onboarding</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500 dark:text-mutedslate">
            Already have credentials?{' '}
            <Link href="/auth/login" className="text-solargreen font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
