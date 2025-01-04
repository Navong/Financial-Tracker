
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from './components/Navbar'
import Footer from './components/Footer'
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import { Toaster } from 'sonner';

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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <SignedIn>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
                  {children}
                  <Toaster />
                </main>
                <Footer />
              </div>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}

