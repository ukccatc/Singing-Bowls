# Supabase Setup Instructions

## Overview

This guide will help you set up Supabase for the Himalayan Sound e-commerce platform with media integration support.

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `himalayan-sound`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

## Step 2: Get Project Credentials

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Other existing variables...
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 4: Create Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New Query"
3. Copy and paste the contents of `scripts/supabase-schema.sql`
4. Click "Run" to execute the schema

This will create:
- `products` table with media support
- `orders` table
- `order_items` table
- `customers` table
- `articles` table
- Indexes for performance
- Triggers for automatic timestamps

## Step 5: Verify Setup

### Test Database Connection

1. Go to **Table Editor** in Supabase
2. You should see the `products` table
3. Check that sample products were inserted

### Test API Endpoints

1. Start your development server: `npm run dev`
2. Go to http://localhost:3000/admin/products/new
3. Try creating a product with YouTube video
4. Check the `products` table in Supabase to see the new product

## Step 6: Configure Row Level Security (RLS)

For production, you should enable RLS:

1. Go to **Authentication** → **Policies**
2. Create policies for your tables:

### Products Table
```sql
-- Allow public read access to products
CREATE POLICY "Public can view products" ON products
FOR SELECT USING (is_available = true);

-- Allow authenticated users to insert/update products (admin only)
CREATE POLICY "Authenticated users can manage products" ON products
FOR ALL USING (auth.role() = 'authenticated');
```

### Orders Table
```sql
-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
FOR SELECT USING (auth.uid()::text = customer_id);

-- Users can create their own orders
CREATE POLICY "Users can create orders" ON orders
FOR INSERT WITH CHECK (auth.uid()::text = customer_id);
```

## Step 7: Storage Setup (Optional)

If you want to store images in Supabase Storage:

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket called `product-images`
3. Set up policies for public read access:

```sql
-- Allow public read access to product images
CREATE POLICY "Public can view product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
```

## Step 8: Production Considerations

### Environment Variables
- Use different Supabase projects for development and production
- Never commit `.env.local` to version control
- Use your hosting platform's environment variable settings

### Database Backups
- Enable automatic backups in Supabase
- Set up point-in-time recovery
- Test restore procedures

### Performance
- Monitor query performance in Supabase dashboard
- Add indexes as needed
- Consider connection pooling for high traffic

## Troubleshooting

### Common Issues

#### "Invalid API key" Error
- Check that your environment variables are correct
- Ensure you're using the right keys (anon vs service role)

#### "Table doesn't exist" Error
- Make sure you ran the SQL schema
- Check that the table names match exactly

#### "Permission denied" Error
- Check your RLS policies
- Ensure you're using the correct authentication

#### Connection Issues
- Verify your Supabase URL is correct
- Check your internet connection
- Ensure Supabase project is not paused

### Getting Help

1. Check Supabase documentation: https://supabase.com/docs
2. Join Supabase Discord community
3. Check project logs in Supabase dashboard
4. Review Next.js logs in your terminal

## Next Steps

After setting up Supabase:

1. **Test the media integration** - Create products with YouTube videos
2. **Set up authentication** - Configure user management
3. **Configure payments** - Integrate Stripe for orders
4. **Set up email** - Configure email notifications
5. **Deploy to production** - Use Vercel or Netlify

## Security Best Practices

1. **Never expose service role key** in client-side code
2. **Use RLS policies** to control data access
3. **Validate all inputs** before database operations
4. **Use HTTPS** in production
5. **Regular security audits** of your database policies

Your Supabase setup is now complete! You can start creating products with media integration.