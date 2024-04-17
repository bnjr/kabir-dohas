import { NextApiRequest, NextApiResponse } from 'next'
import { DohaData } from '@/types'
import { createClient } from '@/lib'

const getRandomDoha = async (supabase: any): Promise<DohaData | null> => {
  const { data, error } = await supabase
    .from('random_doha')
    .select('id, doha_hi, doha_en, meaning_en')
    .single()

  if (!error && data) return data as unknown as DohaData
  else return null
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createClient(req, res)

  if (req.method === 'GET') {
    try {
      const doha = await getRandomDoha(supabase)
      res.status(200).json(doha)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doha' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
