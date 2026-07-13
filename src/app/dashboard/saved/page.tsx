'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, Sparkles } from 'lucide-react';
import { getSavedJobIds, mockJobs, Job } from '@/lib/db';
import { JobCard } from '@/components/job/job-card';
import { Button } from '@/components/ui/button';
import { ApplicationModal } from '@/components/job/application-modal';

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const loadSavedJobs = () => {
    const savedIds = getSavedJobIds();
    const filtered = mockJobs.filter((j) => savedIds.includes(j.id));
    setSavedJobs(filtered);
  };

  useEffect(() => {
    loadSavedJobs();

    // Listen to changes in localStorage if multiple windows/tabs modify it
    const handleStorageChange = () => {
      loadSavedJobs();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsApplyOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page description banner */}
      <section
        aria-label="Saved listings overview"
        className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-2"
      >
        <p className="text-base text-gray-700 font-semibold leading-relaxed">
          Here you will find all the inclusive job postings you have bookmarked. You can review their accommodations details and submit applications from here.
        </p>
      </section>

      {/* Grid listing */}
      <section aria-label="Saved job listings" className="space-y-4">
        {savedJobs.length > 0 ? (
          // Create custom container to trigger refresh when child updates
          <div className="space-y-4" onClick={loadSavedJobs}>
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} onApplyClick={handleApplyClick} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border-2 border-dashed border-border-color rounded-2xl bg-background-color max-w-lg mx-auto">
            <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground-color">No saved listings yet</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              When exploring positions, use the bookmark icon to save jobs for later review.
            </p>
            <Link
              href="/dashboard/search"
              className="inline-flex items-center justify-center font-semibold rounded-lg transition-all focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none bg-primary text-[#212121] hover:bg-primary-hover active:bg-primary/95 shadow-sm h-10 px-5 text-base mt-4 cursor-pointer"
            >
              Browse Vacancies
            </Link>

          </div>
        )}
      </section>

      <ApplicationModal
        job={selectedJob}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
}
