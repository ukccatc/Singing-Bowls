# 🚀 Himalayan Sound - Setup Checklist

## ✅ Completed

- [x] Cloudinary integration configured
- [x] Media upload manager created
- [x] Product form with image selection created
- [x] Admin routes protected with authentication
- [x] Admin email configured: `ukccatc@gmail.com`
- [x] API endpoints secured with admin verification
- [x] Database migration SQL prepared

---

## ⚠️ REQUIRED: Run Database Migration

### Step 1: Open Supabase Dashboard
Go to: https://app.supabase.com

### Step 2: Select Your Project
Click on your "Himalayan Sound" project

### Step 3: Open SQL Editor
- Click **SQL Editor** in the left sidebar
- Click **New Query**

### Step 4: Copy & Paste SQL
Copy this entire SQL block:

```sql
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

CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON products FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON products FOR DELETE USING (auth.role() = 'authenticated');
```

### Step 5: Execute
Click the **Run** button (or press Ctrl+Enter)

### Step 6: Verify
You should see a success message. The products table is now created!

---

## 🎯 Quick Start Guide

### 1. Start Development Server
```bash
npm run dev
```

### 2. Access Admin Panel
Go to: `http://localhost:3000/admin/media`

You'll be redirected to login. Sign up with:
- **Email**: `ukccatc@gmail.com`
- **Password**: Your choice

### 3. Upload Images
1. Click "Upload Images"
2. Select images from your computer
3. Images will appear in the gallery
4. Click "Copy" to get the image URL

### 4. Create Products
1. Go to: `http://localhost:3000/admin/products`
2. Fill in product details:
   - Name (English & Russian)
   - Description (English & Russian)
   - Price
   - Category
   - Stock
3. Click "Select Image" to choose from uploaded images
4. Click "Create Product"

### 5. View Products
Products are saved to your Supabase database and ready to display on your store!

---

## 📋 Admin Features

### Media Library (`/admin/media`)
- ✅ Upload images (drag & drop)
- ✅ View all uploaded images
- ✅ Copy image URLs
- ✅ Delete images
- ✅ Filter by recent/all

### Product Management (`/admin/products`)
- ✅ Create new products
- ✅ Bilingual support (EN/RU)
- ✅ Select images from media library
- ✅ Set price and stock
- ✅ Categorize products

### Orders (`/admin/orders`)
- 🔄 Coming soon

### Analytics (`/admin/analytics`)
- 🔄 Coming soon

---

## 🔐 Security

✅ Admin routes require authentication  
✅ Only `ukccatc@gmail.com` can access admin panel  
✅ API endpoints verify admin status  
✅ Database has row-level security  
✅ Auth tokens sent with all API requests  

---

## 📁 Project Structure

```
app/
├── admin/
│   ├── layout.tsx              # Admin sidebar
│   ├── media/page.tsx          # Media library
│   ├── products/page.tsx       # Add products
│   ├── orders/page.tsx         # Orders (placeholder)
│   └── analytics/page.tsx      # Analytics (placeholder)
├── api/
│   ├── products/route.ts       # Product API
│   └── cloudinary/
│       ├── list/route.ts       # List images
│       └── delete/route.ts     # Delete images
components/
├── admin/
│   ├── ImageUploadManager.tsx  # Media library UI
│   └── ProductForm.tsx         # Product form
lib/
├── auth/
│   └── admin.ts                # Admin auth logic
└── types/
    └── product.ts             # Product types
```

---

## 🆘 Troubleshooting

### "Unauthorized - Admin access required"
- Make sure you're logged in with `ukccatc@gmail.com`
- Check browser console for errors
- Try logging out and back in

### "Products table doesn't exist"
- Run the SQL migration in Supabase
- Check that the migration executed successfully
- Refresh the page

### "Can't upload images"
- Check Cloudinary credentials in `.env.local`
- Verify upload preset is set to "Unsigned"
- Check browser console for errors

### "Images not showing in product form"
- Make sure you're logged in as admin
- Check that images were uploaded to Cloudinary
- Try refreshing the page

---

## ✅ Final Checklist

- [ ] Run database migration in Supabase
- [ ] Start dev server: `npm run dev`
- [ ] Go to `/admin/media` and sign up with `ukccatc@gmail.com`
- [ ] Upload test images
- [ ] Go to `/admin/products`
- [ ] Create test product with image
- [ ] Verify product appears in database

Once all items are checked, you're ready to:
- Display products on your store
- Add shopping cart functionality
- Set up payment processing

---

## 📞 Next Steps

After completing this setup:

1. **Display Products** - Create product listing page
2. **Product Details** - Create product detail page
3. **Shopping Cart** - Add cart functionality
4. **Checkout** - Add payment integration

Let me know when you're ready for the next phase!
