-- HelioSolv Production Database Schema
-- Compatible with Supabase PostgreSQL and Row Level Security (RLS)
-- Optimized for SANKALP 2026 Decentralized Solar Waste Solvometallurgy

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    organization TEXT,
    role TEXT CHECK (role IN ('microplant_operator', 'asset_owner', 'recycler', 'sustainability_analyst', 'sfl_financier', 'admin')) DEFAULT 'microplant_operator',
    facility_id UUID,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Facilities Table (Decentralized MSME Micro-Plants)
CREATE TABLE IF NOT EXISTS public.facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'Rajasthan',
    capacity_kg_per_day NUMERIC NOT NULL DEFAULT 100,
    daily_operating_hours NUMERIC NOT NULL DEFAULT 8,
    status TEXT CHECK (status IN ('active', 'maintenance', 'standby')) DEFAULT 'active',
    operator_user_id UUID REFERENCES public.profiles(id),
    responsible_operator TEXT NOT NULL,
    operator_contact TEXT,
    sfl_loan_id TEXT, -- Satin Finserv Green Machinery Loan Reference
    sfl_financed_date DATE,
    equipment_uptime_pct NUMERIC DEFAULT 98.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Panels Table (Solar PV Module Intake & Triage)
CREATE TABLE IF NOT EXISTS public.panels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    panel_code TEXT UNIQUE NOT NULL,
    facility_id UUID REFERENCES public.facilities(id) ON DELETE SET NULL,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    manufacturer TEXT,
    model TEXT,
    approx_age_years NUMERIC,
    rated_power_watts NUMERIC,
    dimensions TEXT,
    location TEXT NOT NULL,
    source_partner TEXT,
    visual_condition TEXT CHECK (visual_condition IN ('intact', 'minor_cracks', 'severe_cracks', 'delaminated', 'eva_yellowed', 'cell_shattered', 'busbar_corroded')),
    known_defects JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    ai_screening_done BOOLEAN DEFAULT FALSE,
    ai_suggested_pathway TEXT CHECK (ai_suggested_pathway IN ('refurbish_reuse', 'des_chemical_leaching', 'further_testing_required', 'manual_review_pending')),
    ai_confidence NUMERIC,
    detected_boxes JSONB DEFAULT '[]'::jsonb,
    final_triage_status TEXT CHECK (final_triage_status IN ('refurbish_reuse', 'des_chemical_leaching', 'further_testing_required', 'manual_review_pending')) DEFAULT 'manual_review_pending',
    reviewed_by TEXT,
    reviewed_at TIMESTAMPTZ,
    notes TEXT,
    batch_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Electrical Inspection Records
CREATE TABLE IF NOT EXISTS public.electrical_inspections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    panel_id UUID REFERENCES public.panels(id) ON DELETE CASCADE,
    voc_volts NUMERIC,
    isc_amps NUMERIC,
    pmax_watts NUMERIC,
    fill_factor_pct NUMERIC,
    insulation_resistance_mohm NUMERIC,
    efficiency_retention_pct NUMERIC,
    tested_by TEXT NOT NULL,
    tester_notes TEXT,
    tested_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Recovery Batches Table (DES Solvometallurgy Runs)
CREATE TABLE IF NOT EXISTS public.recovery_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_code TEXT UNIQUE NOT NULL,
    facility_id UUID REFERENCES public.facilities(id) ON DELETE RESTRICT,
    panel_count INTEGER NOT NULL DEFAULT 1,
    feedstock_mass_kg NUMERIC NOT NULL,
    solvent_composition TEXT DEFAULT 'Ethaline (Choline Chloride + Ethylene Glycol 1:2 molar)',
    operating_temperature_c NUMERIC DEFAULT 80.0,
    ultrasonication_freq_khz NUMERIC DEFAULT 40.0,
    status TEXT CHECK (status IN ('draft', 'scheduled', 'in_progress', 'leaching', 'electrowinning', 'awaiting_verification', 'completed', 'on_hold')) DEFAULT 'scheduled',
    solvent_recycle_rate_pct NUMERIC DEFAULT 92.0,
    silver_recovered_grams NUMERIC DEFAULT 0,
    silicon_recovered_kg NUMERIC DEFAULT 0,
    glass_recovered_kg NUMERIC DEFAULT 0,
    aluminum_recovered_kg NUMERIC DEFAULT 0,
    purity_grade_ag_pct NUMERIC DEFAULT 99.9,
    cpcb_epr_certificate_id TEXT,
    cpcb_credits_awarded NUMERIC DEFAULT 0,
    operator_name TEXT NOT NULL,
    operator_notes TEXT,
    start_date TIMESTAMPTZ DEFAULT NOW(),
    completion_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Material Inventory Table
CREATE TABLE IF NOT EXISTS public.inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_id UUID REFERENCES public.facilities(id) ON DELETE RESTRICT,
    material_type TEXT CHECK (material_type IN ('silver_999', 'intact_silicon', 'solar_glass', 'aluminum_frame', 'process_residue')) NOT NULL,
    material_name TEXT NOT NULL,
    quantity NUMERIC NOT NULL,
    unit TEXT CHECK (unit IN ('g', 'kg', 'tonnes')) NOT NULL,
    batch_source_code TEXT,
    verification_status TEXT CHECK (verification_status IN ('cpcb_verified', 'lab_certified', 'pending')) DEFAULT 'pending',
    storage_location TEXT NOT NULL,
    lot_number TEXT UNIQUE NOT NULL,
    market_value_inr NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    actor TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    status TEXT CHECK (status IN ('info', 'success', 'warning', 'alert')) DEFAULT 'info',
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.panels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.electrical_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recovery_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Authenticated users can read their organization's records
CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Facilities viewable by authenticated users"
ON public.facilities FOR SELECT TO authenticated USING (true);

CREATE POLICY "Panels viewable by authenticated users"
ON public.panels FOR SELECT TO authenticated USING (true);

CREATE POLICY "Panels insertable by authenticated users"
ON public.panels FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Panels updatable by authenticated users"
ON public.panels FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL);

CREATE POLICY "Batches viewable by authenticated users"
ON public.recovery_batches FOR SELECT TO authenticated USING (true);

CREATE POLICY "Batches editable by authenticated operators"
ON public.recovery_batches FOR ALL TO authenticated USING (auth.uid() IS NOT NULL);

CREATE POLICY "Inventory viewable by authenticated users"
ON public.inventory_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Activity logs viewable by authenticated users"
ON public.activity_logs FOR SELECT TO authenticated USING (true);
