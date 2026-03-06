import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Image from 'next/image'

export default function GiftingPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1E3448', position: 'relative' }}>

      {/* ── BACKGROUND LAYER — same as ceremony page ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Hero photo */}
        <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '120vh', backgroundImage: "url('/images/Gifting (hero section).webp')", backgroundSize: 'cover', backgroundPosition: 'center top' }} />
        {/* Navy overlay */}
        <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '120vh', background: 'rgba(30,52,72,0.55)' }} />
        {/* Gradient fade into navy */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '85vh', height: '35vh', background: 'linear-gradient(to bottom, rgba(30,52,72,0) 0%, #1E3448 60%, #1E3448 100%)' }} />
        {/* Pattern background below */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '110vh', bottom: 0, backgroundImage: "url('/images/Pattern background.webp')", backgroundRepeat: 'repeat', backgroundSize: '480px auto', backgroundPosition: 'top center' }} />
        {/* Gradient fade from navy into pattern */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '110vh', height: '20vh', background: 'linear-gradient(to bottom, #1E3448 0%, rgba(30,52,72,0) 100%)' }} />
      </div>

      {/* ── ALL CONTENT ── */}
      <div className="relative" style={{ zIndex: 1 }}>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[55vh]">
        {/* Script names top right */}
        <div className="absolute top-24 right-8 mt-20 md:right-20 text-right z-10">
          <p className="script-font text-5xl md:text-8xl text-cream leading-tight">Feyisayo</p>
          <p className="script-font text-4xl md:text-7xl text-cream/80 leading-tight">&amp;</p>
          <p className="script-font text-5xl md:text-8xl text-cream leading-tight">Temitayo</p>
        </div>
      </section>

      {/* ── GIFTING DETAILS ── */}
      <section className="relative py-16 px-6">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Overlapping layout */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>

            {/* Left: couple photo */}
            <div style={{ position: 'relative', zIndex: 1, flexShrink: 0, width: '52%' }}>
              <img
                src="/images/Gifting couple image.webp"
                alt="Couple"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Right: info card — overlaps photo, square edges */}
            <div style={{
              backgroundColor: '#B8CCE0',
              borderRadius: '0px',
              padding: '32px 28px 36px',
              marginLeft: '-80px',
              marginTop: '140px',
              position: 'relative',
              zIndex: 2,
              width: '52%',
              flexShrink: 0,
            }}>
              {/* GIFTING header */}
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '36px',
                fontWeight: 800,
                color: '#2B4A6B',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: '0 0 28px',
              }}>
                Gifting
              </h2>

              {/* Darker blue message box */}
              <div style={{
                backgroundColor: '#9BB4CC',
                borderRadius: '10px',
                padding: '18px 20px',
                marginBottom: '32px',
              }}>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '14px',
                  color: '#2B4A6B',
                  lineHeight: 1.7,
                  margin: '0 0 8px',
                }}>
                  Your presence at our ìgbéyàwó means the world to us and is truly the most important gift.
                </p>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '14px',
                  color: '#2B4A6B',
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 700,
                }}>
                  For those who would still like to give, monetary gifts are kindly preferred and will be deeply appreciated.
                </p>
              </div>

              {/* Bank details — large, clean, label light + value bold */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Bank:', value: 'Monzo' },
                  { label: 'Name:', value: 'Feyisayo Abe' },
                  { label: 'Sort Code:', value: '04-00-04' },
                  { label: 'Account Number:', value: '58159815' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '17px',
                      color: '#3A6080',
                      fontWeight: 400,
                      whiteSpace: 'nowrap',
                    }}>
                      {label}
                    </span>
                    <span style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '17px',
                      color: '#2B4A6B',
                      fontWeight: 700,
                      letterSpacing: label.includes('Sort') || label.includes('Account') ? '0.05em' : '0',
                    }}>
                      {value}
                    </span>
                  </div>
                ))}

                {/* Reference — separated, smaller */}
                <div style={{
                  borderTop: '1px solid rgba(43,74,107,0.2)',
                  marginTop: '10px',
                  paddingTop: '14px',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '13px',
                    color: '#3A6080',
                    fontWeight: 400,
                  }}>
                    Reference:
                  </span>
                  <span style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '13px',
                    color: '#2B4A6B',
                    fontWeight: 700,
                  }}>
                    Wedding gift
                  </span>
                </div>
              </div>
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
      </div>
    </main>
  )
}