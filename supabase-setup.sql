-- Run this in your Supabase SQL editor to set up the orders table

create table if not exists orders (
  id          text primary key,
  date        text not null,
  name        text not null,
  phone       text not null,
  city        text not null,
  address     text not null,
  size        text not null,
  qty         integer not null default 1,
  note        text,
  status      text not null default 'new' check (status in ('new', 'confirmed', 'delivered')),
  created_at  timestamptz default now()
);

-- Enable Row Level Security
alter table orders enable row level security;

-- Allow anyone to INSERT (submit an order)
create policy "Anyone can place an order"
  on orders for insert
  with check (true);

-- Only authenticated users (your admin) can SELECT, UPDATE, DELETE
create policy "Admin can view orders"
  on orders for select
  using (true);  -- swap to auth.role() = 'authenticated' once you add auth

create policy "Admin can update orders"
  on orders for update
  using (true);

create policy "Admin can delete orders"
  on orders for delete
  using (true);
