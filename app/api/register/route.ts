import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/prisma/client';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return new NextResponse('Missing info', { status: 500 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });
        // console.log('server',user);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Something went wrong', { status: 500 });
    }
}