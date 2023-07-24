import React from 'react'

import Sidebar from '@/components/sidebar/Sidebar'
import UserList from '@/components/users/UserList'
import getUsers from '@/utils/actions/getUsers'

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
    const users = await getUsers()

    return (
        <Sidebar>
            <div className="h-full">
                <UserList items={users} />
                {children}
            </div>
        </Sidebar>
    )
}
