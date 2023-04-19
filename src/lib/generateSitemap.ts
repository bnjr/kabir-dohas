// src/lib/generateSitemap.ts

import {SitemapStream, streamToPromise} from 'sitemap'
import {Readable} from 'stream'

type Page = {
  url: string
  changefreq?: string
  priority?: number
}

export async function generateSitemap(pages: Page[]): Promise<string> {
  const hostname = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const stream = new SitemapStream({hostname})

  function addUrlToStream(page: Page) {
    stream.write(page)
  }

  pages.forEach(addUrlToStream)
  stream.end()

  const sitemap = await streamToPromise(Readable.from(stream)).then((sm) =>
    sm.toString()
  )

  return sitemap
}
