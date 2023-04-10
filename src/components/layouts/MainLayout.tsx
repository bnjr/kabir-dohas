// components/layouts/MainLayout.tsx
import React from 'react'
import Footer from '../Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 p-4'>
      <div className='w-full max-w-2xl'>{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
