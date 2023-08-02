import { Conversation } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/client'
import getCurrentUser from '@/utils/actions/getCurrentUser'
import { pusherServer } from '@/utils/pusher'

interface IParams {
    conversationId?: string
}

export async function POST(req: NextRequest, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const { conversationId } = params

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    },
                },
                users: true,
            },
        })
        if (!conversation) {
            return new NextResponse('Invalid ID', { status: 400 })
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1]

        if (!lastMessage) {
            return NextResponse.json(conversation)
        }

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        })

        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [updatedMessage],
        })

        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return NextResponse.json(conversation)
        }

        await pusherServer.trigger(conversationId!, 'message:update', updatedMessage)

        return NextResponse.json(updatedMessage)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES_SEEN')
        return new NextResponse('Something went wrong', { status: 500 })
    }
}
