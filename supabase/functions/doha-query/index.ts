import { corsHeaders } from '../_shared/cors.ts'
import { ApplicationError, UserError } from '../_utils/errors.ts'
import { generateEmbeddings, searchEmbeddings } from './embeddings.ts'
import { llm } from './llm.ts'

Deno.serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }
    // console.log('req', req)
    // const query = new URL(req.url).searchParams.get('query')
    const { query } = await req.json()

    if (!query) {
      throw new UserError('Missing query in request data')
    }

    console.log('Generating embeddings for the search query...')
    const searchEmbedding = await generateEmbeddings(query)

    console.log('Searching for relevant dohas...')
    const dohas = await searchEmbeddings(searchEmbedding)

    if (dohas && dohas.length > 0) {
      console.log('Relevant dohas found.')
      console.log('') // Add a blank line for readability

      console.log('Generating response...')

      // Call the llm function with the relevant dohas and user query
      const res = await llm(
        dohas.map((doha) => `Doha number ${doha.id}: ${doha.doha_hi}`),
        query
      )
      return res
    } else {
      console.log('No relevant dohas found.')
      console.log('') // Add a blank line for readability
      return new Response(
        JSON.stringify({ error: 'No relevant dohas found' }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      )
    }
  } catch (err: unknown) {
    if (err instanceof UserError) {
      return new Response(
        JSON.stringify({
          error: err.message,
          data: err.data,
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      )
    } else if (err instanceof ApplicationError) {
      // Print out application errors with their additional data
      console.error(`${err.message}: ${JSON.stringify(err.data)}`)
    } else {
      // Print out unexpected errors as is to help with debugging
      console.error(err)
    }

    // TODO: include more response info in debug environments
    return new Response(
      JSON.stringify({
        error: 'There was an error processing your request',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})
