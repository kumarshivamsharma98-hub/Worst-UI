-- AI-Powered Agriculture Crop Advisory Assistant Database Schema
-- Production PostgreSQL with Supabase RLS

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  farm_name TEXT,
  preferred_region TEXT DEFAULT 'North Midwest',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 2. Farms / Fields Table
CREATE TABLE IF NOT EXISTS public.farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location_name TEXT NOT NULL,
  latitude NUMERIC,
  longitude NUMERIC,
  soil_type TEXT NOT NULL,
  ph_level NUMERIC(3,1),
  irrigation_type TEXT NOT NULL,
  area_acres NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own farms" 
  ON public.farms FOR ALL 
  USING (auth.uid() = user_id);

-- 3. Crop Advisories Table
CREATE TABLE IF NOT EXISTS public.crop_advisories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  farm_id UUID REFERENCES public.farms(id) ON DELETE SET NULL,
  target_season TEXT NOT NULL,
  soil_condition TEXT NOT NULL,
  budget_level TEXT DEFAULT 'Medium',
  recommended_crop TEXT NOT NULL,
  confidence_score NUMERIC(4,2),
  full_response_json JSONB NOT NULL,
  status TEXT DEFAULT 'COMPLETED',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.crop_advisories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own advisories" 
  ON public.crop_advisories FOR ALL 
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_farms_user_id ON public.farms(user_id);
CREATE INDEX IF NOT EXISTS idx_advisories_user_id ON public.crop_advisories(user_id);
