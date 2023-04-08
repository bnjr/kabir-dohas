import {NextApiRequest, NextApiResponse} from 'next'
import Airtable from 'airtable'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? ''
const AIRTABLE_TABLE_NAME = 'Dohas'

const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID)

let lastRandomOffset: number | null = null

const getRandomDoha = async () => {
  const totalRecords = await base(AIRTABLE_TABLE_NAME)
    .select({
      maxRecords: 1,
      view: 'Grid view',
      fields: ['Count'],
      sort: [{field: 'Count', direction: 'desc'}],
    })
    .all()

  const total = (totalRecords[0].fields['Count'] as number) ?? 0

  let randomOffset
  do {
    randomOffset = Math.floor(Math.random() * (total - 1)) + 1
  } while (randomOffset === lastRandomOffset)
  lastRandomOffset = randomOffset
  
  const records = await base(AIRTABLE_TABLE_NAME)
    .select({
      maxRecords: 1,
      view: 'Grid view',
      fields: ['Doha', 'EN', 'Meaning'],
      filterByFormula: `{Count} = ${randomOffset}`,
    })
    .all()

  return records[0].fields
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const doha = await getRandomDoha()
      res.status(200).json(doha)
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch doha'})
    }
  } else {
    res.status(405).json({error: 'Method not allowed'})
  }
}
