'use client';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  count?: number;
  className?: string;
  interactive?: boolean;
  onChange?: (value: number) => void;
}

const sizeClass = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function StarRating({
  value,
  size = 'md',
  showValue = false,
  count,
  className,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rounded >= star;
          const half = !filled && rounded >= star - 0.5;
          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => onChange?.(star)}
              className={cn(
                'relative',
                interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
              )}
              aria-label={`${star} stars`}
            >
              <Star
                className={cn(
                  sizeClass[size],
                  filled || half ? 'fill-gold-500 text-gold-500' : 'text-cream-300'
                )}
              />
            </button>
          );
        })}
      </div>
      {showValue ? (
        <span className="text-sm text-charcoal-600">
          {value > 0 ? value.toFixed(1) : '—'}
          {typeof count === 'number' ? ` (${count})` : ''}
        </span>
      ) : null}
    </div>
  );
}
