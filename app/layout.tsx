import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Provider from '@/components/Provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Next Messenger',
    description: 'A Next.js messenger app built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children, session }: { children: React.ReactNode, session: any }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider session={session}>
                    {children}
                </Provider>
            </body>
        </html>
    )
}
