'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

import ActiveStatus from './ActiveStatus'

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ActiveStatus />
            <Toaster />
            {children}
        </SessionProvider>
    )
}
