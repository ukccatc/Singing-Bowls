'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface CardModernProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gold' | 'bronze' | 'copper' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  default: 'bg-white border border-cream-200 hover:border-gold-300',
  gold: 'bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200',
  bronze: 'bg-gradient-to-br from-bronze-50 to-bronze-100 border border-bronze-200',
  copper: 'bg-gradient-to-br from-copper-50 to-copper-100 border border-copper-200',
  glass: 'bg-white/30 backdrop-blur-md border border-white/20',
};

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
};

export const CardModern = React.forwardRef<HTMLDivElement, CardModernProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-xl shadow-md transition-all duration-300',
          
          // Variant styles
          variantStyles[variant],
          
          // Padding styles
          paddingStyles[padding],
          
          // Hoverable
          hoverable && 'hover:shadow-lg hover:scale-102 hover:-translate-y-1 cursor-pointer',
          
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardModern.displayName = 'CardModern';
