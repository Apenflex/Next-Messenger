'use client'

import { useEffect, useRef, useState } from 'react'

import { FullMessageType } from '@/types'
import useConversation from '@/utils/hooks/useConversation'

import MessageBox from './MessageBox'

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)

    const { conversationId } = useConversation()

    useEffect(() => {
        const res = async () => {
            await fetch(`/api/conversations/${conversationId}/seen`, {
                method: 'POST',
                body: JSON.stringify({ conversationId }),
            })
        }
    }, [conversationId])

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox key={message.id} data={message} isLast={i === messages.length - 1} />
            ))}
            <div className="pt-24" ref={bottomRef} />
        </div>
    )
}

export default Body
