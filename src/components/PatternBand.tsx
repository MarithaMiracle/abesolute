export default function PatternBand({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden="true">
      <img
        src="/images/pattern-band.png"
        alt=""
        className="w-full object-cover"
      />
    </div>
  )
}