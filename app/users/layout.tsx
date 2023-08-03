import React from 'react'

import Sidebar from '@/components/sidebar/Sidebar'
import UserList from '@/components/users/UserList'
import getCurrentUser from '@/utils/actions/getCurrentUser'
import getUsers from '@/utils/actions/getUsers'

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
    const users = await getUsers()
    const currentUser = await getCurrentUser()

    return (
        <Sidebar>
            <div className="h-full">
                <UserList items={users} currentUser={currentUser!} />
                {children}
            </div>
        </Sidebar>
    )
}
