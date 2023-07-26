import React from 'react'

import ConversationList from '@/components/conversations/ConversationList'
import Sidebar from '@/components/sidebar/Sidebar'
import getConversations from '@/utils/actions/getConversations'

export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {
    const conversations = await getConversations()
    
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    )
}
