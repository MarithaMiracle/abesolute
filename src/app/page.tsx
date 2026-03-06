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
      <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden">
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
        <div className="absolute inset-0" style={{ pointerEvents: 'none', zIndex: 0 }}>
          <div className="flex flex-col items-start justify-start h-full pt-16 sm:pt-24 px-4 sm:px-8 md:px-16">
            <div className="text-white/25 serif-font" style={{ lineHeight: 0.9 }}>
              <div style={{ fontSize: 'clamp(48px, 16vw, 140px)' }}>04</div>
              <div style={{ fontSize: 'clamp(48px, 16vw, 140px)' }}>07</div>
              <div style={{ fontSize: 'clamp(48px, 16vw, 140px)' }}>26</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] md:min-h-screen px-4 sm:px-6 pt-20 pb-12 sm:pt-24 sm:pb-16">
          {/* Names in script */}
          <div className="text-center mb-8 fade-up">
            <h1 className="script-font text-5xl sm:text-6xl md:text-9xl text-cream leading-tight slide-in-left">
              Feyisayo
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-cream/30" />
              <span className="script-font text-4xl sm:text-5xl md:text-7xl text-cream/80">&</span>
              <div className="h-px w-12 bg-cream/30" />
            </div>
            <h1 className="script-font text-5xl sm:text-6xl md:text-9xl text-cream leading-tight slide-in-right">
              Temitayo
            </h1>
          </div>

          {/* Date Belt */}
<div className="text-center mt-10">
  <p className="serif-font text-2xl md:text-base text-cream/90 tracking-[0.25em]">#ABEsoluteLove</p>
</div>

          {/* RSVP Button */}
          <div className="mt-12 sm:mt-24 fade-up fade-up-delay-2">
            <Link
              href="/rsvp"
              className="inline-block bg-navy-true text-white font-sans font-semibold px-10 sm:px-14 py-3 sm:py-4 rounded-full text-sm sm:text-base tracking-wider hover:bg-white hover:text-navy-true transition-all duration-300 shadow-lg hover:shadow-xl"
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
            className="w-full h-12 sm:h-16 md:h-20 object-cover block"
            priority
          />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="overflow-hidden">
          <div className="flex items-center belt">
            {Array(8).fill(0).flatMap(() => [
              '/images/Homepage carousel.webp',
            ]).map((src, i) => (
              <div key={i} className="relative w-full h-[55vh] sm:h-[70vh] md:h-[100vh] flex-shrink-0">
                <Image
                  src={src}
                  alt={`carousel ${i % 4}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOVE STORY SECTION ── */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(232,220,200,var(--cream-overlay-opacity)), rgba(232,220,200,var(--cream-overlay-opacity))), url('/images/Pattern background.webp')",
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 480px auto',
          backgroundPosition: 'top center, top center',
          backgroundColor: 'var(--cream)'
        }}
      >
        <FloralLeft className="absolute left-0 top-16 opacity-80" />
        <FloralRight className="absolute right-0 top-16 opacity-80" />

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="script-font text-5xl sm:text-6xl md:text-7xl text-navy mb-2">Our Love Story</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Text */}
            <div className="md:col-span-3 space-y-5 text-black font-sans text-base md:text-xl leading-relaxed justify-text">
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

            {/* Photos stack */}
{/* Photos stack */}
<div className="md:col-span-2 relative flex flex-col gap-6 items-center -ml-10 md:-ml-10">
  <div className="relative w-full max-w-xl md:max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden">
    <Image src="/images/Love story 1.webp" alt="Couple photo" fill sizes="(max-width: 640px) 90vw, (max-width: 768px) 60vw, 40vw" className="object-cover" />
  </div>
  <div className="relative w-full max-w-xl md:max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden self-end -mt-18 md:-mt-24">
    <Image src="/images/Love story 2.webp" alt="Couple photo" fill sizes="(max-width: 640px) 90vw, (max-width: 768px) 60vw, 40vw" className="object-cover" />
  </div>
  

              <FloralSmall className="absolute -bottom-4 -right-4 opacity-40" />
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/rsvp"
              className="neon-btn inline-block bg-navy-true text-cream font-sans font-semibold px-12 py-4 rounded-full text-base tracking-wider whitespace-nowrap hover:bg-blue-pale hover:text-navy-true transition-colors"
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
          className="w-full h-16 md:h-20 object-cover block"
        />
      </div>

      {/* ── ATTEND CONFIRMATION CTA ── */}
      <section className="relative overflow-hidden py-24 px-6" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 px-4">
            <div className="flex flex-col">
              <h2 className="serif-font text-5xl md:text-6xl font-bold text-navy-true leading-tight">Kindly confirm</h2>
              <h2 className="serif-font text-5xl md:text-6xl font-light text-blue-muted leading-tight">your attendance</h2>
            </div>
            <Link
              href="/rsvp"
              className="inline-block bg-[#4A6B8A] text-white font-sans font-medium px-10 py-3 rounded-full text-lg tracking-widest hover:bg-navy-true transition-colors shadow-lg"
            >
              RSVP Now
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {['/images/Image line 1.webp', '/images/Image line 2.webp', '/images/Image line 3.webp', '/images/Image line 4.webp'].map((src, i) => (
              <div key={i} className="aspect-[4/5] relative overflow-hidden shadow-lg group">
                <Image
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  fill
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