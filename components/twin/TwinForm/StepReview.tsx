'use client'

import type { CreationFlowState } from '@/lib/types'

const USE_CASE_LABELS: Record<string, string> = {
  personal_assistant: 'Personal assistant',
  sales_engagement: 'Sales & customer engagement',
  coaching_mentoring: 'Coaching or mentoring',
  education_training: 'Education & training',
  creative_entertainment: 'Creative or entertainment',
  internal_knowledge: 'Internal team knowledge',
  other: 'Other',
}

const CHANNEL_LABELS: Record<string, string> = {
  marketplace: 'Twynity Marketplace',
  website_embed: 'Embedded on a website',
  internal_tool: 'Internal team tool',
  social_messaging: 'Social / messaging',
  unsure: 'Not sure yet',
}

const STYLE_LABELS: Record<string, string> = {
  brief_direct: 'Brief and direct',
  conversational_warm: 'Conversational and warm',
  detailed_thorough: 'Detailed and thorough',
}

interface ReviewRowProps {
  label: string
  value: string
  onEdit: () => void
}

function ReviewRow({ label, value, onEdit }: ReviewRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-grey-100 last:border-0">
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-xs font-semibold text-grey-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-grey-900 break-words">{value || '—'}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex-shrink-0 text-xs font-medium text-brand-primary hover:underline focus-visible:outline-none"
      >
        Edit
      </button>
    </div>
  )
}

interface StepReviewProps {
  state: Omit<CreationFlowState, 'step'>
  onBack: () => void
  onConfirm: () => void
  isSubmitting: boolean
  goToStep: (step: 1 | 2 | 3 | 4) => void
}

export function StepReview({ state, onBack, onConfirm, isSubmitting, goToStep }: StepReviewProps) {
  return (
    <div className="flex flex-col gap-6">

      {/* Identity */}
      <section className="rounded-xl border border-grey-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-grey-100 bg-grey-50">
          <h3 className="text-sm font-semibold text-grey-900">Identity</h3>
        </div>
        <div className="px-4">
          <ReviewRow label="Name" value={state.identity.name} onEdit={() => goToStep(1)} />
          <ReviewRow label="Role" value={state.identity.role} onEdit={() => goToStep(1)} />
          <ReviewRow label="Personality" value={state.identity.about} onEdit={() => goToStep(1)} />
        </div>
      </section>

      {/* Face & Voice */}
      <section className="rounded-xl border border-grey-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-grey-100 bg-grey-50">
          <h3 className="text-sm font-semibold text-grey-900">Face & Voice</h3>
        </div>
        <div className="flex items-start gap-4 px-4 py-4">
          {state.faceVoice.faceImagePreviewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={state.faceVoice.faceImagePreviewUrl}
              alt="Face preview"
              className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
            />
          ) : (
            <div className="h-16 w-16 rounded-lg bg-grey-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-grey-400">No image</span>
            </div>
          )}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="text-sm text-grey-900 truncate">
              {state.faceVoice.faceImageFile ? state.faceVoice.faceImageFile.name : 'No face image uploaded'}
            </p>
            <p className="text-sm text-grey-600 truncate">
              {state.faceVoice.voiceFile
                ? `${state.faceVoice.voiceFile.name}${state.faceVoice.voiceDurationSeconds !== null ? ` · ${state.faceVoice.voiceDurationSeconds}s` : ''}`
                : 'No voice uploaded'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => goToStep(2)}
            className="flex-shrink-0 text-xs font-medium text-brand-primary hover:underline focus-visible:outline-none"
          >
            Edit
          </button>
        </div>
      </section>

      {/* Deployment */}
      <section className="rounded-xl border border-grey-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-grey-100 bg-grey-50">
          <h3 className="text-sm font-semibold text-grey-900">Deployment</h3>
        </div>
        <div className="px-4">
          <ReviewRow
            label="Use case"
            value={state.deployment.useCase ? USE_CASE_LABELS[state.deployment.useCase] : ''}
            onEdit={() => goToStep(3)}
          />
          <ReviewRow
            label="Channels"
            value={state.deployment.channels.map(c => CHANNEL_LABELS[c]).join(', ')}
            onEdit={() => goToStep(3)}
          />
          <ReviewRow
            label="Interaction style"
            value={state.deployment.interactionStyle ? STYLE_LABELS[state.deployment.interactionStyle] : ''}
            onEdit={() => goToStep(3)}
          />
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
          onClick={onConfirm}
          disabled={isSubmitting}
          className="rounded-lg bg-brand-primary px-8 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-mid disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          {isSubmitting ? 'Creating…' : 'Create my twin →'}
        </button>
      </div>
    </div>
  )
}
