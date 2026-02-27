'use client'

import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, ChevronRight } from 'lucide-react'
import type { CreationFlowState } from '@/lib/types'
import { StepIdentity } from '@/components/twin/TwinForm/StepIdentity'
import { StepFaceVoice } from '@/components/twin/TwinForm/StepFaceVoice'
import { StepDeployment } from '@/components/twin/TwinForm/StepDeployment'
import { StepReview } from '@/components/twin/TwinForm/StepReview'

const STORAGE_KEY = 'twin_creation_draft'

const INITIAL_STATE: CreationFlowState = {
  step: 1,
  identity: { name: '', role: '', about: '' },
  faceVoice: {
    avatarId: null,
    faceImageFile: null,
    faceImagePreviewUrl: null,
    voiceFile: null,
    voiceDurationSeconds: null,
  },
  deployment: {
    useCase: null,
    channels: [],
    interactionStyle: null,
  },
}

const STEPS = [
  { step: 1 as const, title: 'Identity' },
  { step: 2 as const, title: 'Personification' },
  { step: 3 as const, title: 'Personality' },
  { step: 4 as const, title: 'Review' },
]

type SerializableDraft = {
  step: CreationFlowState['step']
  identity: CreationFlowState['identity']
  deployment: CreationFlowState['deployment']
}

function saveDraft(state: CreationFlowState): void {
  try {
    const draft: SerializableDraft = {
      step: state.step,
      identity: state.identity,
      deployment: state.deployment,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
  } catch {
    // localStorage unavailable
  }
}

function loadDraft(): Partial<SerializableDraft> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as SerializableDraft
  } catch {
    return {}
  }
}

function clearDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export default function CreateTwinPage() {
  const router = useRouter()
  const [state, setState] = useState<CreationFlowState>(INITIAL_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const draft = loadDraft()
    if (draft.identity || draft.deployment) {
      setState(prev => ({
        ...prev,
        step: draft.step ?? 1,
        identity: draft.identity ?? prev.identity,
        deployment: draft.deployment ?? prev.deployment,
      }))
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    const timer = setTimeout(() => saveDraft(state), 500)
    return () => clearTimeout(timer)
  }, [state, isHydrated])

  const goToStep = (step: CreationFlowState['step']) => {
    setState(prev => ({ ...prev, step }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateIdentity = (update: Partial<CreationFlowState['identity']>) => {
    setState(prev => ({ ...prev, identity: { ...prev.identity, ...update } }))
  }

  const updateFaceVoice = (update: Partial<CreationFlowState['faceVoice']>) => {
    setState(prev => ({ ...prev, faceVoice: { ...prev.faceVoice, ...update } }))
  }

  const updateDeployment = (update: Partial<CreationFlowState['deployment']>) => {
    setState(prev => ({ ...prev, deployment: { ...prev.deployment, ...update } }))
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)
    await new Promise<void>(resolve => setTimeout(resolve, 1500))
    clearDraft()
    router.push('/app')
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-brand-light border-t-brand-primary"
          aria-label="Loading"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-grey-50">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-grey-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <Link href="/" aria-label="Twynity home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/twynity-logo.svg" alt="Twynity" className="h-8 w-auto" />
          </Link>
          <span className="text-sm font-medium text-grey-600">Create your Digital Twyn</span>
        </div>
      </header>

      <main className="mx-auto max-w-[560px] px-6 py-10">

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-grey-900">Creation of your Virtual Twyn</h1>
        </div>

        {/* Step trail */}
        <div className="mb-8">
          <nav aria-label="Creation steps" className="flex items-center flex-wrap gap-y-2">
            {STEPS.map(({ step: s, title }, i) => {
              const isDone = s < state.step
              const isActive = s === state.step
              return (
                <Fragment key={s}>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className={[
                        'h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                        isDone || isActive
                          ? 'bg-brand-primary text-white'
                          : 'bg-grey-200 text-grey-400',
                      ].join(' ')}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      {isDone ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : s}
                    </div>
                    <span
                      className={[
                        'text-sm font-medium whitespace-nowrap',
                        isActive ? 'text-brand-primary' : isDone ? 'text-brand-mid' : 'text-grey-400',
                      ].join(' ')}
                    >
                      {title}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-grey-300 flex-shrink-0 mx-2" aria-hidden="true" />
                  )}
                </Fragment>
              )
            })}
          </nav>

          {/* Progress bar */}
          <div
            className="mt-4 flex items-center gap-1.5"
            role="progressbar"
            aria-valuenow={state.step}
            aria-valuemin={1}
            aria-valuemax={4}
          >
            {([1, 2, 3, 4] as const).map(s => (
              <div
                key={s}
                className={[
                  'flex-1 h-1 rounded-full transition-colors duration-300',
                  s <= state.step ? 'bg-brand-primary' : 'bg-grey-200',
                ].join(' ')}
              />
            ))}
          </div>
        </div>

        {/* Step card */}
        <div className="bg-white rounded-xl border border-grey-200 shadow-[0_1px_4px_rgba(26,24,48,0.06)] p-6 md:p-8">
          {state.step === 1 && (
            <StepIdentity
              data={state.identity}
              onChange={updateIdentity}
              onNext={() => goToStep(2)}
            />
          )}
          {state.step === 2 && (
            <StepFaceVoice
              data={state.faceVoice}
              onChange={updateFaceVoice}
              onNext={() => goToStep(3)}
              onBack={() => goToStep(1)}
            />
          )}
          {state.step === 3 && (
            <StepDeployment
              data={state.deployment}
              onChange={updateDeployment}
              onNext={() => goToStep(4)}
              onBack={() => goToStep(2)}
            />
          )}
          {state.step === 4 && (
            <StepReview
              state={{
                identity: state.identity,
                faceVoice: state.faceVoice,
                deployment: state.deployment,
              }}
              onBack={() => goToStep(3)}
              onConfirm={handleConfirm}
              isSubmitting={isSubmitting}
              goToStep={goToStep}
            />
          )}
        </div>
      </main>
    </div>
  )
}
