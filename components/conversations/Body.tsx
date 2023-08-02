'use client'

import { find, set, update } from 'lodash'
import { useEffect, useRef, useState } from 'react'

import { FullMessageType } from '@/types'
import useConversation from '@/utils/hooks/useConversation'
import { pusherClient } from '@/utils/pusher'

import MessageBox from './MessageBox'

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
    const [messages, setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)

    const { conversationId } = useConversation()

    useEffect(() => {
        const fetchConversations = async () => {
            await fetch(`/api/conversations/${conversationId}/seen`, {
                method: 'POST',
                body: JSON.stringify({ conversationId }),
            })
        }

        pusherClient.subscribe(conversationId)
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })

        const messageHandler = (message: FullMessageType) => {
            console.log('messageHandler')
            fetchConversations()
            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current
                }
                return [...current, message]
            })
            bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
        }

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) => current.map((currentMessage) => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage
                }
                return currentMessage
            }))
        }

        pusherClient.bind('messages:new', messageHandler)
        pusherClient.bind('message:update', updateMessageHandler)

        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind('messages:new', messageHandler)
            pusherClient.unbind('message:update', updateMessageHandler)
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
