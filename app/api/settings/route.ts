import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/client'
import getCurrentUser from '@/utils/actions/getCurrentUser'

export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })
        const body = await req.json()
        const { name, image } = body

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: { name, image }
        })
        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
