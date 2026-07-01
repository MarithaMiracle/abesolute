'use client'

import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Image from 'next/image'

type FormData = {
  firstName: string
  surname: string
  email: string
  phone: string
  attendance: string
  guestCount: string
  message?: string
}

export default function RSVPPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    attendance: '',
    guestCount: '1',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
  if (submitted) {
    const timer = setTimeout(() => {
      setSubmitted(false)
      setStep(0)
      setForm({ firstName: '', surname: '', email: '', phone: '', attendance: '', guestCount: '1', message: '' })
    }, 4000)
    return () => clearTimeout(timer)
  }
}, [submitted])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show thank you screen instantly
    setSubmitted(true)

    const payload = {
      'First Name': form.firstName,
      'Surname': form.surname,
      'Email': form.email,
      'Phone': form.phone || 'N/A',
      'Attendance': form.attendance,
      'Guest Count': form.attendance === 'yes' ? form.guestCount : '0',
      'Other Guests': form.attendance === 'yes' ? String(Math.max(0, Number(form.guestCount) - 1)) : '0',
      'Message': form.message || 'N/A',
    }

    // Process API in background
    fetch('/api/rsvp-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(err => console.error('Background RSVP failed:', err))
  }

  return (
    <main className="min-h-screen bg-navy">
      <Navbar />

      {/* ── HERO BANNER ── */}
      <section className="relative pt-0 pb-0">
        <div
          className="relative h-52 sm:h-72 md:h-96 overflow-hidden"
          style={{
            backgroundImage: "url('/images/RSVP page (hands).webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundColor: '#8AAEC2',
          }}
        >
          <div className="relative z-10 h-full flex flex-col justify-end pb-8 sm:pb-12 px-6 sm:px-12 md:px-20">
            <h1 className="serif-font text-3xl sm:text-5xl md:text-5xl font-semibold text-navy-true leading-tight max-w-md">
              Kindly Confirm<br />
              <span className="text-navy-true">Your </span><span className="text-blue-soft">Attendance</span>
            </h1>
            <p className="text-black/70 text-sm sm:text-lg mt-2 sm:mt-3 max-w-sm font-sans hidden sm:block">
              We are honoured to celebrate our traditional wedding with you. Please complete the form below to let us know if you will be joining us.
            </p>
          </div>
        </div>
      </section>

      {/* ── RSVP FORM SECTION ── */}
      <section className="relative py-10 sm:py-16 px-4 sm:px-6" style={{ minHeight: '100vh' }}>

        {/* Layer 1: pattern — base */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/Pattern background.webp')",
            backgroundRepeat: 'repeat',
            backgroundSize: '300px auto',
            backgroundPosition: 'center',
            backgroundColor: '#2D4F6B',
          }}
        />

        {/* Layer 2: photo — reduced opacity so pattern shows through */}
        <Image
          src="/images/RSVP background 2.webp"
          alt=""
          fill
          priority={true}
          style={{
            objectFit: 'cover',
            objectPosition: 'center 10%',
            pointerEvents: 'none',
            opacity: 0.25,
          }}
        />

        {/* Layer 3: navy tint over both */}
        <div className="absolute inset-0" style={{ background: 'rgba(15,30,48,0.65)' }} />

        <div className="relative z-10 w-[92vw] sm:w-full sm:max-w-xl md:max-w-2xl mx-auto">

          <h2 className="font-sans font-semibold mb-6 sm:mb-8" style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', letterSpacing: '0.02em' }}>
            RSVP
          </h2>

          <div className="backdrop-blur-sm w-full sm:aspect-square p-5 sm:p-10 md:p-12 pb-16 sm:pb-10 md:pb-12 shadow-2xl border border-white/10 relative overflow-visible sm:overflow-hidden" style={{ backgroundColor: '#B9CCDC', borderRadius: '28px' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url('/images/Form box overlay.webp')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '100% 100%', opacity: 0.9 }} />

            <div className="relative z-10 flex flex-col h-full">
              {!submitted ? (
                <>
                  <div className="mb-3 sm:mb-6">
                    <p className="text-black/40 text-xs sm:text-base font-sans">Kindly fill in your full information here</p>
                  </div>

                  <div className="flex-1 grid place-items-center">

                    {step === 0 && (
                      <div className="w-full flex flex-col justify-between" style={{ minHeight: '70%' }}>
                        <div>
                          <h3 className="serif-font text-2xl sm:text-5xl font-bold text-blue mb-4 sm:mb-8">
                            Important<br />information
                          </h3>
                          <div className="rounded-xl px-4 sm:px-5 py-3 sm:py-4" style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#525456' }}>
                            <p className="font-sans text-xs sm:text-base leading-relaxed">
                              <span className="font-semibold">Kindly note:</span> This wedding is strictly by invitation only. Only guests invited by the couple and their family will be accommodated — no additional plus-ones and children.
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4 sm:mt-0 sm:absolute sm:bottom-6 sm:left-10 sm:right-10 md:left-12 md:right-12">
                          <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 font-sans text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition-all hover:bg-[#98ABC0]"
                            style={{ backgroundColor: '#05233D', color: '#ffffff' }}
                          >
                            Next <span className="text-sm sm:text-lg">»</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <form onSubmit={(e) => { e.preventDefault(); if (form.firstName.trim() && form.surname.trim() && form.email.trim()) setStep(2); }} className="pb-14 sm:pb-28 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-8 items-start">
                          <div className="text-left my-auto md:col-span-4 md:pr-6 max-w-xs hidden md:block">
                            <h3 className="serif-font my-auto max-w-xs text-5xl font-semibold text-navy-dark mb-2">
                              Guest <br />details:
                              <br />
                              <span className="text-sm items-start text-black/50 inline-block max-w-xs mt-10 leading-snug">Your information will only be used for wedding communication. Please enter your full name, no initials or nicknames.</span>
                            </h3>
                          </div>
                          <div className="block md:hidden mb-1">
                            <h3 className="serif-font text-xl font-semibold text-navy-dark">Guest details:</h3>
                            <p className="text-xs text-black/50 mt-0.5 leading-snug">Full name only, no initials or nicknames.</p>
                          </div>
                          <div className="space-y-2 sm:space-y-4 md:col-span-8">
                            <p className="text-black/50 text-xs sm:text-sm font-sans hidden sm:block">Please enter your name exactly as you want it to appear on your invitation</p>
                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                              <div>
                                <label className="block text-blue/70 text-xs sm:text-base font-sans mb-1 sm:mb-1.5 tracking-wide">First Name *</label>
                                <input
                                  type="text"
                                  name="firstName"
                                  required
                                  value={form.firstName}
                                  onChange={handleChange}
                                  placeholder="First name"
                                  className="w-full bg-white border border-navy/50 text-black placeholder-black/50 rounded-xl px-3 py-2 sm:py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/50 transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-blue/70 text-xs sm:text-base font-sans mb-1 sm:mb-1.5 tracking-wide">Surname *</label>
                                <input
                                  type="text"
                                  name="surname"
                                  required
                                  value={form.surname}
                                  onChange={handleChange}
                                  placeholder="Surname"
                                  className="w-full bg-white border border-navy/50 text-black placeholder-black/50 rounded-xl px-3 py-2 sm:py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/50 transition-all"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-blue/70 text-xs sm:text-base font-sans mb-1 sm:mb-1.5 tracking-wide">Email Address *</label>
                              <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className="w-full bg-white border border-navy/50 text-black placeholder-black/50 rounded-xl px-3 py-2 sm:py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/50 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-blue/70 text-xs sm:text-base font-sans mb-1 sm:mb-1.5 tracking-wide">Phone Number</label>
                              <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+44 000 000 0000"
                                className="w-full bg-white border border-navy/50 text-black placeholder-black/50 rounded-xl px-3 py-2 sm:py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/50 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-6 sm:absolute sm:bottom-6 sm:left-10 sm:right-10 md:left-12 md:right-12">
                          <button type="button" onClick={() => setStep(0)} className="text-navy-true/50 text-sm sm:text-lg font-sans hover:text-white/80 transition-colors">← Previous</button>
                          <button type="submit" disabled={!form.firstName.trim() || !form.surname.trim() || !form.email.trim()} className={`flex items-center gap-2 font-sans text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition-all ${!form.firstName.trim() || !form.surname.trim() || !form.email.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-navy-true hover:bg-blue-muted/80'} text-white`}>
                            Next <span className="text-sm sm:text-lg">»</span>
                          </button>
                        </div>
                      </form>
                    )}

                    {step === 2 && (
                      <form onSubmit={(e) => { e.preventDefault(); if (form.attendance) setStep(3); }} className="space-y-6 pb-20 sm:pb-28">
                        <h3 className="serif-font text-3xl sm:text-5xl font-semibold text-navy-true mb-6 sm:mb-20">Will you be attending our wedding?</h3>
                        <div className="space-y-3">
                          <label className="flex gap-3">
                            <input type="radio" name="attendance" value="yes" checked={form.attendance === 'yes'} onChange={handleChange} className="accent-cream transform scale-150" />
                            <span className="text-navy-true font-sans text-lg sm:text-2xl">Yes, joyfully attending</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="radio" name="attendance" value="no" checked={form.attendance === 'no'} onChange={handleChange} className="accent-cream transform scale-150" />
                            <span className="text-navy-true font-sans text-lg sm:text-2xl">No, sorry unable to attend</span>
                          </label>
                        </div>
                        {form.attendance === 'yes' && (
                          <div className="mt-6">
                            <label className="block text-blue/70 text-xs sm:text-base font-sans mb-2 tracking-wide">How many guests will attend, including you?</label>
                            <select
                              name="guestCount"
                              value={form.guestCount}
                              onChange={handleChange}
                              className="w-full bg-white border border-navy/50 text-black rounded-xl px-3 py-3 text-sm font-sans focus:outline-none focus:border-white/50 transition-all"
                            >
                              {[1, 2, 3, 4].map(count => (
                                <option key={count} value={String(count)}>{count} {count === 1 ? 'guest' : 'guests'}</option>
                              ))}
                            </select>
                            <p className="text-xs text-black/50 mt-2">This total includes you. Only guests stated on your invitation may attend.</p>
                          </div>
                        )}
                        <div className="flex justify-between mt-6 sm:absolute sm:bottom-6 sm:left-10 sm:right-10 md:left-12 md:right-12">
                          <button type="button" onClick={() => setStep(1)} className="text-navy-true/50 text-sm sm:text-lg font-sans hover:text-white/80 transition-colors">← Previous</button>
                          <button type="submit" disabled={!form.attendance || (form.attendance === 'yes' && Number(form.guestCount) < 1)} className={`flex items-center gap-2 font-sans text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition-all ${!form.attendance || (form.attendance === 'yes' && Number(form.guestCount) < 1) ? 'bg-gray-400 cursor-not-allowed' : 'bg-navy-true hover:bg-blue-muted/80'} text-white`}>
                            Next <span className="text-sm sm:text-lg">»</span>
                          </button>
                        </div>
                      </form>
                    )}

                    {step === 3 && (
                      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6 sm:pb-28">
                        <h3 className="serif-font text-xl sm:text-5xl font-semibold text-navy-true mb-2">Kindly leave a message for the couple</h3>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Type your message here" className="w-full bg-white border border-navy/50 text-black placeholder-black/50 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all resize-none" />
                        <div className="flex justify-between mt-4 sm:absolute sm:bottom-6 sm:left-10 sm:right-10 md:left-12 md:right-12">
                          <button type="button" onClick={() => setStep(2)} className="text-navy-true/50 text-sm sm:text-lg font-sans hover:text-white/80 transition-colors">← Previous</button>
                          <button type="submit" className="bg-navy-true text-white font-sans font-medium text-sm sm:text-lg px-5 sm:px-8 py-2 sm:py-2.5 rounded-xl hover:bg-cream/90 hover:text-navy-true transition-all shadow-md">Submit</button>
                        </div>
                      </form>
                    )}

                  </div>
                </>
              ) : (
                <div className="flex flex-col h-full pb-20 sm:pb-28">
                  <div className="flex-1 grid place-items-center">
                    <div className="flex flex-col items-center gap-6 sm:gap-8">
                      <svg width="100" height="100" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[140px] sm:h-[140px]">
                        <polygon
                          points={(() => {
                            const cx = 70, cy = 70, outer = 58, inner = 42, spikes = 12;
                            const step = Math.PI / spikes;
                            let pts: string[] = [];
                            let rot = -Math.PI / 2;
                            for (let i = 0; i < spikes * 2; i++) {
                              const r = i % 2 === 0 ? outer : inner;
                              const x = cx + Math.cos(rot) * r;
                              const y = cy + Math.sin(rot) * r;
                              pts.push(`${x},${y}`);
                              rot += step;
                            }
                            return pts.join(' ');
                          })()}
                          fill="#7A9CB8"
                          opacity="0.85"
                          stroke="#7A9CB8"
                          strokeWidth="12"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <path d="M52 72 L66 86 L92 60" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="serif-font text-2xl sm:text-4xl text-navy-true text-center max-w-md px-2">
                        <span className="font-bold">Thank you</span> for providing your details, we look forward to celebrating with you!
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 sm:absolute sm:bottom-6 sm:left-10 sm:right-10 md:left-12 md:right-12">
                    <button type="button" onClick={() => { setSubmitted(false); setStep(2) }} className="text-navy-true/50 text-sm sm:text-lg font-sans hover:text-white/80 transition-colors">← Previous</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <div className="relative w-screen left-1/2 -translate-x-1/2">
        <img src="/images/Pattern strip.webp" alt="divider print" className="w-full h-16 md:h-20 object-cover block" />
      </div>

      <section className="relative overflow-hidden py-12 sm:py-20" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:flex md:justify-center gap-4 sm:gap-8">
            {[
  { src: '/images/hkuxlxi35zi0bvr1rrxi.webp', pos: 'center center' },
  { src: '/images/Wedding party (hero section).webp', pos: 'center center' },
  { src: '/images/Ceremony (hero section).webp', pos: 'center 0%' },
  { src: '/images/skojadputzasppo0ubmv.webp', pos: 'center center' },
].map((img, i) => (
  <div key={i} className="relative w-full md:w-[260px] aspect-square md:h-[260px]">
    <Image
      src={img.src}
      alt={`Gallery ${i + 1}`}
      fill
      sizes="(max-width: 640px) 45vw, 260px"
      quality={100}
      className="object-cover"
      style={{ objectPosition: img.pos }}
      priority={i === 0}
    />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
