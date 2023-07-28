'use client'

import clsx from 'clsx'
import { format } from 'date-fns'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import Avatar from '@/components/Avatar'
import { FullMessageType } from '@/types'

interface MessageBoxProps {
    data: FullMessageType
    isLast?: boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
    const session = useSession()

    const isOwn = session.data?.user?.email === data?.sender?.email
    const seenlist = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ')

    const container = clsx('flex gap-3 p-4', isOwn && 'justify-end')
    const avatar = clsx(isOwn && 'order-2')
    const body = clsx('flex flex-col gap-2', isOwn && 'items-end')
    const message = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn ? 'bg-green-500 text-white' : 'bg-gray-100',
        data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    )
    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">{data.sender.name}</div>
                    <div className="text-xs text-gray-400">{format(new Date(data.createdAt), 'p')}</div>
                </div>
                <div className={message}>
                    {data.image ? (
                        <Image
                            src={data.image}
                            alt="image"
                            width={288}
                            height={288}
                            className="translate cursor-pointer object-cover transition hover:scale-110"
                        />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenlist.length > 0 && (
                    <div className="text-xs font-light text-gray-500">{`Seen by ${seenlist}`}</div>
                )}
            </div>
        </div>
    )
}

export default MessageBox
