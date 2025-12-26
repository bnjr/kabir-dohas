// src/components/Doha/Actions/ViewCounter.tsx

import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface ViewCounterProps {
  views?: number
}

const ViewCounter: React.FC<ViewCounterProps> = ({ views }) => {
  if (views === undefined) {
    return null
  }
  return (
    <div className='flex items-center gap-1.5'>
      <span className='text-base font-medium text-serene-muted'>{views}</span>
      <FontAwesomeIcon
        icon={faChartSimple}
        aria-label='Views'
        size='lg'
        className='text-serene-accent'
      />
    </div>
  )
}

export default ViewCounter
