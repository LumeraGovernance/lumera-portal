# Deployment Guide for Lumera Market

## ⚡ Static Site - Zero Build!

Your Lumera Market is now a **static HTML site**. No build process needed!

## Quick Start

### 1. Test Locally (Optional)

**Method A - Double-click:**
Just open `index.html` in your browser. Works immediately!

**Method B - Local server:**
```bash
# Navigate to your project directory
cd lumera-market

# Start simple server (Python)
python -m http.server 8000
```

Visit `http://localhost:8000` to see your site running locally.

## Production Deployment

### Option 1: Netlify Drop (Easiest - 30 seconds!)

**No account needed! Instant deployment:**

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. **Drag your entire `lumera-market` folder** onto the page
3. Wait 10 seconds
4. Get your live URL: `https://random-name.netlify.app`
5. **Done!** Your site is live

**With account (for custom domain):**
- Create free Netlify account
- Same process, but you can then:
  - Change site name
  - Add custom domain
  - Update site by dragging new folder

**No build settings needed** - it's pure HTML!

### Option 2: Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Click "New Project"
3. Upload your folder or connect GitHub
4. **No build configuration needed!**
5. Click "Deploy"
6. Live in ~30 seconds

**URL:** `https://lumera-market.vercel.app`

**Custom Domain:**
- Settings → Domains
- Add `market.lumeragovernance.com`
- Follow DNS instructions

---

### Option 3: GitHub Pages (Free Forever)

1. **Create GitHub repository**
2. **Upload your files:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/lumera-market.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Click "Pages" in sidebar
   - Source: Deploy from branch
   - Branch: `main` → folder: `/ (root)`
   - Click "Save"

4. **Wait 1 minute**, then visit:
   `https://yourusername.github.io/lumera-market`

**That's it!** No build configuration needed.

---

### Option 4: Traditional Hosting (cPanel, etc.)

**Super simple - just upload files:**

1. **Connect via FTP** (FileZilla, Cyberduck, or cPanel File Manager)

2. **Upload ALL files** to your `public_html/` folder:
   - `index.html`
   - `app.js`
   - `public/` folder

3. **Visit your domain** - It works immediately!

**No build, no configuration, no .htaccess needed!**

The site works because it's pure HTML. Any web host works!

---

## Environment Variables

If you've set up a database (see `BACKEND_SETUP.md`):

1. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your values:**
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Add to hosting platform:**
   - **Vercel:** Settings → Environment Variables
   - **Netlify:** Site Settings → Environment Variables
   - **GitHub Pages:** Use GitHub Secrets

---

## Performance Optimization

### Image Optimization

Current setup uses Unsplash images. For production:

1. **Use Cloudinary or ImageKit:**
   ```bash
   npm install cloudinary
   ```

2. **Or Supabase Storage:**
   - Upload images to Supabase Storage
   - Use CDN URLs in product data

### Lazy Loading

Images already use lazy loading. For routes:
```typescript
const HomePage = lazy(() => import('./components/pages/HomePage'))
```

### Caching

Add cache headers in your hosting:
```
# Vercel (vercel.json)
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Monitoring

### Analytics

Add Google Analytics:
```typescript
// In main.tsx
import ReactGA from 'react-ga4';

ReactGA.initialize('YOUR_GA_ID');
```

### Error Tracking

Add Sentry:
```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
});
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images Not Loading

- Check image URLs are accessible
- Verify `public/` folder is deployed
- Check browser console for errors

### Routes Not Working

- Ensure your host supports SPA routing
- Add redirect rules (see above)
- Check `base` in vite.config.ts

### WhatsApp Links Not Working

- Ensure phone numbers are in international format
- Remove spaces and special characters
- Test format: `12345678900` (no +, no spaces)

---

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All images display
- [ ] Search works
- [ ] Filters work
- [ ] Product details page opens
- [ ] WhatsApp contact buttons work
- [ ] Favorites save/unsave works
- [ ] Seller profile pages work
- [ ] Mobile responsive
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain connected (if applicable)
- [ ] Analytics tracking (if setup)

---

## Updating Content

### Without Database

Edit `App.tsx` and modify the `products` array:
```typescript
const products: Product[] = [
  {
    id: 9,
    name: "New Product",
    price: 99.99,
    // ... rest of fields
  }
];
```

Then deploy:
```bash
git add .
git commit -m "Add new products"
git push
```

### With Database (Recommended)

See `BACKEND_SETUP.md` for setting up Supabase. Then you can:
- Add products via Supabase dashboard
- No code changes needed
- Updates appear instantly

---

## Support

For issues with:
- **Code:** Check `README.md` and `BACKEND_SETUP.md`
- **Deployment:** Check hosting provider docs
- **Figma Make:** Contact Figma support

---

**Remember:** Replace `/public/lumera-flag.svg` with your official Lumera flag before deploying!
