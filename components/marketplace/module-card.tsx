import Link from 'next/link'
import { Clock } from 'lucide-react'
import { MarketplaceModule } from '@/lib/types'
import { DifficultyBadge } from './difficulty-badge'
import { SaveToPlanButton } from './save-to-plan-button'

interface ModuleCardProps {
  module: MarketplaceModule
  isInPlan: boolean
  onAdd: (id: string) => void
  onRemove: (id: string) => void
}

export function ModuleCard({ module, isInPlan, onAdd, onRemove }: ModuleCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl bg-white border border-navy/10 p-6 transition-shadow duration-150 hover:shadow-md">
      {/* Header row */}
      <div className="flex items-center justify-between gap-2">
        <DifficultyBadge difficulty={module.difficulty} />
        <span className="flex items-center gap-1 text-xs font-light text-navy/50">
          <Clock className="h-3 w-3" aria-hidden />
          {module.estimated_time}
        </span>
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-base font-semibold text-navy leading-snug">
          <Link
            href={`/marketplace/${module.id}`}
            className="hover:text-royal transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal rounded"
          >
            {module.title}
          </Link>
        </h3>
        <p className="text-sm font-normal text-navy/60 leading-relaxed line-clamp-2">
          {module.short_description}
        </p>
      </div>

      {/* Tags */}
      {module.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Tags">
          {module.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cyan-tint px-2.5 py-0.5 text-xs font-medium text-navy/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="pt-1">
        <SaveToPlanButton
          moduleId={module.id}
          isInPlan={isInPlan}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      </div>
    </article>
  )
}
