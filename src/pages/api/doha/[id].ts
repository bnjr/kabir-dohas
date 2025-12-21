import { NextApiRequest, NextApiResponse } from 'next'
import { getDohaById } from '@/lib/dohaStore'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (req.method === 'GET') {
    try {
      const doha = getDohaById(id as string)
      if (doha) {
        res.status(200).json(doha)
      } else {
        res.status(404).json({ error: 'Doha not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doha' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
