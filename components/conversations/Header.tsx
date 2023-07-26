'use client'

import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { useMemo } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'

import Avatar from '@/components/Avatar'
import useOtherUser from '@/utils/hooks/useOtherUser'

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation)
    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }
        return 'Active'
    }, [conversation])
    return (
        <div className="ConversationHeader">
            <div className="flex items-center gap-3">
                <Link
                    href="/conversations"
                    className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
                >
                    <HiChevronLeft size={32} />
                </Link>
                <Avatar user={otherUser} />
                <div className="flex flex-col">
                    <div className="">{conversation.name || otherUser.name}</div>
                    <div className="text-sm font-light text-neutral-500">{statusText}</div>
                </div>
            </div>
            <HiEllipsisHorizontal
                className="cursor-pointer text-sky-500 transition hover:text-sky-600"
                size={32}
                onClick={() => {}}
            />
        </div>
    )
}

export default Header
