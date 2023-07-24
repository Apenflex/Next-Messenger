'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

interface ProviderProps {
    children: React.ReactNode
    session: any
}

const Provider: React.FC<ProviderProps> = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            <Toaster />
            {children}
        </SessionProvider>
    )
}
export default Provider
