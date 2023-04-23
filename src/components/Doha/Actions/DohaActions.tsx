import React from 'react'
import FavoriteButton from './FavoriteButton'
import ShareButtons from './ShareButtons'
import {DohaData} from '@/types/types'
import ViewCounter from './ViewCounter'
import useDohaViews from '@/hooks/useDohaViews'

interface DohaActionsProps {
  dohaData: DohaData
}

const DohaActions: React.FC<DohaActionsProps> = ({dohaData}) => {
  const {views, favoriteCount} = useDohaViews(dohaData.ID)

  return (
    <div className='flex items-center space-x-3 mt-6'>
      <ViewCounter views={views ?? 0} />
      <FavoriteButton dohaId={dohaData.ID} favoriteCount={favoriteCount ?? 0} />
      <ShareButtons
        url={
          typeof window !== 'undefined'
            ? `${window.location.origin}/doha/${dohaData.ID}`
            : ''
        }
        title={`Kabir's Doha: ${dohaData.Doha}`}
        description={dohaData.EN}
      />
    </div>
  )
}

export default DohaActions
