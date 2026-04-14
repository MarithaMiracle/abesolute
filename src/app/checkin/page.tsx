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

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

export default function CheckinPage() {
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
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

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#1E3448' }}>
        <div className="w-full max-w-xs">
          <div className="text-center mb-8">
            <h1 className="script-font text-cream" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>Staff Access</h1>
            <p className="text-cream/50 text-sm font-sans mt-1">Enter your staff PIN to continue</p>
          </div>
          <form onSubmit={handlePinSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={e => { setPin(e.target.value); setPinError(false) }}
                placeholder="Enter PIN"
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm font-sans text-navy-dark placeholder-black/40 focus:outline-none transition-all text-center tracking-widest"
                style={{ backgroundColor: 'rgba(232,220,200,0.9)' }}
              />
              <button
                type="button"
                onClick={() => setShowPin(p => !p)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-dark/50 hover:text-navy-dark transition-colors"
              >
                {showPin ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
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

        <div className="text-center mb-8">
          <h1 className="script-font text-cream" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>Guest Check-In</h1>
          <p className="text-cream/50 text-sm font-sans mt-1">Search by guest name to find their seat</p>
        </div>

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
              className="rounded-2xl p-5 transition-all"
              style={{
                backgroundColor: '#2D4F6B',
                border: `1px solid ${guest.checked_in ? 'rgba(110,231,183,0.45)' : 'rgba(184,204,220,0.35)'}`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans font-bold text-white text-base">{guest.full_name}</p>
                  <p className="font-sans text-blue-pale text-sm mt-0.5">{guest.table_number} · {guest.seat}</p>
                  {guest.checked_in && (
                    <p className="font-sans text-xs font-semibold mt-1" style={{ color: '#6ee7b7' }}>✓ Already checked in</p>
                  )}
                </div>
                {!guest.checked_in && (
                  <button
                    onClick={() => handleCheckIn(guest)}
                    disabled={checkingIn === guest.id}
                    className="flex-shrink-0 px-4 py-2 rounded-xl font-sans text-sm font-medium disabled:opacity-50 transition-all"
                    style={{ backgroundColor: '#B8CDD9', color: '#1E3448' }}
                  >
                    {checkingIn === guest.id ? 'Checking in...' : 'Check In'}
                  </button>
                )}
                {successId === guest.id && guest.checked_in && (
                  <span className="text-xl" style={{ color: '#6ee7b7' }}>✓</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}