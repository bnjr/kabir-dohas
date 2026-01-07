import React from 'react'

interface DividerProps {
    className?: string
}

const Divider: React.FC<DividerProps> = ({ className = '' }) => {
    return (
        <hr className={`w-full border-t border-serene-accent/10 ${className}`} />
    )
}

export default Divider
