// pages/_app.tsx
import type {AppProps} from 'next/app'
import {Analytics} from '@vercel/analytics/react'
import '@/styles/globals.css'
import MainLayout from '../components/Layouts/MainLayout'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {AuthProvider} from '@/context/AuthContext'
import {FavoriteProvider} from '@/context/FavoriteContext'
config.autoAddCss = false

export default function App({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <MainLayout>
          <Component {...pageProps} />
          <Analytics />
        </MainLayout>
      </FavoriteProvider>
    </AuthProvider>
  )
}
