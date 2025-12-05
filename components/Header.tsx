'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from '@/contexts/TranslationContext'
import { Language } from '@/lib/translations'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, language, setLanguage } = useTranslation()

  const menuItems = [
    { name: t.header.home, href: '#home' },
    { name: t.header.about, href: '#about' },
    { name: t.header.services, href: '#services' },
    { name: t.header.prices, href: '#prices' },
    { name: t.header.gallery, href: '#gallery' },
    { name: t.header.reviews, href: '#reviews' },
    { name: t.header.contact, href: '#contact' },
  ]

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600">
            {t.header.logo}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Selector */}
            <div className="flex items-center space-x-2 ml-4 border-l border-gray-300 pl-4">
              <button
                onClick={() => handleLanguageChange('nl')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'nl'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
                aria-label="Nederlands"
              >
                NL
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <a
              href="https://wa.me/31614255832"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors font-medium"
            >
              {t.header.bookAppointment}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Language Selector Mobile */}
              <div className="flex items-center space-x-2 py-2">
                <span className="text-gray-700 font-medium">Language:</span>
                <button
                  onClick={() => {
                    handleLanguageChange('nl')
                    setIsMenuOpen(false)
                  }}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'nl'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:text-primary-600 border border-gray-300'
                  }`}
                  aria-label="Nederlands"
                >
                  NL
                </button>
                <button
                  onClick={() => {
                    handleLanguageChange('en')
                    setIsMenuOpen(false)
                  }}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:text-primary-600 border border-gray-300'
                  }`}
                  aria-label="English"
                >
                  EN
                </button>
              </div>

              <a
                href="https://wa.me/31614255832"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.header.bookAppointment}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

