'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, FileText, Bookmark, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Search', href: '/dashboard/search', icon: Search },
    { name: 'Applications', href: '/dashboard/applications', icon: FileText },
    { name: 'Saved', href: '/dashboard/saved', icon: Bookmark },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-border-color bg-background-color/90 backdrop-blur-md z-45 flex items-center justify-around px-2 shadow-lg"
    >
      {navItems.map((item) => {
        const isActive =
          item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full py-1 text-gray-500 hover:text-foreground-color transition-colors focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:outline-none rounded-lg',
              isActive && 'text-primary'
            )}
          >
            <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="text-[10px] font-bold mt-1 tracking-wide">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
