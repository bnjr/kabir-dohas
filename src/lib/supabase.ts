import { Database } from '@/types'
import { CookieOptions, createServerClient, serialize } from '@supabase/ssr'
import { type NextApiRequest, type NextApiResponse } from 'next'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Warning: Missing Supabase configuration. Supabase features will be disabled.'
  )
}

export function createClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration missing.')
  }
  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return req.cookies[name]
      },
      set(name: string, value: string, options: CookieOptions) {
        res.appendHeader('Set-Cookie', serialize(name, value, options))
      },
      remove(name: string, options: CookieOptions) {
        res.appendHeader('Set-Cookie', serialize(name, '', options))
      },
    },
  })

  return supabase
}

export function supabaseInfo() {
  const supabaseInfo = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  }

  return supabaseInfo
}
