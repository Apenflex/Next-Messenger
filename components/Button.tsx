'use cleint'

import clsx from 'clsx'

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined
    fullWidth?: boolean
    children?: React.ReactNode
    onClick?: () => void
    secondary?: boolean
    danger?: boolean
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ type, fullWidth, children, onClick, secondary, danger, disabled }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(
                `form_button`,
                disabled && 'opacity-50 cursor-default',
                fullWidth && 'w-full',
                secondary ? 'text-gray-900' : 'text-white',
                danger && 'form_button_danger',
                !secondary && !danger && 'form_button_default'
            )}
        >
            {children}
        </button>
    )
}

export default Button
