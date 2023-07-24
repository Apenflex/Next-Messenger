'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

interface ProviderProps {
    children: React.ReactNode
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
    return (
        <SessionProvider >
            <Toaster />
            {children}
        </SessionProvider>
    )
}
export default Provider
