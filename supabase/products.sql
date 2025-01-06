create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  manufacturer text,
  manufacture_date date,
  qr_code text not null unique,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policy to allow anonymous read access
create policy "Allow anonymous read access"
  on public.products
  for select
  to anon
  using (true);

-- Create policy to allow authenticated users to insert/delete
create policy "Allow authenticated insert"
  on public.products
  for insert
  to authenticated
  with check (true);

create policy "Allow authenticated delete"
  on public.products
  for delete
  to authenticated
  using (true);