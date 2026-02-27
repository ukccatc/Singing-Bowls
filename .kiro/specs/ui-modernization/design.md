# Design Document: UI Modernization

## Overview

This design document outlines the technical approach for modernizing the user interface and user experience across all screens of the Himalayan Sound e-commerce platform. The modernization will transform the existing Next.js 13+ application with enhanced visual design, smooth animations, improved accessibility, and better user flows while maintaining the authentic Himalayan brand identity.

### Design Goals

1. **Premium Luxury Feel**: Create a sophisticated interface that matches the quality of authentic Himalayan singing bowls
2. **Modern Web Standards**: Implement 2026 design trends including glassmorphism, micro-interactions, and smooth animations
3. **Improved Conversion**: Enhance user flows and CTAs to increase conversion rates
4. **Performance**: Maintain fast load times while adding visual enhancements
5. **Accessibility**: Ensure WCAG 2.1 AA compliance throughout
6. **Mobile-First**: Optimize for mobile devices while providing rich desktop experiences

### Technology Stack

- **Framework**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion for complex animations, CSS transitions for simple effects
- **Images**: Next.js Image component with progressive loading
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API for global state

## Architecture

### Component Architecture

The UI modernization will follow a layered component architecture:

```
┌─────────────────────────────────────────┐
│         Page Components                  │
│  (Home, Shop, Product, Cart, Checkout)  │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│      Feature Components                  │
│  (ProductGallery, FilterSystem,         │
│   CartInterface, CheckoutFlow)          │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         UI Components                    │
│  (Button, Card, Input, Modal,           │
│   Skeleton, Animation wrappers)         │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│      Design System Tokens                │
│  (Colors, Typography, Spacing,          │
│   Shadows, Animations)                  │
└─────────────────────────────────────────┘
```

### Animation Strategy

Animations will be implemented using a tiered approach:

1. **CSS Transitions**: For simple hover effects, focus states, and color changes (< 200ms)
2. **CSS Animations**: For loading states, skeleton loaders, and repeating animations
3. **Framer Motion**: For complex page transitions, staggered animations, and gesture-based interactions
4. **React Spring**: For physics-based animations like cart icon bounce

### Performance Considerations

1. **Code Splitting**: Lazy load Framer Motion and heavy animation libraries
2. **Image Optimization**: Use Next.js Image with blur placeholders and responsive sizes
3. **Animation Budget**: Limit concurrent animations to maintain 60fps
4. **Reduced Motion**: Respect `prefers-reduced-motion` media query
5. **Critical CSS**: Inline critical styles for above-the-fold content

## Components and Interfaces

### 1. Design System Foundation

#### Color System Enhancement

```typescript
// Enhanced color palette with semantic tokens
interface ColorSystem {
  // Primary metals
  gold: ColorScale;      // Primary actions, premium elements
  bronze: ColorScale;    // Secondary actions, warm accents
  copper: ColorScale;    // Tertiary actions, rich accents
  
  // Neutrals
  charcoal: ColorScale;  // Text, borders, backgrounds
  cream: ColorScale;     // Backgrounds, cards
  
  // Semantic colors
  success: string;       // Success states
  error: string;         // Error states
  warning: string;       // Warning states
  info: string;          // Info states
  
  // Functional colors
  overlay: string;       // Modal overlays, glassmorphism
  focus: string;         // Focus indicators
  disabled: string;      // Disabled states
}

interface ColorScale {
  50: string;   // Lightest
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;  // Base color
  600: string;
  700: string;
  800: string;
  900: string;  // Darkest
  950: string;
}
```

#### Typography System

