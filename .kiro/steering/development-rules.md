# Himalayan Sound - Development Rules & Best Practices

## Overview
This document establishes the development standards and best practices for the Himalayan Sound e-commerce platform. All team members must follow these guidelines to maintain code quality, consistency, and scalability.

---

## 1. Project Structure & Organization

### File Organization
- **App Router Structure**: Use Next.js 13+ App Router with `/app` directory
- **Route Segments**: Each route segment should have its own folder with `page.tsx`, `layout.tsx`, and supporting files
- **Component Colocation**: Keep components close to where they're used; extract to shared only when reused 2+ times
- **API Routes**: Place API routes in `/app/api/[route]/route.ts` following RESTful conventions
- **Utilities**: Place shared utilities in `/lib` with clear subdirectories (`/lib/utils`, `/lib/hooks`, `/lib/types`)

### Directory Structure
```
app/
├── [locale]/              # Locale-based routing
│   ├── layout.tsx         # Root layout with locale context
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop routes
│   ├── product/           # Product routes
│   ├── cart/              # Cart routes
│   ├── checkout/          # Checkout routes
│   └── api/               # API routes
components/
├── ui/                    # Radix UI wrapper components
├── product/               # Product-specific components
├── ecommerce/             # E-commerce components
├── layout/                # Layout components
└── shared/                # Shared components
lib/
├── types.ts               # TypeScript interfaces
├── translations.ts        # i18n translations
├── utils/                 # Utility functions
├── hooks/                 # Custom React hooks
├── supabase/              # Database client
└── data/                  # Static data
```

---

## 2. TypeScript Standards

### Type Safety
- **Strict Mode**: Always use `"strict": true` in `tsconfig.json`
- **Explicit Types**: Never use `any` type; use `unknown` if necessary and narrow it
- **Interface vs Type**: Use `interface` for object shapes, `type` for unions and primitives
- **Generics**: Use generics for reusable components and functions
- **Enums**: Use `enum` for fixed sets of values (e.g., `ProductCategory`)

### Type Definitions
```typescript
// ✅ Good: Explicit types
interface Product {
  id: string;
  name: Record<string, string>;
  price: number;
}

// ❌ Bad: Using any
const product: any = {};

// ✅ Good: Generic component
function List<T>({ items }: { items: T[] }) {
  return items.map((item) => <div key={String(item)}>item</div>);
}
```

---

## 3. React & Component Patterns

### Component Structure
- **Functional Components**: Always use functional components with hooks
- **Server Components**: Use Server Components by default in App Router
- **Client Components**: Mark with `'use client'` only when needed (interactivity, hooks)
- **Props Interface**: Define props as a separate interface
- **Naming**: Use PascalCase for components, camelCase for functions

### Component Template
```typescript
'use client';

import { ReactNode } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  children?: ReactNode;
}

export function ProductCard({ id, name, price, children }: ProductCardProps) {
  return (
    <div className="p-4 border rounded">
      <h3>{name}</h3>
      <p>${price}</p>
      {children}
    </div>
  );
}
```

### Hooks Best Practices
- **Custom Hooks**: Extract logic into custom hooks (prefix with `use`)
- **Hook Dependencies**: Always include all dependencies in dependency arrays
- **Hook Order**: Call hooks at the top level, never conditionally
- **Memoization**: Use `useMemo` and `useCallback` only when performance is critical

---

## 4. Tailwind CSS Standards

### Utility-First Approach
- **No Custom CSS**: Avoid writing custom CSS; use Tailwind utilities
- **Component Extraction**: Extract common patterns into React components, not CSS classes
- **Class Organization**: Order classes logically: layout → sizing → spacing → colors → effects
- **Responsive Design**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- **Dark Mode**: Use `dark:` variant for dark mode support

### Tailwind Best Practices
```typescript
// ✅ Good: Organized classes
<div className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-md dark:bg-gray-900">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Title</h3>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
    Action
  </button>
</div>

// ❌ Bad: Unorganized, custom CSS
<div style={{ display: 'flex', justifyContent: 'space-between' }} className="p-4">
  <h3>Title</h3>
</div>
```

