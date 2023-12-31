import prisma from '@/prisma/client'

import getSession from './getSession'

const getUsers = async () => {
    const session = await getSession()

    if (!session?.user?.email) {
        return []
    }

    try {
        const allUsers = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                NOT: {
                    email: session.user.email,
                },
            },
        })

        return allUsers
    } catch (error: any) {
        return []
    }
}
export default getUsers
