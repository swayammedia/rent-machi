import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "RentMachi",
  description: "Rent Anything. Anytime. Locally.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>RentMachi</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
