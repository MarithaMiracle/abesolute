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

export default function AdminCheckinPage() {
  const [pin, setPin] = useState('')
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

    // Real-time updates
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

  const checkedIn = guests.filter(g => g.checked_in)
  const pending = guests.filter(g => !g.checked_in)

  const filtered = guests
    .filter(g => filter === 'all' ? true : filter === 'checked' ? g.checked_in : !g.checked_in)
    .filter(g => search ? g.full_name.toLowerCase().includes(search.toLowerCase()) : true)

  return (
    <main className="min-h-screen px-4 py-10" style={{ backgroundColor: '#1E3448' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="script-font text-cream" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>Check-In Dashboard</h1>
          <p className="text-cream/50 text-sm font-sans mt-1">Live attendance overview</p>
        </div>

        {/* Stats */}
        {!loading && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: 'rgba(184,204,220,0.12)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-cream text-2xl font-bold font-sans">{guests.length}</p>
              <p className="text-cream/50 text-xs font-sans mt-0.5">Total Guests</p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: 'rgba(100,180,100,0.15)', border: '1px solid rgba(100,180,100,0.3)' }}>
              <p className="text-green-400 text-2xl font-bold font-sans">{checkedIn.length}</p>
              <p className="text-cream/50 text-xs font-sans mt-0.5">Checked In</p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: 'rgba(184,204,220,0.12)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-cream/70 text-2xl font-bold font-sans">{pending.length}</p>
              <p className="text-cream/50 text-xs font-sans mt-0.5">Pending</p>
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

        {/* Guest list */}
        {loading ? (
          <p className="text-cream/50 text-center font-sans text-sm py-10">Loading guests...</p>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(guest => (
              <div
                key={guest.id}
                className="rounded-xl px-4 py-3 flex items-center justify-between"
                style={{
                  backgroundColor: guest.checked_in ? 'rgba(100,180,100,0.12)' : 'rgba(184,204,220,0.08)',
                  border: `1px solid ${guest.checked_in ? 'rgba(100,180,100,0.25)' : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                <div>
                  <p className="font-sans text-cream text-sm font-medium">{guest.full_name}</p>
                  <p className="font-sans text-cream/50 text-xs">{guest.table_number} · {guest.seat}</p>
                </div>
                <div className="text-right">
                  {guest.checked_in ? (
                    <span className="text-green-400 text-xs font-sans">✓ Checked in</span>
                  ) : (
                    <span className="text-cream/30 text-xs font-sans">Pending</span>
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