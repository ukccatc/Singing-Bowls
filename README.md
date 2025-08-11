# 🎵 Himalayan Sound - E-commerce Platform

A modern, multilingual e-commerce platform for authentic Himalayan singing bowls and sound healing instruments, built with Next.js 13, TypeScript, and Tailwind CSS.

## ✨ Features

- 🌍 **Multilingual Support** - English, Russian, Ukrainian
- 🛒 **E-commerce Functionality** - Shopping cart, checkout, order management
- 📱 **PWA Ready** - Progressive Web App with offline support
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔍 **SEO Optimized** - Meta tags, structured data, sitemap
- 🎵 **Audio Integration** - Product audio samples
- 📝 **Blog System** - Content management with categories
- 🔐 **Authentication** - User accounts and profiles
- 📧 **Newsletter** - Email subscription system
- 📞 **Contact Forms** - Customer support integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Bowls

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
Bowls/
├── app/                    # Next.js 13 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── blog/              # Blog pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── product/           # Product pages
│   └── shop/              # Shop/catalog
├── components/            # Reusable components
│   ├── ecommerce/         # E-commerce components
│   ├── layout/            # Layout components
│   ├── product/           # Product components
│   └── ui/                # UI components
├── lib/                   # Utilities and types
├── public/                # Static assets
└── memory-bank/           # Project documentation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **PWA**: Service Worker + Manifest

## 🌍 Internationalization

The app supports three languages:
- 🇺🇸 English (en)
- 🇷🇺 Russian (ru) 
- 🇺🇦 Ukrainian (uk)

Language switching is available via URL prefix: `/en/`, `/ru/`, `/uk/`

## 🛒 E-commerce Features

- Product catalog with filtering and search
- Shopping cart with persistent storage
- Secure checkout process
- Order management and tracking
- Wishlist functionality
- Product reviews and ratings

## 📱 PWA Features

- Offline support
- Install prompt for mobile devices
- Push notifications
- Background sync
- App-like experience

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Customization

- **Colors**: Edit `tailwind.config.ts` for brand colors
- **Content**: Update `lib/data/` for products and articles
- **Translations**: Modify `lib/translations.ts`

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

```bash
# Deploy to Vercel
npm install -g vercel
vercel login
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [deployment guide](./DEPLOYMENT.md)
- Review the project structure
- Check build logs for errors

---

Made with ❤️ for authentic Himalayan sound healing instruments 