'use client';

import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, helperText, ...props }, ref) => {
    const defaultId = useId();
    const selectId = props.id || defaultId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-semibold text-foreground-color tracking-wide"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={!!error}
            aria-describedby={
              cn(
                error && errorId,
                helperText && helperId
              ) || undefined
            }
            className={cn(
              'flex w-full rounded-md border border-border-color bg-transparent px-3 py-2 text-base transition-colors hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 h-10 appearance-none pr-10 cursor-pointer text-foreground-color',
              error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-background-color text-foreground-color"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
        {error && (
          <p id={errorId} className="text-xs font-medium text-red-600 animate-fadeIn" role="alert">
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

Select.displayName = 'Select';
