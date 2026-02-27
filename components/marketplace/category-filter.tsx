import { ModuleCategory } from '@/lib/types'
import { MOCK_MODULES } from '@/lib/mock-modules'

export type CategorySelection = ModuleCategory | 'all'

interface CategoryOption {
  value: CategorySelection
  label: string
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'all', label: 'All modules' },
  { value: 'communication_skills', label: 'Communication Skills' },
  { value: 'tool_connectors', label: 'Tool Connectors' },
  { value: 'compliance_policy_packs', label: 'Compliance & Policy' },
  { value: 'knowledge_packs', label: 'Knowledge Packs' },
  { value: 'workflows_playbooks', label: 'Workflows & Playbooks' },
]

function countForCategory(category: CategorySelection): number {
  if (category === 'all') return MOCK_MODULES.length
  return MOCK_MODULES.filter((m) => m.category === category).length
}

interface CategoryFilterProps {
  selected: CategorySelection
  onSelect: (category: CategorySelection) => void
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
      role="tablist"
      aria-label="Filter by category"
    >
      {CATEGORY_OPTIONS.map(({ value, label }) => {
        const isActive = selected === value
        const count = countForCategory(value)

        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(value)}
            className={[
              'flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40',
              isActive
                ? 'bg-brand-primary text-white'
                : 'bg-grey-100 text-grey-900 hover:bg-brand-light hover:text-brand-primary',
            ].join(' ')}
          >
            {label}
            <span
              className={[
                'ml-2 rounded-full px-1.5 py-0.5 text-xs font-semibold',
                isActive ? 'bg-white/20 text-white' : 'bg-grey-200 text-grey-600',
              ].join(' ')}
              aria-label={`${count} modules`}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
