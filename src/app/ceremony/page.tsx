import Navbar from '../../components/Navbar'
import PatternBand from '../../components/PatternBand'
import Footer from '../../components/Footer'

const bridesmaids = [
  { name: 'Bridesmaid 1', img: '/images/bm-1.jpg' },
  { name: 'Bridesmaid 2', img: '/images/bm-2.jpg' },
  { name: 'Bridesmaid 3', img: '/images/bm-3.jpg' },
  { name: 'Bridesmaid 4', img: '/images/bm-4.jpg' },
  { name: 'Bridesmaid 5', img: '/images/bm-5.jpg' },
  { name: 'Bridesmaid 6', img: '/images/bm-6.jpg' },
  { name: 'Bridesmaid 7', img: '/images/bm-7.jpg' },
  { name: 'Bridesmaid 8', img: '/images/bm-8.jpg' },
  { name: 'Bridesmaid 9', img: '/images/bm-9.jpg' },
  { name: 'Bridesmaid 10', img: '/images/bm-10.jpg' },
  { name: 'Bridesmaid 11', img: '/images/bm-11.jpg' },
  { name: 'Bridesmaid 12', img: '/images/bm-12.jpg' },
  { name: 'Bridesmaid 13', img: '/images/bm-13.jpg' },
  { name: 'Bridesmaid 14', img: '/images/bm-14.jpg' },
  { name: 'Bridesmaid 15', img: '/images/bm-15.jpg' },
]

const groomsmen = [
  { name: 'Groomsman 1', img: '/images/gm-1.jpg' },
  { name: 'Groomsman 2', img: '/images/gm-2.jpg' },
  { name: 'Groomsman 3', img: '/images/gm-3.jpg' },
  { name: 'Groomsman 4', img: '/images/gm-4.jpg' },
  { name: 'Groomsman 5', img: '/images/gm-5.jpg' },
  { name: 'Groomsman 6', img: '/images/gm-6.jpg' },
  { name: 'Groomsman 7', img: '/images/gm-7.jpg' },
  { name: 'Groomsman 8', img: '/images/gm-8.jpg' },
  { name: 'Groomsman 9', img: '/images/gm-9.jpg' },
  { name: 'Groomsman 10', img: '/images/gm-10.jpg' },
  { name: 'Groomsman 11', img: '/images/gm-11.jpg' },
  { name: 'Groomsman 12', img: '/images/gm-12.jpg' },
]

function Avatar({ name, img }: { name: string; img: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-md"
        style={{
          backgroundImage: `url('${img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#3A6186',
        }}
        title={name}
      />
    </div>
  )
}

const ceremonyDetails = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3C10.5 3 7 6 7 10C7 15.5 14 24 14 24C14 24 21 15.5 21 10C21 6 17.5 3 14 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    label: 'Ceremony',
    value: 'Traditional Wedding Ceremony with Reception and After party',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M4 11H24" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 3V8M19 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Date',
    value: 'Saturday, 4th of July 2026',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M14 8V14L18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Time',
    value: '12:45pm to 10:30pm',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3C10.5 3 7 6 7 10C7 15.5 14 24 14 24C14 24 21 15.5 21 10C21 6 17.5 3 14 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    label: 'Venue',
    value: 'Grand Venue Banqueting Hall, Anchor business park, Oldham, OL9 6AZ',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="10" width="22" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M8 10V8C8 5.8 9.8 4 12 4H16C18.2 4 20 5.8 20 8V10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    label: 'Dress code',
    value: 'Ample free parking is available at the venue.',
  },
]

export default function CeremonyPage() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />

      {/* ── HERO WITH DATE OVERLAY ── */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/ceremony-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundColor: '#1E3448',
          }}
        />
        <div className="absolute inset-0 bg-navy-dark/60" />

        {/* Giant date text */}
        <div className="relative z-10 pt-24 px-8 md:px-16 flex flex-col justify-start">
          <div className="text-white/90 serif-font">
            <div className="text-[100px] md:text-[160px] font-light leading-none opacity-80">04</div>
            <div className="text-[100px] md:text-[160px] font-light leading-none opacity-80 -mt-6">07</div>
            <div className="text-[100px] md:text-[160px] font-light leading-none opacity-80 -mt-6">26</div>
          </div>

          {/* Info card overlay */}
          <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/4 max-w-xs bg-cream/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            <p className="font-sans text-navy/70 text-xs mb-3 leading-relaxed text-center italic">
              "We simply can't wait to celebrate our special wedding with you and create beautiful memories together 🤍"
            </p>
          </div>
        </div>
      </section>

      {/* ── CEREMONY DETAILS ── */}
      <section className="bg-cream-light py-16 px-6 relative">
        <div className="max-w-lg mx-auto space-y-8">
          {ceremonyDetails.map((item, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="text-navy/60 mt-0.5 flex-shrink-0 w-7">{item.icon}</div>
              <div>
                <p className="serif-font text-2xl font-semibold text-navy italic mb-1">{item.label}</p>
                <p className="font-sans text-navy/70 text-sm leading-relaxed">{item.value}</p>
              </div>
            </div>
          ))}

          <p className="text-navy/50 font-sans text-xs text-center italic pt-4 leading-relaxed">
            Kindly honour the couple and our Yoruba tradition by dressing in attire that celebrates and reflects this sacred cultural occasion, as we would truly appreciate your participation.
          </p>
        </div>
      </section>

      <PatternBand />

      {/* ── WEDDING PARTY ── */}
      <section className="african-pattern relative py-20 px-6">
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-4">
            <h2 className="script-font text-6xl md:text-7xl text-cream">Wedding Party</h2>
            <p className="font-sans text-cream/60 text-sm mt-2">
              Meet our amazing wedding party — ready to celebrate and dance like absolutely can!
            </p>
          </div>

          {/* Diamond/floral separator */}
          <div className="flex items-center justify-center gap-3 my-8">
            <div className="h-px w-16 bg-cream/30" />
            <div className="w-2 h-2 bg-cream/50 rotate-45" />
            <div className="h-px w-16 bg-cream/30" />
          </div>

          {/* Bridesmaids */}
          <div className="mb-14">
            <h3 className="script-font text-4xl text-cream text-center mb-8">Bridesmaids</h3>
            <div className="border border-white/20 rounded-[50%_/_15%] py-10 px-6">
              <div className="flex flex-wrap justify-center gap-4">
                {bridesmaids.map((bm, i) => (
                  <Avatar key={i} name={bm.name} img={bm.img} />
                ))}
              </div>
            </div>
          </div>

          {/* Diamond/floral separator */}
          <div className="flex items-center justify-center gap-3 my-8">
            <div className="h-px w-16 bg-cream/30" />
            <div className="w-2 h-2 bg-cream/50 rotate-45" />
            <div className="h-px w-16 bg-cream/30" />
          </div>

          {/* Groomsmen */}
          <div>
            <h3 className="script-font text-4xl text-cream text-center mb-8">Groomsmen</h3>
            <div className="border border-white/20 rounded-[50%_/_15%] py-10 px-6">
              <div className="flex flex-wrap justify-center gap-4">
                {groomsmen.map((gm, i) => (
                  <Avatar key={i} name={gm.name} img={gm.img} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
