import Link from 'next/link'
import Navbar from '../components/Navbar'
import PatternBand from '../components/PatternBand'
import Footer from '../components/Footer'
import { FloralLeft, FloralRight, FloralSmall } from '../components/FloralDecor'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen bg-navy-dark overflow-hidden">
        {/* Background couple photo placeholder — replace src with real image */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy/80 to-navy-dark"
          style={{
            backgroundImage: "url('/images/hero-couple.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundBlendMode: 'multiply',
          }}
        />
        <div className="absolute inset-0 bg-navy-dark/50" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-16">
          {/* Names in script */}
          <div className="text-center mb-8 fade-up">
            <h1 className="script-font text-7xl md:text-9xl text-cream leading-tight">
              Feyisayo
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-cream/30" />
              <span className="script-font text-5xl md:text-7xl text-cream/80">&</span>
              <div className="h-px w-12 bg-cream/30" />
            </div>
            <h1 className="script-font text-7xl md:text-9xl text-cream leading-tight">
              Temitayo
            </h1>
          </div>

          {/* Date */}
          <div className="text-center mb-2 fade-up fade-up-delay-1">
            <p className="serif-font text-3xl md:text-4xl text-cream tracking-[0.3em] font-light">
              04.07.2026
            </p>
            <p className="text-blue-pale text-xs tracking-[0.25em] mt-1 font-sans">#ABEsoluteLove</p>
          </div>

          {/* Engagement photo — positioned right */}
          <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 hidden md:block">
            <div className="w-48 h-56 rounded-2xl overflow-hidden border-2 border-cream/20 shadow-2xl"
              style={{
                backgroundImage: "url('/images/couple-1.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#2D4F6B',
              }}
            />
          </div>

          {/* RSVP Button */}
          <div className="mt-12 fade-up fade-up-delay-2">
            <Link
              href="/rsvp"
              className="inline-block bg-cream text-navy font-sans font-medium px-10 py-3 rounded-full text-sm tracking-wider hover:bg-cream/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              RSVP Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── LOVE STORY SECTION ── */}
      <section className="bg-cream-light py-20 px-6 relative overflow-hidden">
        {/* Floral decorations */}
        <FloralLeft className="absolute left-0 top-16 opacity-50" />
        <FloralRight className="absolute right-0 top-16 opacity-50" />

        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <h2 className="script-font text-6xl md:text-7xl text-navy mb-2">Our Love Story</h2>
          </div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text */}
            <div className="space-y-5 text-navy/80 font-sans text-sm leading-relaxed">
              <p>
                We met on June 23rd, 2023, at a mutual friend's birthday dinner that almost didn't happen. The celebrant wasn't keen on celebrating, but Feyi insisted and ended up planning the entire evening. Little did she know she was also planning the moment that would change her life forever.
              </p>
              <p>
                That night, we were seated across from each other and quickly discovered how easy conversation felt. Laughter flowed, chemistry was undeniable, and a few shots helped seal the moment. While everyone else ordered tequila, Feyi confidently chose Wray &amp; Nephews. Naturally curious and always intrigued, Tayo asked if he could try one with her. True to her "Paparazzi" nickname, Feyi recorded the toast — completely unaware that this small, playful moment would become the beginning of a friendship that would soon turn into something much more.
              </p>
              <p>
                As time went on, what started as a simple connection grew into a deep friendship, genuine love, and a partnership rooted in laughter, understanding, and faith. Somewhere between the late-night conversations, shared dreams, and countless memories, we both knew this was something special.
              </p>
              <p>
                On July 14th, 2025, Tayo planned a weekend getaway to Sheffield at the beautiful Mercure Kenwood Hall Hotel &amp; Spa. Feyi had a gut feeling something might be coming. There were secret phone calls, whispered conversations, and a lot of phone-hiding, but she chose to trust the process and enjoy the moment.
              </p>
              <p>
                That evening, plans for dinner suddenly changed and we decided to take a walk around the hotel grounds instead. As we reached the lakeside, Feyi was met with a breathtaking setup glowing with soft pink lights. In that perfectly intimate moment, Tayo proposed in the most thoughtful and heartfelt way, exactly how Feyi has always imagined it.
              </p>
              <p>
                We were legally married on October 18th 2025 in an intimate ceremony surrounded by close family and friends. Now, we look forward to honouring God, family, and culture as we celebrate our Igbéyàwó, the Yoruba traditional wedding, on July 4th, and continue our forever journey together.
              </p>
            </div>

            {/* Photos stack */}
            <div className="relative flex flex-col gap-4 items-center">
              <div
                className="w-full max-w-xs h-72 rounded-2xl border-4 border-white shadow-xl overflow-hidden"
                style={{
                  backgroundImage: "url('/images/story-1.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#8AAEC2',
                }}
              />
              <div
                className="w-full max-w-xs h-64 rounded-2xl border-4 border-white shadow-xl overflow-hidden"
                style={{
                  backgroundImage: "url('/images/story-2.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#2D4F6B',
                }}
              />
              {/* Small floral bottom right */}
              <FloralSmall className="absolute -bottom-4 -right-4 opacity-40" />
            </div>
          </div>

          {/* RSVP CTA */}
          <div className="text-center mt-16">
            <Link
              href="/rsvp"
              className="inline-block bg-navy text-cream font-sans font-medium px-10 py-3 rounded-full text-sm tracking-wider hover:bg-navy-dark transition-all duration-300 shadow-lg"
            >
              RSVP Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── AFRICAN PATTERN BAND ── */}
      <PatternBand />

      {/* ── GALLERY SECTION ── */}
      <section className="bg-navy py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
          {[
            { img: '/images/gallery-1.jpg', alt: 'Couple photo 1' },
            { img: '/images/gallery-2.jpg', alt: 'Couple photo 2' },
            { img: '/images/gallery-3.jpg', alt: 'Couple photo 3' },
          ].map((photo, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden"
              style={{
                backgroundImage: `url('${photo.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: i % 2 === 0 ? '#1E3448' : '#3A6186',
              }}
            >
              <div className="w-full h-full hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ── ATTEND CONFIRMATION CTA ── */}
      <section className="bg-cream-light py-20 px-6 relative overflow-hidden">
        <FloralLeft className="absolute left-0 top-8 opacity-40" />
        <FloralRight className="absolute right-0 top-8 opacity-40" />

        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <h2 className="serif-font text-4xl md:text-5xl font-semibold text-navy leading-tight">
              Kindly confirm<br />your attendance
            </h2>
            <Link
              href="/rsvp"
              className="inline-block bg-navy text-cream font-sans font-medium px-10 py-3 rounded-full text-sm tracking-wider hover:bg-navy-dark transition-all duration-300 shadow-lg whitespace-nowrap"
            >
              RSVP Now
            </Link>
          </div>
        </div>

        {/* Bottom gallery strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {[
            '/images/attend-1.jpg',
            '/images/attend-2.jpg',
            '/images/attend-3.jpg',
            '/images/attend-4.jpg',
          ].map((img, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl overflow-hidden shadow-md"
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

      <Footer />
    </main>
  )
}
