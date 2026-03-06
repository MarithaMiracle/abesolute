import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Image from 'next/image'

const ceremonyDetails = [
  {
    icon: (
      <Image src="/images/Glasses icon.webp" alt="Celebration" width={64} height={64} style={{ objectFit: 'contain' }} />
    ),
    label: 'Celebration:',
    value: 'Traditional Wedding Ceremony with Reception and After party',
    valueLarge: false,
  },
  {
    icon: (
      <Image src="/images/Calendar icon.webp" alt="Date" width={64} height={64} style={{ objectFit: 'contain' }} />
    ),
    label: 'Date',
    valueLarge: true,
    valueLines: ['Saturday,', '4th of', 'July 2026'],
  },
  {
    icon: (
      <Image src="/images/Alarm clock icon.webp" alt="Time" width={64} height={64} style={{ objectFit: 'contain' }} />
    ),
    label: 'Time',
    valueLarge: true,
    valueLines: ['12:15pm', 'to', '10:30pm'],
  },
  {
    icon: (
      <Image src="/images/Location icon.webp" alt="Venue" width={64} height={64} style={{ objectFit: 'contain' }} />
    ),
    label: 'Venue',
    value: 'Grand Venue Banqueting Hall, Anchor business park, Oldham, Manchester, OL9 6AZ',
    valueLarge: false,
  },
  {
    icon: (
      <Image src="/images/Car icon.webp" alt="Driving info" width={64} height={64} style={{ objectFit: 'contain' }} />
    ),
    label: 'Driving info',
    value: 'Ample free parking is available at the venue.',
    valueLarge: false,
  },
]

export default function CeremonyPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1E3448', position: 'relative' }}>

      {/* ── BACKGROUND LAYER ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '120vh', backgroundImage: "url('/images/Ceremony (hero section).webp')", backgroundSize: 'cover', backgroundPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '120vh', background: 'rgba(30,52,72,0.55)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '85vh', height: '35vh', background: 'linear-gradient(to bottom, rgba(30,52,72,0) 0%, #1E3448 60%, #1E3448 100%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '110vh', bottom: 0, backgroundImage: "url('/images/Pattern background.webp')", backgroundRepeat: 'repeat', backgroundSize: '480px auto', backgroundPosition: 'top center' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '110vh', height: '20vh', background: 'linear-gradient(to bottom, #1E3448 0%, rgba(30,52,72,0) 100%)' }} />
      </div>

      {/* ── ALL CONTENT ── */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />

        <section className="relative min-h-[60vh] md:min-h-[70vh]">
          <div className="relative z-10 pt-36 px-8 md:px-16 flex flex-col justify-start">

            {/* Giant date numbers */}
            <div className="text-white/90 serif-font">
              <div className="text-[100px] md:text-[160px] font-light leading-none opacity-80">04</div>
              <div className="text-[100px] md:text-[160px] font-light leading-none opacity-80 -mt-6">07</div>
              <div className="text-[100px] md:text-[160px] font-light leading-none text-[#DAC0A7] opacity-80 -mt-6">26</div>
            </div>

            {/* Cards area */}
            <div className="relative flex justify-center mt-56 md:mt-80">

              {/* ── CREAM INFO CARD ── */}
              <div
                className="relative mb-32 md:mb-40"
                style={{
                  backgroundColor: '#E8DCC8',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
                  width: 'min(92vw, 580px)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Spacer — pushes content below the overlapping blue box */}
                <div style={{ height: '220px', flexShrink: 0 }} />

                {/* Two-column layout using grid for precise row alignment */}
                <div style={{ display: 'grid', gridTemplateColumns: '0.35fr 0.65fr' }}>
                  {ceremonyDetails.map((item, i) => (
                    <div key={i} style={{ display: 'contents' }}>
                      {/* Icon cell */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
                        {item.icon}
                      </div>
                      {/* Text cell with divider */}
                      <div style={{ padding: '32px 28px', borderLeft: '1px solid rgba(74,107,138,0.3)' }}>
                        <p className="script-font" style={{ fontSize: '26px', color: '#2B4A6B', margin: '0 0 6px', lineHeight: 1.2 }}>
                          {item.label}
                        </p>
                        {item.valueLarge ? (
                          <div>
                            {item.valueLines.map((line, j) => (
                              <p key={j} style={{
                                fontFamily: 'Georgia, serif',
                                fontSize: item.label === 'Time' && j === 1 ? '15px' : '26px',
                                fontWeight: item.label === 'Time' && j === 1 ? 400 : 700,
                                fontStyle: item.label === 'Time' && j === 1 ? 'italic' : 'normal',
                                color: '#1E3448',
                                margin: 0,
                                lineHeight: item.label === 'Time' && j === 1 ? 1.8 : 1.15,
                              }}>
                                {line}
                              </p>
                            ))}
                            {item.label === 'Time' && (
                              <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '15px', color: 'rgba(30,52,72,0.6)', lineHeight: 1.8, marginTop: '10px' }}>
                                Kindly honour the couple and our tradition by arriving on time. Late arrivals can be disruptive, and we would truly appreciate your <strong style={{ fontStyle: 'normal', fontWeight: 700, color: 'rgba(30,52,72,0.75)' }}>punctuality.</strong>
                              </p>
                            )}
                          </div>
                        ) : (
                          <p style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 600, color: '#1E3448', margin: 0, lineHeight: 1.6 }}>
                            {item.value}
                          </p>
                        )}
                        {/* Row divider inside text cell */}
                        {i < ceremonyDetails.length - 1 && (
                          <hr style={{ border: 'none', borderTop: '1px solid rgba(74,107,138,0.25)', marginTop: '16px' }} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Note moved into Time section */}

              </div>

              {/* ── DARK BLUE MESSAGE CARD ── */}
              <div
                className="absolute top-10 left-1/2"
                style={{
                  width: 'min(60vw, 380px)',
                  backgroundColor: '#05233D',
                  borderRadius: '14px',
                  transform: 'translate(-50%,-50%)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '56px 28px',
                  overflow: 'visible',
                }}
              >
                <Image src="/images/Wedding rings icon.webp" alt="Rings" width={140} height={100} style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
                <p
                  className="ibarra-font italic"
                  style={{
                    color: '#DAC0A7',
                    fontSize: 'clamp(16px, 1.8vw, 22px)',
                    textAlign: 'center',
                    lineHeight: 1.7,
                    margin: 0,
                    fontStyle: 'italic',
                  }}
                >
                  We truly can't wait to celebrate <br />
                  our special day with you and <br />
                  create beautiful memories <br />
                  together! ♥
                </p>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}