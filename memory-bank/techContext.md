# Tech Context: Himalayan Sound E-commerce Platform

## 🛠️ Technology Stack

### Core Framework
- **Next.js 13.5.1** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5.8.3** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Accessible component primitives
- **Lucide React 0.446.0** - Icon library
- **Tailwind CSS Animate 1.0.7** - Animation utilities

### Form Management
- **React Hook Form 7.53.0** - Form state management
- **Zod 3.23.8** - Schema validation
- **@hookform/resolvers 3.9.0** - Form validation integration

### Data Visualization
- **Recharts 2.12.7** - Chart library
- **Embla Carousel React 8.3.0** - Carousel component

### PWA & Offline
- **Service Worker** - Offline functionality
- **Web App Manifest** - App installation
- **Push Notifications** - Browser notifications

### Development Tools
- **ESLint 9.31.0** - Code linting (currently disabled)
- **PostCSS 8.4.30** - CSS processing
- **Autoprefixer 10.4.15** - CSS vendor prefixes

## 📦 Key Dependencies

### UI Components (Radix UI)
```json
{
  "@radix-ui/react-accordion": "^1.2.0",
  "@radix-ui/react-alert-dialog": "^1.1.1",
  "@radix-ui/react-aspect-ratio": "^1.1.0",
  "@radix-ui/react-avatar": "^1.1.0",
  "@radix-ui/react-checkbox": "^1.1.1",
  "@radix-ui/react-collapsible": "^1.1.0",
  "@radix-ui/react-context-menu": "^2.2.1",
  "@radix-ui/react-dialog": "^1.1.1",
  "@radix-ui/react-dropdown-menu": "^2.1.1",
  "@radix-ui/react-hover-card": "^1.1.1",
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-menubar": "^1.1.1",
  "@radix-ui/react-navigation-menu": "^1.2.0",
  "@radix-ui/react-popover": "^1.1.1",
  "@radix-ui/react-progress": "^1.1.0",
  "@radix-ui/react-radio-group": "^1.2.0",
  "@radix-ui/react-scroll-area": "^1.1.0",
  "@radix-ui/react-select": "^2.1.1",
  "@radix-ui/react-separator": "^1.1.0",
  "@radix-ui/react-slider": "^1.2.0",
  "@radix-ui/react-slot": "^1.1.0",
  "@radix-ui/react-switch": "^1.1.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "@radix-ui/react-toast": "^1.2.1",
  "@radix-ui/react-toggle": "^1.1.0",
  "@radix-ui/react-toggle-group": "^1.1.0",
  "@radix-ui/react-tooltip": "^1.1.2"
}
```

### Utility Libraries
```json
{
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.2",
  "date-fns": "^3.6.0",
  "cmdk": "^1.0.0",
  "input-otp": "^1.2.4",
  "react-day-picker": "^8.10.1",
  "react-resizable-panels": "^2.1.3",
  "sonner": "^1.5.0",
  "vaul": "^0.9.9"
}
```

### Type Definitions
```json
{
  "@types/node": "^24.0.14",
  "@types/react": "18.2.22",
  "@types/react-dom": "18.2.7"
}
```

## ⚙️ Configuration Files

### Next.js Configuration
```javascript
// next.config.js
const nextConfig = {
  eslint: {
    enabled: false, // Currently disabled
  },
  images: { 
    unoptimized: true, // For development
  },
};
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  }
}
```

### Tailwind CSS Configuration
```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: { /* Custom gold palette */ },
        cream: { /* Custom cream palette */ },
        charcoal: { /* Custom charcoal palette */ }
      }
    }
  },
  plugins: [require('tailwindcss-animate')],
};
```

### shadcn/ui Configuration
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

## 🚀 Build & Development

### Scripts
```json
{
  "scripts": {
    "dev": "NODE_OPTIONS=\"--max-old-space-size=4096\" next dev",
    "build": "NODE_OPTIONS=\"--max-old-space-size=4096\" next build",
    "start": "NODE_OPTIONS=\"--max-old-space-size=4096\" next start",
    "lint": "next lint"
  }
}
```

