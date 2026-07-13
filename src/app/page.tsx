'use client';

import React from 'react';
import Link from 'next/link';
import { Accessibility, Eye, Type, Shield, Sparkles, LayoutDashboard } from 'lucide-react';
import { useAccessibility } from '@/components/accessibility/settings-provider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const { settings, updateSetting } = useAccessibility();
  const { toast } = useToast();

  const handleContrastToggle = () => {
    updateSetting('highContrast', !settings.highContrast);
    toast(
      settings.highContrast ? 'Standard theme restored' : 'High contrast mode enabled (AAA Compliance)',
      'success'
    );
  };

  const handleFontToggle = () => {
    updateSetting('readableFont', !settings.readableFont);
    toast(
      settings.readableFont ? 'Standard font restored' : 'System legible font enabled',
      'success'
    );
  };

  const cycleTextSize = () => {
    const nextSize =
      settings.textSize === 'normal'
        ? 'large'
        : settings.textSize === 'large'
        ? 'extra-large'
        : 'normal';
    updateSetting('textSize', nextSize);
    toast(`Text scaling updated to: ${nextSize.toUpperCase()}`, 'info');
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-surface dark:bg-black p-4 sm:p-6 md:p-12">
      {/* Header Brand */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-[#212121]">
            <Accessibility className="w-6 h-6" aria-hidden="true" />
          </div>
          <span className="text-2xl font-black tracking-tight text-foreground-color">
            Trah<span className="text-primary">Abilidad</span>
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-foreground-color hover:bg-white dark:hover:bg-[#1a1a1a] rounded-lg transition-all focus-visible:ring-4 focus-visible:ring-primary/50"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-bold bg-[#212121] text-white dark:bg-white dark:text-[#212121] hover:bg-[#333] rounded-lg transition-all focus-visible:ring-4 focus-visible:ring-primary/50"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Main Content Hero */}
      <section className="max-w-4xl w-full mx-auto my-auto flex flex-col md:flex-row items-center gap-10 py-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary-hover border border-primary/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Philippine PWD Employment Portal
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground-color tracking-tight leading-tight">
            Connecting PWD Talents with <span className="text-primary underline decoration-wavy decoration-2">Accessible</span> Employers.
          </h2>
          <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-xl">
            TrahAbilidad is a highly accessible job platform that details recruiting accommodations, screen reader preferences, and workplace accessibility from day one.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center font-bold rounded-lg transition-all focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none bg-primary text-[#212121] hover:bg-primary-hover active:bg-primary/95 shadow-sm h-12 px-7 text-lg flex gap-2 cursor-pointer"
            >
              <LayoutDashboard className="w-5 h-5" aria-hidden="true" />
              Go to Dashboard
            </Link>
            <Link
              href="/dashboard/about"
              className="inline-flex items-center justify-center font-bold rounded-lg transition-all focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none border-2 border-border-color bg-transparent hover:bg-surface text-foreground-color focus:border-primary h-12 px-7 text-lg cursor-pointer"
            >
              Learn About Research
            </Link>
          </div>

        </div>

        {/* Right side: Accessibility Quick Configuration Card */}
        <div className="w-full max-w-md rounded-2xl border border-border-color bg-background-color p-6 shadow-xl space-y-6">
          <div className="border-b border-border-color pb-3">
            <h3 className="text-lg font-bold text-foreground-color flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-primary" aria-hidden="true" />
              Adjust Accessibility First
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Configure the display to match your specific screen reading, vision, or cognitive needs.
            </p>
          </div>

          <div className="space-y-3">
            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-foreground-color block">High Contrast Mode</span>
                <span className="text-xs text-gray-500">WCAG AAA compliant theme</span>
              </div>
              <Button
                variant={settings.highContrast ? 'primary' : 'outline'}
                size="sm"
                onClick={handleContrastToggle}
                aria-label={settings.highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
              >
                {settings.highContrast ? 'Active' : 'Enable'}
              </Button>
            </div>

            {/* Readable Font */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-foreground-color block">Legible Typography</span>
                <span className="text-xs text-gray-500">Easier to read character shapes</span>
              </div>
              <Button
                variant={settings.readableFont ? 'primary' : 'outline'}
                size="sm"
                onClick={handleFontToggle}
                aria-label={settings.readableFont ? "Disable readable font" : "Enable readable font"}
              >
                {settings.readableFont ? 'Active' : 'Enable'}
              </Button>
            </div>

            {/* Text Scaling */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-foreground-color block">Scale Text Size</span>
                <span className="text-xs text-gray-500">Currently: {settings.textSize.toUpperCase()}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={cycleTextSize}
                aria-label={`Cycle text size. Currently ${settings.textSize}`}
              >
                Scale
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-surface p-3 text-xs text-gray-600 border border-border-color leading-relaxed flex gap-2">
            <Shield className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            <span>
              Your selections are applied globally instantly and saved locally to remember your setup.
            </span>
          </div>
        </div>
      </section>

      {/* Footer credits */}
      <footer className="max-w-6xl w-full mx-auto border-t border-border-color pt-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} TrahAbilidad Research Project. Meets Web Content Accessibility Guidelines (WCAG) 2.2 standards.</p>
      </footer>
    </main>
  );
}
