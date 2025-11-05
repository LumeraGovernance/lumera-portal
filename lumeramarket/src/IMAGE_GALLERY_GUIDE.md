# Image Gallery Feature Guide

## 🎨 Multiple Images Per Product

Your Lumera Market now supports **multiple images per product** with an interactive gallery on the product detail page!

## ✨ Features

- 📸 **Multiple images** - Show products from different angles
- ⬅️➡️ **Navigation arrows** - Click to browse images
- 🖼️ **Thumbnail gallery** - Quick image selection
- ⌨️ **Keyboard navigation** - Use arrow keys to browse
- 📊 **Image counter** - Shows current image (e.g., "2 / 4")
- 🎯 **Active indicator** - Highlighted border on current thumbnail
- 🖱️ **Hover effects** - Smooth transitions

## 📝 How to Add Multiple Images

### Basic Format

In `app.js`, use the `images` array instead of single `image`:

```javascript
{
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    images: [  // Array of image URLs
        "https://image1.jpg",
        "https://image2.jpg",
        "https://image3.jpg",
        "https://image4.jpg"
    ],
    category: "Technology & Devices",
    seller: "TechForge Lumera",
    sellerContact: "12683215960",
    description: "Product description..."
}
```

### Important Notes

1. **First image** = Thumbnail on catalog page
2. **Order matters** - Images appear in array order
3. **Minimum**: 1 image (gallery features disabled)
4. **Recommended**: 3-5 images per product
5. **Maximum**: No limit, but 4-6 is optimal

## 🎯 Best Practices

### Image Order

Arrange images by importance:

```javascript
images: [
    "main-product-view.jpg",      // 1. Main product shot
    "product-angle-2.jpg",        // 2. Different angle
    "product-detail-closeup.jpg", // 3. Detail/feature
    "product-in-use.jpg",         // 4. Lifestyle/context
    "product-packaging.jpg"       // 5. Packaging (optional)
]
```

### Image Quality

- **Size**: 1080px wide minimum
- **Format**: JPG or PNG
- **Aspect ratio**: 1:1 (square) or 4:3 works best
- **File size**: Compress to < 500KB each

### Number of Images

| Product Type | Recommended Images | Example |
|--------------|-------------------|---------|
| Simple items | 2-3 images | Watch, sunglasses |
| Electronics | 3-4 images | Phone, laptop, camera |
| Clothing | 4-5 images | Shoes, apparel |
| Complex items | 4-6 images | Backpack, equipment |

## 🖼️ Gallery Controls

### For Users

**Navigation:**
- Click **left/right arrows** on image
- Click **thumbnails** below image
- Use **keyboard arrows** (← →)
- View **image counter** (e.g., "3 / 5")

**Visual Feedback:**
- Active thumbnail has **gold border**
- Thumbnails dim on **hover**
- Main image shows **smooth transition**

## 💻 Technical Details

### How It Works

1. **Main Image Display**: Large preview at top
2. **Thumbnail Strip**: 4 thumbnails per row below
3. **Navigation Arrows**: Overlay on main image (if 2+ images)
4. **Image Counter**: Shows position (e.g., "2 / 4")
5. **Keyboard Support**: Left/Right arrows work

### State Management

Gallery maintains current image index in `window.currentProductImageIndex`

### Functions

```javascript
// Navigate forward/backward
changeProductImage(direction)  // direction: 1 or -1

// Jump to specific image
selectProductImage(index)      // index: 0-based

// Update display
updateGalleryDisplay(images)   // Called automatically
```

## 🎨 Customization

### Change Thumbnail Grid

In `app.js`, find the thumbnail gallery section:

```javascript
<div class="grid grid-cols-4 gap-2">  // Change cols-4 to cols-3, cols-5, etc.
```

### Change Main Image Height

In `app.js`, product detail:

```javascript
<img class="w-full h-96 object-cover">  // Change h-96 to h-64, h-full, etc.
```

### Change Arrow Style

In `app.js`, navigation buttons:

```javascript
<button class="... p-2 ...">  // Change padding
    <i class="w-6 h-6"></i>     // Change icon size
</button>
```

### Disable Keyboard Navigation

In `app.js`, remove this section from init():

```javascript
document.addEventListener('keydown', (e) => {
    // Delete this entire block
});
```

## 🆕 Migration from Single Images

### Option 1: Keep Backward Compatibility

Old products with single `image` still work:

```javascript
// Old format (still works!)
{
    id: 1,
    image: "https://single-image.jpg",
    // ...
}

// New format (recommended)
{
    id: 2,
    images: ["https://image1.jpg", "https://image2.jpg"],
    // ...
}
```

### Option 2: Convert All to Arrays

Update existing products:

```javascript
// Before:
image: "https://product.jpg"

// After:
images: ["https://product.jpg"]  // Single-item array
```

## 📸 Finding Product Images

### Free Image Sources

1. **Unsplash** - https://unsplash.com/
   - High quality
   - Free for commercial use
   - No attribution required

