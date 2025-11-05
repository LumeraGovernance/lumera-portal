# Lumera Market - Quick Reference Card

## 🚀 Instant Commands

### Open Site Locally
```bash
# Method 1: Just double-click
index.html

# Method 2: Python server
python -m http.server 8000
# Visit: http://localhost:8000
```

### Deploy to Internet (30 seconds)
```
Go to: app.netlify.com/drop
Drag folder → Get live URL
```

### Update Products
```bash
1. Open app.js
2. Edit products array (line ~10)
3. Save
4. Refresh browser
```

---

## 📁 Essential Files

```
index.html    ← The website
app.js        ← Data + functions
public/       ← Images
```

---

## ✏️ Common Edits

### Add Product
```javascript
// In app.js, add to products array:
{
    id: 9,
    name: "Product Name",
    price: 99.99,
    images: [  // Multiple images for gallery!
        "https://image1.jpg",
        "https://image2.jpg",
        "https://image3.jpg"
    ],
    category: "Technology & Devices",
    seller: "Seller Name",
    sellerContact: "12683215960",
    description: "..."
}
```

### Change Colors
```css
/* In index.html <style> section: */
:root {
    --navy-dark: #1a2937;
    --gold: #c9a961;
    --cream: #f8f6f3;
}
```

### Update Seller
```javascript
// In app.js, sellers object:
"Seller Name": {
    contact: {
        whatsapp: "12683215960",
        phone: "+1 (268) 321-5960",
        email: "email@example.com"
    }
}
```

---

## 🌐 Deployment URLs

| Service | URL Pattern | Time |
|---------|-------------|------|
| **Netlify Drop** | `random-name.netlify.app` | 30 sec |
| **Vercel** | `project-name.vercel.app` | 2 min |
| **GitHub Pages** | `user.github.io/repo` | 5 min |
| **Your Domain** | `market.lumeragovernance.com` | +custom DNS |

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Icons missing | Check internet (CDN) |
| Images broken | Update URLs in app.js |
| WhatsApp not working | Format: `12683215960` (no +) |
| Favorites not saving | Don't use incognito mode |
| Changes not showing | Hard refresh: `Ctrl+Shift+R` |
| Page blank | Check console (F12) for errors |

---

## 📱 Test on Mobile

```bash
# 1. Start server
python -m http.server 8000

# 2. Find IP
ifconfig | grep inet  # Mac/Linux
ipconfig              # Windows

# 3. On phone visit
http://192.168.x.x:8000
```

---

## 🎨 Product Image URLs

### Free Image Sources
- Unsplash: `https://unsplash.com/`
- Pexels: `https://pexels.com/`
- Pixabay: `https://pixabay.com/`

### Get URL
1. Find image
2. Right-click → "Copy image address"
3. Paste in `image:` field

---

## 🔧 File Locations

| What | Where |
|------|-------|
| Products | `app.js` line ~10 |
| Sellers | `app.js` line ~150 |
| Colors | `index.html` `<style>` section |
| Flag | `public/lumera-flag.svg` |
| Contact text | `app.js` line ~750 |

---

## ✅ Pre-Deploy Checklist

- [ ] Products updated
- [ ] Sellers updated
- [ ] Flag replaced
- [ ] Colors customized
- [ ] WhatsApp tested
- [ ] Mobile tested
- [ ] All pages work

---

## 📚 Documentation

| File | Purpose | Time |
|------|---------|------|
| `START_HERE.md` | First steps | 3 min |
| `SETUP.md` | Full setup | 10 min |
| `STATIC_SITE_GUIDE.md` | Complete guide | 20 min |
| `DEPLOYMENT.md` | Deploy options | 10 min |
| `CONVERSION_SUMMARY.md` | What changed | 5 min |

---

## 💡 Pro Tips

1. **Always backup** before big changes
2. **Test locally** before deploying
3. **Use Git** for version control
4. **Compress images** before uploading
5. **WhatsApp format** is critical: `12683215960`

---

## 🎯 Common Tasks

### Add New Category
```javascript
// Just use it in a product:
category: "New Category Name"
// Filters auto-update!
```

### Make Product On Sale
```javascript
{
    price: 79.99,
    originalPrice: 129.99,  // Shows "Sale" badge
}
```

### Change Search Placeholder
```html
<!-- In index.html: -->
<input placeholder="Your text here">
```

### Update Site Title
```html
<!-- In index.html <head>: -->
<title>Your Title</title>
```

---

## 🔗 Useful Links

- **Netlify Drop:** app.netlify.com/drop
- **Vercel:** vercel.com
- **GitHub:** github.com
- **Tailwind Docs:** tailwindcss.com
- **Lucide Icons:** lucide.dev

---

## 🎨 Color Reference

Current Lumera colors:

```
Navy Dark:  #1a2937
Gold:       #c9a961
Cream:      #f8f6f3
```

Change in `index.html` → `<style>` → `:root`

---

## 📞 WhatsApp Link Format

```javascript
// Correct:
"12683215960"

// Wrong:
"+1 (268) 321-5960"
"+1-268-321-5960"
"1 268 321 5960"
```

---

## 🚀 Deploy Commands

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <repo-url>
git push -u origin main
# Enable in Settings → Pages
```

### Update Deployed Site
```bash
git add .
git commit -m "Updated products"
git push
# Auto-deploys!
```

---

## 💾 Backup

```bash
# Quick backup
cp -r lumera-market lumera-market-backup

# With Git
git commit -am "Backup before changes"
```

---

## 🎓 Learn More

- HTML/CSS/JS basics: w3schools.com
- Tailwind: tailwindcss.com/docs
- JavaScript: javascript.info
- localStorage: developer.mozilla.org

---

## 📊 File Sizes

```
index.html:  ~25KB
app.js:      ~50KB
flag.svg:    ~5KB
Total:       ~80KB
```

Plus images (loaded from CDN).

---

## ✨ That's It!

Print this card for quick reference while editing.

**Main steps:**
1. Edit `app.js`
2. Refresh browser
3. Deploy when ready

---

**Questions? Check START_HERE.md →**
