'use client'

import { useRef } from 'react'
import { Upload, Mic, ImageIcon } from 'lucide-react'
import type { CreationFlowState } from '@/lib/types'

interface StepFaceVoiceProps {
  data: CreationFlowState['faceVoice']
  onChange: (update: Partial<CreationFlowState['faceVoice']>) => void
  onNext: () => void
  onBack: () => void
}

export function StepFaceVoice({ data, onChange, onNext, onBack }: StepFaceVoiceProps) {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const voiceInputRef = useRef<HTMLInputElement>(null)

  const handleImageFile = (file: File | null) => {
    if (!file) {
      onChange({ faceImageFile: null, faceImagePreviewUrl: null })
      return
    }
    const url = URL.createObjectURL(file)
    onChange({ faceImageFile: file, faceImagePreviewUrl: url })
  }

  const handleVoiceFile = (file: File | null) => {
    if (!file) {
      onChange({ voiceFile: null, voiceDurationSeconds: null })
      return
    }
    const audio = new Audio(URL.createObjectURL(file))
    audio.addEventListener('loadedmetadata', () => {
      onChange({ voiceFile: file, voiceDurationSeconds: Math.round(audio.duration) })
    })
    audio.addEventListener('error', () => {
      onChange({ voiceFile: file, voiceDurationSeconds: null })
    })
  }

  const showWarning = !data.faceImageFile && !data.voiceFile

  return (
    <div className="flex flex-col gap-6">

      {/* Face Image */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-grey-900">Face Image</h3>
        <div
          role="button"
          tabIndex={0}
          onClick={() => imageInputRef.current?.click()}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && imageInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-grey-200 p-8 cursor-pointer transition-colors duration-150 hover:border-brand-primary hover:bg-brand-xlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          aria-label="Upload face image"
        >
          {data.faceImagePreviewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.faceImagePreviewUrl}
              alt="Face preview"
              className="h-24 w-24 rounded-lg object-cover"
            />
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                <ImageIcon className="h-6 w-6 text-brand-primary" aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-grey-900">Upload an image</p>
                <p className="text-xs text-grey-400 mt-0.5">JPG or PNG, clear front-facing photo</p>
              </div>
            </>
          )}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="sr-only"
            onChange={e => handleImageFile(e.target.files?.[0] ?? null)}
            aria-label="Face image file input"
          />
        </div>
        {data.faceImagePreviewUrl && (
          <button
            type="button"
            onClick={() => handleImageFile(null)}
            className="text-xs text-error hover:underline self-start focus-visible:outline-none"
          >
            Remove image
          </button>
        )}
        <p className="text-xs text-grey-400">Use a clear, front-facing photo with good lighting.</p>
      </section>

      {/* Voice Sample */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-grey-900">Voice Sample</h3>
        <div
          role="button"
          tabIndex={0}
          onClick={() => voiceInputRef.current?.click()}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && voiceInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-grey-200 p-8 cursor-pointer transition-colors duration-150 hover:border-brand-primary hover:bg-brand-xlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          aria-label="Upload voice sample"
        >
          {data.voiceFile ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                <Mic className="h-6 w-6 text-brand-primary" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium text-grey-900 text-center break-all">{data.voiceFile.name}</p>
              {data.voiceDurationSeconds !== null && (
                <p className="text-xs text-grey-400">{data.voiceDurationSeconds}s</p>
              )}
            </div>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                <Upload className="h-6 w-6 text-brand-primary" aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-grey-900">Upload audio file</p>
                <p className="text-xs text-grey-400 mt-0.5">WAV preferred, MP3 accepted · 15–30 seconds</p>
              </div>
            </>
          )}
          <input
            ref={voiceInputRef}
            type="file"
            accept="audio/wav,audio/mp3,audio/mpeg"
            className="sr-only"
            onChange={e => handleVoiceFile(e.target.files?.[0] ?? null)}
            aria-label="Voice sample file input"
          />
        </div>
        {data.voiceFile && (
          <button
            type="button"
            onClick={() => handleVoiceFile(null)}
            className="text-xs text-error hover:underline self-start focus-visible:outline-none"
          >
            Remove audio
          </button>
        )}
        <p className="text-xs text-grey-400">Read a short passage naturally. This trains your twin&apos;s voice.</p>
      </section>

      {showWarning && (
        <p className="rounded-lg bg-[#FFF8E6] px-4 py-3 text-sm text-warning border border-[#F59E0B]/20">
          Adding a face image and voice creates a more immersive experience. You can always add these later.
        </p>
      )}

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
          className="rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
