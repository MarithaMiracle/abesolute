import Navbar from '../../components/Navbar'
import PatternBand from '../../components/PatternBand'
import Footer from '../../components/Footer'

export default function GiftingPage() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[55vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/gifting-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#8AAEC2',
          }}
        />
        {/* greyscale overlay to mimic figma */}
        <div className="absolute inset-0 bg-navy/40 mix-blend-multiply" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(30,52,72,0.2), rgba(30,52,72,0.7))' }} />

        {/* Script names top right */}
        <div className="absolute top-24 right-8 md:right-20 text-right z-10">
          <p className="script-font text-5xl md:text-7xl text-cream leading-tight">Feyisayo</p>
          <p className="script-font text-4xl md:text-6xl text-cream/80 leading-tight">&amp;</p>
          <p className="script-font text-5xl md:text-7xl text-cream leading-tight">Temitayo</p>
        </div>
      </section>

      {/* ── GIFTING DETAILS ── */}
      <section className="african-pattern relative py-16 px-6">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* Left: couple photo */}
            <div className="relative">
              <div
                className="w-full max-w-sm mx-auto h-[480px] rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl"
                style={{
                  backgroundImage: "url('/images/gifting-couple.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#2D4F6B',
                }}
              />
            </div>

            {/* Right: info card */}
            <div className="bg-blue-pale/25 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl">
              <h2 className="serif-font text-4xl font-bold text-cream tracking-widest mb-5 uppercase">Gifting</h2>

              <div className="bg-navy/30 rounded-xl p-4 mb-7">
                <p className="font-sans text-cream/80 text-sm leading-relaxed">
                  Your presence at our igbéyàwó means the world to us and is truly the most important gift.
                </p>
                <p className="font-sans text-cream/90 text-sm leading-relaxed mt-2 font-semibold">
                  For those who would still like to give, monetary gifts are kindly preferred and will be deeply appreciated.
                </p>
              </div>

              {/* Bank details */}
              <div className="space-y-3 font-sans text-cream/90 text-sm">
                <div className="flex gap-2">
                  <span className="text-cream/50 w-36">Bank:</span>
                  <span className="font-semibold">Monzo</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-cream/50 w-36">Name:</span>
                  <span className="font-semibold">Feyisayo Abe</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-cream/50 w-36">Sort Code:</span>
                  <span className="font-semibold tracking-wider">04-00-04</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-cream/50 w-36">Account Number:</span>
                  <span className="font-semibold tracking-wider">58159815</span>
                </div>

                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex gap-2">
                    <span className="text-cream/50 w-36">Reference:</span>
                    <span className="font-semibold italic">Wedding gift</span>
                  </div>
                </div>
              </div>
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

      <PatternBand />
      <Footer />
    </main>
  )
}
