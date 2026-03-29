import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Feyisayo & Temitayo | 04.07.2026',
  description: 'Join us in celebrating our traditional wedding — Feyisayo & Temitayo | #ABEsoluteLove',
  robots: {
    index: false,
    follow: false,
  },
  verification: {
    google: 'J0Hjh-bcI3AlJMzNGkzl88279lPpk3Djdah-LHdJtI8',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}