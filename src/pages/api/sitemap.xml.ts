// src/pages/api/sitemap.xml.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { generateSitemap } from '@/lib/generateSitemap';
import { getDohas } from '@/lib/dohaStore';

const sitemapPages: { url: string }[] = [
  { url: '/' },
  { url: '/about' },
  { url: '/dohas' },
  { url: '/favorites' },
  { url: '/doha-query' },
];

export default async function sitemapHandler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const allDohas = getDohas();
  const dohaPages = allDohas.map(doha => ({
    url: `/doha/${doha.id}`,
    changefreq: 'monthly',
    priority: 0.7
  }));

  const sitemap = await generateSitemap([...sitemapPages, ...dohaPages]);

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
