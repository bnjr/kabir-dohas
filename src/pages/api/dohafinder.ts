import {NextApiRequest, NextApiResponse} from 'next'
import {OpenAI} from 'langchain/llms/openai'
import {RetrievalQAChain} from 'langchain/chains'
import {JSONLoader} from 'langchain/document_loaders/fs/json'
import {HNSWLib} from 'langchain/vectorstores/hnswlib'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import {VectorStore} from 'langchain/dist/vectorstores/base'
import Airtable from 'airtable'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? ''
const AIRTABLE_TABLE_NAME = 'Dohas'
const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID)

const fetchAllDohas = async (): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const dohas: any[] = []

    base(AIRTABLE_TABLE_NAME)
      .select({
        view: 'Grid view',
        fields: ['doha_hi'],
        // fields: ['doha_en'],
        // fields: ['meaning_en'],
        // fields: ['doha_hi', 'doha_en', 'meaning_en'],
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
            const jsonString = JSON.stringify(dohas)
            resolve(new Blob([jsonString], {type: 'application/json'}))
          }
        }
      )
  })
}

const createVectorStore = async (): Promise<VectorStore> => {
  const dohasBlob = await fetchAllDohas()
  const loader = new JSONLoader(dohasBlob)
  const docs = await loader.load()

  // Load the docs into the vector store
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings())

  return vectorStore
}

const getDohaRetrievalChain = async (): Promise<RetrievalQAChain> => {
  const vectorStore = await createVectorStore()

  const chain = RetrievalQAChain.fromLLM(
    new OpenAI(),
    vectorStore.asRetriever(),
    {returnSourceDocuments: true}
  )
  return chain
}

const initializeChain = async () => {
  if (!chain) {
    chain = await getDohaRetrievalChain()
  }
}

let chain: RetrievalQAChain | null = null

initializeChain()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {userPrompt} = req.body

    try {
      if (!chain) {
        await initializeChain()
      }

      const response = await chain?.call({
        query: userPrompt,
      })

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({error: (error as Error).message})
    }
  } else {
    res.status(405).json({error: 'Method not allowed'})
  }
}

export default handler
