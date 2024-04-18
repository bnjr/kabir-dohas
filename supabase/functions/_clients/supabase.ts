import { createClient } from '@supabase/supabase-js'
import { Database } from '../_shared/database.types.ts'
import { ensureGetEnv } from '../_utils/env.ts'

const supabaseUrl = ensureGetEnv('SUPABASE_URL')
const supabaseKey = ensureGetEnv('SUPABASE_ANON_KEY')
if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Missing Supabase configuration. Please check your environment variables.'
  )
}
export const supabase = createClient<Database>(supabaseUrl!, supabaseKey!)
