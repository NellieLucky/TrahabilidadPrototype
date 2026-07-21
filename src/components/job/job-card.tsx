'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, MapPin, Briefcase, Banknote, CheckCircle2 } from 'lucide-react';
import { Job, getSavedJobIds, saveJob, unsaveJob } from '@/lib/db';
import { AccessibilityBadge } from './accessibility-badge';
import { SalaryDisplay } from './salary-display';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

export interface JobCardProps {
  job: Job;
  onApplyClick?: (job: Job) => void;
  className?: string;
}

export function JobCard({ job, onApplyClick, className }: JobCardProps) {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = getSavedJobIds();
    setIsSaved(saved.includes(job.id));
  }, [job.id]);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSaved) {
      unsaveJob(job.id);
      setIsSaved(false);
      toast(`Removed "${job.title}" from saved jobs`, 'info');
    } else {
      saveJob(job.id);
      setIsSaved(true);
      toast(`Saved "${job.title}"!`, 'success');
    }
  };

  // Dynamically calculate accessibility score based on accommodations
  const score = Math.min(
    75 + 
    ((job.accommodations.interview?.length || 0) +
     (job.accommodations.documents?.length || 0) +
     (job.accommodations.communication?.length || 0) +
     (job.accommodations.workplace?.length || 0)) * 2,
    100
  );

  return (
    <article
      className={cn(
        'group relative flex flex-col gap-3.5 p-5 rounded-2xl border border-border-color bg-background-color shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 focus-within:ring-4 focus-within:ring-primary/20',
        className
      )}
    >
      {/* Bookmark — absolute so it never pushes title text */}
      <button
        type="button"
        onClick={handleSaveToggle}
        aria-label={isSaved ? `Unsave ${job.title}` : `Save ${job.title}`}
        className={cn(
          'absolute top-4 right-4 p-2 rounded-xl border border-border-color hover:bg-surface text-gray-400 hover:text-gray-700 transition-colors focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none cursor-pointer',
          isSaved && 'text-primary border-primary/20 bg-primary/5'
        )}
      >
        <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true" />
      </button>

      {/* Top Section: Logo + Title (full width, padded right to clear bookmark) */}
      <div className="flex gap-3 pr-10">
        {/* Logo container */}
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-inner shrink-0',
            job.logoColor
          )}
          aria-hidden="true"
        >
          {job.logoInitials}
        </div>
        <div className="min-w-0">
          <h3 className="font-extrabold text-base leading-snug group-hover:text-gray-600 transition-colors">
            <Link href={`/dashboard/jobs/${job.id}`} className="focus:outline-none focus:underline">
              {job.title}
            </Link>
          </h3>
          <p className="text-sm font-bold text-gray-500 mt-0.5 flex items-center gap-1 flex-wrap">
            <span>{job.company}</span>
            <span title="Verified Employer" className="inline-flex shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#F4B400] fill-white dark:fill-transparent shrink-0" />
            </span>
          </p>
        </div>
      </div>

      {/* Meta Specs: Location, Job Type, Salary */}
      <div className="flex flex-col gap-1.5 text-xs md:text-sm font-semibold text-gray-500">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
          <span>{job.type} {job.remote && '(Remote)'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Banknote className="w-4 h-4 text-gray-400 shrink-0" />
          <SalaryDisplay salary={job.salary} />
        </div>
      </div>

      {/* Accessibility Accommodations badges */}
      <div className="flex flex-wrap gap-2 pt-1">
        {job.accessibilityBadges.map((badge) => (
          <AccessibilityBadge key={badge} label={badge} />
        ))}
      </div>

      {/* Side-by-Side Action Buttons */}
      <div className="flex gap-2.5 pt-3 border-t border-border-color/60 mt-auto w-full">
        <Link
          href={`/dashboard/jobs/${job.id}`}
          className="flex-1 inline-flex items-center justify-center rounded-xl border border-border-color hover:border-gray-400 hover:bg-gray-50 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none h-11"
        >
          View Details
        </Link>
        <Button
          variant="primary"
          size="md"
          onClick={(e) => {
            e.preventDefault();
            if (onApplyClick) onApplyClick(job);
          }}
          aria-label={`Apply to ${job.title} at ${job.company}`}
          className="flex-[1.5] font-extrabold text-[#212121] rounded-xl h-11"
        >
          Apply Now
        </Button>
      </div>
    </article>
  );
}
