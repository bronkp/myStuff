import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthContextProvider from '../../context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'myStuff',
  description: 'myStuff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="viewport" content=" user-scalable=0;" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
