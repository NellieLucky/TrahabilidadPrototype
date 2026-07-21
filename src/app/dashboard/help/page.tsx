'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, PhoneCall, Send, X, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Accommodations' | 'Technical' | 'Rights';
}

interface ChatMessage {
  id: number;
  from: 'user' | 'support';
  text: string;
  time: string;
}

const SUPPORT_RESPONSES = [
  "Hi there! I'm a TrahAbilidad support agent. How can I assist you today?",
  "Thank you for reaching out. Could you provide more details so I can help you better?",
  "I understand. Let me check that for you right away.",
  "That's a great question! Our accessibility team handles all accommodation requests directly with the employer. You'll receive a confirmation in your notifications once submitted.",
  "Is there anything else I can help you with today?",
  "Please feel free to ask any other questions. We're here to make sure your job search experience is fully accessible.",
];

function getTimestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      from: 'support',
      text: "Hello! Welcome to TrahAbilidad Support. How can I help you today?",
      time: getTimestamp(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isChatOpen]);

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

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      from: 'user',
      text,
      time: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate support agent typing then responding
    setTimeout(() => {
      const reply = SUPPORT_RESPONSES[responseIndex % SUPPORT_RESPONSES.length];
      const supportMsg: ChatMessage = {
        id: Date.now() + 1,
        from: 'support',
        text: reply,
        time: getTimestamp(),
      };
      setMessages((prev) => [...prev, supportMsg]);
      setIsTyping(false);
      setResponseIndex((i) => i + 1);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="space-y-6">
      {/* Help header banner */}
      <section
        aria-label="FAQ Help tools"
        className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-4"
      >
        <p className="text-base text-gray-700 font-semibold leading-relaxed">
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
                      <div className="p-4 border-t border-border-color/50 text-sm font-semibold text-gray-600 leading-relaxed bg-surface/50">
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

            <div className="space-y-3.5 text-sm font-semibold text-gray-700">
              <div className="flex gap-3">
                <MessageSquare className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-foreground-color">Chat Support</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Available Mon-Fri, 9AM-5PM</p>
                  <button
                    type="button"
                    onClick={() => setIsChatOpen(true)}
                    className="text-xs font-bold text-primary hover:underline block mt-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                  >
                    Start live chat →
                  </button>
                </div>
              </div>

              <div className="flex gap-3 border-t border-border-color/50 pt-3">
                <PhoneCall className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-foreground-color">Hotline Assistance</h4>
                  <p className="text-xs text-gray-500 mt-0.5">National PWD Support desk</p>
                  <a
                    href="tel:+6328123456"
                    className="text-xs text-foreground-color font-bold mt-1 block hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                  >
                    +63 (2) 8123-4567
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Live Chat Panel ── */}
      {isChatOpen && (
        <>
          {/* Mobile: dark backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 sm:hidden"
            onClick={() => setIsChatOpen(false)}
            aria-hidden="true"
          />

          {/* Chat panel: full-screen on mobile, floating widget on desktop */}
          <div
            className={cn(
              'fixed z-50 flex flex-col bg-background-color border border-border-color shadow-2xl overflow-hidden animate-scaleUp',
              // Mobile: full screen, leave room for bottom nav
              'inset-x-0 bottom-0 top-0 rounded-none',
              // Desktop: bottom-right floating widget
              'sm:inset-auto sm:bottom-4 sm:right-4 sm:top-auto sm:w-96 sm:h-[520px] sm:rounded-2xl'
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Live chat support"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#212121] flex items-center justify-center text-primary font-black text-xs">
                  TA
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#212121]">TrahAbilidad Support</p>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-[#212121]/70">
                    <Circle className="w-1.5 h-1.5 fill-green-600 text-green-600" aria-hidden="true" />
                    Online
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close live chat"
                className="p-1.5 rounded-lg hover:bg-[#212121]/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#212121]/30"
              >
                <X className="w-4 h-4 text-[#212121]" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-surface/30"
              aria-label="Chat messages"
              role="log"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex flex-col max-w-[80%] gap-1',
                    msg.from === 'user' ? 'self-end items-end ml-auto' : 'self-start items-start'
                  )}
                >
                  <div
                    className={cn(
                      'px-3 py-2 rounded-2xl text-sm font-semibold leading-snug',
                      msg.from === 'user'
                        ? 'bg-primary text-[#212121] rounded-br-sm'
                        : 'bg-background-color border border-border-color text-foreground-color rounded-bl-sm'
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold">{msg.time}</span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl rounded-bl-sm bg-background-color border border-border-color w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input — extra bottom padding on mobile for the bottom nav */}
            <div className="flex items-center gap-2 px-3 py-3 pb-safe border-t border-border-color bg-background-color shrink-0 sm:pb-3">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                aria-label="Type your message"
                className="flex-1 text-sm font-semibold bg-surface border border-border-color rounded-xl px-3 py-2.5 text-foreground-color placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!inputText.trim()}
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-primary text-[#212121] hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


