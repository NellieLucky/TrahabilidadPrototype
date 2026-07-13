'use client';

import React from 'react';
import { Info, ShieldCheck, Accessibility, BookOpen, GraduationCap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <section
        aria-labelledby="about-heading"
        className="p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-4"
      >
        <div className="flex items-center gap-2 border-b border-border-color pb-3">
          <GraduationCap className="w-6 h-6 text-primary" aria-hidden="true" />
          <h2 id="about-heading" className="text-xl font-bold text-foreground-color">
            TrahAbilidad Capstone & Research Profile
          </h2>
        </div>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
          TrahAbilidad (a portmanteau of the Tagalog word <em>Trabaho</em> for work and the Spanish-derived <em>Habilidad</em> for ability) is a frontend web application prototype developed as a Capstone/Thesis project. It aims to solve accessibility friction points in online employment search engines for People with Disabilities (PWDs) in the Philippines.
        </p>
      </section>

      {/* Content Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Thesis Objectives */}
        <section
          aria-labelledby="objectives-heading"
          className="p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-3"
        >
          <h3 id="objectives-heading" className="text-lg font-bold text-foreground-color flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
            Research Contributions
          </h3>
          <ul className="space-y-2 text-sm font-semibold text-gray-600 dark:text-gray-400 list-disc list-inside leading-relaxed">
            <li>
              <strong>Accommodations Disclosure Framework:</strong> Making interview requirements transparent before application, removing candidate uncertainty.
            </li>
            <li>
              <strong>Accessibility Context Binding:</strong> A unified engine that propagates text scaling, contrast, and font parameters down to native controls globally.
            </li>
            <li>
              <strong>Legibility & Saccadic Support:</strong> Implementing reduced motion loops and legibility typography structures.
            </li>
          </ul>
        </section>

        {/* Technical WCAG Specifications */}
        <section
          aria-labelledby="wcag-heading"
          className="p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-3"
        >
          <h3 id="wcag-heading" className="text-lg font-bold text-foreground-color flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
            WCAG 2.2 AA Compliance Checklist
          </h3>
          <ul className="space-y-2 text-sm font-semibold text-gray-600 dark:text-gray-400 list-disc list-inside leading-relaxed">
            <li>
              <strong>WCAG 1.4.3 Contrast (Minimum):</strong> Satisfying 4.5:1 ratio, and up to 7:1 (AAA) under High Contrast configurations.
            </li>
            <li>
              <strong>WCAG 2.1.1 Keyboard:</strong> Providing outline targets and keyboard handlers for all menus.
            </li>
            <li>
              <strong>WCAG 2.4.3 Focus Order:</strong> Utilizing focus traps inside open dialog cards.
            </li>
            <li>
              <strong>WCAG 2.5.5 Target Size:</strong> Enforcing 48px heights under Large Touch Target selections.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
