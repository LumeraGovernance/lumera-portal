# Lumera Market - Static HTML Site

Official catalog marketplace for the State of Lumera - connecting Lumeran entrepreneurs with customers.

## ⚡ Zero Build Required!

This is a **pure HTML/CSS/JavaScript** site. No Node.js, no npm, no build process needed!

## About

Lumera Market is a catalog/directory website where buyers can browse products and services from verified Lumeran citizens and contact sellers directly via WhatsApp, email, or phone. The marketplace features an elegant gold and navy color scheme reflecting the Lumera Governance brand identity.

## Features

- 📱 Browse products and services from Lumeran sellers
- 💬 Direct contact with sellers via WhatsApp, email, or phone
- ❤️ Save favorite products for later (localStorage)
- 🔍 Search and filter by category and price
- 👤 View seller profiles with all their products
- 📊 Responsive design for all devices
- ⚡ Works offline after first load
- 🚀 Deploy anywhere instantly

## Tech Stack

- **HTML5** - Pure semantic markup
- **Tailwind CSS** - Via CDN (no build needed)
- **Vanilla JavaScript** - No frameworks
- **Lucide Icons** - Via CDN
- **localStorage** - For favorites persistence

## Getting Started

### Instant Start (No Installation!)

**Just double-click `index.html`** and it opens in your browser. That's it!

### Local Server (Recommended for Testing)

If you have Python:

```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

Or use VS Code Live Server extension.

### No Build Step Required

All files work as-is. Make changes, refresh browser, see results instantly!

## Project Structure

```
├── index.html          # Main HTML file (all pages)
├── app.js              # All JavaScript functionality
├── public/
│   └── lumera-flag.svg # Lumera flag logo
└── README_STATIC.md    # Detailed static site docs
```

That's it! Just 3 files needed.

## Data Management

Products and sellers are stored in `app.js` as JavaScript objects. To update:

1. Open `app.js`
2. Edit the `products` or `sellers` arrays
3. Save and refresh browser
4. Done!

For a real database, you can integrate:
- Supabase (PostgreSQL with REST API)
- Firebase (Real-time database)
- Airtable (Spreadsheet database)
- Google Sheets API

All can connect directly in `app.js` without a build process!

## Customization

### Colors

Edit CSS variables in `index.html`:
```css
:root {
    --navy-dark: #1a2937;
    --gold: #c9a961;
    --cream: #f8f6f3;
}
```

### Adding Products

Open `app.js` and add to the `products` array:
```javascript
{
    id: 9,
    name: "New Product",
    price: 99.99,
    image: "https://...",
    category: "Technology & Devices",
    seller: "Your Seller Name",
    sellerContact: "12683215960",
    description: "Product description"
}
```

### Flag Logo

Replace `/public/lumera-flag.svg` with your official flag image.

## Deployment

### Netlify Drop (Easiest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop your folder
3. Get instant live URL!

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo>
git push -u origin main
# Enable Pages in repo settings
```

### Traditional Hosting
Upload all files via FTP to your web host's public folder. Works immediately!

## License

© Lumera Governance. All rights reserved.

## Links

- Official Site: [www.lumeragovernance.com](https://www.lumeragovernance.com)
- National Motto: Truth • Virtue • Liberty • Prosperity

---

Built with ❤️ for the Lumeran people
