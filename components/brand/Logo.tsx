import Image from 'next/image';
import { cn } from '@/lib/utils';

const LOGO_MARK = '/brand/logo-mark.svg';

interface LogoMarkProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

/** Circular singing-bowl mark for headers, favicons, and compact UI. */
export function LogoMark({ size = 48, className, priority = false }: LogoMarkProps) {
  return (
    <Image
      src={LOGO_MARK}
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={cn('shrink-0', className)}
      aria-hidden
    />
  );
}

interface LogoProps {
  showWordmark?: boolean;
  markSize?: number;
  className?: string;
  wordmarkClassName?: string;
  tagline?: string;
  taglineClassName?: string;
  priority?: boolean;
}

/** Brand logo: mark + optional wordmark stack (matches site header). */
export function Logo({
  showWordmark = true,
  markSize = 48,
  className,
  wordmarkClassName,
  tagline,
  taglineClassName,
  priority = false,
}: LogoProps) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <LogoMark size={markSize} priority={priority} className="shadow-md" />
      {showWordmark ? (
        <span className="flex min-w-0 flex-col">
          <span
            className={cn(
              'font-bold leading-tight text-charcoal-900',
              wordmarkClassName
            )}
          >
            Himalayan Sound
          </span>
          {tagline ? (
            <span className={cn('text-charcoal-600 leading-tight', taglineClassName)}>
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
