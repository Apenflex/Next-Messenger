'use client'

import { User } from '@prisma/client'
import Image from 'next/image'

interface AvatarProps {
    user?: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
    return (
        <div className="relative">
            <div className="relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-11 md:w-11">
                <Image src={user?.image || '/assets/images/placeholder.jpg'} alt="Avatar" fill />
            </div>
            <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3" />
        </div>
    )
}

export default Avatar
