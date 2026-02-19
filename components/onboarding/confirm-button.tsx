import { DigitalTwinState } from '@/lib/types'
import { isReadyToConfirm } from '@/lib/twin-extraction'
import { CheckCircle } from 'lucide-react'

interface ConfirmButtonProps {
  state: Partial<DigitalTwinState>
  onConfirm: () => void
  isConfirming: boolean
}

export function ConfirmButton({ state, onConfirm, isConfirming }: ConfirmButtonProps) {
  const ready = isReadyToConfirm(state)

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onConfirm}
        disabled={!ready || isConfirming}
        aria-disabled={!ready || isConfirming}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-royal px-6 py-3 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#006690] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
      >
        <CheckCircle className="h-5 w-5" aria-hidden />
        {isConfirming ? 'Creating…' : 'Confirm & Create'}
      </button>
      {!ready && (
        <p className="text-center text-xs font-normal text-navy/50" role="note">
          Complete all required fields to continue
        </p>
      )}
    </div>
  )
}
