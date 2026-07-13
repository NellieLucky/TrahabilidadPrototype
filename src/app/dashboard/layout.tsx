'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background-color text-foreground-color">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main App Window */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-screen">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6 focus:outline-none">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <BottomNav />
      </div>
    </div>
  );
}
