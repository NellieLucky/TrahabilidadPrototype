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
import { useAccessibility } from '@/components/accessibility/settings-provider';

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
  const { sidebarCollapsed } = useAccessibility();

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
              title={sidebarCollapsed ? item.name : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm font-bold transition-all hover:bg-surface text-gray-700 hover:text-foreground-color focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none',
                isActive && 'bg-primary text-[#212121] hover:bg-primary/90 hover:text-[#212121]',
                sidebarCollapsed && 'justify-center px-0'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav
      aria-label="Sidebar navigation"
      className={cn(
        "hidden md:flex flex-col border-r border-border-color bg-background-color p-4 h-screen sticky top-0 transition-all duration-200 overflow-hidden",
        sidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Logo */}
      <div className={cn("flex items-center gap-2 px-3 py-3 mb-3", sidebarCollapsed && "justify-center px-0")}>
        <div className="w-8 h-8 rounded-lg bg-primary brand-logo-bg flex items-center justify-center text-[#212121] font-bold shrink-0">
          <Accessibility className="w-5 h-5" />
        </div>
        {!sidebarCollapsed && (
          <span className="text-xl font-extrabold tracking-tight text-foreground-color" aria-label="Trahabilidad">
            <span aria-hidden="true">
              Trah<span className="text-primary brand-text-highlight">Abilidad</span>
            </span>
          </span>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-hidden space-y-4">
        <div>
          {!sidebarCollapsed && <span className="px-3 text-xs font-bold text-gray-400 tracking-wider uppercase">Menu</span>}
          <div className="mt-1">{renderNavList(mainNavItems)}</div>
        </div>
        <div>
          {!sidebarCollapsed && <span className="px-3 text-xs font-bold text-gray-400 tracking-wider uppercase">System</span>}
          <div className="mt-1">{renderNavList(secondaryNavItems)}</div>
        </div>
      </div>

      {/* Footer / Logout */}
      <div className={cn("border-t border-border-color pt-3 mt-auto", sidebarCollapsed && "flex justify-center")}>
        <Link
          href="/"
          title={sidebarCollapsed ? "Logout" : undefined}
          className={cn(
            "flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 transition-all focus-visible:ring-4 focus-visible:ring-red-200 focus-visible:outline-none",
            sidebarCollapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!sidebarCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </nav>
  );
}
