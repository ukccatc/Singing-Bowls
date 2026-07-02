'use client';

import { triggerHapticLight, triggerHapticMedium } from '@/lib/native-actions';
import { nativeNavigate } from '@/lib/native-navigate';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

type NativePressableVariant = 'icon' | 'chip' | 'tab';

interface NativePressableProps {
  children: ReactNode;
  className?: string;
  variant?: NativePressableVariant;
  haptic?: 'light' | 'medium' | 'none';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onPress?: () => void;
  'aria-label'?: string;
  'aria-current'?: 'page' | boolean;
  role?: string;
  'aria-selected'?: boolean;
}

export function NativePressable({
  children,
  className,
  variant = 'icon',
  haptic = 'light',
  onPress,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
  role,
  'aria-selected': ariaSelected,
}: NativePressableProps) {
  const fireHaptic = () => {
    if (disabled || haptic === 'none') return;
    if (haptic === 'medium') void triggerHapticMedium();
    else void triggerHapticLight();
  };

  const activate = () => {
    if (disabled) return;
    onPress?.();
  };

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      role={role}
      aria-selected={ariaSelected}
      className={cn(
        'native-pressable',
        variant === 'chip' && 'native-pressable--chip',
        variant === 'tab' && 'native-pressable--tab',
        variant === 'icon' && 'native-pressable--icon',
        className
      )}
      onPointerDown={(e) => {
        if (disabled) return;
        if (e.pointerType === 'touch' || e.pointerType === 'pen') {
          fireHaptic();
        }
      }}
      onPointerUp={(e) => {
        if (disabled) return;
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        activate();
      }}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      }}
    >
      {children}
    </button>
  );
}

interface NativeNavButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: NativePressableVariant;
  haptic?: 'light' | 'medium' | 'none';
  replace?: boolean;
  scroll?: boolean;
  disabled?: boolean;
  isActive?: boolean;
  onNavigate?: () => void;
  'aria-label'?: string;
  role?: string;
  'aria-selected'?: boolean;
}

/** Programmatic navigation — avoids Link semantics and long-press link preview on mobile. */
export function NativeNavButton({
  href,
  children,
  className,
  variant = 'icon',
  haptic = 'light',
  replace = false,
  scroll = false,
  disabled,
  isActive,
  onNavigate,
  'aria-label': ariaLabel,
  role,
  'aria-selected': ariaSelected,
}: NativeNavButtonProps) {
  const router = useRouter();

  return (
    <NativePressable
      className={className}
      variant={variant}
      haptic={isActive ? 'none' : haptic}
      disabled={disabled || isActive}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
      role={role}
      aria-selected={ariaSelected}
      onPress={() => {
        onNavigate?.();
        nativeNavigate(router, href, { replace, scroll });
      }}
    >
      {children}
    </NativePressable>
  );
}
