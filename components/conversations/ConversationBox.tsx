'use client'

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
    
    const userEmail = useMemo(() => session.data?.user?.email, [session.data?.user?.email])

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
                `relative flex w-full cursor-pointer items-center space-x-3
                rounded-lg p-3 transition hover:bg-neutral-100`,
                selected ? 'bg-neutral-100' : 'bg-white'
            )}
            onClick={handleClick}
        >
            <Avatar user={otherUser} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="mb-1 flex items-center justify-between">
                        <p className="text-md font-medium text-gray-900">{data.name || otherUser.name}</p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs font-light text-gray-400">
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p className={clsx(`truncate text-sm`, hasSeen ? 'text-gray-500' : 'font-medium text-black')}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default ConversationBox
