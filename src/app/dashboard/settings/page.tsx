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
    <div className="space-y-4 md:space-y-6">
      {/* Description banner */}
      <section
        aria-label="Settings configuration overview"
        className="p-4 md:p-5 rounded-2xl border border-border-color bg-background-color shadow-sm"
      >
        <p className="text-sm md:text-base text-gray-700 font-semibold leading-relaxed">
          Fine-tune the display parameters to optimize legibility, touch navigation, and screen reader performance. Your selections are applied instantly.
        </p>
      </section>

      {/* Main Settings Panel */}
      <section
        aria-labelledby="display-config-heading"
        className="p-4 md:p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-4 md:space-y-5 max-w-2xl mx-auto"
      >
        {/* Header row — stacks on mobile, inline on sm+ */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between border-b border-border-color pb-3">
          <h3 id="display-config-heading" className="text-sm md:text-lg font-bold text-foreground-color flex items-center gap-2">
            <Eye className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" aria-hidden="true" />
            Display and Sizing Parameters
          </h3>
          <Button variant="outline" size="sm" onClick={handleReset} className="flex items-center gap-1 text-xs h-8 md:h-9 self-start sm:self-auto shrink-0">
            <RefreshCw className="w-3 h-3 md:w-3.5 md:h-3.5" aria-hidden="true" />
            Reset Defaults
          </Button>
        </div>

        {/* 1. High Contrast */}
        <div className="flex items-start justify-between gap-3 py-1.5 border-b border-border-color/50">
          <div className="space-y-0.5 min-w-0">
            <span className="text-sm md:text-base font-bold text-foreground-color block">High Contrast Mode</span>
            <span className="text-xs md:text-sm text-gray-500 block leading-normal">
              Applies pure black background, yellow/cyan highlights, and white borders to satisfy WCAG AAA compliance.
            </span>
          </div>
          <div className="shrink-0 pt-0.5">
            <Switch
              checked={settings.highContrast}
              onChange={() => handleToggle('highContrast', 'High Contrast mode')}
            />
          </div>
        </div>

        {/* 2. Text Sizing */}
        <div className="flex flex-col gap-2 py-1.5 border-b border-border-color/50">
          <div className="space-y-0.5">
            <span className="text-sm md:text-base font-bold text-foreground-color block">Typography Scaling</span>
            <span className="text-xs md:text-sm text-gray-500 block leading-normal">
              Increases the base HTML root font size which dynamically enlarges all text fields in the application.
            </span>
          </div>
          <div className="w-full sm:w-64">
            <Select
              options={sizeOptions}
              value={settings.textSize}
              onChange={handleTextSizeChange}
              aria-label="Typography scaling dropdown"
            />
          </div>
        </div>

        {/* 3. Legible Font */}
        <div className="flex items-start justify-between gap-3 py-1.5 border-b border-border-color/50">
          <div className="space-y-0.5 min-w-0">
            <span className="text-sm md:text-base font-bold text-foreground-color block">High Legibility Font</span>
            <span className="text-xs md:text-sm text-gray-500 block leading-normal">
              Replaces the default geometric font with highly legible sans font shapes.
            </span>
          </div>
          <div className="shrink-0 pt-0.5">
            <Switch
              checked={settings.readableFont}
              onChange={() => handleToggle('readableFont', 'High Legibility Font')}
            />
          </div>
        </div>

        {/* 4. Reduced Motion */}
        <div className="flex items-start justify-between gap-3 py-1.5 border-b border-border-color/50">
          <div className="space-y-0.5 min-w-0">
            <span className="text-sm md:text-base font-bold text-foreground-color block">Reduced Motion</span>
            <span className="text-xs md:text-sm text-gray-500 block leading-normal">
              Bypasses page loading animations, sliding transitions, and hover scaling for users with vestibular needs.
            </span>
          </div>
          <div className="shrink-0 pt-0.5">
            <Switch
              checked={settings.reduceMotion}
              onChange={() => handleToggle('reduceMotion', 'Reduced Motion')}
            />
          </div>
        </div>

        {/* 5. Button Sizes */}
        <div className="flex items-start justify-between gap-3 py-1.5 border-b border-border-color/50">
          <div className="space-y-0.5 min-w-0">
            <span className="text-sm md:text-base font-bold text-foreground-color block">Touch Target Sizing</span>
            <span className="text-xs md:text-sm text-gray-500 block leading-normal">
              Expands all interactive buttons and inputs to a minimum height of 48px to improve click accuracy.
            </span>
          </div>
          <div className="shrink-0 pt-0.5">
            <Switch
              checked={settings.buttonSize === 'large'}
              onChange={() =>
                updateSetting('buttonSize', settings.buttonSize === 'large' ? 'normal' : 'large')
              }
              label={settings.buttonSize === 'large' ? 'Active' : ''}
            />
          </div>
        </div>

        {/* 6. Screen Reader Optimizations */}
        <div className="flex items-start justify-between gap-3 py-1.5">
          <div className="space-y-0.5 min-w-0">
            <span className="text-sm md:text-base font-bold text-foreground-color block">Screen Reader Mode</span>
            <span className="text-xs md:text-sm text-gray-500 block leading-normal">
              Appends detailed descriptions, skip links, and ARIA labels optimized for NVDA and TalkBack readers.
            </span>
          </div>
          <div className="shrink-0 pt-0.5">
            <Switch
              checked={settings.screenReaderMode}
              onChange={() => handleToggle('screenReaderMode', 'Screen Reader Mode')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
