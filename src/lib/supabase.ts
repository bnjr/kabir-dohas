import { Database } from '@/types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Missing Supabase configuration. Please check your environment variables.'
  );
  process.exit(1);
}
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
