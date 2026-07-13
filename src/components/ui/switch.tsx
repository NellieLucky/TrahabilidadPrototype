'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
  name?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onChange, label, id, disabled = false, name }, ref) => {
    const defaultId = useId();
    const switchId = id || defaultId;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!disabled) onChange(!checked);
      }
    };

    return (
      <div className="flex items-center gap-3 py-1">
        <button
          type="button"
          ref={ref}
          id={switchId}
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onClick={() => {
            if (!disabled) onChange(!checked);
          }}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50',
            checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
          )}
        >
          {name && <input type="hidden" name={name} value={checked ? 'true' : 'false'} />}
          <span
            className={cn(
              'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200',
              checked ? 'translate-x-5' : 'translate-x-0',
              // High contrast adjustments for the toggle knob
              checked && 'bg-[#212121]'
            )}
          />
        </button>
        {label && (
          <label
            htmlFor={switchId}
            className="text-base font-medium text-foreground-color cursor-pointer select-none disabled:opacity-50"
            onClick={() => {
              if (!disabled) onChange(!checked);
            }}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
