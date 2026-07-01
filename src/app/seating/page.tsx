'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

type Guest = {
  id: string
  name: string
  tableNumber: string
  seatNumber: string
}

export default function SeatingPage() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Guest[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const query = search.trim()
    if (query.length < 2) return

    setLoading(true)
    setSearched(true)
    setResults([])
    setError('')

    try {
      const response = await fetch(`/api/seating?q=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || 'Unable to search seating right now.')
        return
      }

      setResults(data.guests || [])
    } catch {
      setError('Unable to search seating right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#E8DCC8' }}>
      <Navbar />

      <section className="relative pt-0 pb-0">
        <div
          className="relative h-52 sm:h-72 md:h-96 overflow-hidden"
          style={{
            backgroundImage: "url('/images/IMG_2106.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            backgroundColor: '#2D4F6B',
          }}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(30,52,72,0.55)' }} />
          <div className="relative z-10 h-full flex flex-col justify-end items-end text-right pb-8 sm:pb-12 px-6 sm:px-12 md:px-20">
            <h1 className="script-font text-4xl sm:text-6xl font-semibold text-cream leading-tight max-w-md">
              Find Your <br />
              <span className="script-font text-4xl sm:text-6xl">Seat</span>
            </h1>
            <p className="text-cream/80 text-sm sm:text-lg mt-2 sm:mt-3 max-w-sm font-sans hidden sm:block">
              Enter your name below to find your table and seat number for the celebration.
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative py-12 sm:py-20 px-4 sm:px-6"
        style={{
          backgroundImage: "linear-gradient(rgba(232,220,200,0.7), rgba(232,220,200,0.7)), url('/images/Pattern background.webp')",
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 480px auto',
          backgroundColor: '#E8DCC8',
        }}
      >
        <div className="max-w-lg mx-auto">
          <p className="serif-font text-navy-dark text-base sm:text-xl font-black text-center mb-6 tracking-wide uppercase px-2">
            SEARCH YOUR NAME TO FIND YOUR TABLE AND SEAT NUMBER
          </p>

          <div className="rounded-2xl p-6 sm:p-10 shadow-xl mb-8" style={{ backgroundColor: '#2D4F6B' }}>
            <h2 className="serif-font text-cream text-2xl sm:text-3xl font-semibold mb-2 text-center">
              Search Your Name
            </h2>
            <p className="text-cream/50 text-sm font-sans text-center mb-6">
              Type your first name, surname, or both
            </p>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setSearched(false); setError('') }}
                placeholder="e.g. Adebayo or Okafor"
                className="flex-1 rounded-xl px-4 py-3 text-sm font-sans text-navy-dark placeholder-black/40 focus:outline-none transition-all"
                style={{ backgroundColor: 'rgba(232,220,200,0.95)' }}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={loading || search.trim().length < 2}
                className="px-5 py-3 rounded-xl font-sans font-medium text-sm disabled:opacity-50 transition-all whitespace-nowrap"
                style={{ backgroundColor: '#B8CDD9', color: '#1E3448' }}
              >
                {loading ? '...' : 'Find Seat'}
              </button>
            </form>
          </div>

          {error && (
            <div className="rounded-2xl p-8 text-center mb-4" style={{ backgroundColor: '#2D4F6B', border: '1px solid rgba(184,204,220,0.35)' }}>
              <p className="font-sans text-red-300 text-sm">{error}</p>
            </div>
          )}

          {searched && !loading && !error && results.length === 0 && (
            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: '#2D4F6B', border: '1px solid rgba(184,204,220,0.35)' }}>
              <p className="serif-font text-cream text-xl mb-2">No result found</p>
              <p className="font-sans text-cream/60 text-sm leading-relaxed">
                We couldn't find "<span className="text-cream font-medium">{search}</span>" in our list.
                <br />Please check your spelling or try your surname only.
                <br /><br />If you believe this is an error, please contact the couple.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {results.map(guest => (
              <div
                key={guest.id}
                className="rounded-2xl overflow-hidden shadow-lg"
                style={{ backgroundColor: '#2D4F6B', border: '1px solid rgba(184,204,220,0.35)' }}
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: '#B8CDD9' }} />
                <div className="p-6 sm:p-8">
                  <p className="font-sans text-blue-pale text-xs tracking-widest uppercase mb-1">Guest</p>
                  <p className="serif-font text-white text-2xl sm:text-3xl font-bold mb-6">{guest.name}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#1E3448' }}>
                      <p className="font-sans text-blue-pale text-xs tracking-widest uppercase mb-1">Table</p>
                      <p className="serif-font text-white text-2xl font-bold">{guest.tableNumber || 'Ask usher'}</p>
                    </div>
                    <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#1E3448' }}>
                      <p className="font-sans text-blue-pale text-xs tracking-widest uppercase mb-1">Seat</p>
                      <p className="serif-font text-white text-2xl font-bold">{guest.seatNumber || 'Ask usher'}</p>
                    </div>
                  </div>
                  <p className="font-sans text-cream/40 text-xs text-center mt-5 leading-relaxed">
                    Please proceed to your assigned table upon arrival.<br />
                    We look forward to celebrating with you!
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
