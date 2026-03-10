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
        <div className="absolute top-24 right-4 sm:right-8 md:right-20 text-right z-10">
          <p className="script-font text-4xl sm:text-5xl md:text-7xl text-cream leading-tight">Feyisayo</p>
          <p className="script-font text-3xl sm:text-4xl md:text-6xl text-cream/80 leading-tight">&amp;</p>
          <p className="script-font text-4xl sm:text-5xl md:text-7xl text-cream leading-tight">Temitayo</p>
        </div>
      </section>

      {/* ── GIFTING DETAILS ── */}
      <section className="relative py-10 sm:py-16 px-4 sm:px-6">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Single responsive layout — stacked on mobile, overlapping on desktop */}
          <style>{`
            .gifting-layout { display: flex; flex-direction: column; }
            .gifting-photo { width: 100%; flex-shrink: 0; }
            .gifting-card {
              background-color: #B8CCE0;
              border-radius: 0px;
              padding: 24px 20px 28px;
              width: 100%;
              box-sizing: border-box;
            }
            .gifting-card h2 { font-size: 26px; margin: 0 0 20px; }
            .gifting-card .msg-box { padding: 14px 16px; margin-bottom: 24px; }
            .gifting-card .msg-box p { font-size: 13px; }
            .gifting-card .bank-row span { font-size: 14px; }
            .gifting-card .ref-row span { font-size: 12px; }
            @media (min-width: 768px) {
              .gifting-layout { flex-direction: row; align-items: flex-start; position: relative; }
              .gifting-photo { width: 52%; position: relative; z-index: 1; }
              .gifting-card {
                width: 52%;
                flex-shrink: 0;
                margin-left: -80px;
                margin-top: 60px;
                position: relative;
                z-index: 2;
                padding: 32px 28px 36px;
              }
              .gifting-card h2 { font-size: 36px; margin: 0 0 28px; }
              .gifting-card .msg-box { padding: 18px 20px; margin-bottom: 32px; }
              .gifting-card .msg-box p { font-size: 14px; }
              .gifting-card .bank-row span { font-size: 17px; }
              .gifting-card .ref-row span { font-size: 13px; }
            }
          `}</style>

          <div className="gifting-layout">
            <div className="gifting-photo">
              <img
                src="/images/Gifting couple image.webp"
                alt="Couple"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className="gifting-card">
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontWeight: 800,
                color: '#2B4A6B',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                Gifting
              </h2>
              <div className="msg-box" style={{ backgroundColor: '#9BB4CC', borderRadius: '10px' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#2B4A6B', lineHeight: 1.7, margin: '0 0 8px' }}>
                  Your presence at our ìgbéyàwó means the world to us and is truly the most important gift.
                </p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#2B4A6B', lineHeight: 1.7, margin: 0, fontWeight: 700 }}>
                  For those who would still like to give, monetary gifts are kindly preferred and will be deeply appreciated.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Bank:', value: 'Monzo' },
                  { label: 'Name:', value: 'Feyisayo Abe' },
                  { label: 'Sort Code:', value: '04-00-04' },
                  { label: 'Account Number:', value: '58159815' },
                ].map(({ label, value }) => (
                  <div key={label} className="bank-row" style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontFamily: 'Georgia, serif', color: '#3A6080', fontWeight: 400, whiteSpace: 'nowrap' }}>{label}</span>
                    <span style={{ fontFamily: 'Georgia, serif', color: '#2B4A6B', fontWeight: 700, letterSpacing: label.includes('Sort') || label.includes('Account') ? '0.05em' : '0' }}>{value}</span>
                  </div>
                ))}
                <div className="ref-row" style={{ borderTop: '1px solid rgba(43,74,107,0.2)', marginTop: '8px', paddingTop: '12px', display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'Georgia, serif', color: '#3A6080', fontWeight: 400 }}>Reference:</span>
                  <span style={{ fontFamily: 'Georgia, serif', color: '#2B4A6B', fontWeight: 700 }}>Wedding gift</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(43,74,107,0.2)', marginTop: '8px', paddingTop: '12px' }}>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#3A6080', fontWeight: 400, marginBottom: '6px' }}>
                    Alternatively, you can use the link below, which will direct you to a secure payment page:
                  </p>
                  <a
                    href="https://monzo.me/feyisayoolukemiabe?h=pkkM9Q"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'Georgia, serif', color: '#2B4A6B', fontWeight: 700, wordBreak: 'break-all' }}
                  >
                    monzo.me/feyisayoolukemiabe
                  </a>
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
      </div>
    </main>
  )
}