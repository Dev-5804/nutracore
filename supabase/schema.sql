-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create products table
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric(10, 2) not null,
  discount_price numeric(10, 2),
  stock_quantity integer not null default 0,
  category text not null,
  images text[] default '{}',
  weight_options text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create orders table
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users, -- made nullable for guest checkout
  guest_email text, -- added for guest checkout
  total_amount numeric(10, 2) not null,
  status text not null default 'pending', -- pending, packed, shipped, delivered, cancelled
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create order_items table
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) on delete set null,
  quantity integer not null,
  price numeric(10, 2) not null,
  weight_option text
);

-- 4. Create addresses table
create table addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade, -- made nullable for guest checkout
  guest_email text, -- added for guest checkout
  full_name text not null,
  phone_number text not null,
  address_line text not null,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)

-- Products: Everyone can read, only authenticated admin (if we had roles, for now just restrict write) can write.
-- For MVP, we'll allow read to all, and restrict write to service role or specific admin.
alter table products enable row level security;
create policy "Products are viewable by everyone" on products for select using (true);
create policy "Admins can insert products" on products for insert with check (auth.uid() is not null);
create policy "Admins can update products" on products for update using (auth.uid() is not null);
create policy "Admins can delete products" on products for delete using (auth.uid() is not null);

-- Orders: Allow public inserts for guest checkout, admins can view all
alter table orders enable row level security;
create policy "Guests can insert orders" on orders for insert with check (true);
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id or auth.uid() is not null);

-- Order Items: Allow public inserts for guest checkout
alter table order_items enable row level security;
create policy "Guests can insert order items" on order_items for insert with check (true);
create policy "Users can view own order items" on order_items for select using (
  exists (select 1 from orders where orders.id = order_items.order_id and (orders.user_id = auth.uid() or auth.uid() is not null))
);

-- Addresses: Allow public inserts for guest checkout
alter table addresses enable row level security;
create policy "Guests can insert addresses" on addresses for insert with check (true);
create policy "Users can view own addresses" on addresses for select using (auth.uid() = user_id or auth.uid() is not null);

-- Dummy Data for MVP
insert into products (name, description, price, stock_quantity, category, images, weight_options) values
('Premium Afghan Almonds', 'High-quality crunchy almonds sourced from Afghanistan.', 899.00, 100, 'Almonds', array['https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=800'], array['250g', '500g', '1kg']),
('Jumbo Cashews', 'Large, roasted and lightly salted cashews.', 1199.00, 50, 'Cashews', array['https://images.unsplash.com/photo-1596591391512-882298c4b2b6?q=80&w=800'], array['250g', '500g', '1kg']),
('Golden Raisins', 'Sweet and juicy golden raisins perfect for snacking.', 450.00, 200, 'Raisins', array['https://images.unsplash.com/photo-1599859553641-a18544edcce5?q=80&w=800'], array['250g', '500g', '1kg']),
('California Walnuts', 'Brain-boosting fresh California walnuts.', 1250.00, 75, 'Walnuts', array['https://images.unsplash.com/photo-1595305141071-92b0051e7fb2?q=80&w=800'], array['250g', '500g', '1kg']),
('Pistachios (Salted)', 'Premium roasted and salted pistachios in shell.', 1350.00, 80, 'Pistachios', array['https://images.unsplash.com/photo-1594220556209-6441b4bba895?q=80&w=800'], array['250g', '500g', '1kg']);

-- Create Admin User (Password: NutracoreAdmin2026!)
insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) values (
    '00000000-0000-0000-0000-000000000000',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'authenticated',
    'authenticated',
    'admin@nutracore.com',
    crypt('NutracoreAdmin2026!', gen_salt('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
) on conflict (id) do nothing;
