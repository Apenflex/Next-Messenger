'use client'

import { User } from '@prisma/client'

import UserBox from './UserBox'

interface UserListProps {
    items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
    return (
        <aside className="UserListAside">
            <div className="px-5">
                <div className="flex-col">
                    <div className="mb-2 border-b-2 pb-3 pt-4 text-2xl font-bold text-neutral-800">People</div>
                </div>
                {items.map((item) => (
                    <UserBox key={item.id} data={item} />
                ))}
            </div>
        </aside>
    )
}

export default UserList
