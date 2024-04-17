// /api/doha/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import { DohaData } from '@/types'
import { createClient } from '@/lib'

const getDohaById = async (
  id: string,
  supabase: any
): Promise<DohaData | null> => {
  const { data: doha, error } = await supabase
    .from('dohas')
    .select('id, doha_hi, doha_en, meaning_en')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching doha: ', error)
    return null
  }

  return (doha as unknown as DohaData) || null
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createClient(req, res)

  const { id } = req.query
  if (req.method === 'GET') {
    try {
      const doha = await getDohaById(id as string, supabase)
      res.status(200).json(doha)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doha' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
