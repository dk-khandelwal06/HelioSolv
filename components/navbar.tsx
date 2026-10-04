'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sun, Sparkles, Shield, Cpu, Activity, ArrowRight, Menu, X, Play } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { useDemo } from '@/lib/demo-context';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { switchUserRole } = useDemo();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickDemoJudge = () => {
    switchUserRole('sfl_financier');
    router.push('/dashboard');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-solargreen via-electriccyan to-violetaccent p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-solar-glow">
              <div className="w-full h-full bg-darknavy rounded-[10px] flex items-center justify-center">
                <Sun className="w-5 h-5 text-solargreen animate-pulse-slow" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-cleanwhite">
                  Helio<span className="text-solargreen">Solv</span>
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded bg-solargreen/15 text-solargreen-dark dark:text-solargreen border border-solargreen/30">
                  SANKALP &apos;26
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-mutedslate hidden sm:block">
                Powering a Circular Future
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="#problem" className="hover:text-solargreen transition-colors">
              The Crisis
            </Link>
            <Link href="#solution" className="hover:text-solargreen transition-colors">
              Solution
            </Link>
            <Link href="#technology" className="hover:text-solargreen transition-colors">
              DES Chemistry
            </Link>
            <Link href="#economics" className="hover:text-solargreen transition-colors">
              MSME Economics
            </Link>
            <Link href="#impact" className="hover:text-solargreen transition-colors">
              Climate Impact
            </Link>
            <Link href="#sfl-pitch" className="hover:text-solargreen transition-colors flex items-center gap-1.5 text-solargreen font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Pitch Deck
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="text-xs font-medium px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              Sign In
            </Link>
            <button
              onClick={handleQuickDemoJudge}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-gradient-to-r from-solargreen to-electriccyan text-midnight hover:shadow-solar-glow hover:opacity-95 transition-all duration-300 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Explore Live Demo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-800/30"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-700 px-6 py-5 mt-3 space-y-4">
          <div className="flex flex-col gap-3 text-sm">
            <Link
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-200 py-1"
            >
              The 600kt Crisis
            </Link>
            <Link
              href="#solution"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-200 py-1"
            >
              The HelioSolv Solution
            </Link>
            <Link
              href="#technology"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-200 py-1"
            >
              DES Solvometallurgy Science
            </Link>
            <Link
              href="#economics"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-200 py-1"
            >
              MSME Unit Economics (69% Margin)
            </Link>
            <Link
              href="#sfl-pitch"
              onClick={() => setMobileMenuOpen(false)}
              className="text-solargreen font-semibold py-1 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              SANKALP 2026 Pitch Deck
            </Link>
          </div>
          <div className="pt-3 border-t border-slate-700 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleQuickDemoJudge();
              }}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl bg-solargreen text-midnight shadow-solar-glow"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Live Judge Demo</span>
            </button>
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs py-2 text-slate-400"
            >
              Sign In to Existing Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
