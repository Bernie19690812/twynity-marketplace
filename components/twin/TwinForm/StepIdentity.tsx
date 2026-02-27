'use client'

import type { CreationFlowState } from '@/lib/types'

interface StepIdentityProps {
  data: CreationFlowState['identity']
  onChange: (update: Partial<CreationFlowState['identity']>) => void
  onNext: () => void
}

export function StepIdentity({ data, onChange, onNext }: StepIdentityProps) {
  const canProceed = data.name.trim().length > 0
  const showHint = !data.role && !data.about

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canProceed) onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="twin-name" className="text-sm font-semibold text-grey-900">
          Name <span className="text-error" aria-hidden="true">*</span>
        </label>
        <input
          id="twin-name"
          type="text"
          value={data.name}
          onChange={e => onChange({ name: e.target.value })}
          placeholder="Your twin's name"
          maxLength={60}
          required
          className="rounded-lg border border-grey-200 bg-white px-4 py-3 text-sm text-grey-900 placeholder:text-grey-400 focus:border-brand-primary focus:outline-none focus:ring-3 focus:ring-brand-xlight transition-colors duration-150"
        />
      </div>

      {/* Role */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="twin-role" className="text-sm font-semibold text-grey-900">
          Role
        </label>
        <input
          id="twin-role"
          type="text"
          value={data.role}
          onChange={e => onChange({ role: e.target.value })}
          placeholder="e.g. Sales lead, Coach, Assistant"
          className="rounded-lg border border-grey-200 bg-white px-4 py-3 text-sm text-grey-900 placeholder:text-grey-400 focus:border-brand-primary focus:outline-none focus:ring-3 focus:ring-brand-xlight transition-colors duration-150"
        />
      </div>

      {/* Personality */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="twin-about" className="text-sm font-semibold text-grey-900">
          Personality
        </label>
        <textarea
          id="twin-about"
          value={data.about}
          onChange={e => onChange({ about: e.target.value })}
          placeholder="e.g. I'm a friendly coach who speaks briefly and gets straight to the point."
          rows={4}
          className="resize-none rounded-lg border border-grey-200 bg-white px-4 py-3 text-sm text-grey-900 placeholder:text-grey-400 focus:border-brand-primary focus:outline-none focus:ring-3 focus:ring-brand-xlight transition-colors duration-150"
        />
        {showHint && (
          <p className="text-xs text-grey-400">
            Adding a role and personality helps your twin feel more authentic.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!canProceed}
        className="w-full rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-mid disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
      >
        Next →
      </button>
    </form>
  )
}
