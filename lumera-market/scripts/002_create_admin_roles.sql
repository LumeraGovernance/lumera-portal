-- Create admin roles table
create table if not exists public.admin_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.admin_roles enable row level security;

-- Admin roles policies
create policy "admin_roles_select_own"
  on public.admin_roles for select
  using (auth.uid() = user_id);

-- Create function to check if user is admin
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
as $$
begin
  return exists (
    select 1 from public.admin_roles
    where user_id = auth.uid()
  );
end;
$$;

-- Update products policies to allow admins to verify
create policy "products_admin_update"
  on public.products for update
  using (public.is_admin());

create policy "products_admin_select_all"
  on public.products for select
  using (public.is_admin());

-- Update sellers policies to allow admins to verify
create policy "sellers_admin_update"
  on public.sellers for update
  using (public.is_admin());
