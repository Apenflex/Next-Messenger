'use client'

import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import Avatar from '@/components/Avatar'
import LoadingModal from '@/components/LoadingModal'

interface UserBoxProps {
    data: User
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
    const { name } = data
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(async () => {
        setIsLoading(true)
        const conversations = await fetch('/api/conversations', {
            method: 'POST',
            body: JSON.stringify({ userId: data.id }),
        })
        const { id } = await conversations.json()
        router.push(`/conversations/${id}`)
        setIsLoading(false)
    }, [data, router])

    return (
        <>
            {isLoading && <LoadingModal />}
            <div className="UserBox" onClick={handleClick}>
                <Avatar user={data} />
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <div className="mb-1 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserBox
