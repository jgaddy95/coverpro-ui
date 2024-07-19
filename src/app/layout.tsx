import React from 'react'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job Application Assistant',
  description: 'Generate tailored cover letters for your job applications',
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