-- Create sellers table (references auth.users)
create table if not exists public.sellers (
  id uuid primary key references auth.users(id) on delete cascade,
  business_name text not null,
  description text,
  location text,
  contact_email text,
  contact_phone text,
  website text,
  verification_status text not null default 'pending' check (verification_status in ('pending', 'approved', 'rejected')),
  verified_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  name text not null,
  description text not null,
  category text not null,
  price numeric(10, 2) not null check (price > 0),
  unit text not null default 'kg',
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  image_url text,
  production_cost numeric(10, 2),
  transport_cost numeric(10, 2),
  storage_cost numeric(10, 2),
  origin text,
  certifications text[],
  verification_status text not null default 'pending' check (verification_status in ('pending', 'approved', 'rejected')),
  verified_at timestamp with time zone,
  verified_by uuid references auth.users(id),
  rejection_reason text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create product images table
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  is_primary boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.sellers enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;

-- Sellers policies
create policy "sellers_select_all"
  on public.sellers for select
  using (true);

create policy "sellers_insert_own"
  on public.sellers for insert
  with check (auth.uid() = id);

create policy "sellers_update_own"
  on public.sellers for update
  using (auth.uid() = id);

-- Products policies
create policy "products_select_approved"
  on public.products for select
  using (verification_status = 'approved' or seller_id = auth.uid());

create policy "products_insert_own"
  on public.products for insert
  with check (seller_id = auth.uid());

create policy "products_update_own"
  on public.products for update
  using (seller_id = auth.uid());

create policy "products_delete_own"
  on public.products for delete
  using (seller_id = auth.uid());

-- Product images policies
create policy "product_images_select_all"
  on public.product_images for select
  using (true);

create policy "product_images_insert_own"
  on public.product_images for insert
  with check (
    exists (
      select 1 from public.products
      where id = product_id and seller_id = auth.uid()
    )
  );

create policy "product_images_delete_own"
  on public.product_images for delete
  using (
    exists (
      select 1 from public.products
      where id = product_id and seller_id = auth.uid()
    )
  );

-- Create indexes for better performance
create index if not exists idx_products_seller_id on public.products(seller_id);
create index if not exists idx_products_verification_status on public.products(verification_status);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_product_images_product_id on public.product_images(product_id);
