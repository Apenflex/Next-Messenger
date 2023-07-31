import React from 'react'

import ConversationList from '@/components/conversations/ConversationList'
import Sidebar from '@/components/sidebar/Sidebar'
import getConversations from '@/utils/actions/getConversations'
import getUsers from '@/utils/actions/getUsers'

export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {
    const conversations = await getConversations()
    const users = await getUsers()

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversations} users={users} />
                {children}
            </div>
        </Sidebar>
    )
}
