import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
    variant?: ButtonVariant
    icon?: IconDefinition
    children: React.ReactNode
    onClick?: () => void
    href?: string
    className?: string
}

const baseStyles = 'font-sans font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3'

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-serene-accent text-white hover:bg-serene-accent/90 hover:shadow-lg active:scale-95',
    secondary: 'serene-glass text-serene-accent cursor-pointer hover:bg-white/90 hover:shadow-md border-2 border-serene-accent/40',
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    icon,
    children,
    onClick,
    href,
    className = '',
}) => {
    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`.trim()

    const content = (
        <>
            {icon && (
                <FontAwesomeIcon
                    icon={icon}
                    className={variant === 'primary' ? 'text-white/90' : undefined}
                />
            )}
            <span>{children}</span>
        </>
    )

    if (href) {
        return (
            <Link href={href}>
                <div className={combinedStyles}>{content}</div>
            </Link>
        )
    }

    return (
        <button onClick={onClick} className={combinedStyles}>
            {content}
        </button>
    )
}

export default Button
