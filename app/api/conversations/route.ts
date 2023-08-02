import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/client'
import getCurrentUser from '@/utils/actions/getCurrentUser'
import { pusherServer } from '@/utils/pusher'

export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 400 })
        }

        const body = await req.json()
        const { userId, isGroup, members, name } = body

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid Request', { status: 400 })
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({ id: member.value })),
                            { id: currentUser.id },
                        ],
                    },
                },
                include: {
                    users: true,
                },
            })
            
            newConversation.users.map((user) => {
                if (user.email) {
                    pusherServer.trigger(user.email, 'conversation:new', newConversation)
                }
            })
            return NextResponse.json(newConversation)
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId],
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id],
                        }
                    },
                ],
            },
        })

        const singleConversation = existingConversations[0]

        if (singleConversation) {
            return NextResponse.json(singleConversation)
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id,
                        },
                        {
                            id: userId,
                        },
                    ],
                },
            },
            include: {
                users: true,
            },
        })

        newConversation.users.map((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:new', newConversation)
            }
        })
        
        return NextResponse.json(newConversation)
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
