'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

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

        {/* ── DESKTOP NAV — unchanged ── */}
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

        {/* ── MOBILE NAV ── */}
        <div className="flex md:hidden w-full items-center justify-between">

          {/* Current page label */}
          <div className="bg-[#102c45] rounded-full px-5 py-2.5 shadow-lg border border-white/10">
            <span className="text-cream text-xs tracking-[0.2em] uppercase font-semibold">
              {navLinks.find(l => l.path === pathname)?.name ?? 'Menu'}
            </span>
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="bg-[#102c45] rounded-full w-10 h-10 flex flex-col items-center justify-center gap-1.5 shadow-lg border border-white/10"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-cream/80 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-cream/80 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-cream/80 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

      </div>

      {/* ── MOBILE DROPDOWN MENU ── */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
        <div className="mx-6 bg-[#102c45] rounded-2xl shadow-xl border border-white/10 overflow-hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`block px-6 py-4 text-sm tracking-[0.2em] uppercase transition-colors duration-200 border-b border-white/5 last:border-0 ${
                pathname === link.path
                  ? 'bg-cream/10 text-cream font-semibold'
                  : 'text-cream/70 hover:text-cream hover:bg-white/5'
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
