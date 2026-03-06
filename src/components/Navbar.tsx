'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'RSVP', path: '/rsvp' },
    { name: 'Ceremony', path: '/ceremony' },
    { name: 'Wedding Party', path: '/wedding-party' },
    { name: 'Gifting', path: '/gifting' },
  ]

  return (
    <nav className="fixed top-6 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-center items-center">
        <div className="hidden md:flex gap-2 bg-[#102c45] rounded-full px-4 py-2 shadow-lg border border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`px-5 py-2 rounded-full text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
                pathname === link.path ? 'bg-cream text-navy-true font-semibold shadow-md' : 'text-cream/80 hover:text-cream'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
