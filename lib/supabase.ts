import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://dmxsysktnlhpgebqjzgk.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRteHN5c2t0bmxocGdlYnFqemdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MTU5NTcsImV4cCI6MjA4NzA5MTk1N30.BApTmHAGhM-4HLXVnh5EFK7PxShX_1HAdZ7ddzQwS38';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Admin features may not work.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
