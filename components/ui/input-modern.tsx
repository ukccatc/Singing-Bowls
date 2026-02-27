'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface InputModernProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  floatingLabel?: boolean;
  helperText?: string;
}

export const InputModern = React.forwardRef<HTMLInputElement, InputModernProps>(
  (
    {
      label,
      error,
      success,
      icon,
      iconPosition = 'left',
      floatingLabel = false,
      helperText,
      className,
      value,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className="w-full">
        {/* Non-floating label */}
        {label && !floatingLabel && (
          <label className="block text-sm font-medium text-charcoal-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 pointer-events-none">
              {icon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={cn(
              // Base styles
              'w-full px-4 py-2.5 rounded-lg transition-all duration-200',
              'bg-white border-2 placeholder-charcoal-400',
              'focus:outline-none',
              
              // Icon padding
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              
              // Border and ring colors
              error
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                : success
                ? 'border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-100'
                : 'border-cream-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-100',
              
              // Floating label padding
              floatingLabel && 'pt-6 pb-2',
              
              className
            )}
            {...props}
          />

          {/* Floating label */}
          {floatingLabel && label && (
            <label
              className={cn(
                'absolute left-4 transition-all duration-200 pointer-events-none',
                isFocused || hasValue
                  ? 'top-1.5 text-xs font-medium text-gold-600'
                  : 'top-1/2 -translate-y-1/2 text-charcoal-500'
              )}
            >
              {label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {/* Right icon */}
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 pointer-events-none">
              {icon}
            </div>
          )}

          {/* Success checkmark */}
          {success && !icon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-charcoal-500">{helperText}</p>
        )}
      </div>
    );
  }
);

InputModern.displayName = 'InputModern';
