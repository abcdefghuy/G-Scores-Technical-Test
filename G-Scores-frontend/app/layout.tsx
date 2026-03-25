import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { DashboardShell } from '@/components/layout/DashboardShell'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'G-Scores — Tra cứu điểm THPT 2024',
  description: 'Hệ thống tra cứu và thống kê điểm thi THPT Quốc gia 2024',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body>
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  )
}
