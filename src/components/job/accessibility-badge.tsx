'use client';

import React from 'react';
import { Eye, ShieldCheck, Video, Calendar, Accessibility } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccessibilityBadgeProps {
  label: string;
}

export function AccessibilityBadge({ label }: AccessibilityBadgeProps) {
  // Map label keywords to icons and colors
  const getConfig = () => {
    const text = label.toLowerCase();
    
    if (text.includes('reader') || text.includes('screen') || text.includes('blind') || text.includes('visual')) {
      return {
        icon: <Eye className="w-3.5 h-3.5" aria-hidden="true" />,
        bgColor: 'bg-green-100 dark:bg-green-950/40',
        textColor: 'text-green-700 dark:text-green-400',
        borderColor: 'border-green-200 dark:border-green-900/50',
        srLabel: 'Visual Accommodated: ',
      };
    }
    if (text.includes('interview') || text.includes('remote')) {
      return {
        icon: <Video className="w-3.5 h-3.5" aria-hidden="true" />,
        bgColor: 'bg-blue-100 dark:bg-blue-950/40',
        textColor: 'text-blue-700 dark:text-blue-400',
        borderColor: 'border-blue-200 dark:border-blue-900/50',
        srLabel: 'Interview Accommodation: ',
      };
    }
    if (text.includes('wheelchair') || text.includes('physical') || text.includes('step-free')) {
      return {
        icon: <Accessibility className="w-3.5 h-3.5" aria-hidden="true" />,
        bgColor: 'bg-purple-100 dark:bg-purple-950/40',
        textColor: 'text-purple-700 dark:text-purple-400',
        borderColor: 'border-purple-200 dark:border-purple-900/50',
        srLabel: 'Physical Accessibility: ',
      };
    }
    return {
      icon: <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />,
      bgColor: 'bg-amber-100 dark:bg-amber-950/40',
      textColor: 'text-amber-700 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-900/50',
      srLabel: 'Accessibility Support: ',
    };
  };

  const { icon, bgColor, textColor, borderColor, srLabel } = getConfig();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors select-none',
        bgColor,
        textColor,
        borderColor
      )}
    >
      <span className="sr-only">{srLabel}</span>
      {icon}
      <span>{label}</span>
    </span>
  );
}
