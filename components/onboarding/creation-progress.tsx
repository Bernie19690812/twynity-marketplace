'use client'

import { Check } from "lucide-react"

const STEP_LABELS = [
  "Name",
  "Use Case",
  "Role",
  "Tone",
  "Channels",
  "Knowledge",
  "Consent",
  "Confirm",
] as const

const TOTAL = STEP_LABELS.length

interface CreationProgressProps {
  stepIndex: number
}

export function CreationProgress({ stepIndex }: CreationProgressProps) {
  const pct = Math.round((stepIndex / (TOTAL - 1)) * 100)
  const displayStep = Math.min(stepIndex + 1, TOTAL)

  return (
    <div className="bg-white border-b border-navy/10 px-6 pt-4 pb-5">
      {/* Top row: label + progress bar */}
      <div className="flex items-center gap-3 mb-4">
        <span className="shrink-0 text-xs font-medium text-navy/50">
          Step {displayStep} of {TOTAL}
        </span>
        <div
          className="flex-1 h-1 rounded-full bg-navy/10 overflow-hidden"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Creation progress"
        >
          <div
            className="h-full rounded-full bg-royal transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-medium text-navy/40">{pct}%</span>
      </div>

      {/* Step dots + labels */}
      <div className="relative flex items-start">
        {/* Connecting track line */}
        <div
          className="absolute top-[9px] left-[9px] right-[9px] h-px bg-navy/10"
          aria-hidden
        />
        {/* Filled portion of track */}
        <div
          className="absolute top-[9px] left-[9px] h-px bg-royal transition-all duration-300 ease-out"
          style={{ width: `calc((100% - 18px) * ${stepIndex / (TOTAL - 1)})` }}
          aria-hidden
        />

        {STEP_LABELS.map((label, i) => {
          const done = i < stepIndex
          const active = i === stepIndex
          return (
            <div
              key={label}
              className="relative z-10 flex flex-1 flex-col items-center gap-1.5"
            >
              {/* Dot */}
              <div
                className={[
                  "flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition-all duration-200",
                  done
                    ? "border-royal bg-royal"
                    : active
                    ? "border-royal bg-white shadow-[0_0_0_3px_rgba(0,122,164,0.15)]"
                    : "border-navy/15 bg-white",
                ].join(" ")}
                aria-label={`${label} — ${done ? "complete" : active ? "current" : "upcoming"}`}
              >
                {done && (
                  <Check className="h-2.5 w-2.5 text-white" aria-hidden />
                )}
                {active && (
                  <div className="h-2 w-2 rounded-full bg-royal" aria-hidden />
                )}
              </div>

              {/* Label — hidden on xs, shown sm+ */}
              <span
                className={[
                  "hidden sm:block text-center text-[10px] font-medium leading-tight",
                  active
                    ? "text-navy font-semibold"
                    : done
                    ? "text-navy/60"
                    : "text-navy/30",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
