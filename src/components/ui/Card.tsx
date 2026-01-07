import React from 'react'

interface CardProps {
    children: React.ReactNode
    className?: string
    /** Whether to use glass effect variant */
    glass?: boolean
}

const Card: React.FC<CardProps> = ({ children, className = '', glass = false }) => {
    const baseClass = glass ? 'serene-glass' : 'serene-card'

    return (
        <div className={`${baseClass} p-6 ${className}`}>
            {children}
        </div>
    )
}

export default Card
