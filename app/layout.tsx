import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ToasterContext from '@/components/context/ToasterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Next Messenger',
    description: 'A Next.js messenger app built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToasterContext />
                {children}
            </body>
        </html>
    )
}
