# Lumera Market - Backend Setup Guide

## Overview

Lumera Market is now a **catalog/directory site** where buyers browse products and contact sellers directly via WhatsApp, email, or phone. Products and seller information are managed through a backend system.

## Recommended Backend: Supabase

### Why Supabase?
- Free tier available
- PostgreSQL database
- Row Level Security (RLS) for access control
- RESTful API auto-generated
- Real-time subscriptions
- Simple authentication
- Easy admin dashboard

### Database Schema

Create two main tables in Supabase:

#### 1. `sellers` Table

```sql
create table sellers (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  description text,
  whatsapp text not null,
  phone text not null,
  email text not null,
  location text not null,
  rating numeric default 0,
  joined_date text default extract(year from now())::text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

#### 2. `products` Table

```sql
create table products (
  id bigserial primary key,
  name text not null,
  price numeric not null,
  original_price numeric,
  image text not null,
  rating numeric default 0,
  reviews integer default 0,
  category text not null,
  seller_name text not null references sellers(name) on delete cascade,
  seller_contact text not null,
  description text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### Setting Up Row Level Security (RLS)

Enable RLS to control who can modify data:

```sql
-- Enable RLS on both tables
alter table sellers enable row level security;
alter table products enable row level security;

-- Allow public read access
create policy "Public can read sellers"
  on sellers for select
  using (true);

create policy "Public can read products"
  on products for select
  using (true);

-- Only authenticated admins can insert/update/delete
-- (You'll need to set up admin authentication)
create policy "Admins can manage sellers"
  on sellers for all
  using (auth.jwt() ->> 'role' = 'admin');

create policy "Admins can manage products"
  on products for all
  using (auth.jwt() ->> 'role' = 'admin');
```

## Integration with Your App

### 1. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 2. Create Supabase Client

Create `/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 3. Fetch Products from Database

Update `App.tsx`:

```typescript
import { supabase } from './lib/supabase';
import { useEffect, useState } from 'react';

// Inside your component:
const [products, setProducts] = useState<Product[]>([]);
const [sellers, setSellers] = useState<Record<string, SellerInfo>>({});

useEffect(() => {
  // Fetch products
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProducts(data);
  };

  // Fetch sellers
  const fetchSellers = async () => {
    const { data, error } = await supabase
      .from('sellers')
      .select('*');
    
    if (data) {
      const sellersMap = data.reduce((acc, seller) => {
        acc[seller.name] = {
          name: seller.name,
          description: seller.description,
          contact: {
            whatsapp: seller.whatsapp,
            phone: seller.phone,
            email: seller.email,
          },
          location: seller.location,
          rating: seller.rating,
          totalProducts: 0, // Calculate from products
          joinedDate: seller.joined_date,
        };
        return acc;
      }, {} as Record<string, SellerInfo>);
      
      setSellers(sellersMap);
    }
  };

  fetchProducts();
  fetchSellers();
}, []);
```

## Admin Panel for Product Management

### Option 1: Use Supabase Dashboard
- Log into Supabase dashboard
- Go to Table Editor
- Directly add/edit/delete products and sellers
- **Easiest option for simple management**

### Option 2: Build Custom Admin Panel

Create an admin page (protected by authentication):

```typescript
// components/admin/ProductManager.tsx
import { supabase } from '../../lib/supabase';

export function ProductManager() {
  const handleAddProduct = async (productData) => {
    const { data, error } = await supabase
      .from('products')
      .insert([productData]);
    
    if (error) console.error('Error:', error);
  };

  const handleUpdateProduct = async (id, updates) => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id);
  };

  const handleDeleteProduct = async (id) => {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
  };

  // Add UI components for managing products
  return (
    <div>
      {/* Admin UI here */}
    </div>
  );
}
```

### Option 3: Use External Admin Tools
- **Retool** - Build internal tools quickly
- **Forest Admin** - Auto-generated admin panel
- **Refine** - React-based admin framework

## Managing Products Effortlessly

### Quick Add via SQL (Supabase SQL Editor)

```sql
-- Add a new seller
INSERT INTO sellers (name, description, whatsapp, phone, email, location)
VALUES (
  'New Business Name',
  'Description of the business',
  '1234567890',
  '+1 (234) 567-8900',
  'contact@business.lumera',
  'City, Lumera'
);

-- Add a new product
INSERT INTO products (name, price, original_price, image, category, seller_name, seller_contact, description)
VALUES (
  'Product Name',
  99.99,
  129.99,
  'https://image-url.com/image.jpg',
  'Technology & Devices',
  'New Business Name',
  '1234567890',
  'Detailed product description'
);
```

### Bulk Import via CSV
1. Prepare CSV files with product data
2. Use Supabase dashboard to import CSV
3. Go to Table Editor → Import Data → Upload CSV

### API-based Management

Create API routes for external systems:

```typescript
// Example: Add product via API
const addProductViaAPI = async () => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      name: 'Product Name',
      price: 99.99,
      // ... other fields
    })
  });
};
```

## Real-time Updates

Enable real-time subscriptions to auto-update the site when products change:

```typescript
// Listen for product changes
useEffect(() => {
  const subscription = supabase
    .channel('products-channel')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'products' },
      (payload) => {
        console.log('Change received!', payload);
        // Update products state
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## Image Management

### Option 1: Supabase Storage
```typescript
const uploadImage = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(`${Date.now()}-${file.name}`, file);
  
  if (data) {
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);
    
    return publicUrl;
  }
};
```

### Option 2: Use Unsplash URLs (Current Method)
- Quick and easy for testing
- No storage costs
- Use the unsplash_tool for relevant images

### Option 3: External CDN (Cloudinary, ImageKit)
- Better performance
- Image optimization
- Transformation capabilities

## Summary: Effortless Product Management Workflow

1. **Setup Once**: Create Supabase project and tables (5 minutes)
2. **Daily Management**: 
   - Use Supabase Table Editor for quick edits
   - Or build simple admin panel for sellers
3. **Bulk Operations**: Import CSV for many products at once
4. **Real-time**: Changes appear instantly on site
5. **No Deployment**: Just update database, site updates automatically

### Recommended Workflow
1. Log into Supabase Dashboard
2. Go to Table Editor → `products`
3. Click "Insert row"
4. Fill in product details
5. Save → Product appears on site immediately!

This approach requires **zero code changes** to add/remove/edit products once the backend integration is complete.
