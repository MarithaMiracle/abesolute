'use client'

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const bridesmaids = [
  { name: 'Michelle', img: '/images/Michelle.jpeg' },
  { name: 'Fiyin', img: '/images/Fiyin.webp' },
  { name: 'Jess', img: '/images/Jess.webp', pos: 'center 25%' },
  { name: 'Dolapo', img: '/images/Dolapo.webp' },
  { name: 'Amandy', img: '/images/Amandy.webp' },
  { name: 'Emilia', img: '/images/Emilia.webp' },
  { name: 'Tilewa', img: '/images/Tilewa.webp' },
  { name: 'Princess', img: '/images/Princess.webp' },
  { name: 'Abbey', img: '/images/Abbey.webp' },
  { name: 'Gift', img: '/images/Gift.webp' },
  { name: 'Oyin', img: '/images/Oyin.webp' },
  { name: 'Ayodele', img: '/images/Ayodele.webp' },
  { name: 'Moji', img: '/images/Moji.webp' },
  { name: 'Uzo', img: '/images/Uzo.webp' },
  { name: 'Sewa', img: '/images/Sewa.webp' },
  { name: 'Ore', img: '/images/Ore.webp' },
]

const groomsmen = [
  { name: 'Bosoye', img: '/images/Bosoye.webp' },
  { name: 'Deji', img: '/images/Deji.webp', pos: 'center 45%' },
  { name: 'Timi', img: '/images/Timi.webp' },
  { name: 'Shirey', img: '/images/Shirey.webp' },
  { name: 'Afeez', img: '/images/Babalola Afeez.webp' },
  { name: 'Dapo', img: '/images/Dapo.webp' },
  { name: 'Femi', img: '/images/Femi.webp' },
  { name: 'Ricky', img: 'images/Ricky.webp' },
  { name: 'Feranmi', img: '/images/Feranmi.webp' },
  { name: 'Mayowa', img: '/images/Mayowa.webp' },
  { name: 'Chigozie', img: '/images/Chigozie.webp', pos: 'center 60%' },
  { name: 'Demola', img: '/images/Demola.webp' },
  { name: 'Wasiu', img: '/images/Wasiu.webp', pos: 'center 40%' },
  { name: 'Abi', img: '/images/Abi.webp' },
  { name: 'Musa', img: '/images/Musa.webp' },
]

function getStyle(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i) * (i + 1)
  const tilts = [-7, -5, -3, -1, 0, 1, 3, 5, 7, -6, -2, 2, 6, -4, 4]
  const shifts = [0, -12, -20, -8, -16, -4, -24, -10, -18, -6, -14, -2, -22, -28, -30]
  return {
    tilt: tilts[hash % tilts.length],
    vShift: shifts[hash % shifts.length],
  }
}

const Avatar = React.memo(function Avatar({ name, img, pos }: { name: string; img: string; pos?: string }) {
  const { tilt, vShift } = getStyle(name)

  const shadowX = tilt * 1.2
  const shadowY = Math.abs(tilt) * 0.8 + 8
  const shadowBlur = 20 + Math.abs(tilt) * 1.5

  let hash = 0
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i)
  const r = (i: number) => 1 + ((hash + i) % 4)
  const borderRadius = `${r(0)}px ${r(1)}px ${r(2)}px ${r(3)}px`
  const tapeOpacity = 0.55 + (hash % 10) * 0.02

  return (
    <div
      style={{
        position: 'relative',
        flexShrink: 0,
        transform: `rotate(${tilt}deg) translateY(${vShift}px)`,
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'default',
        zIndex: 1,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = `rotate(0deg) translateY(-12px) scale(1.06)`
        ;(e.currentTarget as HTMLElement).style.zIndex = '10'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = `rotate(${tilt}deg) translateY(${vShift}px)`
        ;(e.currentTarget as HTMLElement).style.zIndex = '1'
      }}
    >
      {/* Tape strip — top left */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        left: '18px',
        width: '48px',
        height: '18px',
        backgroundColor: `rgba(240,230,190,${tapeOpacity})`,
        transform: 'rotate(-8deg)',
        zIndex: 10,
        borderRadius: '2px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(1px)',
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 6px)',
      }} />

      {/* Tape strip — top right */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '18px',
        width: '48px',
        height: '18px',
        backgroundColor: `rgba(240,230,190,${tapeOpacity})`,
        transform: 'rotate(8deg)',
        zIndex: 10,
        borderRadius: '2px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(1px)',
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 6px)',
      }} />

      {/* Polaroid card */}
      <div style={{
        backgroundColor: '#f5f0e8',
        padding: '8px 8px 28px 8px',
        boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.25)`,
        width: '200px',
        borderRadius,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"), linear-gradient(135deg, #f7f2e8 0%, #ede8dc 100%)`,
        backgroundBlendMode: 'multiply',
        position: 'relative',
        overflow: 'visible',
      }}>
        <div style={{ position: 'relative', width: '184px', height: '220px' }}>
          <div style={{
            width: '184px',
            height: '220px',
            backgroundImage: `url('${img}')`,
            backgroundSize: 'cover',
            backgroundPosition: pos ?? 'center top',
            backgroundColor: '#3A6186',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(180,160,120,0.18) 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        <p style={{
          margin: '6px 0 0',
          textAlign: 'center',
          fontFamily: "'Caveat', cursive",
          fontSize: '20px',
          color: '#4a3f35',
          letterSpacing: '0.01em',
          lineHeight: 1.2,
          fontWeight: 500,
        }}>
          {name}
        </p>
      </div>
    </div>
  )
})

