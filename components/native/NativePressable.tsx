'use client';

import { triggerHapticLight, triggerHapticMedium } from '@/lib/native-actions';
import { releaseNativeBodyLock } from '@/lib/native-body-lock';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { type ButtonHTMLAttributes, type ReactNode, useRef } from 'react';

type NativePressableVariant = 'icon' | 'chip' | 'tab';

interface NativePressableProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: ReactNode;
  className?: string;
  variant?: NativePressableVariant;
  haptic?: 'light' | 'medium' | 'none';
  onPress?: () => void;
}

export function NativePressable({
  children,
  className,
  variant = 'icon',
  haptic = 'light',
  onPress,
  disabled,
  type = 'button',
  onTouchStart,
  ...rest
}: NativePressableProps) {
  const pressedRef = useRef(false);

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
      className={cn(
        'native-pressable',
        variant === 'chip' && 'native-pressable--chip',
        variant === 'tab' && 'native-pressable--tab',
        variant === 'icon' && 'native-pressable--icon',
        className
      )}
      onTouchStart={(e) => {
        pressedRef.current = true;
        fireHaptic();
        onTouchStart?.(e);
      }}
      onTouchEnd={(e) => {
        if (!pressedRef.current) return;
        pressedRef.current = false;
        e.preventDefault();
        activate();
      }}
      onTouchCancel={() => {
        pressedRef.current = false;
      }}
      onClick={(e) => {
        // Mouse / desktop fallback only — touch handled via touchend in WebView
        if (pressedRef.current) return;
        if (disabled) return;
        e.preventDefault();
        activate();
      }}
      {...rest}
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
        releaseNativeBodyLock();
        if (replace) router.replace(href, { scroll });
        else router.push(href, { scroll });
      }}
    >
      {children}
    </NativePressable>
  );
}
