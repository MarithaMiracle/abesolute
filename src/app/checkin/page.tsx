'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

type Guest = {
  id: string
  full_name: string
  table_number: string
  seat: string
  checked_in: boolean
}

const STAFF_PIN = '1234'

export default function CheckinPage() {
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Guest[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkingIn, setCheckingIn] = useState<string | null>(null)
  const [successId, setSuccessId] = useState<string | null>(null)

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === STAFF_PIN) {
      setAuthenticated(true)
    } else {
      setPinError(true)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!search.trim()) return
    setLoading(true)
    setSearched(true)
    setResults([])
    setSuccessId(null)

    const { data, error } = await supabase
      .from('seating')
      .select('*')
      .ilike('full_name', `%${search.trim()}%`)
      .order('full_name')

    if (!error && data) setResults(data)
    setLoading(false)
  }

  const handleCheckIn = async (guest: Guest) => {
    if (guest.checked_in) return
    setCheckingIn(guest.id)

    const { error } = await supabase
      .from('seating')
      .update({ checked_in: true, checked_in_at: new Date().toISOString() })
      .eq('id', guest.id)

    if (!error) {
      setResults(prev => prev.map(g => g.id === guest.id ? { ...g, checked_in: true } : g))
      setSuccessId(guest.id)
    }
    setCheckingIn(null)
  }

  // PIN gate
  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#1E3448' }}>
        <div className="w-full max-w-xs">
          <div className="text-center mb-8">
            <h1 className="script-font text-cream" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>Staff Access</h1>
            <p className="text-cream/50 text-sm font-sans mt-1">Enter your staff PIN to continue</p>
          </div>
          <form onSubmit={handlePinSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError(false) }}
              placeholder="Enter PIN"
              className="w-full rounded-xl px-4 py-3 text-sm font-sans text-navy-dark placeholder-black/40 focus:outline-none transition-all text-center tracking-widest"
              style={{ backgroundColor: 'rgba(232,220,200,0.9)' }}
            />
            {pinError && <p className="text-red-300 text-xs text-center font-sans">Incorrect PIN</p>}
            <button
              type="submit"
              disabled={!pin}
              className="w-full py-3 rounded-xl font-sans font-medium text-sm tracking-widest disabled:opacity-50 transition-all"
              style={{ backgroundColor: '#2D4F6B', color: '#E8DCC8' }}
            >
              ENTER
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-10" style={{ backgroundColor: '#1E3448' }}>
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="script-font text-cream" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>Guest Check-In</h1>
          <p className="text-cream/50 text-sm font-sans mt-1">Search by guest name to find their seat</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setSearched(false) }}
            placeholder="Type guest name..."
            className="flex-1 rounded-xl px-4 py-3 text-sm font-sans text-navy-dark placeholder-black/40 focus:outline-none transition-all"
            style={{ backgroundColor: 'rgba(232,220,200,0.9)' }}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={loading || !search.trim()}
            className="px-5 py-3 rounded-xl font-sans font-medium text-sm disabled:opacity-50 transition-all"
            style={{ backgroundColor: '#B8CDD9', color: '#1E3448' }}
          >
            {loading ? '...' : 'Search'}
          </button>
        </form>

        {/* Results */}
        {searched && !loading && results.length === 0 && (
          <div className="text-center py-10">
            <p className="text-cream/60 font-sans text-sm">No guest found for "<span className="text-cream">{search}</span>"</p>
            <p className="text-cream/40 font-sans text-xs mt-1">Check the spelling or try their surname only</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {results.map(guest => (
            <div
              key={guest.id}
              className="rounded-2xl p-5 border transition-all"
              style={{
                backgroundColor: guest.checked_in ? 'rgba(100,180,100,0.15)' : 'rgba(184,204,220,0.12)',
                borderColor: guest.checked_in ? 'rgba(100,180,100,0.3)' : 'rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans font-semibold text-cream text-base">{guest.full_name}</p>
                  <p className="font-sans text-cream/70 text-sm mt-0.5">{guest.table_number} · {guest.seat}</p>
                  {guest.checked_in && (
                    <p className="font-sans text-green-400 text-xs mt-1">✓ Already checked in</p>
                  )}
                </div>
                {!guest.checked_in && (
                  <button
                    onClick={() => handleCheckIn(guest)}
                    disabled={checkingIn === guest.id}
                    className="flex-shrink-0 px-4 py-2 rounded-xl font-sans text-sm font-medium disabled:opacity-50 transition-all"
                    style={{ backgroundColor: '#2D4F6B', color: '#E8DCC8' }}
                  >
                    {checkingIn === guest.id ? 'Checking in...' : 'Check In'}
                  </button>
                )}
                {successId === guest.id && guest.checked_in && (
                  <span className="text-green-400 text-xl">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}