'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type CheckinResult = {
  success: boolean
  guestName?: string
  allowedScans?: number
  usedScans?: number
  remainingScans?: number
  message?: string
  error?: string
}

export default function CheckinPage() {
  const searchParams = useSearchParams()
  const [token, setToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<CheckinResult | null>(null)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const tokenFromUrl = searchParams?.get('token') ?? ''
    if (tokenFromUrl) {
      setToken(tokenFromUrl)
      handleCheckIn(tokenFromUrl)
    }
  }, [searchParams])

  const handleCheckIn = async (checkinToken: string) => {
    const trimmedToken = checkinToken.trim()
    if (!trimmedToken) {
      setFeedback('Please scan or enter a barcode token.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setFeedback('Processing scan…')
    setResult(null)

    try {
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: trimmedToken }),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        setStatus('error')
        setFeedback(data.message || data.error || 'Unable to check in with this barcode.')
        setResult(data)
        return
      }

      setStatus('success')
      setResult(data)
      setFeedback(`Entry granted for ${data.guestName || 'Guest'}. Remaining scans: ${data.remainingScans}.`)
    } catch (error) {
      console.error('Check-in error:', error)
      setStatus('error')
      setFeedback('Unable to process the code. Please try again.')
    }
  }

  return (
    <main className="min-h-screen px-4 py-10" style={{ backgroundColor: '#1E3448' }}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="script-font text-cream" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>Guest Check-In</h1>
          <p className="text-cream/50 text-sm font-sans mt-1">Scan the guest barcode or paste the token below.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleCheckIn(token)
          }}
          className="space-y-4"
        >
          <label className="block text-cream/70 text-sm font-sans">Barcode token</label>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste QR token here"
            className="w-full rounded-2xl px-4 py-3 text-sm font-sans text-navy-dark placeholder-black/40 focus:outline-none transition-all"
            style={{ backgroundColor: 'rgba(232,220,200,0.9)' }}
            autoComplete="off"
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-2xl py-3 font-sans font-medium text-sm transition-all disabled:opacity-50"
            style={{ backgroundColor: '#B8CDD9', color: '#1E3448' }}
          >
            {status === 'loading' ? 'Checking…' : 'Validate barcode'}
          </button>
        </form>

        <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: '#2D4F6B', border: '1px solid rgba(184,204,220,0.25)' }}>
          <p className="text-sm font-sans text-cream/70 mb-3">Scan result</p>
          <div className="rounded-xl p-4" style={{ backgroundColor: '#1E3448' }}>
            <p className={`font-sans text-sm ${status === 'success' ? 'text-green-300' : status === 'error' ? 'text-red-300' : 'text-cream/70'}`}>
              {feedback || 'Awaiting scan...'}
            </p>
            {result?.success && (
              <div className="mt-4 text-cream text-sm space-y-2">
                <p><strong>Guest:</strong> {result.guestName}</p>
                <p><strong>Used scans:</strong> {result.usedScans}/{result.allowedScans}</p>
                <p><strong>Remaining:</strong> {result.remainingScans}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
