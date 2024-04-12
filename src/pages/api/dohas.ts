import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

const getAllDohas = async (): Promise<any[] | null> => {
  const { data: dohas, error } = await supabase.from('dohas').select('*')
  return dohas
}

const getPaginatedDohas = async (
  page: number,
  limit: number
): Promise<any[]> => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit - 1

  let { data: dohas, error } = await supabase
    .from('dohas')
    .select('id, doha_hi, doha_en, meaning_en')
    .range(startIndex, endIndex)

  if (error) {
    console.error('Error fetching paginated dohas:', error)
    return []
  }

  return dohas || []
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  const { page, limit, all } = query

  if (all === 'true') {
    try {
      const alldohas = await getAllDohas()
      res.status(200).json({ alldohas })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch all dohas' })
    }
    return
  }

  const pageNum = parseInt(page as string) || 1
  const itemsPerPage = parseInt(limit as string) || 10

  try {
    const dohas = await getPaginatedDohas(pageNum, itemsPerPage)
    res.status(200).json(dohas)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dohas' })
  }
}

export default handler
