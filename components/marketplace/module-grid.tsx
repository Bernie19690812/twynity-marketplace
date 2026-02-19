import { MarketplaceModule } from '@/lib/types'
import { CategorySelection } from './category-filter'
import { ModuleCard } from './module-card'
import { EmptyCategoryState } from './empty-category-state'

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All modules',
  communication_skills: 'Communication Skills',
  tool_connectors: 'Tool Connectors',
  compliance_policy_packs: 'Compliance & Policy',
  knowledge_packs: 'Knowledge Packs',
  workflows_playbooks: 'Workflows & Playbooks',
}

interface ModuleGridProps {
  modules: MarketplaceModule[]
  selectedCategory: CategorySelection
  isInPlan: (id: string) => boolean
  onAdd: (id: string) => void
  onRemove: (id: string) => void
}

export function ModuleGrid({
  modules,
  selectedCategory,
  isInPlan,
  onAdd,
  onRemove,
}: ModuleGridProps) {
  if (modules.length === 0) {
    return (
      <EmptyCategoryState
        categoryLabel={CATEGORY_LABELS[selectedCategory] ?? selectedCategory}
      />
    )
  }

  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-label={`${modules.length} module${modules.length !== 1 ? 's' : ''}`}
    >
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          isInPlan={isInPlan(module.id)}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}
