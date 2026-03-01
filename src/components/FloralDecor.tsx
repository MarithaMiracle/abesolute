export function FloralLeft({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="120" height="200" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M60 180 Q20 140 30 100 Q40 60 60 40" stroke="#2D4F6B" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <path d="M60 180 Q80 160 70 130 Q65 110 60 100" stroke="#2D4F6B" strokeWidth="1.2" fill="none" opacity="0.3"/>
      <ellipse cx="30" cy="100" rx="20" ry="12" transform="rotate(-30 30 100)" fill="none" stroke="#2D4F6B" strokeWidth="1" opacity="0.35"/>
      <ellipse cx="50" cy="70" rx="15" ry="9" transform="rotate(-50 50 70)" fill="none" stroke="#2D4F6B" strokeWidth="1" opacity="0.35"/>
      <ellipse cx="70" cy="120" rx="18" ry="10" transform="rotate(20 70 120)" fill="none" stroke="#2D4F6B" strokeWidth="1" opacity="0.3"/>
      <circle cx="60" cy="40" r="6" fill="none" stroke="#2D4F6B" strokeWidth="1" opacity="0.4"/>
      <circle cx="30" cy="85" r="4" fill="none" stroke="#2D4F6B" strokeWidth="1" opacity="0.3"/>
      <path d="M20 150 Q15 130 25 120" stroke="#2D4F6B" strokeWidth="1" fill="none" opacity="0.25"/>
      <ellipse cx="18" cy="118" rx="10" ry="6" transform="rotate(-60 18 118)" fill="none" stroke="#2D4F6B" strokeWidth="0.8" opacity="0.25"/>
    </svg>
  )
}

export function FloralRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="120" height="200" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }} aria-hidden="true">
      <path d="M60 180 Q20 140 30 100 Q40 60 60 40" stroke="#2D4F6B" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <path d="M60 180 Q80 160 70 130 Q65 110 60 100" stroke="#2D4F6B" strokeWidth="1.2" fill="none" opacity="0.3"/>
      <ellipse cx="30" cy="100" rx="20" ry="12" transform="rotate(-30 30 100)" fill="none" stroke="#2D4F6B" strokeWidth="1" opacity="0.35"/>
      <ellipse cx="50" cy="70" rx="15" ry="9" transform="rotate(-50 50 70)" fill="none" stroke="#2D4F6B" strokeWidth="1" opacity="0.35"/>
      <ellipse cx="70" cy="120" rx="18" ry="10" transform="rotate(20 70 120)" fill="none" stroke="#2D4F6B" strokeWidth="1" opacity="0.3"/>
      <circle cx="60" cy="40" r="6" fill="none" stroke="#2D4F6B" strokeWidth="1" opacity="0.4"/>
      <circle cx="30" cy="85" r="4" fill="none" stroke="#2D4F6B" strokeWidth="1" opacity="0.3"/>
    </svg>
  )
}

export function FloralSmall({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M40 70 Q15 55 20 35 Q25 15 40 10" stroke="#2D4F6B" strokeWidth="1.2" fill="none" opacity="0.4"/>
      <path d="M40 70 Q60 55 55 38 Q50 22 40 18" stroke="#2D4F6B" strokeWidth="1" fill="none" opacity="0.3"/>
      <ellipse cx="22" cy="38" rx="13" ry="8" transform="rotate(-30 22 38)" fill="none" stroke="#2D4F6B" strokeWidth="0.8" opacity="0.35"/>
      <ellipse cx="55" cy="42" rx="12" ry="7" transform="rotate(20 55 42)" fill="none" stroke="#2D4F6B" strokeWidth="0.8" opacity="0.3"/>
      <circle cx="40" cy="10" r="4" fill="none" stroke="#2D4F6B" strokeWidth="0.8" opacity="0.4"/>
    </svg>
  )
}