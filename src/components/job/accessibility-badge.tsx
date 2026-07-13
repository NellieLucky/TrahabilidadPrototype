'use client';

import React from 'react';
import { Eye, ShieldCheck, Video, Accessibility } from 'lucide-react';
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
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-200',
        srLabel: 'Visual Accommodated: ',
      };
    }
    if (text.includes('interview') || text.includes('remote')) {
      return {
        icon: <Video className="w-3.5 h-3.5" aria-hidden="true" />,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
        srLabel: 'Interview Accommodation: ',
      };
    }
    if (text.includes('wheelchair') || text.includes('physical') || text.includes('step-free')) {
      return {
        icon: <Accessibility className="w-3.5 h-3.5" aria-hidden="true" />,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
        borderColor: 'border-purple-200',
        srLabel: 'Physical Accessibility: ',
      };
    }
    return {
      icon: <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />,
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
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