export default function WeddingPartyPage() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />

      <style>{`
        /* ── MOBILE: horizontal scroll row ── */
        .party-row {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          overflow-y: visible;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          gap: 20px;
          padding: 30px 24px 50px;
          align-items: flex-end;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .party-row::-webkit-scrollbar { display: none; }
        .party-row > * { scroll-snap-align: start; }

        /* Wrapper holds the row + the right-edge fade */
        .party-row-wrap {
          position: relative;
          overflow: hidden;
        }
        /* Right fade — fades content into the background colour */
        .party-row-wrap::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(to right, rgba(30,52,72,0) 0%, #1E3448 100%);
          pointer-events: none;
          z-index: 10;
        }

        /* Swipe hint pill */
        .swipe-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin: 0 auto 16px;
          color: rgba(218,192,167,0.55);
          font-size: 12px;
          letter-spacing: 0.08em;
          font-family: sans-serif;
        }
        .swipe-hint svg {
          animation: swipe-nudge 2s ease-in-out infinite;
        }
        @keyframes swipe-nudge {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(6px); opacity: 1; }
        }

        /* ── DESKTOP: original wrap grid, hints hidden ── */
        @media (min-width: 768px) {
          .party-row {
            flex-wrap: wrap;
            overflow-x: visible;
            overflow-y: visible;
            scroll-snap-type: none;
            justify-content: center;
            gap: 28px;
            padding: 40px 0 60px;
          }
          .party-row-wrap::after { display: none; }
          .swipe-hint { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative" style={{ backgroundColor: '#1E3448', overflow: 'hidden' }}>
        <img
          src="/images/Wedding party (hero section).webp"
          alt="Wedding party"
          style={{ width: '100%', display: 'block', marginTop: '-8%' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(30,52,72,0.55)' }} />
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '45%',
            background: 'linear-gradient(to bottom, rgba(30,52,72,0) 0%, rgba(30,52,72,0.8) 55%, #1E3448 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 flex justify-center"
          style={{ paddingBottom: '6%' }}
        >
          <p
            className="serif-font"
            style={{
              color: '#DAC0A7',
              fontSize: 'clamp(16px, 4.5vw, 36px)',
              textAlign: 'center',
              lineHeight: 1.7,
              margin: 0,
              fontStyle: 'italic',
              fontWeight: 300,
              letterSpacing: '0.03em',
              maxWidth: '560px',
              padding: '0 24px',
            }}
          >
            Meet our amazing wedding party —<br />
            ready to celebrate and dance<br />
            down the aisle with us!
          </p>
        </div>
      </section>

      <section className="relative py-12 sm:py-20 px-0 sm:px-6" style={{ backgroundColor: '#1E3448' }}>
        <div className="relative z-10 max-w-5xl mx-auto">

          <div className="mb-10 sm:mb-14">
            <h3 className="script-font text-cream text-center mb-6 sm:mb-8 px-4 sm:px-0" style={{ fontSize: 'clamp(36px, 7vw, 72px)' }}>Bridesmaids</h3>
            <div className="swipe-hint">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M5 7h8M10 3l4 4-4 4" stroke="rgba(218,192,167,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>swipe to see more</span>
            </div>
            <div className="party-row-wrap">
              <div className="party-row">
                {bridesmaids.map((bm, i) => (
                  <Avatar key={i} name={bm.name} img={bm.img} pos={bm.pos} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 my-6 sm:my-8 px-4 sm:px-0">
            <div className="h-px w-16 bg-cream/30" />
            <div className="w-2 h-2 bg-cream/50 rotate-45" />
            <div className="h-px w-16 bg-cream/30" />
          </div>

          <div>
            <h3 className="script-font text-cream text-center mb-6 sm:mb-8 px-4 sm:px-0" style={{ fontSize: 'clamp(36px, 7vw, 72px)' }}>Groomsmen</h3>
            <div className="swipe-hint">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M5 7h8M10 3l4 4-4 4" stroke="rgba(218,192,167,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>swipe to see more</span>
            </div>
            <div className="party-row-wrap">
              <div className="party-row">
                {groomsmen.map((gm, i) => (
                  <Avatar key={i} name={gm.name} img={gm.img} pos={gm.pos} />
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