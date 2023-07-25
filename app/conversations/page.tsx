'use client'
import clsx from 'clsx'

import EmptyState from '@/components/EmptyState'
import useConversation from '@/utils/hooks/useConversation'

export default function Conversation() {
    const { isOpen } = useConversation()
    return (
        <div className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}>
            <EmptyState />
        </div>
    )
}
