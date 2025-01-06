/*
  # Create products table for QR authentication

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text, optional)
      - `manufacturer` (text, optional)
      - `manufacture_date` (date, optional)
      - `qr_code` (text, required, unique)
      - `image_url` (text, optional)
      - `created_at` (timestamptz, auto-set)

  2. Security
    - Enable RLS on products table
    - Add policies for:
      - Anonymous read access
      - Authenticated users can insert/delete
*/

CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  manufacturer text,
  manufacture_date date,
  qr_code text NOT NULL UNIQUE,
  image_url text,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous read access
CREATE POLICY "Allow anonymous read access"
  ON public.products
  FOR SELECT
  TO anon
  USING (true);

-- Create policy to allow authenticated users to insert/delete
CREATE POLICY "Allow authenticated insert"
  ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
  ON public.products
  FOR DELETE
  TO authenticated
  USING (true);