```typescript
interface TypographySystem {
  // Font families
  fontFamily: {
    sans: string;   // Inter for body text
    serif: string;  // Playfair Display for headings
    mono: string;   // For code/technical content
  };
  
  // Font sizes with line heights
  fontSize: {
    xs: { size: string; lineHeight: string };    // 12px, 1.5
    sm: { size: string; lineHeight: string };    // 14px, 1.5
    base: { size: string; lineHeight: string };  // 16px, 1.6
    lg: { size: string; lineHeight: string };    // 18px, 1.6
    xl: { size: string; lineHeight: string };    // 20px, 1.5
    '2xl': { size: string; lineHeight: string }; // 24px, 1.4
    '3xl': { size: string; lineHeight: string }; // 30px, 1.3
    '4xl': { size: string; lineHeight: string }; // 36px, 1.2
    '5xl': { size: string; lineHeight: string }; // 48px, 1.1
    '6xl': { size: string; lineHeight: string }; // 60px, 1.0
  };
  
  // Font weights
  fontWeight: {
    light: number;    // 300
    normal: number;   // 400
    medium: number;   // 500
    semibold: number; // 600
    bold: number;     // 700
  };
}
```

#### Spacing System

```typescript
// 8px grid system
interface SpacingSystem {
  0: string;    // 0px
  1: string;    // 4px
  2: string;    // 8px
  3: string;    // 12px
  4: string;    // 16px
  5: string;    // 20px
  6: string;    // 24px
  8: string;    // 32px
  10: string;   // 40px
  12: string;   // 48px
  16: string;   // 64px
  20: string;   // 80px
  24: string;   // 96px
  32: string;   // 128px
}
```

#### Animation Tokens

```typescript
interface AnimationSystem {
  // Durations
  duration: {
    instant: string;  // 100ms - Immediate feedback
    fast: string;     // 200ms - Quick transitions
    normal: string;   // 300ms - Standard transitions
    slow: string;     // 400ms - Deliberate animations
    slower: string;   // 600ms - Page transitions
  };
  
  // Easing functions
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring: string;   // For Framer Motion
  };
  
  // Common animations
  animations: {
    fadeIn: string;
    fadeOut: string;
    slideUp: string;
    slideDown: string;
    scaleUp: string;
    scaleDown: string;
    shimmer: string;
  };
}
```

### 2. Core UI Components

#### Button Component

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

// Implementation features:
// - Smooth scale animation on click (scale: 0.98)
// - Loading state with spinner
// - Disabled state with reduced opacity
// - Icon support with proper spacing
// - Hover effects with color and shadow transitions
```

#### Card Component

```typescript
interface CardProps {
  variant: 'default' | 'gold' | 'bronze' | 'copper' | 'glass';
  padding: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Implementation features:
// - Glassmorphism variant with backdrop blur
// - Hover effects with lift and glow
// - Smooth shadow transitions
// - Border radius and border styling
```

#### Input Component

```typescript
interface InputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search';
  label?: string;
  placeholder?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  floatingLabel?: boolean;
  value: string;
  onChange: (value: string) => void;
}

// Implementation features:
// - Floating label animation
// - Focus state with border and label color change
// - Error state with red border and message
// - Success state with green border and checkmark
// - Icon support with proper positioning
```

#### Skeleton Loader Component

```typescript
interface SkeletonProps {
  variant: 'text' | 'circular' | 'rectangular' | 'card' | 'product';
  width?: string | number;
  height?: string | number;
  count?: number;
  animation?: 'pulse' | 'shimmer' | 'wave';
}

// Implementation features:
// - Shimmer animation with gradient
// - Matches structure of actual content
// - Responsive sizing
// - Customizable shapes
```

### 3. Feature Components

#### Product Gallery Component

```typescript
interface ProductGalleryProps {
  images: ProductImage[];
  videos?: ProductVideo[];
  enableZoom?: boolean;
  enableLightbox?: boolean;
  enable360View?: boolean;
}

interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  thumbnail?: string;
}

// Implementation features:
// - Main image display with smooth transitions
// - Thumbnail navigation with active indicator
// - Hover zoom with magnification
// - Lightbox with full-screen viewing
// - Swipe gestures for mobile
// - Keyboard navigation support
// - Progressive image loading with blur placeholder
```

#### Filter System Component

```typescript
interface FilterSystemProps {
  filters: FilterGroup[];
  activeFilters: ActiveFilter[];
  onFilterChange: (filters: ActiveFilter[]) => void;
  layout: 'sidebar' | 'horizontal';
}

interface FilterGroup {
  id: string;
  label: string;
  type: 'checkbox' | 'radio' | 'range' | 'color';
  options: FilterOption[];
}

interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
  color?: string;
}

// Implementation features:
// - Collapsible filter groups with smooth animations
// - Active filter tags with remove animation
// - Clear all filters button
// - Filter count badges
// - Responsive layout (sidebar on desktop, drawer on mobile)
// - Smooth product grid updates
```

#### Cart Interface Component

```typescript
interface CartInterfaceProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  maxQuantity: number;
}

// Implementation features:
// - Item list with product images and details
// - Quantity controls with smooth number transitions
// - Remove button with slide-out animation
// - Sticky order summary on desktop
// - Empty state with product recommendations
// - Optimistic UI updates
// - Loading states for quantity changes
```

#### Checkout Flow Component

```typescript
interface CheckoutFlowProps {
  steps: CheckoutStep[];
  currentStep: number;
  onStepComplete: (stepData: any) => void;
  onStepBack: () => void;
}

interface CheckoutStep {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  validation: ZodSchema;
}

// Implementation features:
// - Progress indicator with step numbers
// - Step transitions with slide animations
// - Form validation with inline errors
// - Sticky order summary
// - Back button with state preservation
// - Loading state during submission
// - Trust signals and security badges
```

### 4. Animation Components

#### Fade In Component

```typescript
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
}

// Implementation:
// - Uses Intersection Observer for viewport detection
// - Triggers animation when element enters viewport
// - Supports staggered animations for lists
// - Respects prefers-reduced-motion
```

#### Stagger Container Component

```typescript
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
}

// Implementation:
// - Wraps child elements with staggered fade-in
// - Calculates delay based on child index
// - Used for product grids, feature cards, etc.
```

### 5. Page-Specific Components

#### Hero Section Component

```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaPrimary: CTAButton;
  ctaSecondary?: CTAButton;
  trustSignals?: TrustSignal[];
}

interface CTAButton {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface TrustSignal {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// Implementation features:
// - Parallax scrolling effect on background
// - Fade-in animation on load
// - Gradient overlay for text readability
// - Responsive text sizing
// - Trust signals with icons
```

#### Navigation Bar Component

```typescript
interface NavigationBarProps {
  locale: Locale;
  cartItemCount: number;
  isScrolled: boolean;
}

// Implementation features:
// - Sticky positioning with compact mode when scrolled
// - Smooth transition between normal and compact states
// - Dropdown menus with fade-in animations
// - Search expansion with smooth width transition
// - Cart icon with bounce animation on update
// - Mobile menu with slide-in drawer
// - Hamburger to X transformation
```

## Data Models

### Animation Configuration

```typescript
interface AnimationConfig {
  enabled: boolean;
  respectReducedMotion: boolean;
  defaultDuration: number;
  defaultEasing: string;
  staggerDelay: number;
}

// Default configuration
const defaultAnimationConfig: AnimationConfig = {
  enabled: true,
  respectReducedMotion: true,
  defaultDuration: 300,
  defaultEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  staggerDelay: 50,
};
```

### UI State Models

```typescript
interface LoadingState {
  isLoading: boolean;
  loadingType: 'skeleton' | 'spinner' | 'progress';
  message?: string;
}

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode;
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick: boolean;
  showCloseButton: boolean;
}
```

### Filter State Models

```typescript
interface FilterState {
  activeFilters: Map<string, string[]>;
  priceRange: { min: number; max: number };
  sortBy: SortOption;
  viewMode: 'grid' | 'list';
}

type SortOption = 
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'popular';
```

### Cart State Models

```typescript
interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  discountCode?: string;
  discountAmount?: number;
}

