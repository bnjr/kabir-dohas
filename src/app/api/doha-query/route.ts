// To stream responses you must use Route Handlers in the App Router, even if the rest of your app uses the Pages Router.
import { NextRequest, NextResponse } from 'next/server'
import { supabaseInfo } from '../../../lib'

export const runtime = 'edge' // or 'nodejs' which uses Serverless Functions
export const dynamic = 'force-dynamic' // always run dynamically

async function streamDohaFinderResponse(query: string) {
  const response = await fetch(
    `${supabaseInfo().SUPABASE_URL}/functions/v1/doha-query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseInfo().SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reader = response.body?.getReader();
  const stream = new ReadableStream({
    async start(controller) {
      while (true && reader) {
        const { done, value } = await reader.read();
        if (done) break;
        // Directly enqueue the Uint8Array to the controller
        controller.enqueue(value);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}


export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')

  if (!query) {
    return new NextResponse(
      JSON.stringify({ error: 'Query parameter is missing' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  try {
    return await streamDohaFinderResponse(query)
  } catch (error) {
    console.error('Error in streaming doha-finder response:', error)
    return new NextResponse(JSON.stringify({ error: (error as unknown as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
