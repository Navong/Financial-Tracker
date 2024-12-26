import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Personal Finance Tracker',
  description: 'Track your personal finances with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}

