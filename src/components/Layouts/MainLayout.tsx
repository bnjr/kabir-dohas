// components/layouts/MainLayout.tsx
import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col items-center bg-serene-bg p-6'>
      <Header />
      <main className='flex-grow w-full max-w-3xl flex flex-col pt-12 pb-16'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
