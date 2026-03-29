'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function EnterPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: '#1E3448' }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/Pattern background.webp')",
          backgroundRepeat: 'repeat',
          backgroundSize: '300px auto',
          opacity: 0.08,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(15,30,48,0.6)' }} />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">

        {/* Names */}
        <div className="text-center">
          <h1 className="script-font text-cream leading-tight" style={{ fontSize: 'clamp(2.8rem, 12vw, 5rem)' }}>
            Feyisayo
          </h1>
          <div className="flex items-center justify-center gap-3 my-1">
            <div className="h-px w-8 bg-cream/30" />
            <span className="script-font text-cream/70" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}>&</span>
            <div className="h-px w-8 bg-cream/30" />
          </div>
          <h1 className="script-font text-cream leading-tight" style={{ fontSize: 'clamp(2.8rem, 12vw, 5rem)' }}>
            Temitayo
          </h1>
          <p className="serif-font text-cream/60 tracking-[0.2em] text-sm mt-2">04 · 07 · 2026</p>
        </div>

        {/* Card */}
        <div
          className="w-full rounded-2xl p-8 shadow-2xl border border-white/10"
          style={{ backgroundColor: 'rgba(184, 204, 220, 0.15)', backdropFilter: 'blur(12px)' }}
        >
          <h2 className="serif-font text-cream text-center text-xl font-semibold mb-1">Access Code</h2>
          <p className="text-cream/50 text-center text-sm font-sans mb-6">
            Please enter the wedding code you received
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false) }}
              placeholder="Enter wedding code"
              className="w-full rounded-xl px-4 py-3 text-sm font-sans text-navy-dark placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-blue-pale/50 transition-all"
              style={{ backgroundColor: 'rgba(232,220,200,0.9)' }}
              autoComplete="off"
            />

            {error && (
              <p className="text-red-300 text-xs font-sans text-center -mt-1">
                Incorrect code. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl font-sans font-medium text-sm tracking-widest transition-all disabled:opacity-50"
              style={{ backgroundColor: '#2D4F6B', color: '#E8DCC8' }}
            >
              {loading ? 'Checking...' : 'ENTER'}
            </button>
          </form>
        </div>

        <p className="text-cream/30 text-xs font-sans text-center">
          Don't have a code? Contact the couple.
        </p>
      </div>
    </main>
  )
}