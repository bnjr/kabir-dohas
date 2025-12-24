import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { groq } from '@/lib/groq';
import { getEmbedding } from '@/lib/embeddings';
import { searchDohasLocal } from '@/lib/vectorSearch';

export const runtime = 'nodejs'; // Use Node.js runtime for file system access
export const dynamic = 'force-dynamic';

async function getSystemPrompt() {
  const promptPath = path.join(process.cwd(), 'src/data/prompts/prompt.txt');
  const content = fs.readFileSync(promptPath, 'utf-8');
  // Use Ver 3 from the file
  const versions = content.split(/Ver \d+/);
  return versions[3]?.trim() || versions[versions.length - 1]?.trim();
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is missing' }, { status: 400 });
  }

  try {
    // 1. Get embedding for the user query (Free/Local)
    const queryEmbedding = await getEmbedding(query);

    // 2. Search for relevant dohas in the local JSON
    const relevantDohas = await searchDohasLocal(queryEmbedding);

    if (relevantDohas.length === 0) {
      return NextResponse.json({ error: 'No relevant dohas found' }, { status: 404 });
    }

    // 3. Prepare the prompt
    const systemPrompt = await getSystemPrompt();
    const contextText = relevantDohas
      .map(d => `Doha ID ${d.id}:\n${d.doha_hi}\n${d.doha_en}\nMeaning: ${d.meaning_en}`)
      .join('\n\n');

    const userMessage = `"""\n${contextText}\n"""\n\nQuestion: ${query}`;

    // 4. Stream response from Groq
    if (!groq) {
      return NextResponse.json({ error: 'Groq client not initialized' }, { status: 500 });
    }

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',

      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: true,
    });

    // Handle streaming to client
    const encoder = new TextEncoder();
    const customStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error: any) {
    console.error('Error in doha-query API:', error);
    return NextResponse.json(
      { error: error.message || 'There was an error processing your request' },
      { status: 500 }
    );
  }
}
