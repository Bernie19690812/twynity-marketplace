interface FieldCompletionBarProps {
  completed: number
  total: number
}

export function FieldCompletionBar({ completed, total }: FieldCompletionBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
  const allDone = completed === total

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-navy/60">
          {completed} of {total} required fields completed
        </span>
        {allDone && (
          <span className="text-xs font-semibold text-royal">Ready to confirm</span>
        )}
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-navy/10"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Required fields completion"
      >
        <div
          className="h-full rounded-full bg-royal transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
