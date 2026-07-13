'use client';

import React from 'react';
import { Eye, HelpCircle, RefreshCw, Type, Maximize2, ShieldAlert, Sparkles } from 'lucide-react';
import { useAccessibility, TextSize } from '@/components/accessibility/settings-provider';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

export default function SettingsPage() {
  const { settings, updateSetting, resetSettings } = useAccessibility();
  const { toast } = useToast();

  const handleToggle = <K extends keyof typeof settings>(key: K, label: string) => {
    const nextVal = !settings[key];
    // @ts-expect-error type safety on key-value mapping is valid for boolean subset
    updateSetting(key, nextVal);
    toast(`${label} has been ${nextVal ? 'enabled' : 'disabled'}.`, 'success');
  };

  const handleTextSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value as TextSize;
    updateSetting('textSize', size);
    toast(`Text scaling updated to: ${size.toUpperCase()}`, 'info');
  };

  const handleReset = () => {
    resetSettings();
    toast('Accessibility configurations reset to defaults.', 'info');
  };

  const sizeOptions = [
    { value: 'normal', label: 'Normal scale (16px base)' },
    { value: 'large', label: 'Large scale (18px base)' },
    { value: 'extra-large', label: 'Extra Large scale (21px base)' },
  ];

  return (
    <div className="space-y-6">
      {/* Description banner */}
      <section
        aria-label="Settings configuration overview"
        className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-2"
      >
        <p className="text-base text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
          Fine-tune the display parameters to optimize legibility, touch navigation, and screen reader performance. Your selections are applied instantly.
        </p>
      </section>

      {/* Main Settings Panel */}
      <section
        aria-labelledby="display-config-heading"
        className="p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-6 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-between border-b border-border-color pb-3">
          <h3 id="display-config-heading" className="text-lg font-bold text-foreground-color flex items-center gap-2">
            <Eye className="w-5.5 h-5.5 text-primary" aria-hidden="true" />
            Display and Sizing Parameters
          </h3>
          <Button variant="outline" size="sm" onClick={handleReset} className="flex items-center gap-1 text-xs h-9">
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            Reset Defaults
          </Button>
        </div>

        {/* 1. High Contrast */}
        <div className="flex items-center justify-between gap-4 py-2 border-b border-border-color/50">
          <div className="space-y-1">
            <span className="text-base font-bold text-foreground-color block">High Contrast Mode</span>
            <span className="text-sm text-gray-500 block leading-normal">
              Applies pure black background, yellow/cyan highlights, and white borders to satisfy WCAG AAA compliance.
            </span>
          </div>
          <Switch
            checked={settings.highContrast}
            onChange={() => handleToggle('highContrast', 'High Contrast mode')}
          />
        </div>

        {/* 2. Text Sizing */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-border-color/50">
          <div className="space-y-1">
            <span className="text-base font-bold text-foreground-color block">Typography Scaling</span>
            <span className="text-sm text-gray-500 block leading-normal">
              Increases the base HTML root font size which dynamically enlarges all text fields in the application.
            </span>
          </div>
          <div className="w-full sm:w-48 shrink-0">
            <Select
              options={sizeOptions}
              value={settings.textSize}
              onChange={handleTextSizeChange}
              aria-label="Typography scaling dropdown"
            />
          </div>
        </div>

        {/* 3. Legible Font */}
        <div className="flex items-center justify-between gap-4 py-2 border-b border-border-color/50">
          <div className="space-y-1">
            <span className="text-base font-bold text-foreground-color block">High Legibility Font</span>
            <span className="text-sm text-gray-500 block leading-normal">
              Replaces the default geometric font with highly legible sans font shapes.
            </span>
          </div>
          <Switch
            checked={settings.readableFont}
            onChange={() => handleToggle('readableFont', 'High Legibility Font')}
          />
        </div>

        {/* 4. Reduced Motion */}
        <div className="flex items-center justify-between gap-4 py-2 border-b border-border-color/50">
          <div className="space-y-1">
            <span className="text-base font-bold text-foreground-color block">Reduced Motion</span>
            <span className="text-sm text-gray-500 block leading-normal">
              Bypasses page loading animations, sliding transitions, and hover scaling for users with vestibular needs.
            </span>
          </div>
          <Switch
            checked={settings.reduceMotion}
            onChange={() => handleToggle('reduceMotion', 'Reduced Motion')}
          />
        </div>

        {/* 5. Button Sizes */}
        <div className="flex items-center justify-between gap-4 py-2 border-b border-border-color/50">
          <div className="space-y-1">
            <span className="text-base font-bold text-foreground-color block">Touch Target Sizing</span>
            <span className="text-sm text-gray-500 block leading-normal">
              Expands all interactive buttons and inputs to a minimum height of 48px to improve click accuracy.
            </span>
          </div>
          <Switch
            checked={settings.buttonSize === 'large'}
            onChange={() =>
              updateSetting('buttonSize', settings.buttonSize === 'large' ? 'normal' : 'large')
            }
            label={settings.buttonSize === 'large' ? 'Active' : ''}
          />
        </div>

        {/* 6. Screen Reader Optimizations */}
        <div className="flex items-center justify-between gap-4 py-2">
          <div className="space-y-1">
            <span className="text-base font-bold text-foreground-color block">Screen Reader Mode</span>
            <span className="text-sm text-gray-500 block leading-normal">
              Appends detailed descriptions, skip links, and ARIA labels optimized for NVDA and TalkBack readers.
            </span>
          </div>
          <Switch
            checked={settings.screenReaderMode}
            onChange={() => handleToggle('screenReaderMode', 'Screen Reader Mode')}
          />
        </div>
      </section>
    </div>
  );
}
