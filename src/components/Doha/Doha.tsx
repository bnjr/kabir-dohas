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
      'max-w-xl mx-auto hover:border-serene-accent/30': !details,
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
          <div className="w-full">
            <div className='text-xs uppercase tracking-widest font-sans font-medium text-serene-accent/50 mb-4 flex items-center'>
              <span className="w-8 h-px bg-serene-accent/20 mr-3"></span>
              <span>दोहा</span>
              <span className="w-8 h-px bg-serene-accent/20 ml-3"></span>
            </div>
            <Link key={dohaData.id} href={`/doha/${dohaData.id}`} className="group block">
              <div className='relative'>
                <span className="absolute -left-2 -top-2 text-4xl text-serene-accent/15 font-serif">"</span>
                <div className='text-lg sm:text-xl md:text-2xl font-serif font-medium text-serene-text leading-relaxed group-hover:text-serene-accent transition-colors duration-300 text-center px-2 sm:px-4'>
                  {dohaData.doha_hi.split('\n').map((line, index) => (
                    <p key={index} className='mb-2 last:mb-0'>{line.trim()}</p>
                  ))}
                </div>
                <span className="absolute -right-2 -bottom-2 text-4xl text-serene-accent/15 font-serif">"</span>
              </div>
              <p className="text-sm font-sans text-serene-muted mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to explore meaning →
              </p>
            </Link>
          </div>
        )}
      </div>
      {details && (
        <>
          <div className='border-y border-serene-accent/10 py-8 mb-8'>
            <div className='text-2xl sm:text-3xl font-serif font-semibold text-serene-text text-center leading-loose italic space-y-2'>
              {dohaData.doha_hi.split('\n').map((line, index) => (
                <p key={index} className='mb-1'>{line.trim()}</p>
              ))}
            </div>
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
      <div className={classNames(
        details
          ? "mt-10 pt-6 border-t border-serene-accent/5"
          : "mt-6 flex justify-center"
      )}>
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
