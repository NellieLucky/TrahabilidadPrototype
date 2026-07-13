'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/components/accessibility/settings-provider';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  const { settings } = useAccessibility();
  const isPulseEnabled = !settings.reduceMotion;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-md bg-gray-200 dark:bg-gray-800 w-full',
        isPulseEnabled && 'animate-pulse',
        className
      )}
      {...props}
    />
  );
}
