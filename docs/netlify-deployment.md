# Netlify Deployment Guide

## Prerequisites

1. **GitHub Repository**: Ensure your project is pushed to a GitHub repository
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)

## Quick Deploy (Recommended)

### 1. Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose "GitHub" as your Git provider
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### 2. Environment Variables Setup

In your Netlify dashboard, go to **Site settings > Environment variables** and add:

#### Required Variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
```

#### Optional Variables:
```
NODE_ENV=production
```

### 3. Build Settings

The `netlify.toml` file is already configured with:
- Node.js version 18
- NPM version 9
- Proper redirects for Next.js
- Security headers
- Cache optimization

### 4. Deploy

1. Click "Deploy site"
2. Netlify will automatically build and deploy your site
3. You'll get a unique URL (e.g., `https://your-site-name.netlify.app`)

### 5. Custom Domain (Optional)

1. Go to **Domain settings** in your Netlify dashboard
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check the build logs in Netlify dashboard
2. **Environment Variables**: Ensure all required variables are set
3. **Supabase Connection**: Verify your Supabase project is accessible

### Build Logs Location:
- Netlify Dashboard > Your Site > Deploys > Click on deploy > Build log

## Post-Deployment

1. Test all functionality on the live site
2. Verify Supabase connections work
3. Check PWA features (if enabled)
4. Test admin panel access

## Continuous Deployment

Netlify automatically deploys when you push to your main branch. Each push triggers a new build and deployment.

## Alternative: Manual Deploy

If you prefer to deploy manually:

1. Run `npm run build` locally
2. Upload the `.next` folder to Netlify
3. Set the publish directory to `.next`

## Current Status

✅ Project builds successfully locally
✅ All TypeScript errors resolved
✅ Netlify configuration ready
✅ Ready for deployment
