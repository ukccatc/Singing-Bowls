# System Patterns: Himalayan Sound E-commerce Platform

## 🏗️ Architecture Overview

### Next.js App Router Structure
```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx               # Homepage
├── globals.css            # Global styles
├── api/                   # API routes
│   ├── auth/             # Authentication endpoints
│   ├── cart/             # Shopping cart management
│   ├── orders/           # Order processing
│   └── user/             # User account management
├── shop/                  # Product catalog
├── product/[slug]/        # Individual product pages
├── cart/                  # Shopping cart page
├── checkout/              # Checkout flow
├── blog/                  # Content management
└── auth/                  # Authentication pages
```

### Component Architecture
```
components/
├── ui/                    # shadcn/ui components
│   ├── button.tsx        # Base button component
│   ├── card.tsx          # Card layout component
│   ├── form.tsx          # Form components
│   └── ...               # Other UI primitives
├── layout/               # Layout components
│   ├── Header.tsx        # Site header
│   ├── Footer.tsx        # Site footer
│   └── LanguageChanger.tsx # Language switcher
├── product/              # Product-specific components
│   ├── ProductCard.tsx   # Product listing card
│   ├── ProductDetail.tsx # Product page layout
│   ├── AudioPlayer.tsx   # Audio sample player
│   └── ProductReviews.tsx # Reviews and ratings
├── ecommerce/            # E-commerce components
│   ├── Cart.tsx          # Shopping cart
│   ├── Checkout.tsx      # Checkout flow
│   └── ShippingCalculator.tsx # Shipping costs
├── content/              # Content components
│   ├── ArticleCard.tsx   # Blog article card
│   └── Newsletter.tsx    # Newsletter signup
└── pwa/                  # PWA-specific components
    ├── InstallPrompt.tsx # App installation prompt
    └── OfflineIndicator.tsx # Offline status
```

## 🎨 Design Patterns

### Component Composition Pattern
```typescript
// Base component with variants
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

// Composition over inheritance
const Button = ({ variant = 'default', size = 'md', children, ...props }: ButtonProps) => {
  return (
    <button 
      className={cn(buttonVariants({ variant, size }))}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Data Flow Pattern
```typescript
// Type-safe API responses
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Consistent error handling
const handleApiError = (error: unknown): ApiResponse<never> => {
  console.error('API Error:', error)
  return {
    success: false,
    error: 'Internal server error'
  }
}
```

### State Management Pattern
```typescript
// Local state with React hooks
const [cart, setCart] = useState<Cart>(initialCart)

// Persistent state with localStorage
const usePersistentState = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    }
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState] as const
}
```

## 🔄 Component Flow Patterns

### Product Discovery Flow
```
Homepage → Shop Page → Product Filters → Product List → Product Detail → Add to Cart
    ↓
Blog Articles → Product Guides → Related Products → Purchase
```

### Purchase Flow
```
Product Detail → Add to Cart → Cart Review → Checkout → Payment → Order Confirmation
    ↓
Order Tracking → Delivery → Review Product
```

### Content Consumption Flow
```
Blog → Article Categories → Individual Articles → Related Products → Purchase
    ↓
Newsletter Signup → Email Content → Return to Site
```

## 🎵 Audio Integration Pattern

### Audio Player Component
```typescript
interface AudioPlayerProps {
  src: string
  title: string
  autoPlay?: boolean
  loop?: boolean
  onPlay?: () => void
  onPause?: () => void
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  autoPlay = false,
  loop = false,
  onPlay,
  onPause
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  
  // Audio controls implementation
  // Mobile audio handling
  // Accessibility features
}
```

### Audio Management Strategy
- **Lazy Loading**: Load audio files on demand
- **Mobile Optimization**: Handle autoplay restrictions
- **Quality Selection**: Multiple quality options
- **Caching**: Service worker audio caching
- **Accessibility**: Transcripts and descriptions

## 🌍 Internationalization Pattern

### Translation System
```typescript
// Translation function
const t = (key: string, locale: Locale = 'en', params?: Record<string, any>): string => {
  const translation = translations[key]?.[locale] || translations[key]?.en || key
  
  if (params) {
    return Object.entries(params).reduce(
      (str, [param, value]) => str.replace(`{${param}}`, String(value)),
      translation
    )
  }
  
  return translation
}

