'use client'
import clsx from 'clsx'

import EmptyState from '@/components/EmptyState'
import useConversation from '@/utils/hooks/useConversation'

export default function Conversation() {
    const { isOpen } = useConversation()
    return (
        <div className={clsx('h-full lg:block lg:pl-80', isOpen ? 'block' : 'hidden')}>
            <EmptyState />
        </div>
    )
}
