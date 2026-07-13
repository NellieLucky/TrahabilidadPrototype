'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, PhoneCall, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Accommodations' | 'Technical' | 'Rights';
}

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: 'Accommodations',
      question: 'How do I request a Sign Language Interpreter for my interview?',
      answer: 'When applying for a job, you will see a checklist of pre-defined recruitment accommodations. Check the "Sign Language Interpreter Offered" option, and the hiring team will automatically receive this notification. You can also specify custom adjustments under the notes field.',
    },
    {
      category: 'Technical',
      question: 'What screen readers are optimized for the TrahAbilidad portal?',
      answer: 'TrahAbilidad is fully built using WCAG 2.2 semantic guidelines. It is regularly tested and optimized for NVDA (Windows), JAWS (Windows), TalkBack (Android), and VoiceOver (iOS/macOS). For the best experience, we recommend using Google Chrome or Mozilla Firefox.',
    },
    {
      category: 'Rights',
      question: 'Will employers see my medical records or PWD ID details?',
      answer: 'No. TrahAbilidad respects candidate privacy and the Data Privacy Act of 2012. Employers only see the adjustments you request for the recruitment process itself (such as closed captions, wheelchair access, or written tests) and your professional resume. No medical diagnoses are shared.',
    },
    {
      category: 'Accommodations',
      question: 'Can I change my requested accommodations after submitting an application?',
      answer: 'Yes. You can contact the hiring team directly via the contact details provided in your notifications panel, or request adjustments during the screening call.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      {/* Help header banner */}
      <section
        aria-label="FAQ Help tools"
        className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-4"
      >
        <p className="text-base text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
          Need support? Search our guidelines regarding candidate rights, screen reader configs, and interview accommodation tools.
        </p>

        {/* FAQ Search bar */}
        <div className="max-w-md">
          <Input
            placeholder="Search FAQ keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10"
            aria-label="Search FAQs"
          />
        </div>
      </section>

      {/* Accordions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Accordions left 2 columns */}
        <section aria-labelledby="faq-heading" className="lg:col-span-2 space-y-3">
          <h3 id="faq-heading" className="text-lg font-bold text-foreground-color">
            Frequently Asked Questions
          </h3>

          <div className="space-y-2.5">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isExpanded = expandedIndex === idx;
                return (
                  <article
                    key={faq.question}
                    className="rounded-xl border border-border-color bg-background-color overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleExpand(idx)}
                      aria-expanded={isExpanded}
                      className="w-full flex justify-between items-center p-4 text-left font-bold text-base text-foreground-color hover:bg-surface focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-surface dark:bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-border-color shrink-0">
                          {faq.category}
                        </span>
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0',
                          isExpanded && 'transform rotate-180'
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {isExpanded && (
                      <div className="p-4 border-t border-border-color/50 text-sm font-semibold text-gray-600 dark:text-gray-400 leading-relaxed bg-surface/50">
                        {faq.answer}
                      </div>
                    )}
                  </article>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 italic">No FAQs match your search query.</p>
            )}
          </div>
        </section>

        {/* Right side contact information cards */}
        <aside aria-label="Support contacts" className="space-y-4">
          <div className="p-5 rounded-xl border border-border-color bg-background-color space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400">
              Direct Assistance
            </h3>

            <div className="space-y-3.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <div className="flex gap-3">
                <MessageSquare className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-foreground-color">Chat Support</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Available Mon-Fri, 9AM-5PM</p>
                  <a href="#" className="text-xs font-bold text-primary hover:underline block mt-1">
                    Start live chat &rarr;
                  </a>
                </div>
              </div>

              <div className="flex gap-3 border-t border-border-color/50 pt-3">
                <PhoneCall className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-foreground-color">Hotline Assistance</h4>
                  <p className="text-xs text-gray-500 mt-0.5">National PWD Support desk</p>
                  <p className="text-xs text-foreground-color font-bold mt-1">+63 (2) 8123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
