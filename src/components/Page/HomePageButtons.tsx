import React from 'react'
import { faLayerGroup, faLeaf } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/ui/Button'

type HomePageButtonsProps = {
  fetchRandomDoha: () => void
}

const HomePageButtons: React.FC<HomePageButtonsProps> = ({ fetchRandomDoha }) => {
  return (
    <div className='flex flex-wrap justify-center gap-6 mt-12 mb-8'>
      <Button variant='secondary' icon={faLayerGroup} href='/dohas'>
        Browse Collections
      </Button>
      <Button variant='primary' icon={faLeaf} onClick={fetchRandomDoha}>
        Receive a Doha
      </Button>
    </div>
  )
}

export default HomePageButtons
