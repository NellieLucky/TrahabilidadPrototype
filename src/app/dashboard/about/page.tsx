'use client';

import React from 'react';
import { Info, ShieldCheck, Accessibility, BookOpen, GraduationCap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Introduction Card */}
      <section
        aria-labelledby="about-heading"
        className="p-4 md:p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-3 md:space-y-4"
      >
        <div className="flex items-start gap-2 border-b border-border-color pb-3">
          <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <h2 id="about-heading" className="text-base md:text-xl font-bold text-foreground-color leading-snug">
            TrahAbilidad Capstone & Research Profile
          </h2>
        </div>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed font-semibold text-pretty">
          TrahAbilidad (a portmanteau of the Tagalog word <em>Trabaho</em> for work and the Spanish-derived <em>Habilidad</em> for ability) is a frontend web application prototype developed as a Capstone/Thesis project. It aims to solve accessibility friction points in online employment search engines for People with Disabilities (PWDs) in the Philippines.
        </p>
      </section>

      {/* Content Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Thesis Objectives */}
        <section
          aria-labelledby="objectives-heading"
          className="p-4 md:p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-3"
        >
          <h3 id="objectives-heading" className="text-sm md:text-lg font-bold text-foreground-color flex items-center gap-2">
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" aria-hidden="true" />
            Research Contributions
          </h3>
          <ul className="space-y-2 text-xs md:text-sm font-semibold text-gray-700 list-disc list-outside ml-4 leading-relaxed">
            <li className="text-pretty">
              <strong>Accommodations Disclosure Framework:</strong> Making interview requirements transparent before application, removing candidate uncertainty.
            </li>
            <li className="text-pretty">
              <strong>Accessibility Context Binding:</strong> A unified engine that propagates text scaling, contrast, and font parameters down to native controls globally.
            </li>
            <li className="text-pretty">
              <strong>Legibility &amp; Saccadic Support:</strong> Implementing reduced motion loops and legibility typography structures.
            </li>
          </ul>
        </section>

        {/* Technical WCAG Specifications */}
        <section
          aria-labelledby="wcag-heading"
          className="p-4 md:p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-3"
        >
          <h3 id="wcag-heading" className="text-sm md:text-lg font-bold text-foreground-color flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" aria-hidden="true" />
            WCAG 2.2 AA Compliance Checklist
          </h3>
          <ul className="space-y-2 text-xs md:text-sm font-semibold text-gray-700 list-disc list-outside ml-4 leading-relaxed">
            <li className="text-pretty">
              <strong>WCAG 1.4.3 Contrast (Minimum):</strong> Satisfying 4.5:1 ratio, and up to 7:1 (AAA) under High Contrast configurations.
            </li>
            <li className="text-pretty">
              <strong>WCAG 2.1.1 Keyboard:</strong> Providing outline targets and keyboard handlers for all menus.
            </li>
            <li className="text-pretty">
              <strong>WCAG 2.4.3 Focus Order:</strong> Utilizing focus traps inside open dialog cards.
            </li>
            <li className="text-pretty">
              <strong>WCAG 2.5.5 Target Size:</strong> Enforcing 48px heights under Large Touch Target selections.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
