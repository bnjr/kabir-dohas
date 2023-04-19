// src/pages/api/sitemap.xml.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { generateSitemap } from '@/lib/generateSitemap';

const sitemapPages: { url: string }[] = [
  { url: '/' },
  { url: '/about' },
  { url: '/dohas' },
];

export default async function sitemapHandler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const sitemap = await generateSitemap(sitemapPages);

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
