import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";
import getCurrentUser from "@/utils/actions/getCurrentUser";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, image, conversationId } = body;

        const currentUser = await getCurrentUser();
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seen: true,
                sender: true
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                    }
                }
            }
        })

        return NextResponse.json(newMessage);
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}