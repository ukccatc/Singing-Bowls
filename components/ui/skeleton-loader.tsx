'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'product';
  width?: string | number;
  height?: string | number;
  count?: number;
  animation?: 'pulse' | 'shimmer' | 'wave';
  className?: string;
}

const getWidthClass = (width?: string | number) => {
  if (!width) return 'w-full';
  if (typeof width === 'number') return `w-[${width}px]`;
  return width;
};

const getHeightClass = (height?: string | number) => {
  if (!height) return 'h-4';
  if (typeof height === 'number') return `h-[${height}px]`;
  return height;
};

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
  animation = 'shimmer',
  className,
}) => {
  const animationClass = {
    pulse: 'animate-pulse',
    shimmer: 'animate-shimmer',
    wave: 'animate-pulse-slow',
  }[animation];

  const renderSkeleton = () => {
    switch (variant) {
      case 'circular':
        return (
          <div
            className={cn(
              'rounded-full bg-cream-200',
              animationClass,
              getWidthClass(width || 48),
              getHeightClass(height || 48),
              className
            )}
          />
        );

      case 'rectangular':
        return (
          <div
            className={cn(
              'rounded-lg bg-cream-200',
              animationClass,
              getWidthClass(width),
              getHeightClass(height),
              className
            )}
          />
        );

      case 'card':
        return (
          <div className={cn('rounded-xl bg-white border border-cream-200 p-6', className)}>
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className={cn('rounded-full bg-cream-200', animationClass, 'w-12 h-12')}
              />
              <div className="flex-1 space-y-2">
                <div
                  className={cn('h-4 bg-cream-200 rounded', animationClass, 'w-3/4')}
                />
                <div
                  className={cn('h-3 bg-cream-200 rounded', animationClass, 'w-1/2')}
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div
                className={cn('h-4 bg-cream-200 rounded', animationClass, 'w-full')}
              />
              <div
                className={cn('h-4 bg-cream-200 rounded', animationClass, 'w-5/6')}
              />
              <div
                className={cn('h-4 bg-cream-200 rounded', animationClass, 'w-4/6')}
              />
            </div>

            {/* Footer */}
            <div className="flex gap-2 mt-6">
              <div
                className={cn('h-10 bg-cream-200 rounded-lg', animationClass, 'flex-1')}
              />
              <div
                className={cn('h-10 bg-cream-200 rounded-lg', animationClass, 'flex-1')}
              />
            </div>
          </div>
        );

      case 'product':
        return (
          <div className={cn('rounded-xl bg-white border border-cream-200 overflow-hidden', className)}>
            {/* Image */}
            <div
              className={cn('w-full h-64 bg-cream-200', animationClass)}
            />

            {/* Content */}
            <div className="p-4 space-y-3">
              <div
                className={cn('h-4 bg-cream-200 rounded', animationClass, 'w-3/4')}
              />
              <div
                className={cn('h-3 bg-cream-200 rounded', animationClass, 'w-1/2')}
              />
              <div className="flex justify-between items-center pt-2">
                <div
                  className={cn('h-6 bg-cream-200 rounded', animationClass, 'w-1/4')}
                />
                <div
                  className={cn('h-10 bg-cream-200 rounded-lg', animationClass, 'w-1/3')}
                />
              </div>
            </div>
          </div>
        );

      case 'text':
      default:
        return (
          <div
            className={cn(
              'rounded-lg bg-cream-200',
              animationClass,
              getWidthClass(width),
              getHeightClass(height),
              className
            )}
          />
        );
    }
  };

  // Render multiple skeletons if count > 1
  if (count > 1) {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i}>{renderSkeleton()}</div>
        ))}
      </div>
    );
  }

  return renderSkeleton();
};
