import { DigitalTwinState } from '@/lib/types'
import { getCompletedRequiredCount, getRequiredFieldCount } from '@/lib/twin-extraction'
import { FieldCompletionBar } from './field-completion-bar'
import { TwinFormFields } from './twin-form-fields'
import { ConfirmButton } from './confirm-button'

interface FormPanelProps {
  state: Partial<DigitalTwinState>
  onUpdateField: (update: Partial<DigitalTwinState>) => void
  onConfirm: () => void
  isConfirming: boolean
}

export function FormPanel({ state, onUpdateField, onConfirm, isConfirming }: FormPanelProps) {
  const completed = getCompletedRequiredCount(state)
  const total = getRequiredFieldCount()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-navy/10 bg-cyan-tint">
        <h2 className="text-base font-semibold text-navy">Digital Twin Details</h2>
        <p className="mt-1 text-xs font-normal text-navy/50">
          Auto-filled from chat. Edit any field directly.
        </p>
        <div className="mt-3">
          <FieldCompletionBar completed={completed} total={total} />
        </div>
      </div>

      {/* Scrollable fields */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <TwinFormFields state={state} onChange={onUpdateField} />
      </div>

      {/* Confirm — sticky at bottom */}
      <div className="px-6 py-4 border-t border-navy/10 bg-cyan-tint">
        <ConfirmButton state={state} onConfirm={onConfirm} isConfirming={isConfirming} />
      </div>
    </div>
  )
}
