'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'info' | 'error';
}

export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  const styles = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
    success: 'bg-success-color/10 text-success-color border border-success-color/20',
    outline: 'border border-border-color text-foreground-color',
    info: 'bg-blue-500/10 text-blue-600 border border-blue-500/20',
    error: 'bg-red-500/10 text-red-600 border border-red-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider leading-none',
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
