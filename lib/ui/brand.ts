/**
 * Himalayan Sound brand tokens and reusable UI class strings.
 *
 * Prefer these over one-off blue/green/red utility classes so admin and
 * storefront stay aligned with the gold / cream / charcoal / copper palette.
 *
 * Tailwind color scales live in `tailwind.config.ts` (`gold`, `bronze`,
 * `copper`, `charcoal`, `cream`). Hex values here are the canonical references.
 */

export const brandColors = {
  gold: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  bronze: {
    500: '#e2752e',
    600: '#d35f1f',
    700: '#ae4a1c',
  },
  copper: {
    600: '#c85d3d',
    700: '#a64732',
    800: '#8a3a2c',
  },
  charcoal: {
    400: '#78716c',
    500: '#57534e',
    700: '#292524',
    800: '#1c1917',
    900: '#0c0a09',
  },
  cream: {
    50: '#faf8f5',
    100: '#f5f0e8',
    200: '#ebe3d5',
    300: '#ddd2be',
  },
} as const;

/** Tailwind class recipes used across admin + storefront. */
export const ui = {
  button: {
    primary: 'bg-gold-600 text-white hover:bg-gold-700',
    primaryGradient:
      'bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700',
    secondary: 'bg-charcoal-700 text-white hover:bg-charcoal-800',
    muted: 'bg-charcoal-400 text-white hover:bg-charcoal-500',
    outline:
      'border border-gold-300 bg-white text-gold-800 hover:bg-gold-50 hover:text-gold-900',
    outlineNeutral:
      'border border-charcoal-300 bg-white text-charcoal-700 hover:bg-cream-100',
    danger: 'bg-copper-700 text-white hover:bg-copper-800',
    dangerOutline:
      'border border-copper-300 bg-white text-copper-700 hover:bg-copper-50',
    success: 'bg-gold-600 text-white hover:bg-gold-700',
    ghost: 'text-charcoal-700 hover:bg-gold-50 hover:text-gold-800',
  },

  banner: {
    info: 'rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-gold-900',
    warning:
      'rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900',
    danger:
      'rounded-xl border border-copper-200 bg-copper-50 px-4 py-3 text-sm text-copper-900',
  },

  tab: {
    active: 'bg-gold-700 text-white',
    inactive: 'bg-white text-charcoal-700 hover:bg-gold-50',
  },

  selection: {
    selected: 'border-gold-600 ring-2 ring-gold-300',
    idle: 'border-cream-300 hover:border-gold-400',
    selectedSoft: 'border-gold-500 bg-gold-50',
  },

  badge: {
    primary: 'bg-gold-100 text-gold-800 border border-gold-200',
    muted: 'bg-cream-100 text-charcoal-700 border border-cream-200',
    success: 'bg-gold-100 text-gold-800 border border-gold-200',
    warning: 'bg-amber-100 text-amber-900 border border-amber-200',
    danger: 'bg-copper-50 text-copper-800 border border-copper-200',
    info: 'bg-cream-100 text-charcoal-700 border border-cream-200',
  },

  card: 'rounded-xl border border-cream-200 bg-white p-6 shadow-sm',
  cardInteractive:
    'rounded-xl border border-cream-200 bg-white p-6 shadow-sm transition hover:border-gold-300 hover:shadow-md',
  tableShell:
    'overflow-hidden rounded-xl border border-cream-200 bg-white shadow-sm',
  tableHead: 'bg-cream-50 text-xs font-medium uppercase tracking-wider text-charcoal-500',

  focus:
    'focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200',

  field:
    'w-full rounded-lg border border-cream-300 px-4 py-2 text-charcoal-900 disabled:bg-cream-100',
  label: 'mb-2 block text-sm font-medium text-charcoal-700',
  labelSm: 'mb-1 block text-sm font-medium text-charcoal-700',

  link: 'text-gold-700 underline-offset-4 hover:text-gold-800 hover:underline',

  page: {
    soft: 'min-h-screen bg-gradient-to-br from-cream-50 to-cream-100',
    metal: 'min-h-screen bg-metal-light',
    title: 'text-3xl font-bold text-charcoal-900',
    subtitle: 'text-charcoal-600',
  },

  /** Admin shell / chrome */
  admin: {
    shellBg: 'bg-cream-100',
    sidebar: 'bg-charcoal-900 text-white shadow-lg',
    sidebarMuted: 'text-cream-300/70',
    navActive: 'bg-gold-700 text-white',
    navIdle: 'text-cream-200 hover:bg-charcoal-800 hover:text-white',
    sidebarFooterBtn:
      'block w-full rounded-lg bg-charcoal-800 px-4 py-2 text-center text-sm text-cream-100 transition-colors hover:bg-charcoal-700',
    iconGold: 'bg-gold-600',
    iconBronze: 'bg-bronze-600',
    iconCopper: 'bg-copper-600',
    iconCharcoal: 'bg-charcoal-700',
  },
} as const;

export type UiButtonVariant = keyof typeof ui.button;
