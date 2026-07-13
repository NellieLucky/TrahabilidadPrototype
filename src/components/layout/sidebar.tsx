'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Search,
  Bookmark,
  Briefcase,
  Bell,
  User,
  Settings,
  HelpCircle,
  Info,
  LogOut,
  Accessibility
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Search Jobs', href: '/dashboard/search', icon: Search },
  { name: 'Applications', href: '/dashboard/applications', icon: Briefcase },
  { name: 'Saved Jobs', href: '/dashboard/saved', icon: Bookmark },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Profile & Resume', href: '/dashboard/profile', icon: User },
];

const secondaryNavItems: NavItem[] = [
  { name: 'Accessibility Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Help Center', href: '/dashboard/help', icon: HelpCircle },
  { name: 'About Project', href: '/dashboard/about', icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();

  const renderNavList = (items: NavItem[]) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <li key={item.name}>
            <Link
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold transition-all hover:bg-surface text-gray-700 hover:text-foreground-color focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none',
                isActive && 'bg-primary text-[#212121] hover:bg-primary/90 hover:text-[#212121]'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav
      aria-label="Sidebar navigation"
      className="hidden md:flex flex-col w-64 border-r border-border-color bg-background-color p-4 h-screen sticky top-0"
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2 px-3 py-4 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-[#212121] font-bold">
          <Accessibility className="w-5 h-5" />
        </div>
        <span className="text-xl font-extrabold tracking-tight text-foreground-color">
          Trah<span className="text-primary">Abilidad</span>
        </span>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto space-y-6">
        <div>
          <span className="px-3 text-xs font-bold text-gray-400 tracking-wider uppercase">Menu</span>
          <div className="mt-2">{renderNavList(mainNavItems)}</div>
        </div>
        <div>
          <span className="px-3 text-xs font-bold text-gray-400 tracking-wider uppercase">System</span>
          <div className="mt-2">{renderNavList(secondaryNavItems)}</div>
        </div>
      </div>

      {/* Footer / Logout */}
      <div className="border-t border-border-color pt-4 mt-auto">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 transition-all focus-visible:ring-4 focus-visible:ring-red-200 focus-visible:outline-none"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
