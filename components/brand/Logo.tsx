import { cn } from '@/lib/utils';

const LOGO_MARK = '/brand/logo-mark.svg';

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/** Circular singing-bowl mark for headers, favicons, and compact UI. */
export function LogoMark({ size = 48, className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full',
        'ring-1 ring-gold-300/60',
        'shadow-[0_2px_10px_rgba(154,111,30,0.18)]',
        'transition-transform duration-300 group-hover:scale-[1.03]',
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Native img avoids next/image hydration quirks with SVG assets. */}
      <img
        src={LOGO_MARK}
        alt=""
        width={size}
        height={size}
        decoding="async"
        className="h-full w-full rounded-full"
        aria-hidden
      />
    </span>
  );
}

interface LogoProps {
  showWordmark?: boolean;
  markSize?: number;
  className?: string;
  wordmarkClassName?: string;
  tagline?: string;
  taglineClassName?: string;
  /** `inverse` for dark backgrounds (footer). */
  variant?: 'default' | 'inverse';
}

/** Brand logo: mark + optional wordmark stack (matches site header). */
export function Logo({
  showWordmark = true,
  markSize = 48,
  className,
  wordmarkClassName,
  tagline,
  taglineClassName,
  variant = 'default',
}: LogoProps) {
  const isInverse = variant === 'inverse';

  return (
    <span className={cn('flex min-w-0 items-center gap-3', className)}>
      <LogoMark size={markSize} />
      {showWordmark ? (
        <span className="flex min-w-0 flex-col justify-center gap-1">
          <span
            className={cn(
              'font-serif text-lg font-bold leading-none tracking-tight sm:text-xl',
              wordmarkClassName
            )}
          >
            <span className={isInverse ? 'text-white' : 'text-charcoal-900'}>
              Himalayan{' '}
            </span>
            <span
              className={cn(
                isInverse
                  ? 'text-gold-400 group-hover:text-gold-300'
                  : 'text-gold-700 group-hover:text-gold-600'
              )}
            >
              Sound
            </span>
          </span>
          {tagline ? (
            <span
              className={cn(
                'hidden max-w-[14rem] truncate text-[11px] font-medium leading-tight tracking-wide text-charcoal-500 sm:block sm:max-w-none sm:text-xs',
                isInverse && 'text-charcoal-400',
                taglineClassName
              )}
            >
              {tagline}
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

export const BRAND = {
  logoMarkSrc: LOGO_MARK,
  logoSrc: '/brand/logo.svg',
  icon192: '/icon-192x192.png',
  icon512: '/icon-512x512.png',
} as const;
