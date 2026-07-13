'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/components/accessibility/settings-provider';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', fullWidth = false, ...props }, ref) => {
    const { settings } = useAccessibility();
    const isMotionEnabled = !settings.reduceMotion;
    const isLargeTouch = settings.buttonSize === 'large';

    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary: 'bg-primary text-[#212121] hover:bg-primary-hover active:bg-primary/95 shadow-sm',
      secondary: 'bg-secondary text-[#212121] hover:bg-secondary/90 active:bg-secondary/85 shadow-sm',
      outline: 'border-2 border-border-color bg-transparent hover:bg-surface text-foreground-color focus:border-primary',
      ghost: 'bg-transparent hover:bg-surface text-foreground-color',
      danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm focus-visible:ring-red-500/50',
    };

    const sizes = {
      sm: isLargeTouch ? 'h-12 px-4 text-sm' : 'h-9 px-3 text-sm',
      md: isLargeTouch ? 'h-12 px-6 text-base' : 'h-10 px-5 text-base',
      lg: isLargeTouch ? 'h-14 px-8 text-lg' : 'h-12 px-7 text-lg',
    };

    const MotionComponent = isMotionEnabled ? motion.button : 'button';
    const animationProps = isMotionEnabled
      ? {
          whileHover: { scale: 1.015 },
          whileTap: { scale: 0.985 },
          transition: { type: 'spring', stiffness: 400, damping: 15 },
        }
      : {};

    return (
      // @ts-expect-error motion components can have types mismatch but behaves correctly
      <MotionComponent
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...animationProps}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

Button.displayName = 'Button';
