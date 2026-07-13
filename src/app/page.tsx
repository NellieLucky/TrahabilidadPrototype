'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Accessibility, 
  Briefcase, 
  Building2, 
  Heart, 
  Handshake, 
  Play, 
  Search, 
  ChevronDown, 
  Users, 
  ShieldCheck, 
  Eye, 
  Volume2,
  Sparkles,
  Info,
  Menu,
  X
} from 'lucide-react';
import { useAccessibility } from '@/components/accessibility/settings-provider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const { settings, updateSetting, resetSettings } = useAccessibility();
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

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
    <main className="min-h-screen bg-white text-gray-900 relative font-sans overflow-x-clip">
      {/* Top thin purple accent bar */}
      <div className="h-1.5 w-full bg-[#6200EE]" />

      {/* Header Brand & Navigation */}
      <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 transition-all">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-2 py-3 sm:px-4 sm:py-4 md:px-8">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
            {/* Hamburger Button on Left for Mobile */}
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="lg:hidden p-1.5 -ml-1 sm:p-2 sm:-ml-2 rounded-lg hover:bg-gray-50 text-gray-700 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {showMobileNav ? <X className="w-5 h-5 sm:w-5.5 sm:h-5.5" /> : <Menu className="w-5 h-5 sm:w-5.5 sm:h-5.5" />}
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-8 h-8 rounded-lg sm:w-10 sm:h-10 sm:rounded-xl bg-primary brand-logo-bg flex items-center justify-center text-[#212121] shrink-0">
                <Accessibility className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </div>
              <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-foreground-color whitespace-nowrap" aria-label="Trahabilidad">
                <span aria-hidden="true">
                  Trah<span className="text-[#F4B400] brand-text-highlight">Abilidad</span>
                </span>
              </span>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-600">
              <button 
                onClick={() => document.getElementById('job-seekers')?.scrollIntoView({ behavior: 'smooth' })} 
                className="hover:text-gray-900 transition-colors cursor-pointer"
              >
                For Job Seekers
              </button>
              <button 
                onClick={() => document.getElementById('employers')?.scrollIntoView({ behavior: 'smooth' })} 
                className="hover:text-gray-900 transition-colors cursor-pointer"
              >
                For Employers
              </button>
              <button 
                onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })} 
                className="hover:text-gray-900 transition-colors cursor-pointer"
              >
                Resources
              </button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} 
                className="hover:text-gray-900 transition-colors cursor-pointer"
              >
                About Us
              </button>
            </nav>
          </div>

          {/* Action Controls & Settings */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={cn(
                  "hidden sm:flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-semibold transition-all hover:bg-gray-50 active:bg-gray-100 cursor-pointer",
                  showSettings ? "border-primary bg-primary/5 text-primary-hover" : "border-gray-200 text-gray-700"
                )}
              >
                <Accessibility className="w-4 h-4" />
                <span>Accessibility Settings</span>
              </button>

              {/* Floating Accessibility settings Panel */}
              {showSettings && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl p-5 z-50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="border-b border-gray-100 pb-2">
                    <h4 className="font-bold text-gray-900">Accessibility Panel</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Applied immediately across the site</p>
                  </div>
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-gray-900 block">High Contrast Mode</span>
                        <span className="text-xs text-gray-500">WCAG AAA compliant theme</span>
                      </div>
                      <Button
                        variant={settings.highContrast ? 'primary' : 'outline'}
                        size="sm"
                        onClick={handleContrastToggle}
                      >
                        {settings.highContrast ? 'Active' : 'Enable'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-gray-900 block">Legible Typography</span>
                        <span className="text-xs text-gray-500">Clearer character shapes</span>
                      </div>
                      <Button
                        variant={settings.readableFont ? 'primary' : 'outline'}
                        size="sm"
                        onClick={handleFontToggle}
                      >
                        {settings.readableFont ? 'Active' : 'Enable'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-gray-900 block">Scale Text Size</span>
                        <span className="text-xs text-gray-500">Currently: {settings.textSize.toUpperCase()}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={cycleTextSize}
                      >
                        Scale
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/login"
              className="text-xs sm:text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-3 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold bg-[#121212] hover:bg-[#2c2c2c] text-white rounded-full transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown Bar */}
      {showMobileNav && (
        <div className="lg:hidden sticky top-[73px] w-full bg-white border-b border-gray-100 shadow-lg z-30 animate-in slide-in-from-top duration-200">
          <div className="px-4 py-4 space-y-3.5 flex flex-col font-bold text-gray-700">
            <button 
              onClick={() => {
                document.getElementById('job-seekers')?.scrollIntoView({ behavior: 'smooth' });
                setShowMobileNav(false);
              }}
              className="text-left py-1 hover:text-gray-900 border-b border-gray-50 pb-2 cursor-pointer"
            >
              For Job Seekers
            </button>
            <button 
              onClick={() => {
                document.getElementById('employers')?.scrollIntoView({ behavior: 'smooth' });
                setShowMobileNav(false);
              }}
              className="text-left py-1 hover:text-gray-900 border-b border-gray-50 pb-2 cursor-pointer"
            >
              For Employers
            </button>
            <button 
              onClick={() => {
                document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
                setShowMobileNav(false);
              }}
              className="text-left py-1 hover:text-gray-900 border-b border-gray-50 pb-2 cursor-pointer"
            >
              Resources
            </button>
            <button 
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                setShowMobileNav(false);
              }}
              className="text-left py-1 hover:text-gray-900 border-b border-gray-50 pb-2 cursor-pointer"
            >
              About Us
            </button>
            
            {/* Inline Accessibility settings for mobile */}
            <div className="py-2 space-y-2">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Accessibility Adjustments</span>
              <div className="flex flex-wrap gap-2 pt-1 font-semibold text-xs">
                <Button
                  variant={settings.highContrast ? 'primary' : 'outline'}
                  size="sm"
                  onClick={handleContrastToggle}
                  className="rounded-full"
                >
                  Contrast: {settings.highContrast ? 'AAA' : 'Standard'}
                </Button>
                <Button
                  variant={settings.readableFont ? 'primary' : 'outline'}
                  size="sm"
                  onClick={handleFontToggle}
                  className="rounded-full"
                >
                  Font: {settings.readableFont ? 'Legible' : 'Standard'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cycleTextSize}
                  className="rounded-full"
                >
                  Size: {settings.textSize.toUpperCase()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section Container */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Copywriting & CTA */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
            One Platform.
            <br />
            Inclusive Careers.
            <br />
            <span className="relative inline-block text-[#F4B400]">
              Limitless Potential.
              {/* Hand-drawn underline graphic */}
              <svg className="absolute left-0 bottom-[-10px] w-full h-[12px] text-[#F4B400]" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                <path d="M3 9C70 4.5 170 3 297 8" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-xl">
            TrahAbilidad connects Persons with Disabilities (PWDs) with inclusive employers who are ready to support, accommodate, and champion your potential.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all bg-[#F4B400] text-[#212121] hover:bg-[#D9A000] active:bg-[#B97F0E] shadow-sm h-12 px-6 text-sm sm:text-base cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[3]" />
              Find Inclusive Jobs
            </Link>
            <Link
              href="/dashboard/about"
              className="inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 h-12 px-6 text-sm sm:text-base cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <Play className="w-2.5 h-2.5 fill-current" />
              </div>
              See How It Works
            </Link>
          </div>
        </div>

        {/* Right Side: Visual Graph Illustration */}
        <div className="relative flex items-center justify-center min-h-[420px]">
          {/* Subtle light yellow bg circle */}
          <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full bg-[#FEFAF0] -z-10" />

          {/* Grid of blue dots element */}
          <div className="absolute top-10 left-10 grid grid-cols-5 gap-1.5 opacity-30">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-blue-500" />
            ))}
          </div>

          {/* Diagonal lines decoration */}
          <div className="absolute top-10 right-10 opacity-20">
            <svg className="w-16 h-16 text-amber-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="20" y1="0" x2="80" y2="100" />
              <line x1="40" y1="0" x2="100" y2="100" />
              <line x1="60" y1="0" x2="120" y2="100" />
              <line x1="80" y1="0" x2="140" y2="100" />
            </svg>
          </div>

          {/* Connected Central node network graph */}
          <div className="relative w-full max-w-[420px] h-[340px] flex items-center justify-center">
            {/* Dotted lines radiating from center */}
            <svg className="absolute inset-0 w-full h-full text-amber-400" viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3">
              {/* Center to Top */}
              <line x1="200" y1="150" x2="200" y2="40" />
              {/* Center to Left */}
              <line x1="200" y1="150" x2="80" y2="150" />
              {/* Center to Right */}
              <line x1="200" y1="150" x2="320" y2="150" />
              {/* Center to Bottom */}
              <line x1="200" y1="150" x2="200" y2="260" />
            </svg>

            {/* Central Brand node card */}
            <div className="absolute w-20 h-20 rounded-2xl bg-[#F4B400] shadow-lg flex items-center justify-center text-[#212121] scale-110 z-20">
              <Accessibility className="w-11 h-11" aria-hidden="true" />
            </div>

            {/* Top Node Card */}
            <div className="absolute top-0 bg-white border border-gray-100/80 rounded-2xl p-3 shadow-md flex flex-col items-center gap-1 text-center w-28">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-black text-gray-800 leading-tight">Inclusive Job Opportunities</span>
            </div>

            {/* Left Node Card */}
            <div className="absolute left-0 bg-white border border-gray-100/80 rounded-2xl p-3 shadow-md flex flex-col items-center gap-1 text-center w-28">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-black text-gray-800 leading-tight">Accessibility-First Employers</span>
            </div>

            {/* Right Node Card */}
            <div className="absolute right-0 bg-white border border-gray-100/80 rounded-2xl p-3 shadow-md flex flex-col items-center gap-1 text-center w-28">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Handshake className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-black text-gray-800 leading-tight">Supportive Workplaces</span>
            </div>

            {/* Bottom Node Card */}
            <div className="absolute bottom-0 bg-white border border-gray-100/80 rounded-2xl p-3 shadow-md flex flex-row items-center gap-2 justify-center w-36">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-[9px] font-black text-gray-800 leading-none">Stronger Together</span>
            </div>
          </div>

          {/* Purple circle segment decoration bottom-right */}
          <div className="absolute bottom-2 right-6 w-16 h-16 rounded-full bg-purple-200/50 -z-10" />
        </div>
      </section>

      {/* Bottom Horizontal features banner cards */}
      <section className="max-w-7xl mx-auto px-4 pb-12 md:px-8">
        <div className="bg-white border border-gray-100 shadow-md rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature card 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-gray-900">Inclusive Employers</h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Companies committed to accessibility and equal opportunity.
                </p>
              </div>
            </div>

            {/* Feature card 2 */}
            <div className="flex items-start gap-3.5 border-t border-gray-100 pt-4 md:border-t-0 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0 mt-0.5">
                <Accessibility className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-gray-900">Accessibility First</h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Powerful tools and filters built to match your needs from the start.
                </p>
              </div>
            </div>

            {/* Feature card 3 */}
            <div className="flex items-start gap-3.5 border-t border-gray-100 pt-4 lg:border-t-0 lg:pt-0">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-gray-900">Work with Confidence</h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Transparent accommodations and hiring process details from day one.
                </p>
              </div>
            </div>

            {/* Feature card 4 */}
            <div className="flex items-start gap-3.5 border-t border-gray-100 pt-4 lg:border-t-0 lg:pt-0">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0 mt-0.5">
                <Users className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-gray-900">Community & Support</h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Resources, stories, and support to help you grow your career.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below the Fold Content Sections */}
      <section id="job-seekers" className="max-w-7xl mx-auto px-4 py-20 md:px-8 border-t border-gray-100 scroll-mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Title & Descriptions */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-[#6200EE] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              Inclusive Job Opportunities
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Inclusive Job{" "}
              <span className="relative inline-block">
                Opportunities
                <span className="absolute left-0 bottom-1 w-20 h-1.5 bg-[#F4B400] rounded-full" />
              </span>
            </h2>
            
            <p className="text-gray-600 font-semibold leading-relaxed">
              Find positions that match your accommodation requirements. Browse through job listings with verified workplace accessibility tags, and filter by support channels tailored to your needs.
            </p>

            <div className="space-y-5">
              {/* Item 1 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0 mt-0.5">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Visual Accommodations</h4>
                  <p className="text-xs text-gray-500 font-semibold">Screen readers, braille documents, large text, and more.</p>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0 mt-0.5">
                  <Accessibility className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Physical Accommodations</h4>
                  <p className="text-xs text-gray-500 font-semibold">Step-free entrances, accessible restrooms, adjustable desks.</p>
                </div>
              </div>
              {/* Item 3 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Communication Accommodations</h4>
                  <p className="text-xs text-gray-500 font-semibold">Sign language interpreters, live captioning, written communication.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Badges Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-gray-900">Job Card Accommodation Badges</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Look for these verified badges on every job posting.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-[10px] font-bold">
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span>Blind & Low Vision Friendly</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-[10px] font-bold">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>Remote Interview</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-[10px] font-bold">
                <Accessibility className="w-3.5 h-3.5 shrink-0" />
                <span>Wheelchair Accessible</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-[10px] font-bold">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <span>Service Dog Friendly</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
              Employers declare verified accommodations transparently on every posting, helping you apply with confidence from day one.
            </p>

            <div className="flex items-start gap-3 p-3 bg-purple-50/40 border border-purple-100 rounded-2xl">
              <Info className="w-4.5 h-4.5 text-[#6200EE] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-gray-900">Why badges matter?</h4>
                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">They help you quickly identify roles and companies that are committed to accessibility and inclusion.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Category showcase grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pt-12 border-t border-gray-100 mt-12 w-full">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            </div>
            <h3 className="font-extrabold text-xs sm:text-sm text-gray-800 sm:shrink-0 uppercase tracking-wider">You can filter jobs by the support that matters to you</h3>
            <div className="h-px bg-gray-100 flex-1 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Visual Card */}
            <div className="bg-emerald-50/25 border border-emerald-100/50 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">Visual Support</h4>
                    <p className="text-[10px] text-gray-500 font-semibold leading-none">Find jobs that provide visual accessibility.</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-gray-700 font-semibold">
                  <li className="flex items-center gap-1.5">
                    <span className="text-green-600 font-black">✓</span> Screen Reader Compatible
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-green-600 font-black">✓</span> Braille / Large Print Documents
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-green-600 font-black">✓</span> High Contrast Work Tools
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-green-600 font-black">✓</span> Audio Assistance
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex justify-center py-2">
                  <svg className="w-28 h-20 text-gray-400" viewBox="0 0 120 80" fill="none">
                    <rect x="52" y="65" width="16" height="10" fill="#cbd5e1" rx="2" />
                    <ellipse cx="60" cy="74" rx="20" ry="4" fill="#cbd5e1" />
                    <rect x="20" y="10" width="80" height="56" fill="#1e293b" rx="4" />
                    <rect x="24" y="14" width="72" height="42" fill="#f8fafc" rx="2" />
                    <text x="36" y="42" fill="#475569" fontSize="20" fontWeight="bold" fontFamily="sans-serif">A</text>
                    <text x="56" y="42" fill="#64748b" fontSize="14" fontWeight="bold" fontFamily="sans-serif">A</text>
                    <circle cx="85" cy="48" r="12" fill="#dcfce7" />
                    <path d="M80 48v-2.5l2-1.5v8l-2-1.5V48zm4.5-2a2 2 0 0 1 0 4M87 43.5a4.5 4.5 0 0 1 0 9" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <Link href="/dashboard" className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1 hover:underline">
                  Explore visual support jobs →
                </Link>
              </div>
            </div>

            {/* Physical Card */}
            <div className="bg-blue-50/20 border border-blue-100/50 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                    <Accessibility className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">Physical Support</h4>
                    <p className="text-[10px] text-gray-500 font-semibold leading-none">Find jobs that offer physical accessibility.</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-gray-700 font-semibold">
                  <li className="flex items-center gap-1.5">
                    <span className="text-blue-600 font-black">✓</span> Step-Free Access
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-blue-600 font-black">✓</span> Accessible Restrooms
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-blue-600 font-black">✓</span> Ergonomic / Adjustable Setups
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-blue-600 font-black">✓</span> Accessible Parking
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex justify-center py-2">
                  <svg className="w-28 h-20" viewBox="0 0 120 80" fill="none">
                    <rect x="25" y="10" width="70" height="60" fill="#f1f5f9" rx="4" />
                    <rect x="45" y="10" width="30" height="60" fill="#e2e8f0" />
                    <rect x="47" y="10" width="26" height="60" fill="#3b82f6" fillOpacity="0.8" rx="1" />
                    <circle cx="53" cy="40" r="1.5" fill="#facc15" />
                    <path d="M25 65h15l15-15h20" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="95" cy="45" r="8" fill="#dbeafe" />
                    <path d="M95 43a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-1.5 5.5a2.5 2.5 0 0 0 4 0" stroke="#1d4ed8" strokeWidth="1" />
                  </svg>
                </div>
                <Link href="/dashboard" className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 hover:underline">
                  Explore physical support jobs →
                </Link>
              </div>
            </div>

            {/* Communication Card */}
            <div className="bg-purple-50/20 border border-purple-100/50 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">Communication Support</h4>
                    <p className="text-[10px] text-gray-500 font-semibold leading-none">Find jobs with inclusive communication options.</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-gray-700 font-semibold">
                  <li className="flex items-center gap-1.5">
                    <span className="text-purple-600 font-black">✓</span> Sign Language Interpreters
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-purple-600 font-black">✓</span> Live Captioning / Transcripts
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-purple-600 font-black">✓</span> Written Communication
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-purple-600 font-black">✓</span> Flexible Communication Channels
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex justify-center py-2">
                  <svg className="w-28 h-20" viewBox="0 0 120 80" fill="none">
                    <path d="M25 45c0-11 10-20 22-20s22 9 22 20-10 20-22 20c-3.5 0-6.8-.9-9.7-2.5L28 65l2.2-8.5C27 53.4 25 49.3 25 45z" fill="#6200EE" />
                    <circle cx="39" cy="45" r="2.5" fill="#fff" />
                    <circle cx="47" cy="45" r="2.5" fill="#fff" />
                    <circle cx="55" cy="45" r="2.5" fill="#fff" />
                    <path d="M65 52.5c0-8.2 7.5-15 16.5-15s16.5 6.8 16.5 15-7.5 15-16.5 15-16.5 15-16.5 15c-2.6 0-5.1-.7-7.3-1.9L73 67.5l1.6-6.4c-2.5-2.2-4.1-5.3-4.1-8.6z" fill="#e2e8f0" />
                    <circle cx="76" cy="52.5" r="2" fill="#94a3b8" />
                    <circle cx="82" cy="52.5" r="2" fill="#94a3b8" />
                    <circle cx="88" cy="52.5" r="2" fill="#94a3b8" />
                  </svg>
                </div>
                <Link href="/dashboard" className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1 hover:underline">
                  Explore communication support jobs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="employers" className="max-w-7xl mx-auto px-4 py-20 md:px-8 border-t border-gray-100 bg-[#FAFBFD]/50 scroll-mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 p-6 rounded-3xl border border-gray-100 bg-white shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-sm">Accommodation Settings Preview</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2 rounded-lg border border-gray-50">
                <span className="text-xs font-bold text-gray-700">Oral Interview Format</span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-green-50 text-green-700 rounded">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg border border-gray-50">
                <span className="text-xs font-bold text-gray-700">Sighted Guide Assistance</span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-green-50 text-green-700 rounded">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg border border-gray-50">
                <span className="text-xs font-bold text-gray-700">Tactile Pathway Guide</span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-gray-100 text-gray-400 rounded">Optional</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Accessibility-First Employers
            </h2>
            <p className="text-gray-600 font-semibold leading-relaxed">
              Showcase your inclusive work environment. Declare the adjustments you provide, and connect directly with high-performance candidates who benefit from them.
            </p>
            <ul className="space-y-3 font-semibold text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Build diverse, highly skilled teams
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Declare interview accommodations transparently
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Showcase workplace accessibility adjustments upfront
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="resources" className="max-w-7xl mx-auto px-4 py-20 md:px-8 border-t border-gray-100 scroll-mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6200EE]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Work with
              <br />
              <span className="relative inline-block text-[#6200EE]">
                Confidence
                <span className="absolute left-0 bottom-1.5 w-full h-1.5 bg-[#F4B400] rounded-full" />
              </span>{" "}
              & Support
            </h2>

            <p className="text-gray-600 font-semibold leading-relaxed">
              Access guidelines, templates, and tools designed to align candidates and recruiters. Learn about candidate data privacy, and explore how to request customized adjustments for interviews.
            </p>

            <div className="space-y-5">
              {/* Item 1 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0 mt-0.5">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Candidate Data Privacy</h4>
                  <p className="text-xs text-gray-500 font-semibold">Review how we protect personal data and ensure confidentiality.</p>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0 mt-0.5">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Candidate Rights</h4>
                  <p className="text-xs text-gray-500 font-semibold">Explore guidelines on candidate rights under Philippine laws.</p>
                </div>
              </div>
              {/* Item 3 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0 mt-0.5">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Communication Templates</h4>
                  <p className="text-xs text-gray-500 font-semibold">Use ready-to-go checklists and templates for clear, inclusive communication.</p>
                </div>
              </div>
            </div>

            {/* Banner Block */}
            <div className="bg-[#FAF8FF] border border-purple-100 p-4 rounded-2xl flex items-center justify-between max-w-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#6200EE] flex items-center justify-center text-white shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-gray-900 leading-tight">Inclusive hiring starts with the right information.</h4>
                  <p className="text-[10px] text-gray-500 font-semibold mt-0.5">We make it easy to do the right thing, every step of the way.</p>
                </div>
              </div>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} 
                className="w-8 h-8 rounded-full bg-white border border-purple-100 flex items-center justify-center text-[#6200EE] hover:bg-[#6200EE] hover:text-white transition-all shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="relative flex justify-center items-center py-6">
              {/* Dot grid decoration left side */}
              <div className="absolute left-0 top-0 grid grid-cols-4 gap-1 opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6200EE]" />
                ))}
              </div>

              {/* Secure Graphic Illustration */}
              <svg className="w-full max-w-[420px] h-[240px]" viewBox="0 0 320 200" fill="none">
                <rect x="40" y="20" width="220" height="150" fill="#fff" rx="12" stroke="#e2e8f0" strokeWidth="1.5" />
                <rect x="40" y="20" width="220" height="28" fill="#6200EE" rx="12" />
                <rect x="40" y="38" width="220" height="10" fill="#6200EE" />
                <circle cx="52" cy="29" r="2.5" fill="#ff5f56" />
                <circle cx="60" cy="29" r="2.5" fill="#ffbd2e" />
                <circle cx="68" cy="29" r="2.5" fill="#27c93f" />

                <circle cx="160" cy="68" r="8" fill="#f1f5f9" />
                <path d="M160 66a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 6a4 4 0 0 1 8 0" stroke="#475569" strokeWidth="1" />
                <rect x="176" y="64" width="48" height="4" fill="#e2e8f0" rx="1" />
                <rect x="176" y="70" width="32" height="3" fill="#cbd5e1" rx="1" />
                <circle cx="236" cy="68" r="6" fill="#dcfce7" />
                <path d="M233.5 68l1.5 1.5 2.5-3" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />

                <rect x="154" y="90" width="12" height="12" fill="#f1f5f9" rx="2" />
                <path d="M157 93h6m-6 3h6" stroke="#475569" strokeWidth="1" />
                <rect x="176" y="92" width="48" height="4" fill="#e2e8f0" rx="1" />
                <rect x="176" y="98" width="32" height="3" fill="#cbd5e1" rx="1" />
                <circle cx="236" cy="96" r="6" fill="#dcfce7" />
                <path d="M233.5 96l1.5 1.5 2.5-3" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />

                <rect x="154" y="118" width="12" height="12" fill="#f1f5f9" rx="2" />
                <path d="M157 122h6m-6 3h3" stroke="#475569" strokeWidth="1" />
                <rect x="176" y="120" width="48" height="4" fill="#e2e8f0" rx="1" />
                <rect x="176" y="126" width="32" height="3" fill="#cbd5e1" rx="1" />
                <circle cx="236" cy="124" r="6" fill="#dcfce7" />
                <path d="M233.5 124l1.5 1.5 2.5-3" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />

                <circle cx="95" cy="100" r="30" fill="#f5f3ff" />
                <path d="M95 79c8.5 0 16 3 16 3v15c0 10-7 16-16 19-9-3-16-9-16-19V82s7.5-3 16-3z" fill="#6200EE" />
                <path d="M95 91a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0v-5a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v1h-4v-1a2 2 0 0 1 2-2z" fill="#facc15" />
                <rect x="91" y="96" width="8" height="7" fill="#facc15" rx="1" />
                
                <rect x="12" y="80" width="36" height="50" fill="#fff" rx="6" stroke="#e2e8f0" strokeWidth="1.5" />
                <rect x="22" y="75" width="16" height="7" fill="#d97706" rx="1.5" />
                <rect x="17" y="90" width="5" height="5" fill="#f5f3ff" stroke="#6200EE" strokeWidth="1" rx="1" />
                <path d="M19 92.5l1 1 2-2" stroke="#6200EE" strokeWidth="1" strokeLinecap="round" />
                <rect x="17" y="102" width="5" height="5" fill="#f5f3ff" stroke="#6200EE" strokeWidth="1" rx="1" />
                <path d="M19 104.5l1 1 2-2" stroke="#6200EE" strokeWidth="1" strokeLinecap="round" />
                <rect x="17" y="114" width="5" height="5" fill="#f5f3ff" stroke="#6200EE" strokeWidth="1" rx="1" />
                <path d="M19 116.5l1 1 2-2" stroke="#6200EE" strokeWidth="1" strokeLinecap="round" />

                <path d="M260 110h-25a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h36a4 4 0 0 0 4-4v-28a4 4 0 0 0-4-4h-7l-4-4z" fill="#6200EE" />
                <rect x="244" y="126" width="8" height="6" fill="#fff" rx="1" />
                <path d="M246 126v-2.5a2 2 0 1 1 4 0V126" stroke="#fff" strokeWidth="1.2" />
              </svg>
              
              {/* Dot grid decoration right side */}
              <div className="absolute right-0 bottom-4 grid grid-cols-3 gap-1.5 opacity-20">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6200EE]" />
                ))}
              </div>
            </div>

            {/* Compliance card block */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-gray-900">Compliance & Privacy</h3>
              </div>
              <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                TrahAbilidad protects PWD candidate privacy and complies with the **Data Privacy Act of 2012**. We do not share medical diagnoses; only requested accommodations are shared with hiring teams to structure interviews.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 mt-4">
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50/50">
                  <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] mb-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <span className="text-[9px] font-black text-gray-900 leading-tight">Secure by Design</span>
                  <span className="text-[7px] text-gray-500 mt-0.5 leading-tight font-semibold">Your data is encrypted.</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50/50">
                  <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] mb-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
                  <span className="text-[9px] font-black text-gray-900 leading-tight">Private & Confidential</span>
                  <span className="text-[7px] text-gray-500 mt-0.5 leading-tight font-semibold">Only required data shared.</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50/50">
                  <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] mb-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  </div>
                  <span className="text-[9px] font-black text-gray-900 leading-tight">PH Law Compliant</span>
                  <span className="text-[7px] text-gray-500 mt-0.5 leading-tight font-semibold">Aligned with DPA of 2012.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto px-4 py-20 md:px-8 border-t border-gray-100 bg-[#FAFBFD]/50 scroll-mt-6 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Thesis research info card */}
          <div className="p-6 rounded-3xl border border-gray-100 bg-white shadow-sm space-y-5">
            <div className="flex flex-wrap gap-2.5">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-[#6200EE] rounded-lg text-xs font-bold">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path strokeLinecap="round" strokeLinejoin="round" d="M18 10.5v4a3 3 0 01-3 3H9a3 3 0 01-3-3v-4"/></svg>
                Built Through Accessibility Research
              </span>
              <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-bold border border-gray-100">
                Capstone Thesis
              </span>
            </div>
            
            <p className="text-sm text-gray-600 font-semibold leading-relaxed">
              TrahAbilidad (from <span className="text-[#6200EE] font-black">Trabaho + Habilidad</span>) is an accessibility-first employment platform prototype developed as a university research project.
            </p>
            <p className="text-sm text-gray-600 font-semibold leading-relaxed">
              It aims to improve how Persons with Disabilities (PWDs) discover job opportunities by making accommodations, communication preferences, and employer support more visible, understandable, and actionable.
            </p>

            <div className="flex items-start gap-3 p-4 bg-purple-50/40 border border-purple-100 rounded-2xl">
              <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-gray-900">Why this research matters</h4>
                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">Employment is a key driver of independence and inclusion. This research explores how digital platforms can reduce barriers, promote transparency, and empower PWDs in the workplace.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Copywriting & Pillars */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider">
              <Info className="w-3.5 h-3.5" />
              About the Project
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Building a More
              <br />
              <span className="relative inline-block text-[#6200EE]">
                Inclusive
                <span className="absolute left-0 bottom-1.5 w-full h-1.5 bg-[#F4B400] rounded-full" />
              </span>{" "}
              Future of Work
            </h2>

            <p className="text-gray-600 font-semibold leading-relaxed">
              Our research focuses on creating semantic, customizable, and transparent recruitment features that align with <span className="text-[#6200EE] font-black">Web Content Accessibility Guidelines (WCAG) 2.2 AA standards.</span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10M2 12h20"/></svg>
                </div>
                <span className="text-[10px] font-extrabold text-gray-900 leading-tight">Accessibility First</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-extrabold text-gray-900 leading-tight">Transparent Recruitment</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] mb-2">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-extrabold text-gray-900 leading-tight">Inclusive Opportunities</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-[#6200EE] mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                </div>
                <span className="text-[10px] font-extrabold text-gray-900 leading-tight">Equal Access for All</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Card - Research Highlights */}
        <div className="bg-[#FEFBF2] border border-amber-100 rounded-3xl p-6 shadow-sm mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            {/* Header */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-amber-200/50 pb-4 lg:pb-0 lg:pr-6">
              <h3 className="font-extrabold text-xs text-[#6200EE] uppercase tracking-wider relative inline-block">
                Research Highlights
                <span className="absolute left-0 bottom-[-4px] w-10 h-0.5 bg-[#F4B400]" />
              </h3>
            </div>
            
            {/* Pillars */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Highlight 1 */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Accessibility className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-gray-900">WCAG 2.2 AA Aligned</h4>
                  <p className="text-[9px] text-gray-500 font-semibold leading-relaxed">Built following the latest Web Content Accessibility Guidelines.</p>
                </div>
              </div>
              {/* Highlight 2 */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-[#6200EE] shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-gray-900">Compliant & Ethical</h4>
                  <p className="text-[9px] text-gray-500 font-semibold leading-relaxed">Aligned with Philippine Data Privacy Act of 2012 and RA 7277 (Magna Carta for PWDs).</p>
                </div>
              </div>
              {/* Highlight 3 */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-gray-900">Privacy by Design</h4>
                  <p className="text-[9px] text-gray-500 font-semibold leading-relaxed">We protect candidate data and only share necessary information with employers.</p>
                </div>
              </div>
              {/* Highlight 4 */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-gray-900">Impact Driven</h4>
                  <p className="text-[9px] text-gray-500 font-semibold leading-relaxed">Designed to create real opportunities and support inclusive hiring in the PH.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-6 md:px-8 border-t border-gray-100 text-center text-xs text-gray-400 font-semibold">
        <p>&copy; {new Date().getFullYear()} TrahAbilidad Research Project. Meets Web Content Accessibility Guidelines (WCAG) 2.2 standards.</p>
      </footer>
    </main>
  );
}
