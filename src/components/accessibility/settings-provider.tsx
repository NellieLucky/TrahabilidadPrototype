'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type TextSize = 'normal' | 'large' | 'extra-large';

export interface AccessibilitySettings {
  highContrast: boolean;
  reduceMotion: boolean;
  textSize: TextSize;
  readableFont: boolean;
  screenReaderMode: boolean;
  buttonSize: 'normal' | 'large';
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetSettings: () => void;
  // Global Profile states
  profileName: string;
  pwdType: string;
  updateProfile: (name: string, type: string) => void;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  reduceMotion: false,
  textSize: 'normal',
  readableFont: false,
  screenReaderMode: false,
  buttonSize: 'normal',
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [profileName, setProfileName] = useState('Candidate');
  const [pwdType, setPwdType] = useState('none');
  const [mounted, setMounted] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      // 1. Accessibility display configs
      const storedSettings = localStorage.getItem('trahabilidad-accessibility-settings');
      if (storedSettings) {
        setSettings({ ...defaultSettings, ...JSON.parse(storedSettings) });
      }

      // 2. Profile configs
      const storedProfile = localStorage.getItem('trahabilidad-candidate-profile');
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        setProfileName(parsed.name || 'Candidate');
        setPwdType(parsed.pwdType || 'none');
      }
    } catch (e) {
      console.error('Failed to load accessibility settings or profile', e);
    }
    setMounted(true);
  }, []);

  // Apply settings to the document root element
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Apply high contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Apply text size classes
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    if (settings.textSize === 'large') {
      root.classList.add('text-size-large');
    } else if (settings.textSize === 'extra-large') {
      root.classList.add('text-size-xlarge');
    } else {
      root.classList.add('text-size-normal');
    }

    // Apply readable font
    if (settings.readableFont) {
      root.classList.add('readable-font');
    } else {
      root.classList.remove('readable-font');
    }

    // Apply touch target sizing
    if (settings.buttonSize === 'large') {
      root.classList.add('large-touch-targets');
    } else {
      root.classList.remove('large-touch-targets');
    }

    // Save to localStorage
    try {
      localStorage.setItem('trahabilidad-accessibility-settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save accessibility settings', e);
    }
  }, [settings, mounted]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const updateProfile = (name: string, type: string) => {
    setProfileName(name);
    setPwdType(type);

    try {
      const stored = localStorage.getItem('trahabilidad-candidate-profile');
      const parsed = stored ? JSON.parse(stored) : {};
      localStorage.setItem(
        'trahabilidad-candidate-profile',
        JSON.stringify({ ...parsed, name, pwdType: type })
      );
    } catch (e) {
      console.error('Failed to save profile configuration', e);
    }

    // Apply smart accessibility toggles based on classification selection to assist candidate
    if (type === 'visual') {
      setSettings(prev => ({
        ...prev,
        screenReaderMode: true,
        readableFont: false,
      }));
    } else if (type === 'neurodivergent') {
      setSettings(prev => ({
        ...prev,
        readableFont: true,
        reduceMotion: true,
      }));
    } else {
      // Normal display for other categories, allowing them to toggling manually if desired
      setSettings(prev => ({
        ...prev,
        readableFont: false,
        reduceMotion: false,
      }));
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        profileName,
        pwdType,
        updateProfile,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
