'use client'

import { Conversation, Message, User } from '@prisma/client'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCallback, useMemo } from 'react'

import { FullConversationType } from '@/types'
import useOtherUser from '@/utils/hooks/useOtherUser'

import Avatar from '../Avatar'

interface ConversationBoxProps {
    data: FullConversationType
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
    const session = useSession()
    const router = useRouter()
    const otherUser = useOtherUser(data)

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || []
        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    const hasSeen = useMemo(() => {
        if (!lastMessage) return false
        const seenArr = lastMessage.seen || []
        if (!userEmail) return false
        return seenArr.filter((user) => user.email === userEmail).length !== 0
    }, [lastMessage, userEmail])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return '🌇 Sent an image'
        if (lastMessage?.body) return lastMessage.body
        return '🤔 Started a conversation'
    }, [lastMessage])

    return (
        <div
            className={clsx(
                `w-full relative flex items-center space-x-3 hover:bg-neutral-100
                rounded-lg transition cursor-pointer p-3`,
                selected ? 'bg-neutral-100' : 'bg-white'
            )}
            onClick={handleClick}
        >
            <Avatar user={otherUser} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-md font-medium text-gray-900">{data.name || otherUser.name}</p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs text-gray-400 font-light">
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p className={clsx(`truncate text-sm`, hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox
