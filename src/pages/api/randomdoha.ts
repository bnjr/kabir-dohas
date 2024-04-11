import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { DohaData } from '@/types/types'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const getRandomDoha = async (): Promise<DohaData | null> => {
  const { data, error } = await supabase
    .from('dohas')
    .select('*')
    .order('random()')
    .limit(1)

  if (!error && data) return data[0].fields as unknown as DohaData
  else return null
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const doha = await getRandomDoha()
      res.status(200).json(doha)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doha' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
