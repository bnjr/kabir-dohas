import React from 'react'
import FavoriteButton from './FavoriteButton'
import ShareButtons from './ShareButtons'
import { DohaData } from '@/types/types'
import ViewCounter from './ViewCounter'
import useDohaViews from '@/hooks/useDohaViews'

import AudioButton from './AudioButton'

interface DohaActionsProps {
  dohaData: DohaData
}

const DohaActions: React.FC<DohaActionsProps> = ({ dohaData }) => {
  const { views, favoriteCount } = useDohaViews(dohaData.id)

  return (
    <div className='flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-6'>
      <ViewCounter views={views ?? 0} />
      <FavoriteButton dohaId={dohaData.id} favoriteCount={favoriteCount ?? 0} />
      <AudioButton text={dohaData.doha_hi} />
      <ShareButtons
        url={
          typeof window !== 'undefined'
            ? `${window.location.origin}/doha/${dohaData.id}`
            : ''
        }
        title={`Kabir's Doha: ${dohaData.doha_hi}`}
        description={dohaData.doha_en}
      />
    </div>
  )
}

export default DohaActions
