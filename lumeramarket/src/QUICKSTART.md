# 🚀 Quick Start Guide

## For Non-Technical Users

### Step 1: Install Node.js
Download and install from: https://nodejs.org (get the LTS version)

### Step 2: Open Terminal/Command Prompt
- **Mac:** Press `Cmd + Space`, type "Terminal"
- **Windows:** Press `Win + R`, type "cmd", press Enter
- **Linux:** Press `Ctrl + Alt + T`

### Step 3: Navigate to Project
```bash
cd path/to/lumera-market
```

### Step 4: Install and Run
```bash
npm install
npm run dev
```

### Step 5: View Your Site
Open your browser and go to: http://localhost:5173

---

## What You Just Did

✅ **Installed** all the code libraries needed  
✅ **Started** a local web server  
✅ **Opened** your site in a browser  

---

## Making Changes

### Update Products
1. Open `App.tsx` in any code editor
2. Find the `products` array (around line 38)
3. Add, edit, or remove products
4. Save the file
5. Browser auto-refreshes with changes!

### Change Colors
1. Open `styles/globals.css`
2. Find color values (e.g., `#c9a961` for gold)
3. Replace with your colors
4. Save and see changes instantly

### Replace Flag Logo
1. Put your flag image in `/public/` folder
2. Name it `lumera-flag.svg` (or `.png`)
3. Done!

---

## Publishing to the Internet

### Easiest Way: Vercel (Free)

1. **Create GitHub account** (if you don't have one): https://github.com

2. **Upload your code:**
   ```bash
   git init
   git add .
   git commit -m "My Lumera Market"
   ```

3. **Create repository on GitHub:**
   - Go to github.com
   - Click "New repository"
   - Name it "lumera-market"
   - Copy the commands shown

4. **Connect to Vercel:**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "Import Project"
   - Select your repository
   - Click "Deploy"
   - Wait 1 minute
   - Your site is live! 🎉

You'll get a URL like: `https://lumera-market.vercel.app`

### Custom Domain
- Buy domain from Namecheap, GoDaddy, etc.
- In Vercel dashboard: Settings → Domains
- Add your domain: `market.lumeragovernance.com`
- Follow DNS instructions (they walk you through it)

---

## Common Questions

### "npm: command not found"
→ Node.js isn't installed. Go back to Step 1.

### "Port 5173 already in use"
→ Another app is using that port. Close it or run: `npm run dev -- --port 3000`

### "Module not found"
→ Run `npm install` again

### Site won't load on phone
→ On your computer, run: `npm run dev -- --host`  
→ Find your local IP (usually shown in terminal)  
→ On phone, visit: `http://192.168.x.x:5173`

### How do I stop the server?
→ Press `Ctrl + C` in the terminal

---

## Getting Help

1. **Check `README.md`** - Full technical documentation
2. **Check `DEPLOYMENT.md`** - Detailed deployment guides  
3. **Check `BACKEND_SETUP.md`** - Database setup  
4. **Google your error message** - Usually finds solutions
5. **Ask ChatGPT** - Paste your error message

---

## Next Steps

✅ Site running locally  
→ **Next:** Add real products (edit `App.tsx`)  
→ **Then:** Deploy to Vercel (see above)  
→ **Finally:** Set up database (see `BACKEND_SETUP.md`)  

---

**You're all set!** The site is fully functional right now with the mock data. Deploy it and start showing customers!

---

## Video Tutorials (Recommended)

Search YouTube for:
- "How to deploy React app to Vercel"
- "How to use VS Code for web development"
- "Git and GitHub for beginners"

These concepts work for all React apps, including this one.
