'use client'

import { User } from '@prisma/client'
import { useState } from 'react'

import Desktopitem from '@/components/sidebar/Desktopitem'
import useRoutes from '@/utils/hooks/useRoutes'

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
    console.log(currentUser)
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="DesctopSidebarContainer">
            <nav className="mt-4 flex flex-col justify-between">
                <ul role="list" className="flex flex-col items-center space-y-1">
                    {routes.map((item) => (
                        <Desktopitem
                            key={item.label}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                            onClick={item.onClick}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default DesktopSidebar