### Responsive Design
```typescript
// ✅ Good: Mobile-first responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {products.map(product => <ProductCard key={product.id} {...product} />)}
</div>
```

---

## 5. Form Handling with React Hook Form & Zod

### Form Validation Pattern
- **Schema First**: Define Zod schema before form component
- **Type Inference**: Use `z.infer<typeof schema>` for form types
- **Error Handling**: Display field-level errors with clear messages
- **Async Validation**: Use `refine()` or `superRefine()` for async validation

### Form Template
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('name')} placeholder="Name" />
      {errors.name && <span className="text-red-600">{errors.name.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 6. Data Fetching & API Routes

### Server Components Data Fetching
- **Fetch in Server Components**: Use `fetch()` directly in Server Components
- **Revalidation**: Use `revalidatePath()` or `revalidateTag()` for ISR
- **Error Handling**: Wrap fetches in try-catch with proper error boundaries

### API Route Pattern
```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const products = await db.products.findAll();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await db.products.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 400 }
    );
  }
}
```

---

## 7. Internationalization (i18n)

### Locale Handling
- **URL-Based Routing**: Use `/[locale]/` for locale routing
- **Locale Context**: Provide locale through context or params
- **Translation Keys**: Use dot notation for nested translations (`common.button.submit`)
- **Type Safety**: Generate types from translation keys

### i18n Pattern
```typescript
// lib/translations.ts
export const translations = {
  en: {
    common: {
      button: {
        submit: 'Submit',
        cancel: 'Cancel',
      },
    },
  },
  ru: {
    common: {
      button: {
        submit: 'Отправить',
        cancel: 'Отмена',
      },
    },
  },
};

// Usage in components
function Button({ locale }: { locale: 'en' | 'ru' }) {
  return <button>{translations[locale].common.button.submit}</button>;
}
```

---

## 8. State Management

### Client-Side State
- **React Hooks**: Use `useState` for local component state
- **Context API**: Use for global state (auth, locale, theme)
- **Avoid Redux**: Keep state management simple; use Context + hooks
- **Persistence**: Use localStorage for cart and user preferences

### Context Pattern
```typescript
'use client';

import { createContext, useContext, ReactNode } from 'react';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems([...items, item]);
  };

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
```

---

## 9. Error Handling & Validation

### Error Boundaries
- **Catch Errors**: Use error boundaries for component-level errors
- **Fallback UI**: Provide meaningful fallback UI
- **Logging**: Log errors for debugging

### Error Boundary Template
```typescript
'use client';

import { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Error:', error);
    return fallback || <div>Something went wrong</div>;
  }
}
```

### Input Validation
- **Client-Side**: Use Zod for schema validation
- **Server-Side**: Always validate on server, never trust client
- **Error Messages**: Provide clear, actionable error messages

---

## 10. Performance Optimization

### Image Optimization
- **Next.js Image**: Always use `<Image>` component from `next/image`
- **Responsive Images**: Use `sizes` prop for responsive images
- **Lazy Loading**: Enable by default; disable only when necessary

### Code Splitting
- **Dynamic Imports**: Use `dynamic()` for large components
- **Route-Based Splitting**: Next.js handles automatically
- **Bundle Analysis**: Monitor bundle size regularly

### Caching Strategy
- **Static Generation**: Use `generateStaticParams()` for dynamic routes
- **ISR**: Use `revalidate` for periodic revalidation
- **CDN**: Leverage Netlify/Vercel CDN for static assets

---

## 11. SEO Best Practices

### Metadata
- **Dynamic Metadata**: Use `generateMetadata()` for dynamic pages
- **Structured Data**: Include JSON-LD for products and articles
- **Open Graph**: Include OG tags for social sharing

### SEO Template
```typescript
// app/product/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}
```

---

## 12. Testing Standards

### Unit Tests
- **Coverage**: Aim for 80%+ coverage on critical paths
- **Framework**: Use Jest + React Testing Library
- **Naming**: Use descriptive test names
- **Isolation**: Test one thing per test

### Test Template
```typescript
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('should display product name and price', () => {
    render(<ProductCard id="1" name="Bowl" price={99} />);
    
    expect(screen.getByText('Bowl')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
  });
});
```

---

## 13. Security Best Practices

### Authentication & Authorization
- **Supabase Auth**: Use Supabase for authentication
- **Protected Routes**: Implement middleware for route protection
- **API Security**: Validate all inputs on server
- **Secrets**: Never commit `.env` files; use environment variables

### Data Protection
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure CORS properly
- **SQL Injection**: Use parameterized queries (Supabase handles this)
- **XSS Prevention**: Sanitize user input; React escapes by default

---

## 14. Deployment & Environment

### Environment Variables
- **Public Variables**: Prefix with `NEXT_PUBLIC_`
- **Secret Variables**: Keep in `.env.local` (never commit)
- **Validation**: Validate environment variables on startup

### Deployment Checklist
- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Build succeeds without errors
- [ ] Performance metrics acceptable
- [ ] SEO tags present
- [ ] Security headers configured

---

## 15. Code Style & Formatting

### Naming Conventions
- **Components**: PascalCase (`ProductCard`, `ShoppingCart`)
- **Functions**: camelCase (`getProduct`, `calculateTotal`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`, `API_URL`)
- **Files**: kebab-case for components (`product-card.tsx`)

### Code Formatting
- **Prettier**: Use Prettier for consistent formatting
- **ESLint**: Use ESLint for code quality
- **Line Length**: Keep lines under 100 characters
- **Imports**: Sort imports alphabetically

### Import Organization
```typescript
// 1. External packages
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// 2. Internal modules
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/hooks/useCart';

// 3. Types
import type { Product } from '@/lib/types';
```

---

## 16. Git & Version Control

### Commit Messages
- **Format**: `type(scope): description`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Example**: `feat(product): add product filtering`

### Branch Naming
- **Feature**: `feature/product-filtering`
- **Bug Fix**: `fix/cart-calculation`
- **Hotfix**: `hotfix/payment-issue`

### Pull Request Process
1. Create feature branch from `main`
2. Make changes with clear commits
3. Create PR with description
4. Request review from team
5. Address feedback
6. Merge after approval

---

## 17. Documentation

### Code Comments
- **Why, Not What**: Explain why, not what the code does
- **Complex Logic**: Comment complex algorithms
- **TODOs**: Use `// TODO:` for future improvements

### README & Docs
- **Setup Instructions**: Clear installation steps
- **API Documentation**: Document all API endpoints
- **Component Library**: Document reusable components
- **Troubleshooting**: Common issues and solutions

---

## 18. Accessibility (a11y)

### WCAG Compliance
- **Semantic HTML**: Use proper HTML elements
- **ARIA Labels**: Add labels for screen readers
- **Keyboard Navigation**: Ensure keyboard accessibility
- **Color Contrast**: Maintain sufficient contrast ratios

### Accessibility Checklist
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color is not the only indicator
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Proper heading hierarchy

---

## 19. Monitoring & Analytics

### Error Tracking
- **Sentry**: Use for error tracking in production
- **Logging**: Log important events and errors
- **Alerts**: Set up alerts for critical errors

### Performance Monitoring
- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Bundle Size**: Track bundle size changes
- **API Performance**: Monitor API response times

---

## 20. Continuous Improvement

### Code Review Checklist
- [ ] Code follows style guide
- [ ] Tests are included and passing
- [ ] No console errors or warnings
- [ ] Performance impact assessed
- [ ] Security implications reviewed
- [ ] Documentation updated
- [ ] Accessibility considered

### Regular Audits
- **Monthly**: Review code quality metrics
- **Quarterly**: Assess performance and security
- **Annually**: Evaluate tech stack and dependencies

---

## Quick Reference

### Common Commands
```bash
# Development
npm run dev              # Start dev server
npm run lint            # Run ESLint
npm run build           # Build for production
npm start               # Start production server

# Testing
npm test                # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

### Useful Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zod Documentation](https://zod.dev)
- [React Hook Form Documentation](https://react-hook-form.com)

---

**Last Updated**: February 2026
**Version**: 1.0
