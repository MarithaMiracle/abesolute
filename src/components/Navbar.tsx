'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/rsvp', label: 'RSVP' },
  { href: '/ceremony', label: 'Ceremony' },
  { href: '/gifting', label: 'Gifting' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
      <div className="flex items-center gap-1 bg-navy/80 backdrop-blur-md rounded-full px-3 py-2 shadow-lg">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-1.5 rounded-full text-sm font-sans font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-cream text-navy'
                  : 'text-cream/80 hover:text-cream'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