### Memory Optimization
- **4GB Heap Size**: Configured for large builds
- **Node Options**: Optimized for memory-intensive operations
- **Build Performance**: Tailored for complex component trees

## 📱 PWA Configuration

### Web App Manifest
```json
{
  "name": "Himalayan Sound - Authentic Sound Healing",
  "short_name": "Himalayan Sound",
  "description": "Discover authentic handcrafted Nepali singing bowls and sound meditation instruments for your wellness journey.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ebe3d0",
  "theme_color": "#d4b27a",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "en",
  "categories": ["shopping", "wellness", "meditation"]
}
```

### Service Worker Features
- **Offline Caching**: Product data and images
- **Push Notifications**: Order updates and promotions
- **Background Sync**: Cart synchronization
- **Update Management**: App update notifications

## 🌍 Internationalization

### Supported Languages
- **English (en)** - Primary language
- **Russian (ru)** - Secondary market
- **Ukrainian (uk)** - Regional market

### Translation System
- **Static Translations**: JSON-based translation files
- **Dynamic Content**: Database-driven content
- **Locale Detection**: Automatic language detection
- **Cultural Adaptation**: Region-specific content

## 🎵 Audio Integration

### Audio Formats
- **MP3**: Primary format for compatibility
- **WAV**: High-quality samples
- **OGG**: Alternative format for smaller files

### Audio Features
- **Lazy Loading**: Load on demand
- **Mobile Optimization**: Handle autoplay restrictions
- **Quality Selection**: Multiple quality options
- **Caching**: Service worker audio caching

## 🛒 E-commerce Features

### Payment Integration (Planned)
- **Stripe**: Primary payment processor
- **PayPal**: Alternative payment method
- **Local Payment**: Region-specific options

### Shipping Integration (Planned)
- **Real-time Rates**: API integration with carriers
- **International Shipping**: Worldwide delivery
- **Tracking**: Order tracking integration

## 🔧 Development Constraints

### Performance Requirements
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Mobile Performance**: 90+ Lighthouse score
- **PWA Score**: 90+ for installability
- **Accessibility**: WCAG AA compliance

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

### Security Requirements
- **HTTPS Only**: Secure connections required
- **Content Security Policy**: XSS protection
- **Data Protection**: GDPR compliance
- **Payment Security**: PCI DSS compliance (when implemented)

## 📊 Monitoring & Analytics

### Performance Monitoring (Planned)
- **Core Web Vitals**: Real-time monitoring
- **Error Tracking**: Sentry integration
- **User Analytics**: Privacy-compliant tracking
- **Conversion Tracking**: E-commerce metrics

### SEO Requirements
- **Structured Data**: Schema.org markup
- **Meta Tags**: Comprehensive meta information
- **Sitemap**: XML sitemap generation
- **Robots.txt**: Search engine guidance

## 🔄 Deployment & CI/CD

### Build Process
1. **Type Checking**: TypeScript compilation
2. **Linting**: ESLint code quality checks
3. **Testing**: Unit and integration tests (planned)
4. **Build**: Next.js production build
5. **Optimization**: Image and asset optimization

### Deployment Strategy (Planned)
- **Vercel**: Primary deployment platform
- **CDN**: Global content delivery
- **Environment Variables**: Secure configuration management
- **Rollback**: Quick deployment rollback capability

## 🎯 Future Technical Considerations

### Scalability
- **Database**: PostgreSQL with Prisma ORM (planned)
- **Caching**: Redis for session and data caching
- **CDN**: Global asset delivery optimization
- **Microservices**: API service separation (future)

### Advanced Features
- **Real-time Chat**: Customer support integration
- **AR/VR**: 3D product visualization
- **AI Recommendations**: Product suggestion engine
- **Voice Search**: Audio-based product discovery

### Performance Optimizations
- **Image Optimization**: WebP and AVIF support
- **Code Splitting**: Dynamic imports for better loading
- **Bundle Analysis**: Webpack bundle optimization
- **Caching Strategy**: Aggressive caching policies 