import React from 'react'
import { useRouter } from 'next/router'
import { faLayerGroup, faLeaf, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/ui/Button'

interface PageNavigationProps {
    showBrowseCollections?: boolean
    showReceiveDoha?: boolean
    showSearch?: boolean
    showExpandCollection?: boolean
    onReceiveDoha?: () => void
    onExpandCollection?: () => void
}

const PageNavigation: React.FC<PageNavigationProps> = ({
    showBrowseCollections = true,
    showReceiveDoha = true,
    showSearch = false,
    showExpandCollection = false,
    onReceiveDoha,
    onExpandCollection,
}) => {
    const router = useRouter()

    const handleReceiveDoha = () => {
        if (onReceiveDoha) {
            onReceiveDoha()
        } else {
            router.push(`/?randomDoha=true&daily=true&t=${Date.now()}`)
        }
    }

    return (
        <div className='flex flex-wrap justify-center gap-4 mt-12 mb-8 px-4'>
            {showSearch && (
                <Button variant='secondary' icon={faMagnifyingGlass} href='/'>
                    Search
                </Button>
            )}
            {showBrowseCollections && (
                <Button variant='secondary' icon={faLayerGroup} href='/dohas'>
                    Browse Collections
                </Button>
            )}
            {showExpandCollection && onExpandCollection && (
                <Button variant='secondary' icon={faPlus} onClick={onExpandCollection}>
                    Expand Collection
                </Button>
            )}
            {showReceiveDoha && (
                <Button
                    variant='primary'
                    icon={faLeaf}
                    onClick={handleReceiveDoha}
                >
                    Doha of the Day
                </Button>
            )}
        </div>
    )
}

export default PageNavigation
