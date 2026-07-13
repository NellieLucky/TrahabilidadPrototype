'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  Accessibility,
  Bookmark,
  Briefcase,
  Banknote,
  Sparkles,
  HelpCircle,
  FileCheck2,
  CheckCircle
} from 'lucide-react';
import { mockJobs, Job, getSavedJobIds, getApplications } from '@/lib/db';
import { JobCard } from '@/components/job/job-card';
import { ApplicationModal } from '@/components/job/application-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { useAccessibility } from '@/components/accessibility/settings-provider';
import { cn } from '@/lib/utils';

export default function DashboardHome() {
  const { toast } = useToast();
  const { profileName, pwdType, settings } = useAccessibility();
  const isMotionEnabled = !settings.reduceMotion;

  // Analytics states
  const [savedCount, setSavedCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);

  // Search and filter states (Mobile view)
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedAccFilters, setSelectedAccFilters] = useState<string[]>([]);
  const [appliedAccFilters, setAppliedAccFilters] = useState<string[]>([]);

  // Apply modal state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const quickChips = ['Remote', 'Full-time'];

  const accFilterOptions = [
    'Screen Reader Compatible',
    'Accessible Hiring Process',
    'Remote Interview Available',
    'Inclusive Employer',
    'Wheelchair Accessible',
    'Neurodivergent Friendly',
    'Sign Language Interpreter',
    'Flexible Work Arrangement'
  ];

  // Dynamic statistics polling hook
  useEffect(() => {
    const updateCounts = () => {
      setSavedCount(getSavedJobIds().length);
      setApplicationsCount(getApplications().length);
    };
    updateCounts();
    const interval = setInterval(updateCounts, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleQuickChipToggle = (chip: string) => {
    setActiveQuickFilters((prev) =>
      prev.includes(chip) ? prev.filter((x) => x !== chip) : [...prev, chip]
    );
  };

  const handleAccCheckboxToggle = (filter: string) => {
    setSelectedAccFilters((prev) =>
      prev.includes(filter) ? prev.filter((x) => x !== filter) : [...prev, filter]
    );
  };

  const applyAccFilters = () => {
    setAppliedAccFilters(selectedAccFilters);
    setIsBottomSheetOpen(false);
    toast(`Applied ${selectedAccFilters.length} accessibility filters`, 'success');
  };

  const resetAccFilters = () => {
    setSelectedAccFilters([]);
    setAppliedAccFilters([]);
    setIsBottomSheetOpen(false);
    toast('Accessibility filters reset', 'info');
  };

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsApplyOpen(true);
  };

  const handleApplySuccess = () => {
    setApplicationsCount(getApplications().length);
  };

  // Helper to map PWD classification values to friendly labels
  const getPwdTypeFriendlyName = (type?: string) => {
    switch (type) {
      case 'visual':
        return 'Visual Impairment Accommodations Mode';
      case 'hearing':
        return 'Hearing & Communication Accommodations Mode';
      case 'mobility':
        return 'Mobility & Physical Access Accommodations Mode';
      case 'neurodivergent':
        return 'Sensory & Cognitive Legibility Accommodations Mode';
      case 'other':
        return 'Custom Workplace Accommodations Mode';
      default:
        return 'General Accessibility Ally Mode';
    }
  };

  // 1. Desktop Match Engine: Tailored list matching candidate settings (limit 4)
  const profileRecommendedJobs = useMemo(() => {
    let list = mockJobs;
    if (pwdType && pwdType !== 'none') {
      list = list.filter((job) => {
        const badgesStr = job.accessibilityBadges.join(' ').toLowerCase();
        if (pwdType === 'visual') {
          return badgesStr.includes('blind') || badgesStr.includes('low vision') || badgesStr.includes('screen reader');
        }
        if (pwdType === 'hearing') {
          return badgesStr.includes('sign language') || badgesStr.includes('deaf');
        }
        if (pwdType === 'mobility') {
          return badgesStr.includes('wheelchair') || badgesStr.includes('physical') || badgesStr.includes('step-free');
        }
        if (pwdType === 'neurodivergent') {
          return badgesStr.includes('neurodivergent') || badgesStr.includes('cognitive') || badgesStr.includes('learning');
        }
        return true;
      });
    }
    return list;
  }, [pwdType]);

  // Total matching jobs count for statistics card
  const totalMatchesCount = useMemo(() => {
    let list = mockJobs;
    if (pwdType && pwdType !== 'none') {
      list = list.filter((job) => {
        const badgesStr = job.accessibilityBadges.join(' ').toLowerCase();
        if (pwdType === 'visual') {
          return badgesStr.includes('blind') || badgesStr.includes('low vision') || badgesStr.includes('screen reader');
        }
        if (pwdType === 'hearing') {
          return badgesStr.includes('sign language') || badgesStr.includes('deaf');
        }
        if (pwdType === 'mobility') {
          return badgesStr.includes('wheelchair') || badgesStr.includes('physical') || badgesStr.includes('step-free');
        }
        if (pwdType === 'neurodivergent') {
          return badgesStr.includes('neurodivergent') || badgesStr.includes('cognitive') || badgesStr.includes('learning');
        }
        return true;
      });
    }
    return list.length;
  }, [pwdType]);

  // 2. Mobile Match Engine: Tailored list matching settings + search criteria
  const mobileFilteredJobs = useMemo(() => {
    let list = mockJobs;

    // Filter based on global PWD settings
    if (pwdType && pwdType !== 'none') {
      list = list.filter((job) => {
        const badgesStr = job.accessibilityBadges.join(' ').toLowerCase();
        if (pwdType === 'visual') {
          return badgesStr.includes('blind') || badgesStr.includes('low vision') || badgesStr.includes('screen reader');
        }
        if (pwdType === 'hearing') {
          return badgesStr.includes('sign language') || badgesStr.includes('deaf');
        }
        if (pwdType === 'mobility') {
          return badgesStr.includes('wheelchair') || badgesStr.includes('physical') || badgesStr.includes('step-free');
        }
        if (pwdType === 'neurodivergent') {
          return badgesStr.includes('neurodivergent') || badgesStr.includes('cognitive') || badgesStr.includes('learning');
        }
        return true;
      });
    }

    // Filter based on keywords query
    if (searchQuery !== '') {
      list = list.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter based on location search query
    if (locationQuery !== '') {
      list = list.filter((job) =>
        job.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
        (locationQuery.toLowerCase() === 'remote' && job.remote)
      );
    }

    // Filter based on quick chips
    if (activeQuickFilters.length > 0) {
      list = list.filter((job) => {
        return activeQuickFilters.every((chip) => {
          if (chip === 'Remote') return job.remote;
          if (chip === 'Full-time') return job.type === 'Full-time';
          return true;
        });
      });
    }

    // Filter based on bottom sheet accessibility values
    if (appliedAccFilters.length > 0) {
      list = list.filter((job) => {
        const badges = job.accessibilityBadges.map((b) => b.toLowerCase());
        return appliedAccFilters.every((filter) => {
          if (filter === 'Screen Reader Compatible') {
            return badges.includes('screen reader friendly') || badges.includes('blind & low vision friendly');
          }
          if (filter === 'Accessible Hiring Process') {
            return badges.includes('accessible recruitment');
          }
          if (filter === 'Remote Interview Available') {
            return badges.includes('remote interview');
          }
          if (filter === 'Inclusive Employer') {
            return badges.includes('inclusive hiring');
          }
          if (filter === 'Wheelchair Accessible') {
            return badges.includes('wheelchair accessible');
          }
          if (filter === 'Neurodivergent Friendly') {
            return badges.includes('neurodivergent friendly');
          }
          if (filter === 'Sign Language Interpreter') {
            return badges.includes('sign language interpreter');
          }
          if (filter === 'Flexible Work Arrangement') {
            return badges.includes('service dog friendly') || job.remote;
          }
          return true;
        });
      });
    }

    return list;
  }, [pwdType, searchQuery, locationQuery, activeQuickFilters, appliedAccFilters]);

  // Lock scroll when mobile bottom sheet is active
  useEffect(() => {
    if (isBottomSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBottomSheetOpen]);

  return (
    <div className="pb-12">
      
      {/* -------------------------------------------------- */}
      {/* MOBILE SCREEN LAYOUT (md:hidden) */}
      {/* -------------------------------------------------- */}
      <div className="block md:hidden space-y-5">
        <section aria-label="Search parameters" className="space-y-3.5">
          <div className="flex flex-col gap-2.5">
            {/* Keyword Search */}
            <div className="relative">
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl border border-gray-200 bg-background-color text-sm text-foreground-color focus:border-primary"
                aria-label="Search keyword"
              />
              <div className="absolute left-3.5 top-3.5 text-gray-400">
                <Search className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>

            {/* Location Search with GPS Target indicator */}
            <div className="relative">
              <Input
                placeholder="Quezon City, Metro Manila"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="pl-10 pr-10 h-11 rounded-xl border border-gray-200 bg-background-color text-sm text-foreground-color focus:border-primary"
                aria-label="Search location"
              />
              <div className="absolute left-3.5 top-3.5 text-gray-400">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="absolute right-3.5 top-3 text-gray-400 hover:text-primary cursor-pointer select-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="3"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Filters Horizontal Row */}
          <div className="flex gap-2 items-center overflow-x-auto scrollbar-hide py-1">
            <button
              type="button"
              onClick={() => {
                setSelectedAccFilters(appliedAccFilters);
                setIsBottomSheetOpen(true);
              }}
              className={cn(
                'h-9 px-3.5 inline-flex items-center gap-1.5 border border-gray-200 bg-background-color text-xs font-bold text-gray-700 hover:bg-surface rounded-xl shrink-0 cursor-pointer focus:outline-none',
                appliedAccFilters.length > 0 && 'border-primary bg-primary/5'
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Accessibility Filters</span>
              {appliedAccFilters.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-primary text-[#212121] text-[9px] font-black">
                  {appliedAccFilters.length}
                </span>
              )}
            </button>

            {quickChips.map((chip) => {
              const isSelected = activeQuickFilters.includes(chip);
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleQuickChipToggle(chip)}
                  className={cn(
                    'h-9 px-3.5 inline-flex items-center gap-1.5 border border-gray-200 bg-background-color text-xs font-bold text-gray-700 hover:bg-surface rounded-xl shrink-0 cursor-pointer focus:outline-none',
                    isSelected && 'border-primary bg-primary/5 text-primary-hover'
                  )}
                >
                  {chip === 'Remote' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  ) : (
                    <Briefcase className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{chip}</span>
                </button>
              );
            })}

            <Link
              href="/dashboard/search"
              className="h-9 px-3.5 inline-flex items-center justify-center border border-gray-200 bg-background-color text-xs font-bold text-gray-700 hover:bg-surface rounded-xl shrink-0 focus:outline-none"
            >
              + More
            </Link>
          </div>
        </section>

        {/* Recommended feed heading */}
        <div className="flex items-center justify-between pt-2">
          <h3 className="font-extrabold text-base text-foreground-color">
            Recommended for you
          </h3>
          <Link
            href="/dashboard/search"
            className="text-sm font-extrabold text-primary hover:text-primary-hover focus:outline-none"
          >
            See all
          </Link>
        </div>

        {/* Mobile Job Match lists */}
        <section aria-label="Mobile matched listings" className="space-y-4">
          {mobileFilteredJobs.length > 0 ? (
            mobileFilteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApplyClick={handleApplyClick}
              />
            ))
          ) : (
            <div className="p-8 text-center border-2 border-dashed border-border-color rounded-2xl bg-background-color">
              <Accessibility className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-foreground-color">No custom matched jobs found</h4>
              <p className="text-xs text-gray-400 mt-1 leading-normal">
                Relax your category classification or clear keywords to scan all inclusive listings.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* -------------------------------------------------- */}
      {/* DESKTOP SCREEN LAYOUT (hidden md:block) */}
      {/* -------------------------------------------------- */}
      <div className="hidden md:block space-y-6">
        {/* Welcome Banner */}
        <section
          aria-label="Welcome banner"
          className="p-6 rounded-2xl border border-border-color bg-gradient-to-r from-primary/10 via-primary/5 to-transparent flex flex-row items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground-color tracking-tight animate-fadeIn">
              Mabuhay, {profileName || 'Candidate'}!
            </h2>
            <p className="text-sm font-semibold text-gray-500 flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-primary" aria-hidden="true" />
              {getPwdTypeFriendlyName(pwdType)}
            </p>
          </div>
          <div>
            <Link
              href="/dashboard/search"
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-[#212121] text-sm font-bold rounded-xl shadow-sm focus-visible:ring-4 focus-visible:ring-primary/50 transition-all cursor-pointer"
            >
              Explore Job Listings
            </Link>
          </div>
        </section>

        {/* Statistics Analytics Row */}
        <section aria-label="Overview statistics" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Active Applications */}
          <div className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/20 text-green-600 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-2xl font-black text-foreground-color">{applicationsCount}</span>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                Active Applications
              </h3>
            </div>
          </div>

          {/* Card 2: Saved Jobs */}
          <div className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 flex items-center justify-center shrink-0">
              <Bookmark className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-2xl font-black text-foreground-color">{savedCount}</span>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                Saved Listings
              </h3>
            </div>
          </div>

          {/* Card 3: Tailored Matches */}
          <div className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-2xl font-black text-foreground-color">{totalMatchesCount}</span>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                Tailored Matches
              </h3>
            </div>
          </div>
        </section>

        {/* Main Grid: Recommended Listings & Guides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommended list - Left 2 Columns */}
          <section aria-labelledby="desktop-rec-heading" className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 id="desktop-rec-heading" className="text-lg font-bold text-foreground-color flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
                Tailored Job Matches for You
              </h3>
              <Link
                href="/dashboard/search"
                className="text-xs font-extrabold text-primary hover:underline"
              >
                See All Jobs &rarr;
              </Link>
            </div>

            {/* Desktop grid (responsive matching iPad adjustments) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {profileRecommendedJobs.length > 0 ? (
                profileRecommendedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApplyClick={handleApplyClick}
                  />
                ))
              ) : (
                <div className="col-span-full p-10 text-center border border-dashed border-border-color rounded-2xl bg-background-color">
                  <p className="text-sm text-gray-500 italic">
                    No customized recommendations matching your PWD settings. Update your category preferences.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Accommodations checklist sidebar - Right Column */}
          <aside aria-label="Accessibility checklist and tips" className="space-y-6">
            <div className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Accommodations Info
              </h3>
              <div className="space-y-3.5 text-xs leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                <div className="flex gap-2.5">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <p>
                    <strong>Accessible Recruitment:</strong> Inquire for step-by-step interview guidebooks, extended timing parameters, or closed captions.
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <p>
                    <strong>Alternative Formats:</strong> Request document text scales, dyslexia support font formats, or audio readouts.
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <p>
                    <strong>Workplace Adjustments:</strong> Verify ergonomic desk layouts, ramp accessibility, step-free access paths, or service dog support.
                  </p>
                </div>
              </div>
              <div className="border-t border-border-color pt-3.5 text-center">
                <Link
                  href="/dashboard/help"
                  className="text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  Troubleshoot Accessibility
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* SHARED MODALS */}
      {/* -------------------------------------------------- */}
      
      {/* Bottom Sheet - Mobile Accessibility Filters drawer */}
      <AnimatePresence>
        {isBottomSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              initial={isMotionEnabled ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={isMotionEnabled ? { opacity: 0 } : { opacity: 1 }}
              onClick={() => setIsBottomSheetOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide up sheet */}
            <motion.div
              initial={isMotionEnabled ? { y: '100%' } : { y: 0 }}
              animate={{ y: 0 }}
              exit={isMotionEnabled ? { y: '100%' } : { y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="home-sheet-title"
              className="relative w-full max-w-lg bg-background-color rounded-t-3xl border-t border-border-color p-6 shadow-2xl z-10 flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Drag Handle */}
              <div className="w-12 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 mx-auto mb-5 flex-shrink-0" />

              {/* Title & Close */}
              <div className="flex items-center justify-between pb-3 border-b border-border-color flex-shrink-0">
                <h3 id="home-sheet-title" className="text-lg font-extrabold text-foreground-color flex items-center gap-2">
                  <Accessibility className="w-5 h-5 text-primary" aria-hidden="true" />
                  Accessibility Filters
                </h3>
                <button
                  type="button"
                  onClick={() => setIsBottomSheetOpen(false)}
                  aria-label="Close filters panel"
                  className="p-1 rounded-lg hover:bg-surface text-gray-400 hover:text-foreground-color transition-colors focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable checklist items */}
              <div className="overflow-y-auto flex-1 py-4 space-y-3 pr-1">
                {accFilterOptions.map((filter) => {
                  const isChecked = selectedAccFilters.includes(filter);
                  return (
                    <div
                      key={filter}
                      onClick={() => handleAccCheckboxToggle(filter)}
                      className={cn(
                        'flex items-center gap-3 p-3.5 rounded-xl border border-border-color bg-surface hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer select-none transition-all',
                        isChecked && 'border-primary bg-primary/[0.03]'
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by div click
                        id={`home-check-${filter}`}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary"
                        aria-label={filter}
                      />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {filter}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action buttons footer */}
              <div className="flex gap-3 pt-4 border-t border-border-color flex-shrink-0">
                <Button variant="outline" onClick={resetAccFilters} className="flex-1 font-bold rounded-xl h-11 border-gray-300">
                  Reset Filters
                </Button>
                <Button variant="primary" onClick={applyAccFilters} className="flex-1 font-bold rounded-xl h-11">
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Application Submit Modal */}
      <ApplicationModal
        job={selectedJob}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSuccess={handleApplySuccess}
      />
    </div>
  );
}
