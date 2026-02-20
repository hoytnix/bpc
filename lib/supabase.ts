import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://dmxsysktnlhpgebqjzgk.supabase.co';
export const supabaseAnonKey = 'sb_publishable_aK2eimbeZ1uj9uURrPiasA_2LhFOrE-';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Admin features may not work.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
