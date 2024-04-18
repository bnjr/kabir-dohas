import { codeBlock } from 'commmon-tags'
import { ensureGetEnv } from '../_utils/env.ts'
import { supabase } from '../_clients/supabase.ts'
import { corsHeaders } from '../_shared/cors.ts'

const apiKey = ensureGetEnv('PERPLEXITY_API_KEY')
if (!apiKey) {
  console.error(
    'Missing Perplexity API key. Please check your environment variables.'
  )
}
async function llm(
  selectedDohas: string[],
  userQuery: string
): Promise<Response> {
  const { data: models } = await supabase
    .from('models')
    .select('model')
    .eq('active', true)
    .single()

  const { data: prompts } = await supabase
    .from('prompts')
    .select('prompt')
    .eq('active', true)
    .single()

  const promptText = prompts?.prompt?.replace(/\n/g, ' ')

  const systemContent = codeBlock`
    ${promptText}   
  `

  const userContent = codeBlock`   
    """
    ${selectedDohas.join(' ')}
    """

    Question: ${userQuery}
  `

  try {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        //@ts-ignore we have different model for ppxt
        model: models?.model,
        messages: [
          { role: 'system', content: systemContent },
          { role: 'user', content: userContent },
        ],
        stream: true,
      }),
    }

    const res = await fetch(
      'https://api.perplexity.ai/chat/completions',
      options
    )

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    // Proxy the streamed SSE response from OpenAI
    return new Response(res.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    })
  } catch (error) {
    console.error('Error generating response:', error)
    throw error
  }
}

export { llm }