// Usage in components
const ProductCard = ({ product, locale }: ProductCardProps) => {
  return (
    <div>
      <h3>{product.name[locale]}</h3>
      <p>{t('product.price', locale, { price: product.price })}</p>
    </div>
  )
}
```

### Locale Detection
```typescript
// Automatic locale detection
const getLocaleFromPathname = (pathname: string): Locale => {
  const segments = pathname.split('/')
  const localeSegment = segments[1]
  
  if (['en', 'ru', 'uk'].includes(localeSegment)) {
    return localeSegment as Locale
  }
  
  return 'en' // Default locale
}
```

## 📱 PWA Pattern

### Service Worker Registration
```typescript
class PWAManager {
  private deferredPrompt: any = null
  
  async initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/sw.js')
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        // Show update notification
      })
    }
  }
  
  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) return false
    
    const result = await this.deferredPrompt.prompt()
    const outcome = await result.userChoice
    
    return outcome === 'accepted'
  }
}
```

### Offline Storage Pattern
```typescript
class OfflineStorage {
  static async cacheProducts(products: Product[]): Promise<void> {
    if ('caches' in window) {
      const cache = await caches.open('products-cache')
      // Cache product data and images
    }
  }
  
  static getCachedProducts(): Product[] {
    const cached = localStorage.getItem('himalayan_products_cache')
    return cached ? JSON.parse(cached) : []
  }
}
```

## 🛒 E-commerce Pattern

### Cart Management
```typescript
interface CartItem {
  productId: string
  quantity: number
  variant?: string
  addedAt: string
}

interface Cart {
  items: CartItem[]
  totalItems: number
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  updatedAt: string
}

// Cart operations
const addToCart = async (productId: string, quantity: number = 1) => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity })
  })
  
  return response.json()
}
```

### Checkout Flow Pattern
```typescript
interface CheckoutStep {
  id: string
  title: string
  isComplete: boolean
  isActive: boolean
}

const checkoutSteps: CheckoutStep[] = [
  { id: 'cart', title: 'Cart Review', isComplete: false, isActive: true },
  { id: 'shipping', title: 'Shipping', isComplete: false, isActive: false },
  { id: 'payment', title: 'Payment', isComplete: false, isActive: false },
  { id: 'confirmation', title: 'Confirmation', isComplete: false, isActive: false }
]
```

## 🎨 Styling Patterns

### Tailwind CSS Customization
```typescript
// tailwind.config.ts
const config: Config = {
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefdf8',
          500: '#d4b27a',
          900: '#705018',
        },
        cream: {
          50: '#fefefe',
          500: '#ebe3d0',
          900: '#c69870',
        },
        charcoal: {
          50: '#f6f6f6',
          500: '#6d6d6d',
          900: '#333333',
        }
      }
    }
  }
}
```

### Component Variants Pattern
```typescript
// Using class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## 🔧 Error Handling Pattern

### API Error Handling
```typescript
// Consistent error responses
const handleApiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Request failed',
        message: data.message
      }
    }
    
    return {
      success: true,
      data: data
    }
  } catch (error) {
    return handleApiError(error)
  }
}
```

### Component Error Boundaries
```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    
    return this.props.children
  }
}
```

## 📊 Performance Patterns

### Image Optimization
```typescript
// Next.js Image component with optimization
import Image from 'next/image'

const ProductImage: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Image
      src={product.images[0].url}
      alt={product.images[0].alt.en}
      width={400}
      height={400}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      priority={product.isFeatured}
    />
  )
}
```

### Code Splitting
```typescript
// Dynamic imports for code splitting
const AudioPlayer = dynamic(() => import('./AudioPlayer'), {
  loading: () => <AudioPlayerSkeleton />,
  ssr: false // Disable SSR for audio components
})

const CheckoutForm = dynamic(() => import('./CheckoutForm'), {
  loading: () => <CheckoutSkeleton />
})
```

### Lazy Loading Pattern
```typescript
// Intersection Observer for lazy loading
const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  
  useEffect(() => {
    if (!ref) return
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)
    
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, options])
  
  return [setRef, isIntersecting] as const
}
``` 