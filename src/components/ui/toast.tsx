'use client';

import React, { createContext, useContext, useState, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/components/accessibility/settings-provider';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useAccessibility();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const isMotionEnabled = !settings.reduceMotion;

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Portal Container */}
      <div
        className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full sm:w-auto"
        aria-live="polite"
        role="status"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const iconMap = {
              success: <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />,
              error: <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />,
              info: <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />,
            };

            const stylesMap = {
              success: 'border-l-4 border-green-600 bg-white dark:bg-[#1a1a1a] text-gray-900 shadow-lg',
              error: 'border-l-4 border-red-600 bg-white dark:bg-[#1a1a1a] text-gray-900 shadow-lg',
              info: 'border-l-4 border-blue-600 bg-white dark:bg-[#1a1a1a] text-gray-900 shadow-lg',
            };

            return (
              <motion.div
                key={t.id}
                layout
                initial={isMotionEnabled ? { opacity: 0, y: -20, scale: 0.9 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={isMotionEnabled ? { opacity: 0, y: -20, scale: 0.9 } : { opacity: 0 }}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-lg border border-border-color shadow-md w-full sm:min-w-[320px]',
                  stylesMap[t.type]
                )}
              >
                {iconMap[t.type]}
                <div className="flex-1 text-sm font-medium pr-2 leading-tight">
                  {t.message}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(t.id)}
                  aria-label="Dismiss notification"
                  className="p-1 rounded hover:bg-surface text-gray-400 hover:text-foreground-color transition-colors focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
