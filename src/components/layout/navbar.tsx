'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Eye,
  Type,
  Maximize2,
  Accessibility,
  Menu,
  ChevronDown,
  X,
  Home,
  Search,
  Bookmark,
  Briefcase,
  User,
  Settings,
  HelpCircle,
  Info,
  LogOut
} from 'lucide-react';
import { useAccessibility } from '@/components/accessibility/settings-provider';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { settings, updateSetting } = useAccessibility();
  const { toast } = useToast();
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMotionEnabled = !settings.reduceMotion;

  // Prevent background scrolling when mobile drawer is active
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // Map route path to human readable page title
  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard Overview';
      case '/dashboard/search':
        return 'Search Inclusive Jobs';
      case '/dashboard/applications':
        return 'My Applications Tracker';
      case '/dashboard/saved':
        return 'Saved Listings';
      case '/dashboard/notifications':
        return 'Alerts & Messages';
      case '/dashboard/profile':
        return 'My Accessibility Resume';
      case '/dashboard/settings':
        return 'Accessibility Control Panel';
      case '/dashboard/help':
        return 'Inclusive Help & FAQ';
      case '/dashboard/about':
        return 'About Thesis Research';
      default:
        if (pathname.includes('/dashboard/jobs/')) {
          return 'Job Accommodations Details';
        }
        return 'TrahAbilidad';
    }
  };

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

  const mobileNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Search Jobs', href: '/dashboard/search', icon: Search },
    { name: 'Applications', href: '/dashboard/applications', icon: Briefcase },
    { name: 'Saved Jobs', href: '/dashboard/saved', icon: Bookmark },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'Profile & Resume', href: '/dashboard/profile', icon: User },
    { name: 'Accessibility Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Help Center', href: '/dashboard/help', icon: HelpCircle },
    { name: 'About Project', href: '/dashboard/about', icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border-color bg-background-color/85 backdrop-blur-md px-4 py-3 md:px-6 w-full">
        
        {/* MOBILE HEADER VIEW (md:hidden) */}
        <div className="flex md:hidden items-center justify-between w-full">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-expanded={isDrawerOpen}
            aria-label="Open navigation menu"
            className="p-2 rounded-lg border border-border-color hover:bg-surface text-gray-500 hover:text-foreground-color focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none cursor-pointer shrink-0"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center select-none px-2">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-[#212121]">
                <Accessibility className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-foreground-color">
                Trah<span className="text-primary">Abilidad</span>
              </span>
            </div>
            <span className="text-[7.5px] text-gray-400 font-extrabold tracking-wider mt-0.5">
              Connecting Ability with Opportunity
            </span>
          </div>

          <Link
            href="/dashboard/notifications"
            aria-label="Notifications"
            className="relative p-2 rounded-lg border border-border-color hover:bg-surface text-gray-500 hover:text-foreground-color focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none shrink-0"
          >
            <Bell className="w-5 h-5" aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F4B400]" />
          </Link>
        </div>

        {/* DESKTOP HEADER VIEW (hidden md:flex) */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-expanded={isDrawerOpen}
              aria-label="Open navigation menu"
              className="p-2 rounded-lg border border-border-color hover:bg-surface text-gray-500 hover:text-foreground-color focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none cursor-pointer"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
            <h1 className="text-lg md:text-2xl font-bold tracking-tight text-foreground-color">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Quick Accessibility Config Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowQuickSettings(!showQuickSettings)}
                aria-expanded={showQuickSettings}
                aria-haspopup="true"
                aria-label="Accessibility quick settings menu"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-color hover:bg-surface text-gray-700 hover:text-foreground-color transition-all focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none text-sm font-semibold cursor-pointer"
              >
                <Accessibility className="w-4 h-4 text-primary" />
                <span className="hidden sm:inline">Accessibility</span>
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              {/* Quick Settings Dropdown */}
              {showQuickSettings && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowQuickSettings(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-xl border border-border-color bg-background-color p-4 shadow-xl z-20 animate-scaleUp">
                    <h2 className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-3">
                      Quick Toggles
                    </h2>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={handleContrastToggle}
                        className={cn(
                          'flex items-center justify-between w-full p-2 rounded-lg hover:bg-surface transition-all text-sm font-semibold text-foreground-color border border-transparent hover:border-border-color cursor-pointer',
                          settings.highContrast && 'bg-primary/10 text-primary-hover border-primary/20'
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <Eye className="w-4 h-4" aria-hidden="true" />
                          High Contrast Mode
                        </span>
                        <span className="text-xs uppercase font-bold text-gray-400">
                          {settings.highContrast ? 'On' : 'Off'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={handleFontToggle}
                        className={cn(
                          'flex items-center justify-between w-full p-2 rounded-lg hover:bg-surface transition-all text-sm font-semibold text-foreground-color border border-transparent hover:border-border-color cursor-pointer',
                          settings.readableFont && 'bg-primary/10 text-primary-hover border-primary/20'
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <Type className="w-4 h-4" aria-hidden="true" />
                          Readable Font
                        </span>
                        <span className="text-xs uppercase font-bold text-gray-400">
                          {settings.readableFont ? 'On' : 'Off'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={cycleTextSize}
                        className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-surface transition-all text-sm font-semibold text-foreground-color border border-transparent hover:border-border-color cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Maximize2 className="w-4 h-4" aria-hidden="true" />
                          Scale Text size
                        </span>
                        <span className="px-2 py-0.5 rounded bg-surface border border-border-color text-xs uppercase font-bold text-primary">
                          {settings.textSize}
                        </span>
                      </button>
                    </div>
                    <div className="border-t border-border-color mt-3 pt-3 flex justify-between items-center">
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setShowQuickSettings(false)}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        All Settings Panel &rarr;
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Notifications Shortcut Link */}
            <Link
              href="/dashboard/notifications"
              aria-label="View notifications and alert history"
              className="relative p-2 rounded-lg border border-border-color hover:bg-surface text-gray-500 hover:text-foreground-color transition-all focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none cursor-pointer"
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-background-color" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Drawer Navigation Panel) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Dark Backdrop */}
            <motion.div
              initial={isMotionEnabled ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={isMotionEnabled ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Sliding Drawer Container */}
            <motion.nav
              initial={isMotionEnabled ? { x: '-100%' } : { x: 0 }}
              animate={{ x: 0 }}
              exit={isMotionEnabled ? { x: '-100%' } : { x: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              aria-label="Mobile drawer navigation"
              className="relative flex flex-col w-72 max-w-[80vw] h-full bg-background-color border-r border-border-color p-4 shadow-2xl z-10"
            >
              {/* Header inside Drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-border-color mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-[#212121]">
                    <Accessibility className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-extrabold tracking-tight text-foreground-color">
                    Trah<span className="text-primary">Abilidad</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-1 rounded-lg border border-transparent hover:bg-surface text-gray-400 hover:text-foreground-color transition-colors focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <ul className="space-y-1">
                  {mobileNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setIsDrawerOpen(false)}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold transition-all hover:bg-surface text-gray-700 hover:text-foreground-color focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none',
                            isActive && 'bg-primary text-[#212121] hover:bg-primary/90 hover:text-[#212121]'
                          )}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Drawer Logout */}
              <div className="border-t border-border-color pt-4 mt-auto">
                <Link
                  href="/"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 transition-all focus-visible:ring-4 focus-visible:ring-red-200 focus-visible:outline-none"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span>Logout</span>
                </Link>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
