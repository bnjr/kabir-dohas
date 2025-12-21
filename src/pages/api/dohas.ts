import { NextApiRequest, NextApiResponse } from 'next'
import { getDohas, getPaginatedDohas } from '@/lib/dohaStore'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  const { page, limit, all } = query

  if (all === 'true') {
    try {
      const alldohas = getDohas()
      res.status(200).json({ alldohas })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch all dohas' })
    }
    return
  }

  const pageNum = parseInt(page as string) || 1
  const itemsPerPage = parseInt(limit as string) || 10

  try {
    const dohas = getPaginatedDohas(pageNum, itemsPerPage)
    res.status(200).json(dohas)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dohas' })
  }
}

export default handler
