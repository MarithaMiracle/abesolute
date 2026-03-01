'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import PatternBand from '../../components/PatternBand'
import Footer from '../../components/Footer'

type FormData = {
  fullName: string
  email: string
  phone: string
  attendance: string
  dietary: string
}

export default function RSVPPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    attendance: '',
    dietary: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-navy">
      <Navbar />

      {/* ── HERO BANNER ── */}
      <section className="relative pt-24 pb-0">
        <div
          className="relative h-72 md:h-96 overflow-hidden"
          style={{
            backgroundImage: "url('/images/rsvp-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#8AAEC2',
          }}
        >
          <div className="absolute inset-0 bg-navy/40" />
          <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-8 md:px-20">
            <h1 className="serif-font text-4xl md:text-5xl font-semibold text-white leading-tight max-w-md">
              Kindly Confirm<br />
              <span className="text-blue-pale">Your Attendance</span>
            </h1>
            <p className="text-white/70 text-sm mt-3 max-w-sm font-sans">
              We are honoured to celebrate our traditional wedding with you. Please complete the form below to let us know if you will be joining us.
            </p>
          </div>
        </div>
      </section>

      {/* ── RSVP FORM SECTION ── */}
      <section className="african-pattern relative py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white text-4xl font-sans font-semibold mb-8">RSVP</h2>

          <div className="bg-blue-pale/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Soft blob decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

            <div className="relative z-10">
              {!submitted ? (
                <>
                  {/* Step indicator */}
                  <div className="mb-6">
                    <p className="text-white/50 text-xs font-sans tracking-widest uppercase mb-1">RSVP</p>
                    <p className="text-white/40 text-xs font-sans">Kindly fill in your full information here</p>
                  </div>

                  {step === 0 && (
                    <div>
                      <h3 className="serif-font text-3xl font-semibold text-navy-dark mb-3">
                        Important<br />information
                      </h3>
                      <div className="bg-white/20 rounded-xl p-4 mb-8">
                        <p className="text-navy-dark text-sm font-sans leading-relaxed">
                          <span className="font-semibold">Kindly note:</span> This wedding is strictly by invitation only. Only guests invited by the couple and their family will be accommodated — no additional plus-ones and children.
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => setStep(1)}
                          className="flex items-center gap-2 bg-blue-muted/60 text-white font-sans text-sm px-6 py-2.5 rounded-full hover:bg-blue-muted/80 transition-all"
                        >
                          Next <span className="text-lg">»</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <form onSubmit={(e) => { e.preventDefault(); setStep(2) }} className="space-y-4">
                      <h3 className="serif-font text-3xl font-semibold text-navy-dark mb-6">Your Details</h3>
                      <div>
                        <label className="block text-white/70 text-xs font-sans mb-1.5 tracking-wide">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full bg-white/20 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-xs font-sans mb-1.5 tracking-wide">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full bg-white/20 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-xs font-sans mb-1.5 tracking-wide">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+44 000 000 0000"
                          className="w-full bg-white/20 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all"
                        />
                      </div>
                      <div className="flex justify-between pt-2">
                        <button type="button" onClick={() => setStep(0)} className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors">← Back</button>
                        <button type="submit" className="flex items-center gap-2 bg-blue-muted/60 text-white font-sans text-sm px-6 py-2.5 rounded-full hover:bg-blue-muted/80 transition-all">
                          Next <span className="text-lg">»</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h3 className="serif-font text-3xl font-semibold text-navy-dark mb-6">Attendance Details</h3>
                      <div>
                        <label className="block text-white/70 text-xs font-sans mb-1.5 tracking-wide">Will you be attending? *</label>
                        <select
                          name="attendance"
                          required
                          value={form.attendance}
                          onChange={handleChange}
                          className="w-full bg-white/20 border border-white/20 text-white rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 transition-all appearance-none"
                        >
                          <option value="" disabled className="text-navy">Select an option</option>
                          <option value="yes" className="text-navy">Yes, I will attend 🎉</option>
                          <option value="no" className="text-navy">Unfortunately, I cannot attend</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/70 text-xs font-sans mb-1.5 tracking-wide">Dietary Requirements</label>
                        <input
                          type="text"
                          name="dietary"
                          value={form.dietary}
                          onChange={handleChange}
                          placeholder="Any dietary requirements or allergies?"
                          className="w-full bg-white/20 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all"
                        />
                      </div>
                      <div className="flex justify-between pt-2">
                        <button type="button" onClick={() => setStep(1)} className="text-white/50 text-sm font-sans hover:text-white/80 transition-colors">← Back</button>
                        <button type="submit" className="bg-cream text-navy font-sans font-medium text-sm px-8 py-2.5 rounded-full hover:bg-cream/90 transition-all shadow-md">
                          Submit RSVP
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">💌</div>
                  <h3 className="script-font text-5xl text-navy-dark mb-3">Thank you!</h3>
                  <p className="text-white/70 font-sans text-sm">
                    Your RSVP has been received. We can't wait to celebrate with you!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <section className="sand-pattern relative py-6">
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 px-6 max-w-4xl mx-auto">
          {[
            '/images/attend-1.jpg',
            '/images/attend-2.jpg',
            '/images/attend-3.jpg',
            '/images/attend-4.jpg',
          ].map((img, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl overflow-hidden shadow-lg"
              style={{
                backgroundImage: `url('${img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: i % 2 === 0 ? '#8AAEC2' : '#2D4F6B',
              }}
            />
          ))}
        </div>
      </section>

      {/* ── MESSAGE FOR THE COUPLE ── */}
      <section className="african-pattern relative py-16 px-6">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="script-font text-5xl md:text-6xl text-cream text-center mb-8">
            Leave a Message for the Couple
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              rows={6}
              className="w-full bg-white/90 text-navy/80 placeholder-navy/30 rounded-xl px-5 py-4 text-sm font-sans focus:outline-none resize-none"
            />
          </div>
          <div className="text-center mt-4">
            <button
              onClick={() => setMessage('')}
              className="bg-cream text-navy font-sans font-medium px-10 py-3 rounded-full text-sm tracking-wider hover:bg-cream/90 transition-all shadow-lg"
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      <PatternBand />
      <Footer />
    </main>
  )
}
