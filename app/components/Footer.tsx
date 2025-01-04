'use client'

import React from 'react'
import { FaGithub } from 'react-icons/fa6'
import { useTheme } from 'next-themes'

const Footer = () => {
  const { theme } = useTheme() // Get current theme

  return (
    <footer
      className={`w-full border-t ${theme === 'dark' ? 'bg-[#121728] text-white' : 'bg-white text-gray-900'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-center items-center space-x-6">
          {/* Left Section: Copyright */}
          <div className="flex  text-sm">
            © 2024 Navong. All rights reserved.
          </div>

          {/* Right Section: Social Media Icons */}
          <div className='hidden lg:block'>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://github.com/Navong/Financial-Tracker"
                className={`text-gray-700 ${theme === 'dark' ? 'text-white' : 'text-blue-500'}`}
                aria-label="Github"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer