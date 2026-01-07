import React from 'react'

interface ChipProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    /** Whether the chip is currently selected/active */
    active?: boolean
}

const Chip: React.FC<ChipProps> = ({
    children,
    onClick,
    className = '',
    active = false
}) => {
    const activeStyles = active
        ? 'bg-serene-accent text-white'
        : 'bg-serene-accent/5 hover:bg-serene-accent/15 text-serene-accent'

    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-4 py-1.5 rounded-full border border-serene-accent/10 text-sm font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${activeStyles} ${className}`}
        >
            {children}
        </button>
    )
}

export default Chip
