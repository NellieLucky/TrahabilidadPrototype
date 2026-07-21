'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
  Bookmark,
  CheckCircle2,
  Accessibility,
  Eye,
  MessageSquareCode,
  Languages,
  Footprints,
  ExternalLink
} from 'lucide-react';
import { mockJobs, Job, getSavedJobIds, saveJob, unsaveJob } from '@/lib/db';
import { AccessibilityBadge } from '@/components/job/accessibility-badge';
import { SalaryDisplay } from '@/components/job/salary-display';
import { Button } from '@/components/ui/button';
import { ApplicationModal } from '@/components/job/application-modal';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // React 19 way of unwrapping dynamic router params in client components
  const { id } = use(params);
  
  const [job, setJob] = useState<Job | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    const foundJob = mockJobs.find((j) => j.id === id);
    if (foundJob) {
      setJob(foundJob);
      const saved = getSavedJobIds();
      setIsSaved(saved.includes(foundJob.id));
    }
  }, [id]);

  if (!job) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-bold text-foreground-color">Job Not Found</h2>
        <p className="text-sm text-gray-500 mt-2">The listing you requested could not be retrieved.</p>
        <Link href="/dashboard/search" className="text-primary hover:underline mt-4 inline-block font-bold">
          &larr; Back to Search
        </Link>
      </div>
    );
  }

  const handleSaveToggle = () => {
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

  return (
    <div className="space-y-6 pb-12">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-foreground-color focus:outline-none focus:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to listings
        </button>
      </div>

      {/* Main Job Hero Card */}
      <section
        aria-label="Job title overview"
        className="relative p-4 md:p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-4"
      >
        {/* Save button — absolute top-right corner */}
        <button
          type="button"
          onClick={handleSaveToggle}
          aria-label={isSaved ? `Unsave ${job.title}` : `Save ${job.title}`}
          className={cn(
            'absolute top-4 right-4 p-2.5 rounded-lg border border-border-color hover:bg-surface text-gray-400 hover:text-gray-700 transition-colors focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none cursor-pointer',
            isSaved && 'text-primary border-primary/20 bg-primary/5'
          )}
        >
          <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>

        {/* Logo + Title — padded right to clear the bookmark button */}
        <div className="flex items-start gap-3 md:gap-4 pr-12">
          <div
            className={cn(
              'w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white font-black text-lg md:text-xl shadow-inner shrink-0',
              job.logoColor
            )}
            aria-hidden="true"
          >
            {job.logoInitials}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg md:text-3xl font-black text-foreground-color tracking-tight leading-snug">
              {job.title}
            </h2>
            <p className="text-sm md:text-base font-bold text-gray-500 mt-0.5">{job.company}</p>
          </div>
        </div>

        {/* Apply button — full width, no competition */}
        <Button
          variant="primary"
          fullWidth
          className="font-bold text-sm h-11"
          onClick={() => setIsApplyOpen(true)}
        >
          Apply &amp; Request Accommodations
        </Button>

        {/* Metadata grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 pt-2 text-xs md:text-sm font-semibold text-gray-700 border-t border-border-color">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
            {job.location}
            {job.remote && (
              <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary-hover border border-primary/20 font-bold uppercase">
                Remote
              </span>
            )}
          </span>
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
            <SalaryDisplay salary={job.salary} />
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
            {job.type}
          </span>
        </div>

        {/* Accessibility indicators tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {job.accessibilityBadges.map((badge) => (
            <AccessibilityBadge key={badge} label={badge} />
          ))}
        </div>
      </section>

      {/* Main Grid Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Description & Requirements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <section
            aria-labelledby="desc-heading"
            className="p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-3"
          >
            <h3 id="desc-heading" className="text-lg font-bold text-foreground-color">
              Job Description
            </h3>
            <p className="text-base text-gray-700 leading-relaxed font-semibold">
              {job.description}
            </p>
          </section>

          {/* Requirements */}
          <section
            aria-labelledby="req-heading"
            className="p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-3"
          >
            <h3 id="req-heading" className="text-lg font-bold text-foreground-color">
              Key Requirements
            </h3>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-700 font-semibold leading-relaxed">
              {job.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </section>

          {/* Benefits */}
          <section
            aria-labelledby="benefits-heading"
            className="p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-3"
          >
            <h3 id="benefits-heading" className="text-lg font-bold text-foreground-color">
              Compensation & Benefits
            </h3>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-700 font-semibold leading-relaxed">
              {job.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Accessibility Information Panel */}
        <aside aria-labelledby="acc-panel-heading" className="space-y-6">
          <section
            id="accessibility-info-panel"
            className="p-6 rounded-2xl border border-primary/20 bg-primary/5 shadow-md space-y-6"
          >
            <div className="border-b border-primary/10 pb-3">
              <h3 id="acc-panel-heading" className="text-lg font-extrabold text-foreground-color flex items-center gap-2">
                <Accessibility className="w-5.5 h-5.5 text-primary" aria-hidden="true" />
                Accommodations Panel
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Transparency disclosure regarding physical, communication, and visual adjustments offered by {job.company}.
              </p>
            </div>

            {/* 1. Interview Accommodations */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                <MessageSquareCode className="w-4 h-4 text-blue-600" />
                Recruitment & Interview
              </h4>
              <ul className="space-y-1.5">
                {job.accommodations.interview.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Document Accommodations */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-green-600" />
                Reading & Documentation
              </h4>
              <ul className="space-y-1.5">
                {job.accommodations.documents.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Communication Accommodations */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-amber-600" />
                Alternative Communication
              </h4>
              <ul className="space-y-1.5">
                {job.accommodations.communication.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Workplace Accommodations */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                <Footprints className="w-4 h-4 text-purple-600" />
                Workplace Inclusivity
              </h4>
              <ul className="space-y-1.5">
                {job.accommodations.workplace.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-primary/10 pt-4 flex flex-col gap-2">
              <Button
                variant="primary"
                fullWidth
                onClick={() => setIsApplyOpen(true)}
              >
                Apply & Request Accommodations
              </Button>
            </div>
          </section>
        </aside>
      </div>

      {/* Application Form Dialog Modal */}
      <ApplicationModal
        job={job}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
}
