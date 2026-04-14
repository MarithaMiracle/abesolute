'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

type Guest = {
  id: string
  full_name: string
  table_number: string
  seat: string
  checked_in: boolean
  checked_in_at: string | null
}

const ADMIN_PIN = '9999'

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

export default function AdminCheckinPage() {
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'checked' | 'pending'>('all')
  const [search, setSearch] = useState('')

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      setAuthenticated(true)
    } else {
      setPinError(true)
    }
  }

  useEffect(() => {
    if (!authenticated) return

    const fetchGuests = async () => {
      const { data } = await supabase
        .from('seating')
        .select('*')
        .order('table_number')
      if (data) setGuests(data)
      setLoading(false)
    }

    fetchGuests()

    const channel = supabase
      .channel('seating-changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'seating' }, payload => {
        setGuests(prev => prev.map(g => g.id === payload.new.id ? payload.new as Guest : g))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [authenticated])

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#1E3448' }}>
        <div className="w-full max-w-xs">
          <div className="text-center mb-8">
            <h1 className="script-font text-cream" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>Admin Access</h1>
            <p className="text-cream/50 text-sm font-sans mt-1">Enter admin PIN to view dashboard</p>
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

  const checkedIn = guests.filter(g => g.checked_in)
  const pending = guests.filter(g => !g.checked_in)

  const filtered = guests
    .filter(g => filter === 'all' ? true : filter === 'checked' ? g.checked_in : !g.checked_in)
    .filter(g => search ? g.full_name.toLowerCase().includes(search.toLowerCase()) : true)

  return (
    <main className="min-h-screen px-4 py-10" style={{ backgroundColor: '#1E3448' }}>
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="script-font text-cream" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>Check-In Dashboard</h1>
          <p className="text-cream/50 text-sm font-sans mt-1">Live attendance overview</p>
        </div>

        {/* Stat cards — Option C */}
        {!loading && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: '#2D4F6B', border: '1px solid rgba(184,204,220,0.35)' }}>
              <p className="text-white text-2xl font-bold font-sans">{guests.length}</p>
              <p className="text-blue-pale text-xs font-sans mt-0.5">Total Guests</p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: '#2D4F6B', border: '1px solid rgba(110,231,183,0.45)' }}>
              <p className="text-2xl font-bold font-sans" style={{ color: '#6ee7b7' }}>{checkedIn.length}</p>
              <p className="text-xs font-sans mt-0.5" style={{ color: '#6ee7b7', opacity: 0.8 }}>Checked In</p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: '#2D4F6B', border: '1px solid rgba(184,204,220,0.35)' }}>
              <p className="text-white text-2xl font-bold font-sans">{pending.length}</p>
              <p className="text-blue-pale text-xs font-sans mt-0.5">Pending</p>
            </div>
          </div>
        )}

        {/* Filter + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-2">
            {(['all', 'checked', 'pending'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl font-sans text-xs font-medium transition-all capitalize"
                style={{
                  backgroundColor: filter === f ? '#B8CDD9' : 'rgba(184,204,220,0.12)',
                  color: filter === f ? '#1E3448' : '#E8DCC8',
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search guest..."
            className="flex-1 rounded-xl px-4 py-2 text-sm font-sans text-navy-dark placeholder-black/40 focus:outline-none transition-all"
            style={{ backgroundColor: 'rgba(232,220,200,0.9)' }}
          />
        </div>

        {/* Guest list — Option C */}
        {loading ? (
          <p className="text-cream/50 text-center font-sans text-sm py-10">Loading guests...</p>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(guest => (
              <div
                key={guest.id}
                className="rounded-xl px-4 py-3 flex items-center justify-between transition-all"
                style={{
                  backgroundColor: guest.checked_in ? '#2D4F6B' : '#1E3448',
                  border: `1px solid ${guest.checked_in ? 'rgba(110,231,183,0.4)' : 'rgba(184,204,220,0.2)'}`,
                }}
              >
                <div>
                  <p className="font-sans text-white text-sm font-bold">{guest.full_name}</p>
                  <p className="font-sans text-blue-pale text-xs">{guest.table_number} · {guest.seat}</p>
                </div>
                <div className="text-right">
                  {guest.checked_in ? (
                    <span className="text-xs font-sans font-semibold" style={{ color: '#6ee7b7' }}>✓ Checked in</span>
                  ) : (
                    <span className="text-cream/40 text-xs font-sans">Pending</span>
                  )}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-cream/50 text-center font-sans text-sm py-10">No guests found</p>
            )}
          </div>
        )}

      </div>
    </main>
  )
}