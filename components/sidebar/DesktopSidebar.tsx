'use client'

// import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import Avatar from '@/components/sidebar/Avatar'
import Desktopitem from '@/components/sidebar/Desktopitem'
import useRoutes from '@/utils/hooks/useRoutes'

const DesktopSidebar = () => {
    const { data: session } = useSession()
    const user = session?.user
    // console.log(user)
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
            <nav className="mt-4 flex flex-col justify-between items-center">
                <div className="cursor-pointer hover:opacity-75 transition" onClick={() => setIsOpen(true)}>
                    <Avatar user={user} />
                </div>
            </nav>
        </div>
    )
}

export default DesktopSidebar