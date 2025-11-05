# ✅ Lumera Market Setup Checklist

Use this checklist when setting up your downloaded project.

## Initial Setup (10 minutes)

- [ ] Node.js 18+ installed
- [ ] Project downloaded and extracted
- [ ] Opened terminal/command prompt
- [ ] Navigated to project folder: `cd lumera-market`
- [ ] Ran `npm install` (wait for completion)
- [ ] Ran `npm run dev`
- [ ] Visited http://localhost:5173
- [ ] Site loads and shows products ✨

## Customization (30 minutes)

### Branding
- [ ] Replace `/public/lumera-flag.svg` with official Lumera flag
- [ ] Verify flag appears in header
- [ ] Test on different screen sizes

### Content
- [ ] Update product listings in `App.tsx`
- [ ] Update seller information in `App.tsx`
- [ ] Verify WhatsApp numbers are correct format
- [ ] Test WhatsApp contact links
- [ ] Add real product images (or keep Unsplash)

### Styling (Optional)
- [ ] Review colors in `styles/globals.css`
- [ ] Adjust if needed (default: navy #1a2937, gold #c9a961)
- [ ] Test light/dark appearance

## Testing (15 minutes)

### Desktop
- [ ] Homepage loads
- [ ] Search works
- [ ] Category filters work
- [ ] Price filter works
- [ ] Product cards clickable
- [ ] Product detail page opens
- [ ] WhatsApp contact button works
- [ ] Favorites heart icon works
- [ ] Saved products appear in favorites
- [ ] Seller profile page opens
- [ ] All seller products show

### Mobile
- [ ] Responsive layout looks good
- [ ] Touch interactions work
- [ ] WhatsApp opens in app
- [ ] Images load properly
- [ ] Navigation works

### Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile Safari (iPhone)
- [ ] Mobile Chrome (Android)

## Pre-Deployment (5 minutes)

- [ ] All product data is correct
- [ ] All seller contact info is correct
- [ ] All WhatsApp numbers tested
- [ ] No console errors (F12 → Console tab)
- [ ] Images load
- [ ] No Lorem Ipsum or placeholder text
- [ ] Official Lumera branding in place

## Deployment (15 minutes)

Choose one:

### Option A: Vercel (Recommended)
- [ ] GitHub account created
- [ ] Repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Deployed successfully
- [ ] Live URL works
- [ ] Shared URL with team

### Option B: Netlify
- [ ] Netlify account created
- [ ] Ran `npm run build`
- [ ] Uploaded `dist/` folder
- [ ] Live URL works
- [ ] Shared URL with team

### Option C: Traditional Hosting
- [ ] Ran `npm run build`
- [ ] Uploaded `dist/` contents via FTP
- [ ] Configured .htaccess for SPA routing
- [ ] Live URL works
- [ ] SSL certificate active (HTTPS)

## Post-Deployment (10 minutes)

- [ ] Visit live site URL
- [ ] All pages load
- [ ] No 404 errors
- [ ] Images display
- [ ] WhatsApp links work on mobile
- [ ] Search works
- [ ] Filters work
- [ ] Favorites work
- [ ] Test on real phone device
- [ ] Share with 2-3 test users for feedback

## Custom Domain (Optional - 10 minutes)

- [ ] Domain purchased/owned
- [ ] Added domain in hosting dashboard
- [ ] Updated DNS records (A/CNAME)
- [ ] Waited for DNS propagation (up to 24hrs)
- [ ] HTTPS/SSL working
- [ ] www and non-www both work
- [ ] Old URL redirects to new domain

## Database Setup (Optional - 30 minutes)

If you want to manage products from a database instead of code:

- [ ] Read `BACKEND_SETUP.md`
- [ ] Created Supabase account
- [ ] Created new project
- [ ] Created `sellers` table
- [ ] Created `products` table
- [ ] Enabled Row Level Security
- [ ] Added policies
- [ ] Populated with data
- [ ] Updated `App.tsx` with Supabase client
- [ ] Tested CRUD operations
- [ ] Redeployed site

## Marketing & Launch (Ongoing)

- [ ] Added to lumeragovernance.com main site
- [ ] Announced to sellers
- [ ] Created seller onboarding guide
- [ ] Set up seller support email
- [ ] Monitor for user feedback
- [ ] Plan feature updates

---

## Maintenance Schedule

### Weekly
- [ ] Check for broken links
- [ ] Verify WhatsApp numbers still work
- [ ] Review new seller applications
- [ ] Add new products

### Monthly
- [ ] Update npm packages: `npm update`
- [ ] Review analytics (if setup)
- [ ] Gather seller feedback
- [ ] Plan improvements

### Quarterly
- [ ] Major version updates
- [ ] Security audit
- [ ] Performance review
- [ ] User survey

---

## Troubleshooting Reference

| Issue | Solution |
|-------|----------|
| npm not found | Install Node.js |
| Port in use | Run `npm run dev -- --port 3000` |
| Build fails | Delete node_modules, run `npm install` |
| Images not loading | Check URLs, check public folder |
| WhatsApp not working | Verify number format: 12345678900 |
| 404 on refresh | Configure SPA routing on host |

---

## Support Resources

📖 **Documentation**
- `README.md` - Full documentation
- `QUICKSTART.md` - Simple getting started
- `DEPLOYMENT.md` - Deployment guides
- `BACKEND_SETUP.md` - Database setup

🔗 **External Help**
- [Vite docs](https://vitejs.dev)
- [React docs](https://react.dev)
- [Tailwind CSS docs](https://tailwindcss.com)
- [Supabase docs](https://supabase.com/docs)

---

**Last Updated:** When you downloaded from Figma Make

**Status:** Ready for deployment ✅
