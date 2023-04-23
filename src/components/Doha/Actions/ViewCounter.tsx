// src/components/Doha/Actions/ViewCounter.tsx

import {faChartSimple} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'

interface ViewCounterProps {
  views?: number
}

const ViewCounter: React.FC<ViewCounterProps> = ({views}) => {
  if (views === undefined) {
    return null
  }
  return (
    <div className='flex items-center space-x-1'>
      <span className='text-xl text-gray-500'>{views}</span>
      <FontAwesomeIcon
        icon={faChartSimple}
        aria-label='Views'
        size='xl'
        className='text-gray-500'
      />
    </div>
  )
}

export default ViewCounter
