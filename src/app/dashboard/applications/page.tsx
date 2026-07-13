'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, Calendar, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { getApplications, Application } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const getStatusBadgeVariant = (status: Application['status']) => {
    switch (status) {
      case 'Offered':
        return 'success';
      case 'Interviewing':
        return 'primary';
      case 'Screening':
        return 'info';
      case 'Applied':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusStepIndex = (status: Application['status']) => {
    switch (status) {
      case 'Applied':
        return 0;
      case 'Screening':
        return 1;
      case 'Interviewing':
        return 2;
      case 'Offered':
        return 3;
      default:
        return -1;
    }
  };

  const steps = ['Applied', 'Screening', 'Interviewing', 'Decision'];

  return (
    <div className="space-y-6">
      {/* Description banner */}
      <section
        aria-label="Applications overview"
        className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-2"
      >
        <p className="text-base text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
          Monitor your ongoing interview steps. Employers who display recruitment accommodations badges are bound by TrahAbilidad guidelines to provide requested adjustments.
        </p>
      </section>

      {/* Applications list */}
      <section aria-label="Application lists" className="space-y-6">
        {applications.length > 0 ? (
          applications.map((app) => {
            const currentStep = getStatusStepIndex(app.status);
            return (
              <article
                key={app.id}
                className="p-5 rounded-xl border border-border-color bg-background-color shadow-sm space-y-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                {/* Header info */}
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground-color">
                      <Link href={`/dashboard/jobs/${app.jobId}`} className="hover:underline">
                        {app.jobTitle}
                      </Link>
                    </h3>
                    <p className="text-sm font-semibold text-gray-500 mt-0.5">{app.company}</p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(app.status)}>{app.status}</Badge>
                </div>

                {/* Date info & Acc details */}
                <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 border-b border-border-color pb-3">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  Submitted on {app.appliedDate}
                </div>

                {/* Requested Accommodations section */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">
                    Requested Accommodations
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {app.accommodationsRequested.length > 0 ? (
                      app.accommodationsRequested.map((acc) => (
                        <span
                          key={acc}
                          className="px-2.5 py-1 rounded bg-surface border border-border-color text-xs font-semibold text-gray-700 dark:text-gray-300"
                        >
                          ✓ {acc}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500 italic">No specific accommodations requested during application.</span>
                    )}
                  </div>
                </div>

                {/* Progress bar visual stepper */}
                {currentStep >= 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">
                      Application Progress
                    </h4>
                    <div className="relative flex justify-between items-center w-full max-w-lg">
                      {/* Connection bar line */}
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 dark:bg-gray-800 -z-10" />
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary transition-all duration-500 -z-10"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                      />

                      {/* Stepper circles */}
                      {steps.map((step, idx) => {
                        const isCompleted = idx <= currentStep;
                        const isActive = idx === currentStep;
                        return (
                          <div key={step} className="flex flex-col items-center">
                            <div
                              className={cn(
                                'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all',
                                isCompleted
                                  ? 'bg-primary border-primary text-[#212121]'
                                  : 'bg-white dark:bg-[#1a1a1a] border-gray-300 text-gray-400',
                                isActive && 'ring-4 ring-primary/20 scale-110'
                              )}
                              aria-hidden="true"
                            >
                              {idx + 1}
                            </div>
                            <span
                              className={cn(
                                'text-[10px] font-bold mt-1.5 tracking-wider uppercase',
                                isCompleted ? 'text-foreground-color' : 'text-gray-400'
                              )}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })
        ) : (
          <div className="p-12 text-center border-2 border-dashed border-border-color rounded-2xl bg-background-color max-w-lg mx-auto">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground-color">No applications submitted yet</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Explore inclusive jobs, request accommodations, and start tracking your interview progress.
            </p>
            <Link
              href="/dashboard/search"
              className="inline-flex items-center justify-center font-semibold rounded-lg transition-all focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none bg-primary text-[#212121] hover:bg-primary-hover active:bg-primary/95 shadow-sm h-10 px-5 text-base mt-4 cursor-pointer"
            >
              Search Jobs Now
            </Link>

          </div>
        )}
      </section>
    </div>
  );
}