2. **Pexels** - https://pexels.com/
   - Free stock photos
   - Commercial use OK

3. **Pixabay** - https://pixabay.com/
   - Free images
   - No attribution needed

### Getting Image URLs

1. Find your product on Unsplash/Pexels
2. Right-click the image
3. Select "Copy image address"
4. Paste into `images` array

### Using Your Own Images

1. Host images on:
   - Your web server
   - Cloudinary (free tier)
   - ImgBB (free hosting)
   - AWS S3 (paid)

2. Get public URL
3. Add to `images` array

## 🎯 Examples

### Electronics Product (4 Images)

```javascript
{
    id: 9,
    name: "Wireless Earbuds Pro",
    price: 149.99,
    images: [
        "https://unsplash.com/earbuds-main.jpg",
        "https://unsplash.com/earbuds-case.jpg",
        "https://unsplash.com/earbuds-charging.jpg",
        "https://unsplash.com/earbuds-in-ear.jpg"
    ],
    category: "Technology & Devices",
    seller: "TechForge Lumera",
    sellerContact: "12683215960",
    description: "True wireless earbuds with active noise cancellation..."
}
```

### Fashion Item (3 Images)

```javascript
{
    id: 10,
    name: "Luxury Leather Wallet",
    price: 79.99,
    images: [
        "https://unsplash.com/wallet-front.jpg",
        "https://unsplash.com/wallet-open.jpg",
        "https://unsplash.com/wallet-cards.jpg"
    ],
    category: "Handcrafted Goods",
    seller: "Nomad Leather Co.",
    sellerContact: "12683215964",
    description: "Handcrafted genuine leather wallet..."
}
```

### Minimal Product (2 Images)

```javascript
{
    id: 11,
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    images: [
        "https://unsplash.com/bottle-product.jpg",
        "https://unsplash.com/bottle-lifestyle.jpg"
    ],
    category: "Handcrafted Goods",
    seller: "EcoLife Lumera",
    sellerContact: "12683215970",
    description: "Insulated water bottle keeps drinks cold for 24 hours..."
}
```

## 🎬 User Experience

### On Catalog Page
- Shows **first image** only
- Click to view **product details**
- Hover for **card animation**

### On Product Detail Page
- Large **main image** display
- **Thumbnail strip** below (if 2+ images)
- **Click thumbnails** to change image
- **Click arrows** to navigate
- **Keyboard arrows** work too
- **Image counter** shows position

### On Mobile
- Gallery fully responsive
- Touch-friendly navigation
- Larger touch targets on arrows
- Thumbnails scroll if needed

## ⚡ Performance Tips

### Optimize Images

Use online tools:
- **TinyPNG** - https://tinypng.com/
- **ImageOptim** - https://imageoptim.com/
- **Squoosh** - https://squoosh.app/

Target: < 500KB per image

### Lazy Loading

Images load as needed. First image loads with page, others on demand.

### CDN Hosting

For better performance:
- Use image CDN (Cloudinary, Imgix)
- Serves from edge locations
- Faster worldwide loading

## 🐛 Troubleshooting

### Gallery not appearing
**Issue**: Only shows single image  
**Fix**: Ensure `images` is an array with 2+ items

### Thumbnails not clickable
**Issue**: onClick not working  
**Fix**: Check browser console for errors

### Arrow keys not working
**Issue**: Keyboard navigation broken  
**Fix**: Make sure you're on product detail page

### Images wrong size
**Issue**: Images distorted  
**Fix**: Use `object-cover` class (already applied)

### Thumbnails not highlighting
**Issue**: Active border not showing  
**Fix**: Check that Tailwind CSS loaded correctly

## 🎓 Advanced Usage

### Add Image Captions

Modify the gallery HTML in `app.js`:

```javascript
<div class="text-center mt-2 text-sm text-gray-600">
    ${imageCaption}
</div>
```

### Add Zoom on Click

Add this to main image:

```javascript
<img 
    onclick="window.open(this.src, '_blank')"
    class="cursor-zoom-in ..."
>
```

### Add Image Preloading

Preload all images when page loads:

```javascript
product.images.forEach(img => {
    const preload = new Image();
    preload.src = img;
});
```

## ✅ Checklist

Before adding gallery:
- [ ] Collected 3-5 quality images per product
- [ ] Optimized images (< 500KB each)
- [ ] Images are similar aspect ratio
- [ ] Tested image URLs work
- [ ] Updated `app.js` with `images` array
- [ ] Refreshed browser to test
- [ ] Tested navigation arrows
- [ ] Tested thumbnail clicks
- [ ] Tested keyboard navigation
- [ ] Tested on mobile

## 📚 Related Documentation

- **SETUP.md** - How to update products
- **QUICK_REFERENCE.md** - Quick syntax guide
- **STATIC_SITE_GUIDE.md** - Technical details

---

**Enjoy your interactive product galleries!** 📸
