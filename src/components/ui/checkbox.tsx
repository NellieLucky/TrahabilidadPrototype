'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    const defaultId = useId();
    const checkboxId = props.id || defaultId;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={checkboxId}
          className="inline-flex items-center gap-3 cursor-pointer select-none group py-1"
        >
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              ref={ref}
              id={checkboxId}
              className={cn(
                'peer sr-only'
              )}
              {...props}
            />
            {/* Custom styled checkbox indicator */}
            <div
              className={cn(
                'w-5 h-5 rounded border border-border-color bg-transparent flex items-center justify-center transition-all peer-focus-visible:ring-4 peer-focus-visible:ring-primary/40 peer-focus-visible:border-primary peer-checked:bg-primary peer-checked:border-primary group-hover:border-gray-400 peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-checked:[&_svg]:scale-100',
                error && 'border-red-500 peer-focus-visible:ring-red-500/20'
              )}
            >
              <svg
                className="w-3.5 h-3.5 text-[#212121] scale-0 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="4"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          {label && (
            <span className="text-base text-foreground-color leading-tight peer-disabled:opacity-50">
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className="text-xs font-medium text-red-600 animate-fadeIn" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
