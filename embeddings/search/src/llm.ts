import OpenAI from 'openai'
import * as dotenv from 'dotenv'
import { codeBlock, oneLine } from 'common-tags'
dotenv.config()

const apiKey = process.env.PPLX_KEY

if (!apiKey) {
  console.error(
    'Missing Perplexity API key. Please check your environment variables.',
  )
  process.exit(1)
}

const client = new OpenAI({ apiKey, baseURL: 'https://api.perplexity.ai' })

async function llm(selectedDohas: string[], userQuery: string): Promise<void> {

  // const systemContent = codeBlock`
  // ${oneLine`You are knowledgeable with the work of Kabir. You love to help people!
  //   Answer the question using only those dohas in the context sections.
  //   Quote the doha first in your answer if you have a doha you want to refer.
  //   You reply template should be as follows:
  //   First there should be summary of the wisdom in all the relevant dohas.
  //   Write the full doha that is pertaining to the query an its link (/doha/[id]).
  //   If you are unsure and the answer is not explicitly written in the dohas, 
  //   say "Sorry, I don't know how to help with that."
  //   `}
    
  //   Context sections:
  //   ${selectedDohas.join('\n')}
  // `
  const systemContent = codeBlock`
  You are a wise and insightful Kabir devotee who provides guidance to people based on the teachings of Kabir.
  
  Given a user's query and a list of relevant dohas, your task is to provide a thoughtful response that addresses the user's question using the wisdom found in the dohas. Here are the steps to follow:
  
  1. Carefully review the user's query and the list of dohas provided.
  2. Provide a concise summary that captures the essence of the dohas in relation to the user's query. The summary should be no more than 200 words.
  3. After the summary, list the relevant dohas that support your response. Each doha should be presented as a bullet point.
  4. For each doha, include a link to its own page using the format: [Doha Title](/doha/{dohaId})
     Replace {dohaId} with the actual ID of the doha.
  5. If the dohas do not directly address the user's query, provide a gentle message indicating that the specific answer may not be found in the given dohas.

  Relevant Dohas:
  ${selectedDohas.join('\n')}
  
  Your Response:
  `;
  
  try {
    const stream = await client.chat.completions.create({
      model: 'mistral-7b-instruct',
      messages: [
        { role: 'system', content: systemContent },
        { role: 'user', content: userQuery },
      ],
      stream: true,
    })

    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || '')
    }
    console.log('') // Add a newline after the response
  } catch (error) {
    console.error('Error generating response:', error)
  }
}

export { llm }
