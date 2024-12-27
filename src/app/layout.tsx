import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Pewpewlazer - Solar System Explorer',
    description: 'A true-to-scale 3D visualization of our solar system',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <Analytics />
            </body>
        </html>
    )
}
