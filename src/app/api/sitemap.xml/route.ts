import { NextRequest } from 'next/server'
import { generateSitemap } from '@/lib/generateSitemap'
import { getDohas } from '@/lib/dohaStore'

export const dynamic = 'force-dynamic'

const sitemapPages: { url: string }[] = [
    { url: '/' },
    { url: '/about' },
    { url: '/dohas' },
    { url: '/favorites' },
    { url: '/doha-query' },
]

export async function GET(_request: NextRequest) {
    try {
        const allDohas = getDohas()
        const dohaPages = allDohas.map(doha => ({
            url: `/doha/${doha.id}`,
            changefreq: 'monthly',
            priority: 0.7
        }))

        const sitemap = await generateSitemap([...sitemapPages, ...dohaPages])

        return new Response(sitemap, {
            headers: {
                'Content-Type': 'application/xml',
            },
        })
    } catch (error) {
        console.error('Error generating sitemap:', error)
        return new Response('Failed to generate sitemap', { status: 500 })
    }
}
