import { Users } from 'lucide-react'

// Stub component — "Apply to Persona" is out of scope for MVP.
// Shows a "Coming soon" tooltip on hover. The button itself is always disabled.
export function ApplyToPersonaButton() {
  return (
    <div className="group relative w-full">
      <button
        type="button"
        disabled
        aria-label="Apply to Persona — coming soon"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-grey-200 bg-white px-6 py-3 text-base font-medium text-grey-400 cursor-not-allowed select-none"
      >
        <Users className="h-4 w-4 flex-shrink-0" aria-hidden />
        Apply to Persona
      </button>

      {/* Tooltip — triggered by hovering the wrapper div, not the disabled button */}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-grey-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      >
        Coming soon
        {/* Tooltip arrow */}
        <span
          className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-grey-900"
          aria-hidden
        />
      </span>
    </div>
  )
}
