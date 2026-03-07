import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FloralLeft, FloralRight, FloralSmall } from '../components/FloralDecor'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '100svh' }}>
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy/80 to-navy-dark"
          style={{
            backgroundImage: "url('/images/Homepage (hero section).webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundBlendMode: 'multiply',
          }}
        />
        <div className="absolute inset-0 bg-navy/20" />
        {/* Mobile-only: extend navy overlay to fully cover image bottom */}
        <div className="absolute inset-0 block md:hidden" style={{
          background: 'linear-gradient(to bottom, rgba(45,79,107,0.2) 0%, rgba(45,79,107,0.2) 40%, #2D4F6B 70%, #2D4F6B 100%)',
        }} />

        {/* Date numbers — hidden on mobile, visible on md+ */}
        <div className="absolute inset-0 hidden md:block" style={{ pointerEvents: 'none', zIndex: 0 }}>
          <div className="flex flex-col items-start justify-start h-full pt-16 sm:pt-24 px-4 sm:px-8 md:px-16">
            <div className="text-white/25 serif-font" style={{ lineHeight: 0.9 }}>
              <div style={{ fontSize: 'clamp(48px, 16vw, 140px)' }}>04</div>
              <div style={{ fontSize: 'clamp(48px, 16vw, 140px)' }}>07</div>
              <div style={{ fontSize: 'clamp(48px, 16vw, 140px)' }}>26</div>
            </div>
          </div>
        </div>

        {/* Date numbers — mobile only, smaller and top-left */}
        <div className="absolute top-20 left-4 block md:hidden" style={{ pointerEvents: 'none', zIndex: 0 }}>
          <div className="text-white/20 serif-font" style={{ lineHeight: 0.9 }}>
            <div style={{ fontSize: 'clamp(36px, 12vw, 64px)' }}>04</div>
            <div style={{ fontSize: 'clamp(36px, 12vw, 64px)' }}>07</div>
            <div style={{ fontSize: 'clamp(36px, 12vw, 64px)' }}>26</div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16" style={{ minHeight: '100svh' }}>
          {/* Names in script */}
          <div className="text-center mb-6 sm:mb-8 fade-up">
            <h1 className="script-font text-[clamp(3rem,14vw,9rem)] text-cream leading-tight slide-in-left">
              Feyisayo
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 sm:w-12 bg-cream/30" />
              <span className="script-font text-[clamp(2.2rem,10vw,7rem)] text-cream/80">&</span>
              <div className="h-px w-8 sm:w-12 bg-cream/30" />
            </div>
            <h1 className="script-font text-[clamp(3rem,14vw,9rem)] text-cream leading-tight slide-in-right">
              Temitayo
            </h1>
          </div>

          {/* Hashtag */}
          <div className="text-center mt-6 sm:mt-10">
            <p className="serif-font text-base sm:text-2xl md:text-base text-cream/90 tracking-[0.2em] sm:tracking-[0.25em]">#ABEsoluteLove</p>
          </div>

          {/* RSVP Button */}
          <div className="mt-8 sm:mt-12 md:mt-24 fade-up fade-up-delay-2">
            <Link
              href="/rsvp"
              className="inline-block bg-navy-true text-white font-sans font-semibold px-8 sm:px-10 md:px-14 py-3 sm:py-4 rounded-full text-sm sm:text-base tracking-wider hover:bg-white hover:text-navy-true transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              RSVP Now
            </Link>
          </div>
        </div>

        <div className="relative w-screen left-1/2 -translate-x-1/2">
          <Image
            src="/images/Pattern strip.webp"
            alt="divider print"
            width={1920}
            height={80}
            className="w-full h-10 sm:h-12 md:h-16 lg:h-20 object-cover block"
            priority
          />
        </div>
      </section>

      {/* ── CAROUSEL ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#1E3448' }}>
        <div className="overflow-hidden">
          <div className="flex items-center belt">
            {Array(8).fill(0).flatMap(() => [
              '/images/Homepage carousel.webp',
            ]).map((src, i) => (
              <div key={i} className="relative w-screen h-[40vh] sm:h-[55vh] md:h-[70vh] lg:h-[100vh] flex-shrink-0">
                <Image
                  src={src}
                  alt={`carousel ${i % 4}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOVE STORY SECTION ── */}
      <section
        className="py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(232,220,200,var(--cream-overlay-opacity)), rgba(232,220,200,var(--cream-overlay-opacity))), url('/images/Pattern background.webp')",
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 480px auto',
          backgroundPosition: 'top center, top center',
          backgroundColor: 'var(--cream)'
        }}
      >
        {/* Florals — hidden on small mobile to avoid overflow */}
        <FloralLeft className="absolute left-0 top-16 opacity-80 hidden sm:block" />
        <FloralRight className="absolute right-0 top-16 opacity-80 hidden sm:block" />

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="script-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-navy mb-2">Our Love Story</h2>
          </div>

          {/* On mobile: single column, photos above text. On md+: original 5-col grid */}
          <div className="grid md:grid-cols-5 gap-8 sm:gap-12 items-start">

            {/* Photos — show first on mobile via order */}
            <div className="md:col-span-2 relative flex flex-col gap-4 sm:gap-6 items-center md:-ml-10 order-first md:order-last">
              <div className="relative w-full max-w-xs sm:max-w-xl md:max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden">
                <Image src="/images/Love story 1.webp" alt="Couple photo" fill sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 40vw" className="object-cover" />
              </div>
              <div className="relative w-full max-w-xs sm:max-w-xl md:max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden self-end -mt-12 sm:-mt-18 md:-mt-24">
                <Image src="/images/Love story 2.webp" alt="Couple photo" fill sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 40vw" className="object-cover" />
              </div>
              <FloralSmall className="absolute -bottom-4 -right-4 opacity-40 hidden sm:block" />
            </div>

            {/* Text */}
            <div className="md:col-span-3 space-y-4 sm:space-y-5 text-black font-sans text-sm sm:text-base md:text-xl leading-relaxed justify-text order-last md:order-first">
              <p>
                We met at a mutual friend's birthday dinner that almost didn't happen. The celebrant wasn't keen on celebrating, but Feyi insisted and ended up planning the entire evening. Little did she know she was also planning the moment that would change her life forever.
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

          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/rsvp"
              className="neon-btn inline-block bg-navy-true text-cream font-sans font-semibold px-8 sm:px-12 py-3 sm:py-4 rounded-full text-sm sm:text-base tracking-wider whitespace-nowrap hover:bg-blue-pale hover:text-navy-true transition-colors"
            >
              RSVP Now
            </Link>
          </div>
        </div>
      </section>

      <div className="relative w-screen left-1/2 -translate-x-1/2">
        <Image
          src="/images/Pattern strip.webp"
          alt="divider print"
          width={1920}
          height={80}
          className="w-full h-12 sm:h-16 md:h-20 object-cover block"
        />
      </div>

      {/* ── ATTEND CONFIRMATION CTA ── */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-6xl mx-auto">

          {/* Header + button — stacked on mobile, row on md+ */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8 mb-10 sm:mb-16 px-2 sm:px-4">
            <div className="flex flex-col">
              <h2 className="serif-font text-3xl sm:text-5xl md:text-6xl font-bold text-navy-true leading-tight">Kindly confirm</h2>
              <h2 className="serif-font text-3xl sm:text-5xl md:text-6xl font-light text-blue-muted leading-tight">your attendance</h2>
            </div>
            <Link
              href="/rsvp"
              className="inline-block self-start sm:self-auto bg-[#4A6B8A] text-white font-sans font-medium px-8 sm:px-10 py-3 rounded-full text-base sm:text-lg tracking-widest hover:bg-navy-true transition-colors shadow-lg whitespace-nowrap"
            >
              RSVP Now
            </Link>
          </div>

          {/* Gallery — 2 cols on mobile, 4 on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {['/images/Image line 1.webp', '/images/Image line 2.webp', '/images/Image line 3.webp', '/images/Image line 4.webp'].map((src, i) => (
              <div key={i} className="aspect-[4/5] relative overflow-hidden shadow-lg group">
                <Image
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 45vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
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