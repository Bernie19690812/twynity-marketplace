'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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

const STEP_TITLES = ['Identity', 'Face & Voice', 'Deployment', 'Review'] as const

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

  // Restore serializable draft from localStorage on mount
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

  // Auto-save serializable fields (debounced)
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
    // TODO: POST /twins with multipart FormData when API is ready
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

        {/* Step progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-grey-900">Step {state.step} of 4</p>
            <p className="text-sm text-grey-400">{STEP_TITLES[state.step - 1]}</p>
          </div>
          <div className="flex items-center gap-1.5" role="progressbar" aria-valuenow={state.step} aria-valuemin={1} aria-valuemax={4}>
            {([1, 2, 3, 4] as const).map(s => (
              <div
                key={s}
                className={[
                  'flex-1 h-1.5 rounded-full transition-colors duration-300',
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
