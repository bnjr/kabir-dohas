// /api/doha/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { Database, DohaData } from '@/types'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

const getDohaById = async (id: string): Promise<DohaData | null> => {
  console.log('getDohaById: ', {id})
  let { data: doha, error } = await supabase
    .from('dohas')
    .select('id, doha_hi, doha_en, meaning_en')
    .eq('id', id)
    .single()

    console.log('getDohaById select: ', {doha, error})

  if (error) {
    console.error('Error fetching doha: ', error)
    return null
  }

  return (doha as unknown as DohaData) || null
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (req.method === 'GET') {
    try {
      const doha = await getDohaById(id as string)
      res.status(200).json(doha)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doha' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
