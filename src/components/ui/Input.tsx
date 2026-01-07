import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Additional class names */
    className?: string
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
    return (
        <input
            className={`w-full bg-white/50 border-2 border-serene-accent/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-serene-accent/50 focus:bg-white transition-all duration-300 text-serene-text placeholder-serene-muted shadow-sm text-lg ${className}`}
            {...props}
        />
    )
}

export default Input
