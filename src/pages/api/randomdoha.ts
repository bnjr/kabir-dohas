import { NextApiRequest, NextApiResponse } from 'next'
import { getRandomDoha, getDohaOfDay } from '@/lib/dohaStore'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { daily } = req.query
      const doha = daily === 'true' ? getDohaOfDay() : getRandomDoha()
      if (doha) {
        res.status(200).json(doha)
      } else {
        res.status(404).json({ error: 'No dohas found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doha' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
