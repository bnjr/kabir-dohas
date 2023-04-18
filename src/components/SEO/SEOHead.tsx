import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  imageUrl?: string
  url?: string
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Kabir's Dohas",
  description = "Discover the wisdom of Kabir's Dohas, translated and explained.",
  keywords = 'Kabir, Dohas, Translation, Meaning',
  imageUrl = 'images/kabir.png',
  url = 'https://kabir-dohas.vercel.app/',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:type' content='website' />
      <meta name="google-site-verification" content="OS6SUdiQHrikkEoH_alhSZaTCM5F8LRptv3592L5Xlo" />
      <link rel='canonical' href={url} />
    </Head>
  )
}

export default SEOHead
