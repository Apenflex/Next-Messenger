'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'

import { FullConversationType } from '@/types'
import useConversation from '@/utils/hooks/useConversation'

import ConversationBox from './ConversationBox'

interface ConversationListProps {
    initialItems: FullConversationType[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
    const [items, setItems] = useState(initialItems)
    const router = useRouter()
    const { conversationId, isOpen } = useConversation()
    return (
        <aside
            className={clsx(
                `fixed inset-y-0 overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 
                lg:block lg:w-80 lg:pb-0`,
                isOpen ? 'hidden' : 'left-0 block w-full'
            )}
        >
            <div className="px-5">
                <div className="mb-4 flex justify-between border-b-2 pb-2 pt-4">
                    <div className="text-2xl font-bold text-neutral-800 ">Messages</div>
                    <div className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition hover:opacity-75">
                        <MdOutlineGroupAdd size={20} className='text-blue-500'/>
                    </div>
                </div>
                {items.map((item) => (
                    <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
                ))}
            </div>
        </aside>
    )
}

export default ConversationList
