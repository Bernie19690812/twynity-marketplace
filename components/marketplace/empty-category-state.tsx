import { PackageOpen } from 'lucide-react'

interface EmptyCategoryStateProps {
  categoryLabel: string
}

export function EmptyCategoryState({ categoryLabel }: EmptyCategoryStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-navy/20 bg-cyan-tint/40 px-8 py-16 text-center"
      role="status"
      aria-label={`No modules in ${categoryLabel}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-tint">
        <PackageOpen className="h-7 w-7 text-royal" aria-hidden />
      </div>
      <div className="flex flex-col gap-1.5 max-w-xs">
        <p className="text-base font-semibold text-navy">
          No modules in {categoryLabel} yet
        </p>
        <p className="text-sm font-normal text-navy/50 leading-relaxed">
          We're working on it. Check back soon or browse another category.
        </p>
      </div>
    </div>
  )
}
