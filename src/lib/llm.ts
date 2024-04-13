import { codeBlock } from 'common-tags'
import { NextApiResponse } from 'next/types'
import { supabase } from './supabase'
import { perplexity } from './perplexity'

async function llm(
  selectedDohas: string[],
  userQuery: string,
  res: NextApiResponse
): Promise<void> {
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
    
    Relevant Dohas:
    ${selectedDohas.join(' ')}
    
    Your Response (in Markdown format):
  `
  try {
    const stream = await perplexity.chat.completions.create({
      //@ts-ignore
      model: models?.model,
      messages: [
        { role: 'system', content: systemContent },
        { role: 'user', content: userQuery },
      ],
      stream: true,
    })

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      res.write(content)
    }
  } catch (error) {
    console.error('Error generating response:', error)
  }
}

export { llm }
