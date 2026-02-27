'use client'

import type {
  CreationFlowState,
  UseCaseOption,
  DeploymentChannel,
  InteractionStyle,
} from '@/lib/types'

const USE_CASE_OPTIONS: { value: UseCaseOption; label: string; description: string }[] = [
  { value: 'personal_assistant', label: 'Personal assistant', description: 'Day-to-day help and task management' },
  { value: 'sales_engagement', label: 'Sales & customer engagement', description: 'Lead qualification and customer support' },
  { value: 'coaching_mentoring', label: 'Coaching or mentoring', description: 'Guidance, feedback, and skill development' },
  { value: 'education_training', label: 'Education & training', description: 'Teaching and structured learning' },
  { value: 'creative_entertainment', label: 'Creative or entertainment', description: 'Storytelling, roleplay, and content' },
  { value: 'internal_knowledge', label: 'Internal team knowledge', description: 'Company knowledge base and FAQs' },
  { value: 'other', label: 'Other', description: 'Something else entirely' },
]

const CHANNEL_OPTIONS: { value: DeploymentChannel; label: string }[] = [
  { value: 'marketplace', label: 'Twynity Marketplace' },
  { value: 'website_embed', label: 'Embedded on a website' },
  { value: 'internal_tool', label: 'Internal team tool' },
  { value: 'social_messaging', label: 'Social / messaging' },
  { value: 'unsure', label: 'Not sure yet' },
]

const STYLE_OPTIONS: { value: InteractionStyle; label: string; description: string }[] = [
  { value: 'brief_direct', label: 'Brief and direct', description: 'Short, to-the-point responses' },
  { value: 'conversational_warm', label: 'Conversational and warm', description: 'Friendly, natural dialogue' },
  { value: 'detailed_thorough', label: 'Detailed and thorough', description: 'Comprehensive, in-depth answers' },
]

interface StepDeploymentProps {
  data: CreationFlowState['deployment']
  onChange: (update: Partial<CreationFlowState['deployment']>) => void
  onNext: () => void
  onBack: () => void
}

export function StepDeployment({ data, onChange, onNext, onBack }: StepDeploymentProps) {
  const canProceed = data.useCase !== null

  const toggleChannel = (channel: DeploymentChannel) => {
    const channels = data.channels.includes(channel)
      ? data.channels.filter(c => c !== channel)
      : [...data.channels, channel]
    onChange({ channels })
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Use Case */}
      <section className="flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-semibold text-grey-900">
            Primary use case <span className="text-error" aria-hidden="true">*</span>
          </h3>
          <p className="text-xs text-grey-400 mt-0.5">How will this twin be used?</p>
        </div>
        <div className="flex flex-col gap-2">
          {USE_CASE_OPTIONS.map(({ value, label, description }) => {
            const selected = data.useCase === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => onChange({ useCase: value })}
                className={[
                  'flex items-start gap-3 rounded-lg border p-3 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40',
                  selected
                    ? 'border-brand-primary bg-brand-xlight'
                    : 'border-grey-200 bg-white hover:border-brand-light hover:bg-brand-xlight',
                ].join(' ')}
                aria-pressed={selected}
              >
                <div
                  className={[
                    'mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2 transition-colors duration-150',
                    selected ? 'border-brand-primary bg-brand-primary' : 'border-grey-200',
                  ].join(' ')}
                  aria-hidden="true"
                />
                <div>
                  <p className={`text-sm font-medium ${selected ? 'text-brand-primary' : 'text-grey-900'}`}>
                    {label}
                  </p>
                  <p className="text-xs text-grey-400 mt-0.5">{description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Deployment Channels */}
      <section className="flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-semibold text-grey-900">Deployment channels</h3>
          <p className="text-xs text-grey-400 mt-0.5">Where will this twin appear? Select all that apply.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CHANNEL_OPTIONS.map(({ value, label }) => {
            const selected = data.channels.includes(value)
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggleChannel(value)}
                className={[
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40',
                  selected
                    ? 'border-brand-primary bg-brand-light text-brand-primary'
                    : 'border-grey-200 bg-white text-grey-600 hover:border-brand-primary hover:text-brand-primary',
                ].join(' ')}
                aria-pressed={selected}
              >
                {label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Interaction Style */}
      <section className="flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-semibold text-grey-900">Interaction style</h3>
          <p className="text-xs text-grey-400 mt-0.5">How should your twin communicate?</p>
        </div>
        <div className="flex flex-col gap-2">
          {STYLE_OPTIONS.map(({ value, label, description }) => {
            const selected = data.interactionStyle === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => onChange({ interactionStyle: value })}
                className={[
                  'flex items-start gap-3 rounded-lg border p-3 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40',
                  selected
                    ? 'border-brand-primary bg-brand-xlight'
                    : 'border-grey-200 bg-white hover:border-brand-light hover:bg-brand-xlight',
                ].join(' ')}
                aria-pressed={selected}
              >
                <div
                  className={[
                    'mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2 transition-colors duration-150',
                    selected ? 'border-brand-primary bg-brand-primary' : 'border-grey-200',
                  ].join(' ')}
                  aria-hidden="true"
                />
                <div>
                  <p className={`text-sm font-medium ${selected ? 'text-brand-primary' : 'text-grey-900'}`}>
                    {label}
                  </p>
                  <p className="text-xs text-grey-400 mt-0.5">{description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-brand-primary hover:underline focus-visible:outline-none"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-mid disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
