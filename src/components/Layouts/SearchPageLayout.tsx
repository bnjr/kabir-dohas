import React from 'react'
import Spinner from '@/components/Utils/Spinner'
import MoodChips from '@/components/Find/MoodChips'
import PageNavigation from '@/components/Page/PageNavigation'
import Input from '@/components/ui/Input'
import Divider from '@/components/ui/Divider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { config } from '@/lib/config'

interface SearchPageLayoutProps {
    /** Optional header content (e.g., Kabir image on home page) */
    headerContent?: React.ReactNode
    /** Main title - hidden when loading or showing results */
    title?: string
    /** Subtitle - hidden when loading or showing results */
    subtitle?: string
    /** Current search input value */
    searchInput: string
    /** Search input change handler */
    onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    /** Form submit handler */
    onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    /** Mood chip click handler */
    onChipClick?: (mood: string) => void
    /** Loading state */
    loading?: boolean
    /** Loading message */
    loadingMessage?: string
    /** Results content */
    children?: React.ReactNode
    /** Handler for receiving a doha */
    onReceiveDoha?: () => void
    /** Whether to show the search button in navigation */
    showSearchInNav?: boolean
}

const SearchPageLayout: React.FC<SearchPageLayoutProps> = ({
    headerContent,
    title,
    subtitle,
    searchInput,
    onSearchInputChange,
    onSearchSubmit,
    onChipClick,
    loading = false,
    loadingMessage = config.messages.loading.search,
    children,
    onReceiveDoha,
    showSearchInNav = false,
}) => {
    const hasResults = React.Children.count(children) > 0
    const isCompact = loading || hasResults

    return (
        <>
            <div className={`flex flex-col items-center w-full max-w-2xl mx-auto px-4 sm:px-6 ${isCompact ? 'mt-4' : 'mt-8'}`}>
                {/* Optional header content (e.g., Kabir image) */}
                {headerContent && !loading && !hasResults && headerContent}

                {/* Title and subtitle - hidden when loading or showing results */}
                {title && !loading && !hasResults && (
                    <h1 className="text-3xl sm:text-4xl font-serif font-semibold mb-2 text-serene-text text-center tracking-tight">
                        {title}
                    </h1>
                )}
                {subtitle && !loading && !hasResults && (
                    <p className="text-serene-muted mb-8 text-center font-sans">
                        {subtitle}
                    </p>
                )}

                {/* Search form */}
                <form
                    onSubmit={onSearchSubmit}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center w-full mb-4 gap-3 sm:gap-4"
                >
                    <div className="relative flex-grow">
                        <Input
                            type="text"
                            placeholder={config.searchPlaceholder}
                            value={searchInput}
                            onChange={onSearchInputChange}
                        />
                    </div>
                    <button
                        className="bg-serene-accent hover:bg-serene-accent/90 text-white font-sans font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap flex items-center justify-center gap-3"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white/90" />
                        <span>Seek Wisdom</span>
                    </button>
                </form>

                {/* Mood chips */}
                <MoodChips onChipClick={onChipClick} />

                {/* Divider */}
                <Divider className="mt-2 mb-4" />

                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center items-center py-8">
                        <Spinner />
                        <p className="text-lg font-sans text-serene-accent ml-4 animate-pulse">
                            {loadingMessage}
                        </p>
                    </div>
                )}

                {/* Results */}
                {children && (
                    <div className="w-full">
                        {children}
                    </div>
                )}
            </div>

            {/* Navigation buttons */}
            <PageNavigation onReceiveDoha={onReceiveDoha} showSearch={showSearchInNav} />
        </>
    )
}

export default SearchPageLayout
