import prisma from "@/prisma/client";
import getCurrentUser from "@/utils/actions/getCurrentUser";

const getConversations = async () => { 
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) return []

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        })
        return conversations
    } catch (error) {
        return []
    }
}
export default getConversations