'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, ...props }, ref) => {
    const defaultId = useId();
    const inputId = props.id || defaultId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-foreground-color tracking-wide"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              cn(
                error && errorId,
                helperText && helperId
              ) || undefined
            }
            className={cn(
              'flex w-full rounded-md border border-border-color bg-transparent px-3 py-2 text-base transition-colors placeholder:text-gray-500 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 h-10',
              error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p
            id={errorId}
            className="text-xs font-medium text-red-600 flex items-center gap-1 animate-fadeIn"
            role="alert"
          >
            <span className="sr-only">Error: </span>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-xs text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
