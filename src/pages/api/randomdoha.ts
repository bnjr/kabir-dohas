import {NextApiRequest, NextApiResponse} from 'next'
import Airtable from 'airtable'
import {DohaData} from '@/types/types'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? ''
const AIRTABLE_TABLE_NAME = 'Dohas'

const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID)

let lastRandomOffset: number | null = null
let totalRecords: number | null = null

const getTotalRecords = async () => {
  const records = await base(AIRTABLE_TABLE_NAME)
    .select({
      maxRecords: 1,
      view: 'Grid view',
      fields: ['id'],
      sort: [{field: 'id', direction: 'desc'}],
    })
    .all()

  return (records[0].fields['id'] as number) ?? 0
}

const getRandomDoha = async (): Promise<DohaData> => {
  if (totalRecords === null) {
    totalRecords = await getTotalRecords()
  }

  let randomOffset
  do {
    randomOffset = Math.floor(Math.random() * (totalRecords - 1)) + 1
  } while (randomOffset === lastRandomOffset)
  lastRandomOffset = randomOffset
  const records = await base(AIRTABLE_TABLE_NAME)
    .select({
      maxRecords: 1,
      view: 'Grid view',
      fields: ['id', 'doha_hi', 'doha_en', 'meaning_en'],
      filterByFormula: `{id} = ${randomOffset}`,
    })
    .all()

  return records[0].fields as unknown as DohaData
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
