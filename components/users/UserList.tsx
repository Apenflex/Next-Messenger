'use client'

import { User } from '@prisma/client'
import { useState } from 'react'

import Avatar from '@/components/Avatar'
import SettingsModal from '@/components/sidebar/SettingsModal'

import UserBox from './UserBox'

interface UserListProps {
    items: User[]
    currentUser: User
}

const UserList: React.FC<UserListProps> = ({ items, currentUser }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <SettingsModal currentUser={currentUser!} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <aside className="UserListAside">
                <div className="px-5">
                    <div className="flex-col">
                        <div className="flex items-center justify-between border-b-2">
                            <div className="mb-2 pb-3 pt-4 text-2xl font-bold text-neutral-800">People</div>
                            <div
                                className="block cursor-pointer transition hover:opacity-75 lg:hidden"
                                onClick={() => setIsOpen(true)}
                            >
                                <Avatar user={currentUser} />
                            </div>
                        </div>
                    </div>
                    {items.map((item) => (
                        <UserBox key={item.id} data={item} />
                    ))}
                </div>
            </aside>
        </>
    )
}

export default UserList
