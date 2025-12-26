import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faLeaf, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface PageNavigationProps {
    showBrowseCollections?: boolean
    showReceiveDoha?: boolean
    showSearch?: boolean
    onReceiveDoha?: () => void
}

const PageNavigation: React.FC<PageNavigationProps> = ({
    showBrowseCollections = true,
    showReceiveDoha = true,
    showSearch = false,
    onReceiveDoha,
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
                <Link href='/'>
                    <div className='serene-glass text-serene-accent font-sans font-semibold py-3 px-6 rounded-2xl cursor-pointer hover:bg-white/90 hover:shadow-md transition-all duration-300 border-2 border-serene-accent/40 flex items-center gap-3'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <span>Search</span>
                    </div>
                </Link>
            )}
            {showBrowseCollections && (
                <Link href='/dohas'>
                    <div className='serene-glass text-serene-accent font-sans font-semibold py-3 px-6 rounded-2xl cursor-pointer hover:bg-white/90 hover:shadow-md transition-all duration-300 border-2 border-serene-accent/40 flex items-center gap-3'>
                        <FontAwesomeIcon icon={faLayerGroup} />
                        <span>Browse Collections</span>
                    </div>
                </Link>
            )}
            {showReceiveDoha && (
                <button
                    onClick={handleReceiveDoha}
                    className='bg-serene-accent text-white font-sans font-semibold py-3 px-6 rounded-2xl hover:bg-serene-accent/90 hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-3'
                >
                    <FontAwesomeIcon icon={faLeaf} className="text-white/90" />
                    <span>Doha of the Day</span>
                </button>
            )}
        </div>
    )
}

export default PageNavigation
