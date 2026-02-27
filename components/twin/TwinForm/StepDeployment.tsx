'use client'

import { useRef, useState } from 'react'
import { Upload, FileText, X } from 'lucide-react'
import type { CreationFlowState, InteractionStyle } from '@/lib/types'

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
  const [knowledgeFiles, setKnowledgeFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return
    const added = Array.from(incoming)
    setKnowledgeFiles(prev => {
      const existing = new Set(prev.map(f => f.name))
      return [...prev, ...added.filter(f => !existing.has(f.name))]
    })
  }

  const removeFile = (name: string) => {
    setKnowledgeFiles(prev => prev.filter(f => f.name !== name))
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Upload Knowledge Pack */}
      <section className="flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-semibold text-grey-900">Upload Knowledge Pack</h3>
          <p className="text-xs text-grey-400 mt-0.5">
            Upload files that define your Twyn&apos;s knowledge base. PDF, DOCX, TXT, and CSV supported.
          </p>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-grey-200 p-8 cursor-pointer transition-colors duration-150 hover:border-brand-primary hover:bg-brand-xlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          aria-label="Upload knowledge pack files"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
            <Upload className="h-6 w-6 text-brand-primary" aria-hidden="true" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-grey-900">Upload files</p>
            <p className="text-xs text-grey-400 mt-0.5">PDF, DOCX, TXT, CSV · Multiple files supported</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.txt,.csv"
            multiple
            className="sr-only"
            onChange={e => handleFiles(e.target.files)}
            aria-label="Knowledge pack file input"
          />
        </div>

        {knowledgeFiles.length > 0 && (
          <ul className="flex flex-col gap-2" role="list">
            {knowledgeFiles.map(file => (
              <li
                key={file.name}
                className="flex items-center gap-3 rounded-lg border border-grey-200 bg-white px-3 py-2"
              >
                <FileText className="h-4 w-4 flex-shrink-0 text-brand-primary" aria-hidden="true" />
                <span className="flex-1 text-sm text-grey-900 truncate">{file.name}</span>
                <span className="text-xs text-grey-400 flex-shrink-0">
                  {(file.size / 1024).toFixed(0)} KB
                </span>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); removeFile(file.name) }}
                  className="flex-shrink-0 text-grey-400 hover:text-error transition-colors duration-150 focus-visible:outline-none"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
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
          className="rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
