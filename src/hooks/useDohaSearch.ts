import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'

interface UseDohaSearchOptions {
    /** Initial search value */
    initialValue?: string
    /** Route to navigate to on search */
    searchRoute?: string
}

interface UseDohaSearchReturn {
    /** Current search input value */
    searchInput: string
    /** Set search input directly */
    setSearchInput: (value: string) => void
    /** Handle input change event */
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    /** Handle form submit */
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    /** Handle mood chip click */
    handleChipClick: (mood: string) => void
}

/**
 * Custom hook for managing doha search state and navigation
 */
export function useDohaSearch(options: UseDohaSearchOptions = {}): UseDohaSearchReturn {
    const { initialValue = '', searchRoute = '/doha-query' } = options
    const [searchInput, setSearchInput] = useState(initialValue)
    const router = useRouter()

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }, [])

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (searchInput.trim()) {
            router.push(`${searchRoute}?searchQuery=${encodeURIComponent(searchInput.trim())}`)
        }
    }, [searchInput, searchRoute, router])

    const handleChipClick = useCallback((mood: string) => {
        setSearchInput(mood)
        router.push(`${searchRoute}?searchQuery=${encodeURIComponent(mood)}`)
    }, [searchRoute, router])

    return {
        searchInput,
        setSearchInput,
        handleInputChange,
        handleSubmit,
        handleChipClick,
    }
}

export default useDohaSearch
