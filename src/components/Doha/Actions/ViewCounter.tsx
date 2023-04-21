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
    <span className='text-gray-500'>
      {views}
      <FontAwesomeIcon
        icon={faChartSimple}
        aria-label='Views'
        size='xl'
        className='pl-2'
      />
    </span>
  )
}

export default ViewCounter
