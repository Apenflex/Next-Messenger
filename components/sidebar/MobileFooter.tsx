'use client'

import useConversation from '@/utils/hooks/useConversation'
import useRoutes from '@/utils/hooks/useRoutes'

import MobileItem from './MobileItem'

const MobileFooter = () => {
    const routes = useRoutes()
    const { isOpen } = useConversation()
    if (isOpen) return null

    return (
        <div className="MobileFooter">
            {routes.map((item) => (
                <MobileItem
                    key={item.href}
                    href={item.href}
                    // label={item.label}
                    icon={item.icon}
                    active={item.active}
                    onClick={item.onClick}
                />
            ))}
        </div>
    )
}
export default MobileFooter
