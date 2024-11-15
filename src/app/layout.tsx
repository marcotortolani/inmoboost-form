import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import Link from 'next/link'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'InmoBoost Diagnóstico',
  description: 'Una herramienta para diagnosticar rápidamente tu inmobiliaria',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100dvh] flex flex-col`}
      >
        <header className=" bg-primary text-primary-foreground p-4">
          <Link href="/" target="_self">
            <h1 className="w-full max-w-xl mx-auto text-2xl font-bold">
              by InmoBoost
            </h1>
          </Link>
        </header>
        {children}
        <footer className="bg-primary text-primary-foreground p-4 mt-auto">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <div className="space-x-4">
              <a href="mailto:hola@inmoboost.uy" className="hover:underline">
                hola@inmoboost.uy
              </a>
              <span>|</span>
              <a
                href="https://www.inmoboost.uy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                www.inmoboost.uy
              </a>
            </div>
            <p className="text-sm">
              © Developed by Tortolani {new Date().getFullYear()}
            </p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
