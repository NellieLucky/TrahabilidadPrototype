'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Users,
  MoreVertical,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { getApplications, Application } from '@/lib/db';
import { cn } from '@/lib/utils';

// ─── Status Configuration ────────────────────────────────────────────────────
type FilterStatus = 'All' | 'Applied' | 'Screening' | 'Interviewing' | 'Decision' | 'Withdrawn';

const STEPS = ['Applied', 'Screening', 'Interviewing', 'Decision'] as const;

function getStatusStep(status: Application['status']): number {
  switch (status) {
    case 'Applied':      return 0;
    case 'Screening':    return 1;
    case 'Interviewing': return 2;
    case 'Offered':      return 3;
    default:             return -1;
  }
}

function getStatusConfig(status: Application['status']) {
  switch (status) {
    case 'Applied':
      return { label: 'APPLIED', icon: <CheckCircle className="w-3.5 h-3.5" />, classes: 'bg-green-50 text-green-700 border-green-200' };
    case 'Screening':
      return { label: 'SCREENING', icon: <CheckCircle className="w-3.5 h-3.5" />, classes: 'bg-blue-50 text-blue-700 border-blue-200' };
    case 'Interviewing':
      return { label: 'INTERVIEWING', icon: <Users className="w-3.5 h-3.5" />, classes: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'Offered':
      return { label: 'OFFERED', icon: <CheckCircle className="w-3.5 h-3.5" />, classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    case 'Declined':
      return { label: 'WITHDRAWN', icon: null, classes: 'bg-gray-50 text-gray-500 border-gray-200' };
    default:
      return { label: status.toUpperCase(), icon: null, classes: 'bg-gray-50 text-gray-500 border-gray-200' };
  }
}

// ─── Accommodation chip colors ────────────────────────────────────────────────
function getAccChipClass(acc: string) {
  const t = acc.toLowerCase();
  if (t.includes('remote') || t.includes('interview')) return 'bg-blue-50 text-blue-700 border-blue-200';
  if (t.includes('screen') || t.includes('reader') || t.includes('blind')) return 'bg-green-50 text-green-700 border-green-200';
  if (t.includes('wheel') || t.includes('physical') || t.includes('step')) return 'bg-purple-50 text-purple-700 border-purple-200';
  return 'bg-amber-50 text-amber-700 border-amber-200';
}

// ─── Logo component ───────────────────────────────────────────────────────────
const LOGO_COLORS: Record<string, string> = {
  google: 'bg-white border-2 border-gray-200',
  default: 'bg-primary',
};

function CompanyLogo({ company, initials }: { company: string; initials: string }) {
  const isGoogle = company.toLowerCase().includes('google');
  if (isGoogle) {
    // Render the Google multicolor "G"
    return (
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-gray-200 shadow-sm shrink-0">
        <svg viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary text-[#212121] font-bold text-sm shadow-sm shrink-0">
      {initials}
    </div>
  );
}

function getInitials(company: string) {
  return company.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

// ─── Fake step dates for display ──────────────────────────────────────────────
function getStepDates(app: Application): (string | null)[] {
  const base = new Date(app.appliedDate);
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const step = getStatusStep(app.status);
  return STEPS.map((_, i) => {
    if (i > step) return null;
    const d = new Date(base);
    d.setDate(base.getDate() + i * 3);
    return fmt(d);
  });
}

// ─── Pagination ───────────────────────────────────────────────────────────────
const PAGE_SIZE = 10;

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('All');
  const [sortBy, setSortBy] = useState<'Most Recent' | 'Oldest'>('Most Recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  // ─── Counts per filter ────────────────────────────────────────────────────
  const counts: Record<FilterStatus, number> = {
    All: applications.length,
    Applied: applications.filter(a => a.status === 'Applied').length,
    Screening: applications.filter(a => a.status === 'Screening').length,
    Interviewing: applications.filter(a => a.status === 'Interviewing').length,
    Decision: applications.filter(a => a.status === 'Offered').length,
    Withdrawn: applications.filter(a => a.status === 'Declined').length,
  };

  const FILTERS: FilterStatus[] = ['All', 'Applied', 'Screening', 'Interviewing', 'Decision', 'Withdrawn'];

  // ─── Filter & sort ────────────────────────────────────────────────────────
  const filtered = applications
    .filter(a => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Decision') return a.status === 'Offered';
      if (activeFilter === 'Withdrawn') return a.status === 'Declined';
      return a.status === activeFilter;
    })
    .sort((a, b) => {
      const da = new Date(a.appliedDate).getTime();
      const db = new Date(b.appliedDate).getTime();
      return sortBy === 'Most Recent' ? db - da : da - db;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilterChange = (f: FilterStatus) => {
    setActiveFilter(f);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      {/* ── Top filter bar ── */}
      <div className="space-y-2">
        {/* Row 1: Status tabs + filter icon */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto flex-1 min-w-0 scrollbar-none">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={cn(
                  'shrink-0 px-3 py-1.5 rounded-full text-sm font-bold border transition-all whitespace-nowrap cursor-pointer',
                  activeFilter === f
                    ? 'bg-primary text-[#212121] border-primary'
                    : 'bg-background-color text-gray-600 border-border-color hover:border-gray-300 hover:text-foreground-color'
                )}
              >
                {f} ({counts[f]})
              </button>
            ))}
          </div>
          <button
            className="shrink-0 p-1.5 rounded-lg border border-border-color text-gray-500 hover:text-foreground-color hover:border-gray-300 transition-colors cursor-pointer"
            aria-label="More filter options"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Row 2: Sort dropdown */}
        <div className="relative w-fit">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-border-color bg-background-color text-sm font-semibold text-foreground-color focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            <option>Most Recent</option>
            <option>Oldest</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ── Application cards list ── */}
      <section aria-label="Application list" className="space-y-4">
        {paginated.length > 0 ? (
          paginated.map((app) => {
            const step = getStatusStep(app.status);
            const statusCfg = getStatusConfig(app.status);
            const stepDates = getStepDates(app);
            const initials = getInitials(app.company);
            const isGoogle = app.company.toLowerCase().includes('google');

            // Format applied date with time
            const appliedDateObj = new Date(app.appliedDate);
            const formattedDate = appliedDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            const formattedTime = appliedDateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

            return (
              <article
                key={app.id}
                className="rounded-xl border border-border-color bg-background-color shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
              >
                {/* ── Card header ── */}
                <div className="p-5 pb-4">
                  <div className="flex items-start gap-4">
                    <CompanyLogo company={app.company} initials={initials} />

                    <div className="flex-1 min-w-0">
                      {/* Title row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-foreground-color leading-snug">
                            <Link href={`/dashboard/jobs/${app.jobId}`} className="hover:underline hover:text-gray-700 transition-colors">
                              {app.jobTitle}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-sm font-semibold text-gray-600">{app.company}</span>
                            {isGoogle && (
                              <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                              </svg>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-gray-500">
                            <Calendar className="w-3 h-3 shrink-0" aria-hidden="true" />
                            <span>Submitted on {formattedDate} · {formattedTime}</span>
                          </div>
                        </div>

                        {/* Status badge + menu */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={cn(
                            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black border uppercase tracking-wide',
                            statusCfg.classes
                          )}>
                            {statusCfg.icon}
                            {statusCfg.label}
                          </span>
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === app.id ? null : app.id)}
                              className="p-1 rounded-lg text-gray-400 hover:text-foreground-color hover:bg-surface transition-colors cursor-pointer"
                              aria-label="Application options"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {openMenuId === app.id && (
                              <div className="absolute right-0 top-8 z-20 bg-white border border-border-color rounded-xl shadow-xl py-1 min-w-[160px]">
                                <button className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-surface transition-colors cursor-pointer">
                                  Withdraw Application
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-surface transition-colors cursor-pointer">
                                  Contact Employer
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Accommodations ── */}
                <div className="px-5 pb-0 space-y-2 border-t border-border-color pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-2 flex-1 min-w-0">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Requested Accommodations
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {app.accommodationsRequested.length > 0 ? (
                          app.accommodationsRequested.map(acc => (
                            <span
                              key={acc}
                              className={cn(
                                'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border',
                                getAccChipClass(acc)
                              )}
                            >
                              ✓ {acc}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400 italic">No specific accommodations requested.</span>
                        )}
                      </div>
                    </div>

                    {/* View Details button */}
                    <Link
                      href={`/dashboard/jobs/${app.jobId}`}
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border-color bg-background-color text-sm font-bold text-gray-600 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* ── Progress stepper ── */}
                {step >= 0 && (
                  <div className="px-5 pt-4 pb-5 border-t border-border-color mt-4 space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Application Progress
                    </h4>

                    <div className="flex items-start w-full">
                      {STEPS.map((stepLabel, idx) => {
                        const isCompleted = idx < step;
                        const isActive = idx === step;
                        const isPending = idx > step;
                        return (
                          <React.Fragment key={stepLabel}>
                            {/* Step node */}
                            <div className="flex flex-col items-center gap-1.5 shrink-0 w-[60px]">
                              <div
                                className={cn(
                                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all',
                                  isCompleted && 'bg-primary border-primary text-[#212121]',
                                  isActive && 'bg-primary border-primary text-[#212121] ring-4 ring-primary/20 scale-110',
                                  isPending && 'bg-white border-gray-300 text-gray-400'
                                )}
                              >
                                {idx + 1}
                              </div>
                              <span className={cn(
                                'text-[10px] font-black uppercase tracking-wider text-center leading-tight',
                                (isCompleted || isActive) ? 'text-foreground-color' : 'text-gray-400'
                              )}>
                                {stepLabel}
                              </span>
                              <span className={cn(
                                'text-[10px] font-semibold text-center',
                                stepDates[idx] ? 'text-gray-500' : 'text-gray-300'
                              )}>
                                {stepDates[idx] ?? '—'}
                              </span>
                            </div>

                            {/* Connector line between steps */}
                            {idx < STEPS.length - 1 && (
                              <div className="flex-1 h-0.5 mt-[13px] mx-1 rounded-full transition-colors duration-500"
                                style={{ backgroundColor: idx < step ? 'var(--primary)' : '#e5e7eb' }}
                              />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })
        ) : (
          <div className="p-12 text-center border-2 border-dashed border-border-color rounded-2xl bg-background-color">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground-color">No applications found</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {activeFilter === 'All'
                ? 'Explore inclusive jobs, request accommodations, and start tracking your interview progress.'
                : `No applications with status "${activeFilter}" yet.`}
            </p>
            {activeFilter === 'All' && (
              <Link
                href="/dashboard/search"
                className="inline-flex items-center justify-center font-semibold rounded-lg transition-all bg-primary text-[#212121] hover:bg-primary-hover h-10 px-5 text-base mt-4 cursor-pointer"
              >
                Search Jobs Now
              </Link>
            )}
          </div>
        )}
      </section>

      {/* ── Pagination ── */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border-color text-gray-500 hover:text-foreground-color hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={cn(
                  'w-9 h-9 rounded-lg text-sm font-bold border transition-all cursor-pointer',
                  p === currentPage
                    ? 'bg-primary text-[#212121] border-primary'
                    : 'bg-background-color text-gray-600 border-border-color hover:border-gray-300 hover:text-foreground-color'
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border-color text-gray-500 hover:text-foreground-color hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
            <span>{PAGE_SIZE} per page</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      )}
    </div>
  );
}
