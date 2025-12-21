import React from 'react'
import { DohaData } from '../../types/types'
import DohaSkeleton from './DohaSkeleton'
import Link from 'next/link'
import DohaActions from './Actions/DohaActions'
import { useEffect } from 'react'
import { incrementDohaViews } from '@/lib/incrementDohaViews'
import classNames from 'classnames'

interface DohaProps {
  dohaData: DohaData | null
  loading: boolean
  details?: boolean
}

const DohaComponent: React.FC<DohaProps> = ({
  dohaData,
  loading,
  details = false,
}) => {
  useEffect(() => {
    const addView = async () => {
      if (!loading && dohaData) {
        await incrementDohaViews(dohaData.id)
      }
    }
    addView()
  }, [loading, dohaData])

  if (loading) {
    return <DohaSkeleton details />
  }

  const cardClasses = classNames(
    'serene-card p-8 w-full mb-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1',
    {
      'max-w-3xl': details,
      'max-w-md mx-auto': !details,
    }
  )
  return dohaData ? (
    <div className={cardClasses}>
      <div className='flex justify-between items-start mb-6'>
        {details ? (
          <h1 className='text-sm uppercase tracking-widest font-sans font-semibold text-serene-accent/60'>
            Eternal Wisdom
          </h1>
        ) : (
          <Link key={dohaData.id} href={`/doha/${dohaData.id}`} className="group">
            <div className='text-xl sm:text-2xl font-serif font-medium text-serene-text leading-relaxed group-hover:text-serene-accent transition-colors duration-300'>
              {dohaData.doha_hi}
            </div>
          </Link>
        )}
      </div>
      {details && (
        <>
          <div className='border-y border-serene-accent/10 py-8 mb-8'>
            <p className='text-2xl sm:text-3xl font-serif font-semibold text-serene-text text-center leading-relaxed italic'>
              {dohaData.doha_hi}
            </p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className='text-xs uppercase tracking-widest font-sans font-bold mb-3 text-serene-accent'>
                Translation
              </h2>
              <p className='text-lg font-sans text-serene-text/80 leading-relaxed'>{dohaData.doha_en}</p>
            </section>
            <section>
              <h2 className='text-xs uppercase tracking-widest font-sans font-bold mb-3 text-serene-accent'>
                Inner Meaning
              </h2>
              <p className='text-lg font-sans text-serene-text/80 leading-relaxed'>{dohaData.meaning_en}</p>
            </section>
          </div>
        </>
      )}
      <div className="mt-10 pt-6 border-t border-serene-accent/5">
        <DohaActions dohaData={dohaData} />
      </div>
    </div>
  ) : (
    <div className='text-serene-accent text-center my-8 font-serif italic'>Waiting for wisdom...</div>
  )
}

const Doha = React.memo(DohaComponent)
Doha.displayName = 'Doha'

export default Doha
