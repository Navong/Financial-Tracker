'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, List, BarChart2, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeSwitcher } from './ThemeSwitcher'
import { useTheme } from 'next-themes'

// Navigation links configuration
const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/transactions', label: 'Transactions', icon: List },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the mobile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const { theme } = useTheme()

  return (
    <nav className={`shadow-md fixed top-0 w-full z-50 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <BarChart2 className="h-8 w-8 text-blue-500 mr-2" />
              <span className="font-bold text-lg lg:text-xl">Finance Tracker</span>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`text-gray-700 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${pathname === item.href
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                    ? 'text-white hover:bg-gray-800 hover:text-blue-500'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <item.icon className="h-5 w-5 mr-1" />
                {item.label}
              </Link>
            ))}
            <div className='flex'>
              <ThemeSwitcher />
            </div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        ref={menuRef}
        className={`fixed top-16 inset-x-0 bg-black bg-opacity-50 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          } ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
      >
        <div className="rounded-lg shadow-md py-4 px-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-md text-sm font-medium ${pathname === item.href
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                    ? 'text-white hover:bg-gray-800 hover:text-blue-500'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                }`}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu after selecting a link
            >
              <item.icon className="h-5 w-5 inline-block mr-3" />
              {item.label}
            </Link>
          ))}
          <div className="flex justify-center items-center w-full px-4 py-3">
            <ThemeSwitcher />
          </div>
          <div className="flex justify-center items-center w-full px-4 py-3">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>

    </nav>
  )
}