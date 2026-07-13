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
  Briefcase
} from 'lucide-react';
import { mockJobs, Job } from '@/lib/db';
import { JobCard } from '@/components/job/job-card';
import { ApplicationModal } from '@/components/job/application-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { useAccessibility } from '@/components/accessibility/settings-provider';
import { cn } from '@/lib/utils';

export default function SearchPage() {
  const { toast } = useToast();
  const { settings } = useAccessibility();
  const isMotionEnabled = !settings.reduceMotion;

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');

  // Quick filter chips state
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

  // Accessibility filters (Bottom Sheet state)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedAccFilters, setSelectedAccFilters] = useState<string[]>([]);
  const [appliedAccFilters, setAppliedAccFilters] = useState<string[]>([]);

  // Modals state
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

  const handleClearAll = () => {
    setSearchQuery('');
    setActiveQuickFilters([]);
    setSelectedAccFilters([]);
    setAppliedAccFilters([]);
  };

  // Helper to calculate accessibility score
  const getAccessibilityScore = (job: Job) => {
    const total =
      (job.accommodations.interview?.length || 0) +
      (job.accommodations.documents?.length || 0) +
      (job.accommodations.communication?.length || 0) +
      (job.accommodations.workplace?.length || 0);
    return Math.min(75 + total * 2, 100);
  };

  // Clean filter matches logic
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // 1. Unified search query matches (keywords, company, description, location)
      const matchesQuery =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (searchQuery.toLowerCase() === 'remote' && job.remote);

      // 2. Quick chips matches
      const matchesQuick = activeQuickFilters.every((chip) => {
        if (chip === 'Remote') return job.remote;
        if (chip === 'Full-time') return job.type === 'Full-time';
        return true;
      });

      // 3. Accessibility filters matches
      const matchesAcc = appliedAccFilters.every((filter) => {
        const badges = job.accessibilityBadges.map((b) => b.toLowerCase());
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

      return matchesQuery && matchesQuick && matchesAcc;
    });
  }, [searchQuery, activeQuickFilters, appliedAccFilters]);

  // Lock scrolling when bottom sheet is open
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

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsApplyOpen(true);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Sticky search + filter bar */}
      <div className="sticky top-0 z-20 -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 pt-4 md:pt-6 pb-3 bg-background-color border-b border-border-color relative">
        {/* Cover strip — blocks cards bleeding above the sticky bar */}
        <div className="absolute inset-x-0 bottom-full h-16 bg-background-color" />
        {/* Search fields section */}
        <section aria-label="Search inputs" className="space-y-3">
          <div className="relative">
            <Input
              placeholder="Search jobs, companies, locations, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl border border-gray-200 bg-background-color text-sm text-foreground-color focus:border-primary w-full"
              aria-label="Search jobs, companies, locations, or skills"
            />
            <div className="absolute left-3.5 top-3.5 text-gray-400">
              <Search className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>

          {/* Filters tray */}
          <div className="flex gap-2 items-center overflow-x-auto scrollbar-hide py-0.5">
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

            <button
              type="button"
              onClick={handleClearAll}
              className="h-9 px-3.5 inline-flex items-center justify-center border border-gray-200 bg-background-color text-xs font-bold text-gray-700 hover:bg-surface rounded-xl shrink-0 focus:outline-none"
            >
              Reset Filters
            </button>
          </div>
        </section>
      </div>

      {/* Results header details */}
      <div className="flex items-center justify-between text-xs md:text-sm font-bold text-gray-500 mt-4">
        <p aria-live="polite">Showing {filteredJobs.length} Jobs</p>
        {(searchQuery || activeQuickFilters.length > 0 || appliedAccFilters.length > 0) && (
          <button
            onClick={handleClearAll}
            className="text-xs text-primary hover:underline font-extrabold focus:outline-none"
          >
            Reset All
          </button>
        )}
      </div>

      <section aria-label="Job Search results" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApplyClick={handleApplyClick}
            />
          ))
        ) : (
          <div className="p-10 text-center border-2 border-dashed border-border-color rounded-2xl bg-background-color max-w-md mx-auto">
            <SlidersHorizontal className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-foreground-color">No inclusive jobs match your search</h4>
            <p className="text-xs text-gray-400 mt-1 leading-normal">
              Try adjusting your keyword inputs or relaxing the accessibility tags to scan all vacancies.
            </p>
            <Button variant="outline" className="mt-3 rounded-xl h-10 text-xs font-bold" onClick={handleClearAll}>
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Bottom Sheet - Accessibility Filters Drawer for Mobile */}
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
              aria-labelledby="search-sheet-title"
              className="relative w-full max-w-lg bg-background-color rounded-t-3xl border-t border-border-color p-6 shadow-2xl z-10 flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Drag Handle */}
              <div className="w-12 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 mx-auto mb-5 flex-shrink-0" />

              {/* Title & Close */}
              <div className="flex items-center justify-between pb-3 border-b border-border-color flex-shrink-0">
                <h3 id="search-sheet-title" className="text-lg font-extrabold text-foreground-color flex items-center gap-2">
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

              {/* Scrollable list options */}
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
                        id={`search-check-${filter}`}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary"
                        aria-label={filter}
                      />
                      <span className="text-sm font-semibold text-gray-700">
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
      />
    </div>
  );
}
