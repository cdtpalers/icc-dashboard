import { createClient } from '@supabase/supabase-js';

export interface Registration {
  id?: string;
  created_at?: string;
  full_name: string;
  email: string;
  phone?: string;
  academy_name: string;
  country: string;
  rank?: string;
  cadet_year?: string;
  delegation_role: 'Delegate' | 'Head Delegate' | 'Observer' | 'Faculty Advisor';
  dietary_restrictions?: string;
  special_requirements?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  updated_at?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
