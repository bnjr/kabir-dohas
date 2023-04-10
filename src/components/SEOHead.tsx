// components/SEOHead.tsx
import Head from 'next/head'

const SEOHead = () => {
  return (
    <Head>
      <title>{"Kabir's Dohas"}</title>
      <meta
        name='description'
        content="Discover the wisdom of Kabir's Dohas, translated and explained."
      />
      <meta name='keywords' content='Kabir, Dohas, Translation, Meaning' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta property='og:title' content="Kabir's Dohas" />
      <meta
        property='og:description'
        content="Discover the wisdom of Kabir's Dohas, translated and explained."
      />
      <meta
        property='og:image'
        content='https://kabir-dohas.vercel.app/images/kabir.png'
      />
      <meta property='og:type' content='website' />
      <link rel='canonical' href='https://kabir-dohas.vercel.app/' />
    </Head>
  )
}

export default SEOHead
