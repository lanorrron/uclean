// components/report/LocationBadge.tsx
interface LocationBadgeProps {
  lat: number | null
  lon: number | null
}

export const LocationBadge = ({ lat, lon }: LocationBadgeProps) => {
  if (!lat || !lon) return null

  return (
    <div className="flex items-center gap-2 text-xs text-green-600 font-medium bg-green-50 p-2 rounded-xl">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>Ubicación registrada: {lat.toFixed(6)}, {lon.toFixed(6)}</span>
    </div>
  )
}