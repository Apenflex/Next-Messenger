import prisma from "@/prisma/client";

const getMessages = async (conversationId: string) => { 
    try {
        const messages = await prisma.message.findMany({
            where: { conversationId },
            include: { sender: true, seen: true },
            orderBy: { createdAt: "asc" },
        })

        return messages
    } catch (error) {return []}
}
export default getMessages