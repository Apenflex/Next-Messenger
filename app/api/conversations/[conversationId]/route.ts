import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/client'
import getCurrentUser from '@/utils/actions/getCurrentUser'

interface IParams {
    conversationId?: string
}

export async function DELETE(req: NextRequest, { params }: { params: IParams }) {
    try {
        const { conversationId } = params
        const currentUser = await getCurrentUser()
        if (!currentUser?.id) return new NextResponse('Unauthorized', { status: 401 })

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true,
            },
        })
        if (!existingConversation) return new NextResponse('Not Found', { status: 400 })

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id],
                },
            },
        })
        return NextResponse.json(deletedConversation)
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
