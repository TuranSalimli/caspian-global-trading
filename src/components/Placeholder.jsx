export default function Placeholder({ shape = 'bottle' }) {
  if (shape === 'closure') return (
    <svg viewBox="0 0 100 100" className="ph" aria-hidden="true">
      <rect x="30" y="8" width="40" height="22" rx="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M36 30h28l-3 54a5 5 0 0 1-5 5h-12a5 5 0 0 1-5-5z" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
  return shape === 'jar' ? (
    <svg viewBox="0 0 100 120" className="ph" aria-hidden="true">
      <rect x="22" y="12" width="56" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M26 26h48v8c8 6 8 14 8 22v44a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V56c0-8 0-16 8-22z" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 60 140" className="ph" aria-hidden="true">
      <path d="M24 8h12v6h-2v28c0 8 12 14 12 28v56a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V70c0-14 12-20 12-28V14h-2z" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}
