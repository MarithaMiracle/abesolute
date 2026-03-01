export default function PatternBand({ className = '' }: { className?: string }) {
  return (
    <div className={`pattern-band h-20 w-full relative ${className}`} aria-hidden="true" />
  )
}