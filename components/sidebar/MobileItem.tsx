'use client'

import clsx from 'clsx'
import Link from 'next/link'

interface MobileItemProps {
    // label: string
    href: string
    icon: any
    active?: boolean
    onClick?: () => void
}

const MobileItem: React.FC<MobileItemProps> = ({ href, icon: Icon, active, onClick }) => {
    const handleClick = () => {
        if (onClick) return onClick()
    }
    return (
        <Link
            href={href}
            onClick={handleClick}
            className={clsx(`group MobileItemLink`, active && 'bg-gray-100 text-black')}
        >
            <Icon className='h-6 w-6'/>
        </Link>
    )
}

export default MobileItem
