'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Toaster />
            {children}
        </SessionProvider>
    )
}
