'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Image from 'next/image'

type FormData = {
  firstName: string
  surname: string
  email: string
  phone: string
  attendance: string
  otherGuests?: string
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
    otherGuests: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [moreGuests, setMoreGuests] = useState(false)
  const [guestList, setGuestList] = useState<string[]>([''])

  const addGuest = () => setGuestList(prev => [...prev, ''])
  const removeGuest = (i: number) => setGuestList(prev => prev.filter((_, idx) => idx !== i))
  const updateGuest = (i: number, val: string) => setGuestList(prev => prev.map((g, idx) => idx === i ? val : g))

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
      'Other Guests': moreGuests && guestList.filter(g => g.trim()).length > 0
        ? guestList.filter(g => g.trim()).join(' | ')
        : 'N/A',
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
          className="relative h-72 md:h-96 overflow-hidden"
          style={{
            backgroundImage: "url('/images/RSVP page (hands).webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundColor: '#8AAEC2',
          }}
        >
          <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-12 md:px-20">
            <h1 className="serif-font text-8xl md:text-5xl font-semibold text-navy-true leading-tight max-w-md">
              Kindly Confirm<br />
              <span className="text-navy-true">Your </span><span className="text-blue-soft">Attendance</span>
            </h1>
            <p className="text-black/70 text-lg mt-3 max-w-sm font-sans">
              We are honoured to celebrate our traditional wedding with you. Please complete the form below to let us know if you will be joining us.
            </p>
          </div>
        </div>
      </section>

      {/* ── RSVP FORM SECTION ── */}
      <section className="relative py-16 px-6" style={{ minHeight: '100vh' }}>

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

        <div className="relative z-10 max-w-3xl md:max-w-2xl mx-auto">

          <h2 className="font-sans font-semibold mb-8" style={{ color: '#ffffff', fontSize: '2.25rem', letterSpacing: '0.02em' }}>
            RSVP
          </h2>

          <div className="backdrop-blur-sm w-full aspect-square p-10 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden" style={{ backgroundColor: '#B9CCDC', borderRadius: '28px' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url('/images/Form box overlay.webp')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '100% 100%', opacity: 0.9 }} />

            <div className="relative z-10 flex flex-col h-full">
              {!submitted ? (
                <>
                  <div className="mb-6 my-auto">
                    <p className="text-black/40 text-base font-sans">Kindly fill in your full information here</p>
                  </div>

                  <div className="flex-1 grid place-items-center">

                    {step === 0 && (
                      <div className="pb-30 my-auto">
                        <h3 className="serif-font text-5xl font-bold text-blue mb-8">
                          Important<br />information
                        </h3>
                        <div className="mb-8 rounded-xl px-5 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#525456', borderColor: 'rgba(255,255,255,0.3)' }}>
                          <p className="font-sans text-base leading-relaxed">
                            <span className="font-semibold">Kindly note:</span> This wedding is strictly by invitation only. Only guests invited by the couple and their family will be accommodated — no additional plus-ones and children.
                          </p>
                        </div>
                        <div className="absolute bottom-6 left-10 right-10 md:left-12 md:right-12 flex justify-end">
                          <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 font-sans text-sm px-6 py-2.5 rounded-xl transition-all hover:bg-[#98ABC0]"
                            style={{ backgroundColor: '#05233D', color: '#ffffff' }}
                          >
                            Next <span className="text-lg">»</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <form onSubmit={(e) => { e.preventDefault(); setStep(2) }} className="pb-28">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                          <div className="text-left my-auto md:col-span-4 md:pr-6 max-w-xs">
                            <h3 className="serif-font my-auto max-w-xs text-5xl font-semibold text-navy-dark mb-2">
                              Guest <br />details:
                              <br />
                              <span className="text-sm items-start text-black/50 inline-block max-w-xs mt-10 leading-snug">Your information will only be used for wedding communication. Please enter your full name, no initials or nicknames.</span>
                            </h3>
                          </div>
                          <div className="space-y-4 md:col-span-8">
                            <p className="text-black/50 text-sm font-sans mt-4">Please enter your name exactly as you want it to appear on your invitation</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-blue/70 text-base font-sans mb-1.5 tracking-wide">First Name *</label>
                                <input
                                  type="text"
                                  name="firstName"
                                  required
                                  value={form.firstName}
                                  onChange={handleChange}
                                  placeholder="Enter your first name"
                                  className="w-full bg-white border border-navy/50 text-black placeholder-black/50 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/50 transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-blue/70 text-base font-sans mb-1.5 tracking-wide">Surname *</label>
                                <input
                                  type="text"
                                  name="surname"
                                  required
                                  value={form.surname}
                                  onChange={handleChange}
                                  placeholder="Enter your surname"
                                  className="w-full bg-white border border-navy/50 text-black placeholder-black/50 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/50 transition-all"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-blue/70 text-base font-sans mb-1.5 tracking-wide">Email Address *</label>
                              <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className="w-full bg-white border border-navy/50 text-black placeholder-black/50 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/50 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-blue/70 text-base font-sans mb-1.5 tracking-wide">Phone Number</label>
                              <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+44 000 000 0000"
                                className="w-full bg-white border border-navy/50 text-black placeholder-black/50 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/50 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-6 left-10 right-10 md:left-12 md:right-12 flex justify-between">
                          <button type="button" onClick={() => setStep(0)} className="text-navy-true/50 text-lg font-sans hover:text-white/80 transition-colors">← Previous</button>
                          <button type="submit" className="flex items-center gap-2 bg-navy-true text-white font-sans text-sm px-6 py-2.5 rounded-xl hover:bg-blue-muted/80 transition-all">
                            Next <span className="text-lg">»</span>
                          </button>
                        </div>
                      </form>
                    )}

                    {step === 2 && (
                      <form onSubmit={(e) => { e.preventDefault(); setStep(3) }} className="space-y-6 pb-28">
                        <h3 className="serif-font text-5xl font-semibold text-navy-true mb-20">Will you be attending our wedding?</h3>
                        <div className="space-y-3">
                          <label className="flex gap-3">
                            <input type="checkbox" name="attendance" value="yes" checked={form.attendance === 'yes'} onChange={handleChange} className="accent-cream transform scale-150" />
                            <span className="text-navy-true font-sans text-2xl">Yes, joyfully attending</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" name="attendance" value="no" checked={form.attendance === 'no'} onChange={handleChange} className="accent-cream transform scale-150" />
                            <span className="text-navy-true font-sans text-2xl">No, sorry unable to attend</span>
                          </label>
                        </div>
                        <div className="absolute bottom-6 left-10 right-10 md:left-12 md:right-12 flex justify-between">
                          <button type="button" onClick={() => setStep(1)} className="text-navy-true/50 text-lg font-sans hover:text-white/80 transition-colors">← Previous</button>
                          <button type="submit" className="flex items-center gap-2 bg-navy-true text-white font-sans text-sm px-6 py-2.5 rounded-xl hover:bg-blue-muted/80 transition-all">Next <span className="text-lg">»</span></button>
                        </div>
                      </form>
                    )}

                    {step === 3 && (
                      <div className="space-y-6 pb-28">
                        <h3 className="serif-font text-5xl font-semibold text-navy-true mb-10">Are you RSVP'ing for another invited guest(s)?</h3>
                        <div className="flex gap-4">
                          <button className="px-6 py-3 rounded-xl hover:bg-[#98ABC0] transition-all" style={{ backgroundColor: moreGuests ? '#05233D' : 'rgba(130,157,182,0.4)', color: '#fff' }} onClick={() => setMoreGuests(true)}>YES</button>
                          <button className="px-6 py-3 rounded-xl hover:bg-[#98ABC0] transition-all" style={{ backgroundColor: !moreGuests ? '#05233D' : 'rgba(130,157,182,0.4)', color: '#fff' }} onClick={() => setMoreGuests(false)}>NO</button>
                        </div>
                        <div className="absolute bottom-6 left-10 right-10 md:left-12 md:right-12 flex justify-between">
                          <button type="button" onClick={() => setStep(2)} className="text-navy-true/50 text-lg font-sans hover:text-white/80 transition-colors">← Previous</button>
                          <button type="button" onClick={() => setStep(moreGuests ? 4 : 5)} className="flex items-center gap-2 bg-navy-true text-white font-sans text-lg px-6 py-2.5 rounded-xl hover:bg-blue-muted/80 transition-all">Next <span className="text-lg">»</span></button>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <form onSubmit={(e) => { e.preventDefault(); setStep(5) }} className="space-y-6 pb-28">
                        {moreGuests && (
                          <div>
                            <h3 className="serif-font text-5xl font-semibold text-navy-true mb-10">Please provide details of other invited guest(s)</h3>
                            <p className="text-black/50 text-sm font-sans mb-4">Add the full name of each additional guest</p>
                            <div className="space-y-3">
                              {guestList.map((guest, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={guest}
                                    onChange={e => updateGuest(i, e.target.value)}
                                    placeholder={`Guest ${i + 1} full name`}
                                    className="flex-1 bg-white border border-navy/50 text-black rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 transition-all"
                                  />
                                  {guestList.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeGuest(i)}
                                      className="text-navy-true/40 hover:text-red-400 transition-colors text-xl font-light w-8 h-8 flex items-center justify-center"
                                    >
                                      ×
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={addGuest}
                                className="flex items-center gap-2 text-navy-true/60 hover:text-navy-true font-sans text-sm mt-2 transition-colors"
                              >
                                <span className="text-xl leading-none">+</span> Add another guest
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-6 left-10 right-10 md:left-12 md:right-12 flex justify-between">
                          <button type="button" onClick={() => setStep(3)} className="text-navy-true/50 text-lg font-sans hover:text-white/80 transition-colors">← Previous</button>
                          <button type="submit" className="flex items-center gap-2 bg-navy-true text-white font-sans text-sm px-6 py-2.5 rounded-xl hover:bg-blue-muted/80 transition-all">Next <span className="text-lg">»</span></button>
                        </div>
                      </form>
                    )}

                    {step === 5 && (
                      <form onSubmit={handleSubmit} className="space-y-6 pb-28">
                        <h3 className="serif-font text-5xl font-semibold text-navy-true mb-2">Kindly leave a message for the couple</h3>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Type your message here" className="w-full bg-white border border-navy/50 text-black placeholder-black/50 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all resize-none" />
                        <div className="absolute bottom-6 left-10 right-10 md:left-12 md:right-12 flex justify-between">
                          <button type="button" onClick={() => setStep(moreGuests ? 4 : 3)} className="text-navy-true/50 text-lg font-sans hover:text-white/80 transition-colors">← Previous</button>
                          <button type="submit" className="bg-navy-true text-white font-sans font-medium text-lg px-8 py-2.5 rounded-xl hover:bg-cream/90 hover:text-navy-true transition-all shadow-md">Submit</button>
                        </div>
                      </form>
                    )}

                  </div>
                </>
              ) : (
                <div className="flex flex-col h-full pb-28">
                  <div className="flex-1 grid place-items-center">
                    <div className="flex flex-col items-center gap-8">
                      <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      <p className="serif-font text-4xl text-navy-true text-center max-w-md">
                        <span className="font-bold">Thank you</span> for providing your details, we look forward to celebrating with you!
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-10 right-10 md:left-12 md:right-12 flex justify-between">
                    <button type="button" onClick={() => { setSubmitted(false); setStep(2) }} className="text-navy-true/50 text-lg font-sans hover:text-white/80 transition-colors">← Previous</button>
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

      <section className="relative overflow-hidden py-20" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-6xl mx-auto flex justify-center gap-8">
          {['/images/Image line 1.webp', '/images/Image line 2.webp', '/images/Image line 3.webp', '/images/Image line 4.webp'].map((src, i) => (
            <div key={i} className="relative w-[260px] h-[260px]">
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}