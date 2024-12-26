'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, List, BarChart2, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

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

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <BarChart2 className="h-8 w-8 text-blue-500 mr-2" />
              <span className="font-bold text-xl text-gray-900">Finance Tracker</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-gray-700 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                }`}
              >
                <item.icon className="h-5 w-5 mr-1" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        ref={menuRef}
        className={`fixed top-16 inset-x-0 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname === item.href
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
              }`}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu after selecting a link
            >
              <item.icon className="h-5 w-5 inline-block mr-2" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}