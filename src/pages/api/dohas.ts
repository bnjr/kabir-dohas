import {NextApiRequest, NextApiResponse} from 'next'
import Airtable from 'airtable'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? ''
const AIRTABLE_TABLE_NAME = 'Dohas'

const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID)

const getAllDohas = async (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const dohas: any[] = []

    base(AIRTABLE_TABLE_NAME)
      .select({
        view: 'Grid view',
        fields: ['id', 'doha_hi', 'doha_en', 'meaning_en'],
        sort: [{field: 'id', direction: 'asc'}],
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            dohas.push(record.fields)
          })

          fetchNextPage()
        },
        (error) => {
          if (error) {
            reject(error)
          } else {
            resolve(dohas)
          }
        }
      )
  })
}

const getPaginatedDohas = async (
  page: number,
  limit: number
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const dohas: any[] = []
    let pageCount = 0

    base(AIRTABLE_TABLE_NAME)
      .select({
        pageSize: limit,
        view: 'Grid view',
        fields: ['id', 'doha_hi', 'doha_en', 'meaning_en'],
        sort: [{field: 'id', direction: 'asc'}],
      })
      .eachPage(
        (records, fetchNextPage) => {
          pageCount++

          if (pageCount === page) {
            records.forEach((record) => {
              dohas.push(record.fields)
            })

            resolve(dohas)
            return
          }

          fetchNextPage()
        },
        (error) => {
          if (error) {
            reject(error)
          }
        }
      )
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {query} = req
  const {page, limit, all} = query

  if (all === 'true') {
    try {
      const alldohas = await getAllDohas()
      res.status(200).json({alldohas})
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch all dohas'})
    }
    return
  }

  const pageNum = parseInt(page as string) || 1
  const itemsPerPage = parseInt(limit as string) || 10

  try {
    const dohas = await getPaginatedDohas(pageNum, itemsPerPage)
    res.status(200).json(dohas)
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch dohas'})
  }
}

export default handler
