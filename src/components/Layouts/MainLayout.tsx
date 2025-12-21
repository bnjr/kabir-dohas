// components/layouts/MainLayout.tsx
import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 p-4'>
      <Header />
      <main className='flex-grow w-full max-w-2xl flex flex-col pt-8 pb-12'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
