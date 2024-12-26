'use client'

import Link from 'next/link'
import { Home, PlusCircle, BarChart3, List, Menu } from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col md:w-64 h-full bg-gray-100">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <h1 className="text-xl font-bold">Finance Tracker</h1>
        <button
          className="text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`md:block ${isOpen ? 'block' : 'hidden'} transition-all`}>
        <h1 className="hidden md:block text-2xl font-bold p-4">Finance Tracker</h1>
        <nav>
          <ul className="space-y-2 p-4">
            <li>
              <Link
                href="/"
                className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded"
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/add-transaction"
                className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded"
              >
                <PlusCircle size={20} />
                <span>Add Transaction</span>
              </Link>
            </li>
            <li>
              <Link
                href="/transactions"
                className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded"
              >
                <List size={20} />
                <span>Transactions</span>
              </Link>
            </li>
            <li>
              <Link
                href="/charts"
                className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded"
              >
                <BarChart3 size={20} />
                <span>Charts</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}