import React from 'react'
import { useRouter } from 'next/router'
import { faPlus, faLeaf, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/ui/Button'

interface DohasPageButtonsProps {
  fetchMoreDohas: () => void
}

const DohasPageButtons: React.FC<DohasPageButtonsProps> = ({
  fetchMoreDohas,
}) => {
  const router = useRouter()

  return (
    <div className='flex flex-wrap justify-center gap-4 mt-12 mb-8 px-4'>
      <Button variant='secondary' icon={faMagnifyingGlass} href='/'>
        Search
      </Button>
      <Button variant='secondary' icon={faPlus} onClick={fetchMoreDohas}>
        Expand Collection
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

export default DohasPageButtons
