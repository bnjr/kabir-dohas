import React from 'react'
import { useRouter } from 'next/router'
import { faLayerGroup, faLeaf, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/ui/Button'

type DohaPageButtonsProps = {}

const DohaPageButtons: React.FC<DohaPageButtonsProps> = () => {
  const router = useRouter()

  return (
    <div className='flex flex-wrap justify-center gap-4 mt-12 mb-8 px-4'>
      <Button variant='secondary' icon={faMagnifyingGlass} href='/'>
        Search
      </Button>
      <Button variant='secondary' icon={faLayerGroup} href='/dohas'>
        Browse Collections
      </Button>
      <Button
        variant='primary'
        icon={faLeaf}
        onClick={() => router.push(`/?randomDoha=true&t=${Date.now()}`)}
      >
        Receive a Doha
      </Button>
    </div>
  )
}

export default DohaPageButtons
