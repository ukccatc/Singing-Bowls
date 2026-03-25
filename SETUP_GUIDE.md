# Cloudinary & Product Setup Guide

## ✅ What's Been Set Up

### 1. Cloudinary Integration
- ✅ Environment variables configured
- ✅ Media upload manager at `/admin/media`
- ✅ Image listing and deletion APIs
- ✅ 25GB free storage

### 2. Product Management
- ✅ Product form with image selection
- ✅ Bilingual support (English & Russian)
- ✅ Product API routes
- ✅ Admin dashboard with navigation

### 3. Database
- ✅ Products table migration ready
- ✅ Row-level security configured
- ✅ Indexes for performance

---

## 🚀 Next Steps

### Step 1: Run Database Migration
Go to your Supabase dashboard and run this SQL:

```sql
-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name JSONB NOT NULL,
  description JSONB NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE USING (auth.role() = 'authenticated');
```

### Step 2: Start Your Dev Server
```bash
npm run dev
```

### Step 3: Upload Images
1. Go to `http://localhost:3000/admin/media`
2. Click "Upload Images"
3. Select images from your computer
4. Copy the image URLs

### Step 4: Create Products
1. Go to `http://localhost:3000/admin/products`
2. Fill in product details
3. Click "Select Image" to choose from uploaded images
4. Click "Create Product"

---

## 📁 File Structure

```
app/
├── admin/
│   ├── layout.tsx              # Admin sidebar navigation
│   ├── products/
│   │   └── page.tsx            # Add product page
│   ├── media/
│   │   └── page.tsx            # Media library page
│   ├── orders/
│   │   └── page.tsx            # Orders page (placeholder)
│   └── analytics/
│       └── page.tsx            # Analytics page (placeholder)
├── api/
│   ├── products/
│   │   └── route.ts            # Product CRUD API
│   └── cloudinary/
│       ├── list/
│       │   └── route.ts        # List images API
│       └── delete/
│           └── route.ts        # Delete image API
components/
├── admin/
│   ├── ProductForm.tsx         # Product creation form
│   ├── ImageUploadManager.tsx  # Media library UI
│   └── MediaUploader.tsx       # (deprecated)
lib/
└── types/
    └── product.ts             # Product types
supabase/
└── migrations/
    └── 20260325_create_products_table.sql
```

---

## 🔐 Security Notes

### Admin Routes
Currently, admin routes are **not protected**. To add authentication:

1. Create middleware to check user role
2. Redirect unauthorized users to login
3. Use Supabase auth for admin verification

### Environment Variables
- ✅ `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Public (safe)
- ✅ `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` - Public (safe)
- ⚠️ `CLOUDINARY_API_KEY` - Private (keep secret)
- ⚠️ `CLOUDINARY_API_SECRET` - Private (keep secret)

---

## 📝 API Endpoints

### Products
- `POST /api/products` - Create product
- `GET /api/products` - List all products

### Cloudinary
- `GET /api/cloudinary/list` - List uploaded images
- `POST /api/cloudinary/delete` - Delete image

---

## 🎯 What's Next

1. **Display Products** - Create product listing page
2. **Product Details** - Create product detail page
3. **Shopping Cart** - Add cart functionality
4. **Checkout** - Add payment integration
5. **Admin Auth** - Protect admin routes
6. **Order Management** - Track customer orders

---

## 🆘 Troubleshooting

### Images not uploading?
- Check Cloudinary credentials in `.env.local`
- Verify upload preset is set to "Unsigned"
- Check browser console for errors

### Products not saving?
- Verify products table exists in Supabase
- Check API response in browser Network tab
- Ensure image URL is valid

### Admin pages not loading?
- Clear browser cache
- Restart dev server: `npm run dev`
- Check for TypeScript errors

---

## 📞 Support

For issues:
1. Check the browser console for errors
2. Check the Network tab in DevTools
3. Verify environment variables are set
4. Check Supabase dashboard for table status
