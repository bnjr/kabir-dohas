// /api/doha/[id].ts
import {NextApiRequest, NextApiResponse} from 'next'
import Airtable from 'airtable'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? ''
const AIRTABLE_TABLE_NAME = 'Dohas'

const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID)

const getDohaById = async (id: string) => {
  const records = await base(AIRTABLE_TABLE_NAME)
    .select({
      maxRecords: 1,
      view: 'Grid view',
      fields: ['ID', 'Doha', 'EN', 'Meaning'],
      filterByFormula: `{ID} = ${id}`,
    })
    .all()

  return records[0].fields
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {id} = req.query

  if (req.method === 'GET') {
    try {
      const doha = await getDohaById(id as string)
      res.status(200).json(doha)
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch doha'})
    }
  } else {
    res.status(405).json({error: 'Method not allowed'})
  }
}
