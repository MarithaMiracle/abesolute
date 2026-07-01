'use client'

import { useEffect, useMemo, useState } from 'react'

type GuestStatus = 'checked' | 'partial' | 'pending' | 'not-attending'

type Guest = {
  rowNumber: number
  name: string
  email: string
  relation: string
  tableNumber: string
  rsvp: string
  attending: boolean
  qrReady: boolean
  allowedScans: number
  usedScans: number
  remainingScans: number
  status: GuestStatus
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
  const [activePin, setActivePin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | GuestStatus>('all')
  const [search, setSearch] = useState('')

  const loadGuests = async (pinToUse = activePin) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/checkin/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinToUse }),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || 'Unable to load RSVP list.')
        return
      }

      setGuests(data.guests || [])
    } catch {
      setError('Unable to load RSVP list.')
    } finally {
      setLoading(false)
    }
  }

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pin !== ADMIN_PIN) {
      setPinError(true)
      return
    }

    setAuthenticated(true)
    setActivePin(pin)
    await loadGuests(pin)
  }

  useEffect(() => {
    if (!authenticated || !activePin) return
    const interval = window.setInterval(() => loadGuests(activePin), 30000)
    return () => window.clearInterval(interval)
  }, [authenticated, activePin])

  const attendingGuests = guests.filter(g => g.attending)
  const checkedIn = attendingGuests.filter(g => g.status === 'checked')
  const partial = attendingGuests.filter(g => g.status === 'partial')
  const pending = attendingGuests.filter(g => g.status === 'pending')
  const expectedScans = attendingGuests.reduce((sum, guest) => sum + guest.allowedScans, 0)
  const usedScans = attendingGuests.reduce((sum, guest) => sum + guest.usedScans, 0)

  const filtered = useMemo(() => guests
    .filter(g => filter === 'all' ? true : g.status === filter)
    .filter(g => {
      if (!search) return true
      const query = search.toLowerCase()
      return [g.name, g.email, g.relation, g.tableNumber].some(value => value.toLowerCase().includes(query))
    }), [filter, guests, search])

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#1E3448' }}>
        <div className="w-full max-w-xs">
          <div className="text-center mb-8">
            <h1 className="script-font text-cream" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>Admin Access</h1>
            <p className="text-cream/50 text-sm font-sans mt-1">Enter admin PIN to view RSVP check-in</p>
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
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="script-font text-cream" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>RSVP Check-In</h1>
            <p className="text-cream/50 text-sm font-sans mt-1">Google Sheets live guest list</p>
          </div>
          <button
            type="button"
            onClick={() => loadGuests()}
            disabled={loading}
            className="rounded-xl px-4 py-2 font-sans text-xs font-medium disabled:opacity-50"
            style={{ backgroundColor: '#B8CDD9', color: '#1E3448' }}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            ['Invites', attendingGuests.length],
            ['Complete', checkedIn.length],
            ['Partial', partial.length],
            ['Pending', pending.length],
            ['Scans', `${usedScans}/${expectedScans}`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl p-4 text-center" style={{ backgroundColor: '#2D4F6B', border: '1px solid rgba(184,204,220,0.35)' }}>
              <p className="text-white text-2xl font-bold font-sans">{value}</p>
              <p className="text-blue-pale text-xs font-sans mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(['all', 'checked', 'partial', 'pending', 'not-attending'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl font-sans text-xs font-medium transition-all whitespace-nowrap capitalize"
                style={{
                  backgroundColor: filter === f ? '#B8CDD9' : 'rgba(184,204,220,0.12)',
                  color: filter === f ? '#1E3448' : '#E8DCC8',
                }}
              >
                {f.replace('-', ' ')}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search guest, email, relation, table..."
            className="flex-1 rounded-xl px-4 py-2 text-sm font-sans text-navy-dark placeholder-black/40 focus:outline-none transition-all"
            style={{ backgroundColor: 'rgba(232,220,200,0.9)' }}
          />
        </div>

        {error && <p className="text-red-300 text-sm font-sans mb-4">{error}</p>}

        {loading && guests.length === 0 ? (
          <p className="text-cream/50 text-center font-sans text-sm py-10">Loading RSVP list...</p>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(guest => (
              <div
                key={`${guest.rowNumber}-${guest.email}`}
                className="rounded-xl px-4 py-3 flex items-start justify-between gap-4 transition-all"
                style={{
                  backgroundColor: guest.status === 'checked' ? '#2D4F6B' : '#1E3448',
                  border: `1px solid ${guest.status === 'checked' ? 'rgba(110,231,183,0.4)' : guest.status === 'partial' ? 'rgba(251,191,36,0.45)' : 'rgba(184,204,220,0.2)'}`,
                }}
              >
                <div className="min-w-0">
                  <p className="font-sans text-white text-sm font-bold">{guest.name}</p>
                  <p className="font-sans text-blue-pale text-xs mt-0.5">
                    Row {guest.rowNumber}
                    {guest.tableNumber ? ` · Table ${guest.tableNumber}` : ''}
                    {guest.relation ? ` · ${guest.relation}` : ''}
                  </p>
                  <p className="font-sans text-cream/40 text-xs mt-1 truncate">{guest.email || 'No email'}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-sans font-semibold capitalize" style={{ color: guest.status === 'checked' ? '#6ee7b7' : guest.status === 'partial' ? '#fbbf24' : guest.status === 'not-attending' ? '#fca5a5' : '#E8DCC8' }}>
                    {guest.status.replace('-', ' ')}
                  </p>
                  {guest.attending && (
                    <p className="text-cream/50 text-xs font-sans mt-1">{guest.usedScans}/{guest.allowedScans} scans</p>
                  )}
                  {!guest.qrReady && guest.attending && (
                    <p className="text-red-300 text-xs font-sans mt-1">No QR</p>
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
