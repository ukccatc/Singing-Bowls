'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface ButtonModernProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-md hover:shadow-lg',
  secondary: 'bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-white shadow-md hover:shadow-lg',
  accent: 'bg-gradient-to-r from-copper-500 to-copper-600 hover:from-copper-600 hover:to-copper-700 text-white shadow-md hover:shadow-lg',
  outline: 'border-2 border-gold-500 text-gold-700 hover:bg-gold-50',
  ghost: 'text-charcoal-700 hover:bg-charcoal-100',
  link: 'text-gold-600 hover:text-gold-700 underline',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

export const ButtonModern = React.forwardRef<HTMLButtonElement, ButtonModernProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 ease-smooth',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500',
          'active:scale-98 hover:-translate-y-0.5',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
          
          // Variant styles
          variantStyles[variant],
          
          // Size styles
          sizeStyles[size],
          
          // Full width
          fullWidth && 'w-full',
          
          // Custom className
          className
        )}
        {...props}
      >
        {/* Icon left */}
        {icon && iconPosition === 'left' && !loading && (
          <span className="flex items-center justify-center">{icon}</span>
        )}

        {/* Loading spinner */}
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}

        {/* Text */}
        <span>{children}</span>

        {/* Icon right */}
        {icon && iconPosition === 'right' && !loading && (
          <span className="flex items-center justify-center">{icon}</span>
        )}
      </button>
    );
  }
);

ButtonModern.displayName = 'ButtonModern';
