import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  imageUrl?: string
  url?: string
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://kabir-dohas.vercel.app'

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Kabir's Dohas",
  description = "Discover the wisdom of Kabir's Dohas, translated and explained.",
  keywords = 'Kabir, Dohas, Translation, Meaning, Spirituality, Hindi Poetry, Sant Kabir',
  imageUrl,
  url,
}) => {
  const fullUrl = url || BASE_URL
  const fullImageUrl = imageUrl
    ? (imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}/${imageUrl}`)
    : `${BASE_URL}/images/kabir.png`

  // JSON-LD structured data for better search engine understanding
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Kabir's Dohas",
    description: description,
    url: BASE_URL,
    inLanguage: ['en', 'hi'],
    author: {
      '@type': 'Person',
      name: 'Sant Kabir',
      description: '15th-century Indian mystic poet and saint'
    },
    publisher: {
      '@type': 'Organization',
      name: "Kabir's Dohas",
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/kabir.png`
      }
    }
  }

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='robots' content='index, follow' />
      <meta name='author' content='Sant Kabir' />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={fullImageUrl} />
      <meta property='og:site_name' content="Kabir's Dohas" />
      <meta property='og:locale' content='en_US' />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:url' content={fullUrl} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={fullImageUrl} />

      {/* Google Site Verification */}
      <meta name="google-site-verification" content="OS6SUdiQHrikkEoH_alhSZaTCM5F8LRptv3592L5Xlo" />

      {/* Canonical URL */}
      <link rel='canonical' href={fullUrl} />

      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  )
}

export default SEOHead