interface CartItem {
  id: string;
  productId: string;
  name: Record<Locale, string>;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  weight: number;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Design System Properties

**Property 1: Spacing Grid Consistency**
*For any* component in the UI system, all spacing values (margins, padding, gaps) should be multiples of 8px from the spacing system.
**Validates: Requirements 1.4**

**Property 2: Typography Hierarchy Compliance**
*For any* text element, the font size, line height, and font weight should match the values defined in the typography system for its semantic level (heading, subheading, body, etc.).
**Validates: Requirements 1.2, 18.1**

**Property 3: Color Contrast Accessibility**
*For any* text element, the contrast ratio between the text color and its background should be at least 4.5:1 for normal text and 3:1 for large text (18px+ or 14px+ bold).
**Validates: Requirements 13.1, 16.1, 16.5**

**Property 4: Font Family Consistency**
*For any* heading element, the font family should be Playfair Display, and for any body text element, the font family should be Inter.
**Validates: Requirements 18.4, 18.5**

**Property 5: Line Height Readability**
*For any* body text element, the line height should be between 1.5 and 1.7.
**Validates: Requirements 18.2**

**Property 6: Line Length Optimization**
*For any* paragraph element, the maximum width should result in line lengths of 60-80 characters.
**Validates: Requirements 18.3**

### Animation Properties

**Property 7: Animation Duration Limits**
*For any* CSS transition or animation, the duration should be between 200ms and 400ms for UI interactions.
**Validates: Requirements 10.6**

**Property 8: Reduced Motion Respect**
*For any* animated element, when the user's system has prefers-reduced-motion enabled, animations should be disabled or significantly reduced.
**Validates: Requirements 10.7**

**Property 9: Button Click Feedback**
*For any* button element, clicking should trigger a scale-down transform animation (scale: 0.98) with a duration of 100-200ms.
**Validates: Requirements 10.1**

**Property 10: Interactive Element Transitions**
*For any* interactive element (buttons, links, cards), hover states should have smooth color and transform transitions defined.
**Validates: Requirements 10.2**

**Property 11: Focus State Animations**
*For any* form input, receiving focus should trigger label and border animations with smooth transitions.
**Validates: Requirements 10.4**

**Property 12: Toast Notification Animations**
*For any* toast notification, displaying should trigger a slide-in animation from the top or bottom with easing.
**Validates: Requirements 10.5**

### Component Properties

**Property 13: Card Styling Consistency**
*For any* card component, it should have defined border-radius, box-shadow, and optional backdrop-filter (for glassmorphism variant).
**Validates: Requirements 1.3**

**Property 14: Interactive Element Affordances**
*For any* interactive element, it should have a hover state with cursor: pointer and visual changes (color, transform, or shadow).
**Validates: Requirements 1.5**

**Property 15: Product Grid Responsiveness**
*For any* product grid, it should display in a responsive grid layout with consistent card heights and aspect ratios.
**Validates: Requirements 3.2**

**Property 16: Product Card Hover Effects**
*For any* product card, hovering should trigger a scale transform and reveal additional information with smooth transitions.
**Validates: Requirements 2.4, 3.3**

**Property 17: Filter Updates with Transitions**
*For any* filter change, the product grid should update with a fade transition animation.
**Validates: Requirements 3.4**

**Property 18: Collapsible Filter Animations**
*For any* filter group, expanding or collapsing should trigger smooth height transitions.
**Validates: Requirements 3.5**

**Property 19: Active Filter Tag Display**
*For any* active filter, it should be displayed as a removable tag with a remove animation on click.
**Validates: Requirements 3.7**

**Property 20: Gallery Thumbnail Navigation**
*For any* product gallery, clicking a thumbnail should transition to the selected image with a fade or slide animation.
**Validates: Requirements 4.2**

**Property 21: Image Zoom on Hover**
*For any* primary product image, hovering should enable zoom functionality with scale transform.
**Validates: Requirements 4.3**

**Property 22: Add to Cart Feedback**
*For any* add-to-cart action, clicking should trigger a success animation and update the cart icon badge with a bounce animation.
**Validates: Requirements 4.6**

**Property 23: Cart Item Display**
*For any* cart item, it should display with product image, name, quantity controls, price, and remove button.
**Validates: Requirements 5.1**

**Property 24: Cart Quantity Updates**
*For any* quantity change in the cart, totals should update with a smooth number transition animation.
**Validates: Requirements 5.2**

**Property 25: Cart Item Removal Animation**
*For any* cart item removal, the item should animate out with a slide-out effect before being removed from the DOM.
**Validates: Requirements 5.3**

**Property 26: Form Inline Validation**
*For any* form field, validation errors should display inline below the field with clear error messages and error styling.
**Validates: Requirements 6.2**

**Property 27: Input Floating Labels**
*For any* form input with a floating label, the label should animate upward and change color when the input receives focus or has a value.
**Validates: Requirements 6.3**

**Property 28: Checkout Step Transitions**
*For any* checkout step completion, transitioning to the next step should trigger a slide animation.
**Validates: Requirements 6.4**

### Navigation Properties

**Property 29: Sticky Header Transition**
*For any* scroll event beyond a threshold, the navigation bar should transition to a compact sticky state with smooth animation.
**Validates: Requirements 8.1**

**Property 30: Navigation Dropdown Animations**
*For any* navigation item with a dropdown, hovering should display the dropdown menu with a fade-in animation.
**Validates: Requirements 8.2**

**Property 31: Cart Badge Updates**
*For any* cart update, the cart icon badge should display the updated item count and animate with a bounce effect.
**Validates: Requirements 8.3**

**Property 32: Search Expansion Animation**
*For any* search icon click, the search input should expand with a smooth width transition.
**Validates: Requirements 8.4**

**Property 33: Social Icon Hover Effects**
*For any* social media icon, hovering should trigger color and transform transitions.
**Validates: Requirements 9.3**

### Responsive Design Properties

**Property 34: Mobile Layout Adaptation**
*For any* page viewed on mobile viewports (< 768px), layouts should adapt to single-column with appropriate spacing.
**Validates: Requirements 11.1**

**Property 35: Mobile Input Optimization**
*For any* form input on mobile, it should be full-width and have the appropriate inputMode attribute for the field type.
**Validates: Requirements 11.3**

**Property 36: Gallery Swipe Gestures**
*For any* product gallery on mobile, swipe gestures should be enabled for navigation between images.
**Validates: Requirements 11.5**

**Property 37: Touch Target Minimum Size**
*For any* interactive element on mobile, the touch target size should be at least 44x44 pixels.
**Validates: Requirements 11.6, 19.6**

**Property 38: Mobile Image Optimization**
*For any* image on mobile viewports, the appropriate responsive image size should be loaded based on viewport width.
**Validates: Requirements 11.7**

### Loading State Properties

**Property 39: Skeleton Loader Display**
*For any* loading state, skeleton loaders should be displayed that match the structure of the content being loaded.
**Validates: Requirements 3.1, 12.1**

**Property 40: Image Blur Placeholders**
*For any* image, a blurred placeholder should be displayed while the full image loads, with a smooth transition to the full image.
**Validates: Requirements 12.2**

**Property 41: Optimistic UI Updates**
*For any* user action that requires server response (like adding to cart), the UI should update immediately before the server response.
**Validates: Requirements 12.3, 12.5**

**Property 42: Minimum Loading Duration**
*For any* loading state, it should display for a minimum of 300ms to avoid flashing.
**Validates: Requirements 12.4**

**Property 43: Skeleton Shimmer Animation**
*For any* skeleton loader, it should have a shimmer animation effect using a gradient.
**Validates: Requirements 10.3**

### Accessibility Properties

**Property 44: Focus Indicator Visibility**
*For any* interactive element, keyboard focus should display a clear focus indicator (outline or ring).
**Validates: Requirements 13.2**

**Property 45: ARIA Label Presence**
*For any* interactive component without visible text, it should have an appropriate aria-label or aria-labelledby attribute.
**Validates: Requirements 13.3**

**Property 46: Image Alt Text**
*For any* image element, it should have a descriptive alt attribute.
**Validates: Requirements 13.4**

**Property 47: Dynamic Content Announcements**
*For any* dynamic content change (like loading states or notifications), it should be announced to screen readers using aria-live regions.
**Validates: Requirements 13.5**

**Property 48: Keyboard Navigation Completeness**
*For any* interactive functionality, it should be accessible via keyboard without requiring a mouse.
**Validates: Requirements 13.6**

**Property 49: Form Error Association**
*For any* form field with an error, the error message should be associated with the field using aria-describedby.
**Validates: Requirements 13.7**

### Visual Design Properties

**Property 50: Content Area Backgrounds**
*For any* content area, the background should use white or light colors (cream-50 to cream-200) to maximize readability.
**Validates: Requirements 16.3**

**Property 51: Dark Mode Color Adaptation**
*For any* element in dark mode, colors should adapt to maintain contrast ratios and visual hierarchy.
**Validates: Requirements 16.6**

**Property 52: Price Display Prominence**
*For any* price element, it should have a larger font size and heavier font weight than surrounding text.
**Validates: Requirements 18.6**

### Page Transition Properties

**Property 53: Page Navigation Transitions**
*For any* page navigation, a smooth fade transition should be applied between pages.
**Validates: Requirements 17.1, 17.2**

**Property 54: Scroll Position Restoration**
*For any* browser back/forward navigation, the scroll position should be restored to the previous position.
**Validates: Requirements 17.3**

**Property 55: Link Prefetching**
*For any* common navigation path, critical resources should be prefetched to reduce perceived loading time.
**Validates: Requirements 17.4**

**Property 56: Navigation Layout Stability**
*For any* page navigation, the navigation bar should maintain its position without causing layout shift.
**Validates: Requirements 17.5**

### Call-to-Action Properties

**Property 57: CTA Contrast and Positioning**
*For any* primary CTA button, it should have high contrast (meeting WCAG AA standards) and be positioned prominently.
**Validates: Requirements 19.1**

**Property 58: CTA Hover Transitions**
*For any* CTA button, hovering should trigger a smooth scale or color transition.
**Validates: Requirements 19.2**

**Property 59: CTA Visual Hierarchy**
*For any* page with multiple CTAs, primary CTAs should have distinct visual styling from secondary CTAs.
**Validates: Requirements 19.4**

**Property 60: CTA Above-the-Fold Visibility**
*For any* key page (home, product, cart), primary CTAs should be visible without scrolling (above the fold).
**Validates: Requirements 19.5**

### Search Properties

**Property 61: Search Autocomplete Display**
*For any* search input with text, autocomplete suggestions should be displayed with product images.
**Validates: Requirements 20.1**

**Property 62: Search Result Highlighting**
*For any* search result, matching terms should be highlighted in product names and descriptions.
**Validates: Requirements 20.2**

**Property 63: Recent Search Display**
*For any* search input focus, recent searches should be displayed for quick access.
**Validates: Requirements 20.4**

**Property 64: Search Suggestion Navigation**
*For any* search suggestion click, navigation to the product or results should occur with a smooth transition.
**Validates: Requirements 20.5**

### Gallery Properties

**Property 65: Progressive Image Loading**
*For any* product image, it should load progressively with a low-quality placeholder transitioning to high-resolution.
**Validates: Requirements 14.1**

**Property 66: Image Lightbox Functionality**
*For any* product image click, a lightbox should open with full-screen viewing and zoom capabilities.
**Validates: Requirements 14.3**

**Property 67: Gallery Position Indicators**
*For any* product gallery, image indicators should display showing the current position in the gallery.
**Validates: Requirements 14.4**

### Trust Signal Properties

**Property 68: Product Rating Display**
*For any* product with ratings, customer ratings and review counts should be displayed prominently on product cards and pages.
**Validates: Requirements 15.1**

## Error Handling

### Animation Errors

1. **Animation Performance Issues**
   - **Detection**: Monitor frame rate during animations
   - **Handling**: Reduce animation complexity or disable animations if frame rate drops below 30fps
   - **Fallback**: Provide instant state changes without animations

2. **Reduced Motion Preference**
   - **Detection**: Check `prefers-reduced-motion` media query
   - **Handling**: Disable or simplify all animations
   - **Fallback**: Use instant transitions or very short durations (< 100ms)

3. **Browser Compatibility**
   - **Detection**: Feature detection for CSS properties (backdrop-filter, transforms)
   - **Handling**: Provide fallback styles for unsupported features
   - **Fallback**: Use solid backgrounds instead of glassmorphism, simple opacity changes instead of complex transforms

### Image Loading Errors

1. **Image Load Failure**
   - **Detection**: Image onerror event
   - **Handling**: Display placeholder image with error icon
   - **Fallback**: Show product name and description without image

2. **Slow Image Loading**
   - **Detection**: Image load time > 3 seconds
   - **Handling**: Continue showing blur placeholder with loading indicator
   - **Fallback**: Provide option to skip image loading

3. **Missing Image Alt Text**
   - **Detection**: Image without alt attribute
   - **Handling**: Log warning in development, use product name as fallback
   - **Fallback**: Generate alt text from product name and category

### Responsive Design Errors

1. **Viewport Detection Issues**
   - **Detection**: Window resize events and matchMedia
   - **Handling**: Debounce resize events, use CSS media queries as primary method
   - **Fallback**: Default to mobile layout if detection fails

2. **Touch Event Support**
   - **Detection**: Check for touch event support
   - **Handling**: Provide both touch and mouse event handlers
   - **Fallback**: Use click events as universal fallback

### Accessibility Errors

1. **Missing ARIA Labels**
   - **Detection**: Automated accessibility testing in development
   - **Handling**: Add appropriate ARIA labels to all interactive elements
   - **Fallback**: Use visible text labels when possible

2. **Insufficient Contrast**
   - **Detection**: Automated contrast checking in development
   - **Handling**: Adjust colors to meet WCAG AA standards
   - **Fallback**: Provide high-contrast mode option

3. **Keyboard Navigation Issues**
   - **Detection**: Manual testing and automated tools
   - **Handling**: Ensure all interactive elements are focusable and have proper tab order
   - **Fallback**: Provide skip links and keyboard shortcuts

### State Management Errors

1. **Cart State Sync Issues**
   - **Detection**: Compare local state with server state
   - **Handling**: Reconcile differences, prefer server state
   - **Fallback**: Show warning and allow user to refresh

2. **Filter State Persistence**
   - **Detection**: Check URL parameters and local storage
   - **Handling**: Restore filter state from URL or storage
   - **Fallback**: Reset to default filters

3. **Form State Loss**
   - **Detection**: Monitor form changes and page navigation
   - **Handling**: Auto-save form data to local storage
   - **Fallback**: Warn user before navigation with unsaved changes

## Testing Strategy

### Dual Testing Approach

The UI modernization will be validated through both unit tests and property-based tests, which are complementary and necessary for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

Together, these approaches provide comprehensive coverage where unit tests catch concrete bugs and property tests verify general correctness.

### Unit Testing

Unit tests will focus on:

1. **Component Rendering**: Verify components render with correct props
2. **User Interactions**: Test click, hover, focus, and keyboard events
3. **Edge Cases**: Test empty states, error states, loading states
4. **Integration Points**: Test component composition and data flow

**Testing Tools**:
- Jest for test runner
- React Testing Library for component testing
- Testing Library User Event for interaction simulation

**Example Unit Tests**:

```typescript
// Button component tests
describe('Button', () => {
  it('should render with primary variant styling', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r', 'from-gold-500');
  });

  it('should show loading spinner when loading prop is true', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

// Product Gallery tests
describe('ProductGallery', () => {
  it('should display main image and thumbnails', () => {
    const images = [
      { url: '/image1.jpg', alt: 'Image 1' },
      { url: '/image2.jpg', alt: 'Image 2' },
    ];
    render(<ProductGallery images={images} />);
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('should change main image when thumbnail is clicked', async () => {
    const images = [
      { url: '/image1.jpg', alt: 'Image 1' },
      { url: '/image2.jpg', alt: 'Image 2' },
    ];
    render(<ProductGallery images={images} />);
    const thumbnails = screen.getAllByRole('button');
    await userEvent.click(thumbnails[1]);
    // Verify main image changed
  });
});
```

### Property-Based Testing

Property-based tests will verify universal properties across many generated inputs. Each property test will:

- Run a minimum of 100 iterations
- Generate random valid inputs
- Verify the property holds for all inputs
- Reference the design document property

**Testing Tools**:
- fast-check for property-based testing in TypeScript
- Custom generators for UI components and states

**Property Test Configuration**:

```typescript
import fc from 'fast-check';

// Configure property tests to run 100+ iterations
const propertyTestConfig = {
  numRuns: 100,
  verbose: true,
};
```

**Example Property Tests**:

```typescript
// Property 1: Spacing Grid Consistency
// Feature: ui-modernization, Property 1: For any component, all spacing values should be multiples of 8px
describe('Property 1: Spacing Grid Consistency', () => {
  it('should use 8px grid for all spacing values', () => {
    fc.assert(
      fc.property(
        fc.record({
          margin: fc.integer({ min: 0, max: 32 }),
          padding: fc.integer({ min: 0, max: 32 }),
          gap: fc.integer({ min: 0, max: 32 }),
        }),
        (spacing) => {
          const spacingValues = Object.values(spacing);
          return spacingValues.every(value => value % 8 === 0);
        }
      ),
      propertyTestConfig
    );
  });
});

// Property 7: Animation Duration Limits
// Feature: ui-modernization, Property 7: For any animation, duration should be 200-400ms
describe('Property 7: Animation Duration Limits', () => {
  it('should limit animation durations to 200-400ms', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('fadeIn', 'slideUp', 'scaleUp', 'shimmer'),
        (animationName) => {
          const element = document.createElement('div');
          element.className = `animate-${animationName}`;
          document.body.appendChild(element);
          
          const computedStyle = window.getComputedStyle(element);
          const duration = parseFloat(computedStyle.animationDuration) * 1000;
          
          document.body.removeChild(element);
          
          return duration >= 200 && duration <= 400;
        }
      ),
      propertyTestConfig
    );
  });
});

// Property 37: Touch Target Minimum Size
// Feature: ui-modernization, Property 37: For any interactive element on mobile, touch target should be at least 44x44px
describe('Property 37: Touch Target Minimum Size', () => {
  it('should ensure all interactive elements meet minimum touch target size', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'a', 'input[type="checkbox"]', 'input[type="radio"]'),
        (selector) => {
          // Set mobile viewport
          Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
          
          const elements = document.querySelectorAll(selector);
          return Array.from(elements).every(element => {
            const rect = element.getBoundingClientRect();
            return rect.width >= 44 && rect.height >= 44;
          });
        }
      ),
      propertyTestConfig
    );
  });
});

// Property 44: Focus Indicator Visibility
// Feature: ui-modernization, Property 44: For any interactive element, keyboard focus should display a clear focus indicator
describe('Property 44: Focus Indicator Visibility', () => {
  it('should display focus indicators on all interactive elements', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'a', 'input', 'select', 'textarea'),
        (tagName) => {
          const element = document.createElement(tagName);
          document.body.appendChild(element);
          element.focus();
          
          const computedStyle = window.getComputedStyle(element);
          const hasOutline = computedStyle.outline !== 'none' && computedStyle.outline !== '';
          const hasRing = computedStyle.boxShadow.includes('ring') || 
                         element.classList.contains('focus:ring');
          
          document.body.removeChild(element);
          
          return hasOutline || hasRing;
        }
      ),
      propertyTestConfig
    );
  });
});
```

### Visual Regression Testing

Visual regression tests will capture screenshots and compare them to baseline images:

- **Tool**: Playwright or Chromatic
- **Coverage**: All major pages and component states
- **Frequency**: Run on every pull request

### Accessibility Testing

Automated accessibility testing will be integrated into the CI/CD pipeline:

- **Tool**: axe-core with jest-axe
- **Coverage**: All pages and interactive components
- **Standards**: WCAG 2.1 AA compliance

**Example Accessibility Tests**:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should have no accessibility violations on home page', async () => {
    const { container } = render(<HomePage locale="en" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations on product page', async () => {
    const { container } = render(<ProductPage locale="en" slug="test-bowl" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Performance Testing

Performance tests will ensure animations and interactions maintain 60fps:

- **Tool**: Lighthouse CI
- **Metrics**: First Contentful Paint, Largest Contentful Paint, Cumulative Layout Shift
- **Thresholds**: FCP < 1.8s, LCP < 2.5s, CLS < 0.1

### Testing Coverage Goals

- **Unit Test Coverage**: 80%+ for UI components
- **Property Test Coverage**: All correctness properties implemented
- **Visual Regression**: All major pages and states
- **Accessibility**: 100% WCAG 2.1 AA compliance
- **Performance**: All pages meet Core Web Vitals thresholds
